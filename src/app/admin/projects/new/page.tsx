'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function NewProjectPage() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '',
    short_description: '',
    description: '',
    tech_stack: '',
    highlights: '',
    limitations: '',
    live_url: '',
    repo_url: '',
    achievement: '',
    featured: false,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    
    let image_url = null

    // 1. Upload the image if one was selected
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${form.slug}-${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, imageFile)

      if (uploadError) {
        setError(`Image upload failed: ${uploadError.message}`)
        setLoading(false)
        return
      }

      // 2. Get the public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName)
        
      image_url = publicUrl
    }

    const toArray = (str: string) => str.split('\n').map(s => s.trim()).filter(Boolean)

    // 3. Save the project to the database
    const { error } = await supabase.from('projects').insert({
      title: form.title,
      slug: form.slug,
      category: form.category,
      short_description: form.short_description,
      description: toArray(form.description),
      tech_stack: form.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
      highlights: toArray(form.highlights),
      limitations: toArray(form.limitations),
      live_url: form.live_url || null,
      repo_url: form.repo_url || null,
      image_url: image_url,
      achievement: form.achievement || null,
      featured: form.featured,
    })
    
    setLoading(false)
    if (error) setError(error.message)
    else {
      router.push('/admin')
      router.refresh()
    }
  }

  const input = 'w-full p-2 rounded bg-neutral-900 border border-neutral-700 text-neutral-100 focus:border-[#0066FF] outline-none'
  const label = 'block text-sm text-neutral-400 mb-1'

  return (
    <main className="max-w-2xl mx-auto p-6 text-neutral-100 pb-20">
      <h1 className="text-2xl font-bold mb-6">New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className={label}>Title</label><input className={input} value={form.title} onChange={(e) => set('title', e.target.value)} required /></div>
        <div><label className={label}>Slug (e.g. cyberaware-ssd)</label><input className={input} value={form.slug} onChange={(e) => set('slug', e.target.value)} required /></div>
        <div><label className={label}>Category</label><input className={input} value={form.category} onChange={(e) => set('category', e.target.value)} required /></div>
        
        <div><label className={label}>Short Description</label><textarea className={input} value={form.short_description} onChange={(e) => set('short_description', e.target.value)} required rows={2} /></div>
        <div><label className={label}>Full Description (One paragraph per line)</label><textarea className={input} value={form.description} onChange={(e) => set('description', e.target.value)} rows={4} /></div>
        
        <div><label className={label}>Tech Stack (Comma-separated: PHP, MySQL)</label><input className={input} value={form.tech_stack} onChange={(e) => set('tech_stack', e.target.value)} /></div>
        <div><label className={label}>Highlights (One per line)</label><textarea className={input} value={form.highlights} onChange={(e) => set('highlights', e.target.value)} rows={3} /></div>
        <div><label className={label}>Limitations (One per line)</label><textarea className={input} value={form.limitations} onChange={(e) => set('limitations', e.target.value)} rows={2} /></div>

        <div className="grid grid-cols-2 gap-4">
          <div><label className={label}>Live URL</label><input className={input} value={form.live_url} onChange={(e) => set('live_url', e.target.value)} /></div>
          <div><label className={label}>Repo URL</label><input className={input} value={form.repo_url} onChange={(e) => set('repo_url', e.target.value)} /></div>
        </div>

        {/* THIS IS THE NEW FILE UPLOAD INPUT */}
        <div>
          <label className={label}>Project Screenshot / Image</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full p-2 rounded bg-neutral-900 border border-neutral-700 text-neutral-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#0066FF] file:text-white hover:file:bg-blue-500"
          />
        </div>

        <div><label className={label}>Achievement (Optional)</label><input className={input} value={form.achievement} onChange={(e) => set('achievement', e.target.value)} /></div>

        <label className="flex items-center gap-2 text-sm mt-4">
          <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-[#0066FF]" />
          Featured on homepage
        </label>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-[#FF6B00] hover:bg-orange-500 text-white p-3 rounded font-medium disabled:opacity-50 mt-4">
          {loading ? 'Uploading & Saving…' : 'Save Project'}
        </button>
      </form>
    </main>
  )
}
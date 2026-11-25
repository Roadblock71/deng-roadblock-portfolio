'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'

export default function EditProjectPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [form, setForm] = useState<any>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('projects').select('*').eq('id', params.id).single().then(({ data, error }) => {
      if (error) setError(error.message)
      else {
        setForm({
          ...data,
          tech_stack: (data.tech_stack ?? []).join(', '),
          description: (data.description ?? []).join('\n'),
          highlights: (data.highlights ?? []).join('\n'),
          limitations: (data.limitations ?? []).join('\n'),
        })
      }
    })
  }, [params.id])

  function set<K extends string>(key: K, value: any) {
    setForm((f: any) => ({ ...f, [key]: value }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    
    let image_url = form.image_url // Keep the old image if no new one is uploaded

    // If a new image is selected, upload it
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

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName)
        
      image_url = publicUrl
    }

    const toArray = (str: string) => str.split('\n').map(s => s.trim()).filter(Boolean)

    const { error } = await supabase.from('projects').update({
      title: form.title,
      slug: form.slug,
      category: form.category,
      short_description: form.short_description,
      description: toArray(form.description),
      tech_stack: form.tech_stack.split(',').map((s: string) => s.trim()).filter(Boolean),
      highlights: toArray(form.highlights),
      limitations: toArray(form.limitations),
      live_url: form.live_url || null,
      repo_url: form.repo_url || null,
      image_url: image_url,
      achievement: form.achievement || null,
      featured: form.featured,
      updated_at: new Date().toISOString(),
    }).eq('id', params.id)
    
    setLoading(false)
    if (error) setError(error.message)
    else {
      router.push('/admin')
      router.refresh()
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this project? This cannot be undone.')) return
    const supabase = createClient()
    const { error } = await supabase.from('projects').delete().eq('id', params.id)
    if (error) setError(error.message)
    else {
      router.push('/admin')
      router.refresh()
    }
  }

  if (!form) return <main className="p-6 text-neutral-100">Loading…</main>

  const input = 'w-full p-2 rounded bg-neutral-900 border border-neutral-700 text-neutral-100 focus:border-[#0066FF] outline-none'
  const label = 'block text-sm text-neutral-400 mb-1'

  return (
    <main className="max-w-2xl mx-auto p-6 text-neutral-100 pb-20">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div><label className={label}>Title</label><input className={input} value={form.title ?? ''} onChange={(e) => set('title', e.target.value)} required /></div>
        <div><label className={label}>Slug</label><input className={input} value={form.slug ?? ''} onChange={(e) => set('slug', e.target.value)} required /></div>
        <div><label className={label}>Category</label><input className={input} value={form.category ?? ''} onChange={(e) => set('category', e.target.value)} required /></div>
        
        <div><label className={label}>Short Description</label><textarea className={input} value={form.short_description ?? ''} onChange={(e) => set('short_description', e.target.value)} required rows={2} /></div>
        <div><label className={label}>Full Description (One paragraph per line)</label><textarea className={input} value={form.description ?? ''} onChange={(e) => set('description', e.target.value)} rows={4} /></div>
        
        <div><label className={label}>Tech Stack (Comma-separated)</label><input className={input} value={form.tech_stack ?? ''} onChange={(e) => set('tech_stack', e.target.value)} /></div>
        <div><label className={label}>Highlights (One per line)</label><textarea className={input} value={form.highlights ?? ''} onChange={(e) => set('highlights', e.target.value)} rows={3} /></div>
        <div><label className={label}>Limitations (One per line)</label><textarea className={input} value={form.limitations ?? ''} onChange={(e) => set('limitations', e.target.value)} rows={2} /></div>

        <div className="grid grid-cols-2 gap-4">
          <div><label className={label}>Live URL</label><input className={input} value={form.live_url ?? ''} onChange={(e) => set('live_url', e.target.value)} /></div>
          <div><label className={label}>Repo URL</label><input className={input} value={form.repo_url ?? ''} onChange={(e) => set('repo_url', e.target.value)} /></div>
        </div>

        {/* NEW IMAGE UPLOAD SECTION */}
        <div className="p-4 border border-neutral-700 rounded bg-neutral-900">
          <label className={label}>Project Image</label>
          {form.image_url && (
            <div className="mb-4">
              <p className="text-xs text-neutral-400 mb-2">Current Image:</p>
              <img src={form.image_url} alt="Current" className="w-full max-w-xs rounded border border-neutral-700 object-cover" />
            </div>
          )}
          <p className="text-xs text-neutral-400 mb-2">Upload new image (leave blank to keep current):</p>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-600 text-neutral-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#0066FF] file:text-white hover:file:bg-blue-500"
          />
        </div>

        <div><label className={label}>Achievement</label><input className={input} value={form.achievement ?? ''} onChange={(e) => set('achievement', e.target.value)} /></div>

        <label className="flex items-center gap-2 text-sm mt-4">
          <input type="checkbox" checked={!!form.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-[#0066FF]" />
          Featured
        </label>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div className="flex gap-4 mt-6">
          <button type="submit" disabled={loading} className="flex-1 bg-[#0066FF] hover:bg-blue-500 text-white p-3 rounded font-medium disabled:opacity-50">
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
          <button type="button" onClick={handleDelete} className="bg-red-600 hover:bg-red-500 text-white p-3 rounded font-medium">
            Delete
          </button>
        </div>
      </form>
    </main>
  )
}
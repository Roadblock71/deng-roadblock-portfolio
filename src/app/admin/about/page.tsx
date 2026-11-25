'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

export default function AdminAboutPage() {
  const [form, setForm] = useState<any>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('site_config').select('*').then(({ data, error }) => {
      if (error) {
        setError(error.message)
      } else {
        // Convert array of {key, value} into an object
        const configObj = data.reduce((acc: any, item) => {
          acc[item.key] = item.value
          return acc
        }, {})
        setForm(configObj)
      }
    })
  }, [])

  function set(key: string, value: string) {
    setForm((f: any) => ({ ...f, [key]: value }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    const supabase = createClient()
    
    let imageUrl = form.profile_image_url

    // Upload image if selected
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `profile-${Date.now()}.${fileExt}`
      
      // We are reusing the 'project-images' bucket to keep things simple
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
        
      imageUrl = publicUrl
      set('profile_image_url', imageUrl) // Update local state
    }

    // Prepare data for upsert (update if exists, insert if not)
    const updates = [
      { key: 'about_title', value: form.about_title },
      { key: 'about_bio', value: form.about_bio },
      { key: 'about_journey', value: form.about_journey },
      { key: 'profile_image_url', value: imageUrl },
    ]

    const { error: saveError } = await supabase
      .from('site_config')
      .upsert(updates)

    setLoading(false)
    if (saveError) {
      setError(saveError.message)
    } else {
      setSuccess('About page updated successfully!')
      setImageFile(null) // clear file input
    }
  }

  if (!form) return <main className="p-6 text-neutral-100">Loading…</main>

  const input = 'w-full p-2 rounded bg-neutral-900 border border-neutral-700 text-neutral-100 focus:border-[#0066FF] outline-none'
  const label = 'block text-sm text-neutral-400 mb-1'

  return (
    <main className="max-w-2xl mx-auto p-6 text-neutral-100 pb-20">
      <h1 className="text-2xl font-bold mb-6">Edit About Page</h1>
      
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className={label}>Profile Picture</label>
          {form.profile_image_url && (
            <div className="mb-2">
              <img src={form.profile_image_url} alt="Profile" className="w-32 h-32 object-cover rounded-full border border-neutral-700" />
            </div>
          )}
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full p-2 rounded bg-neutral-900 border border-neutral-700 text-neutral-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#0066FF] file:text-white hover:file:bg-blue-500"
          />
        </div>

        <div>
          <label className={label}>Main Headline</label>
          <input className={input} value={form.about_title || ''} onChange={(e) => set('about_title', e.target.value)} required />
        </div>

        <div>
          <label className={label}>Short Bio (Paragraph 1)</label>
          <textarea className={input} value={form.about_bio || ''} onChange={(e) => set('about_bio', e.target.value)} rows={3} required />
        </div>

        <div>
          <label className={label}>The Journey (Paragraph 2)</label>
          <textarea className={input} value={form.about_journey || ''} onChange={(e) => set('about_journey', e.target.value)} rows={4} required />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}

        <button type="submit" disabled={loading} className="w-full bg-[#FF6B00] hover:bg-orange-500 text-white p-3 rounded font-medium disabled:opacity-50 mt-4">
          {loading ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </main>
  )
}
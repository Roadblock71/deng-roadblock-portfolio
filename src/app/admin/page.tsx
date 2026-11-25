import { createServerSupabase } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminPage() {
  const supabase = await createServerSupabase()
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-5xl mx-auto p-6 text-neutral-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-[#FF6B00] hover:bg-orange-500 text-white px-4 py-2 rounded font-medium transition-colors"
        >
          + New Project
        </Link>
      </div>

      {error && <p className="text-red-400">{error.message}</p>}

      {!projects?.length ? (
        <p className="text-neutral-400">No projects yet. Add one.</p>
      ) : (
        <ul className="space-y-2">
          {projects.map((p) => (
            <li
              key={p.id}
              className="flex justify-between items-center border border-neutral-800 p-3 rounded"
            >
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-sm text-neutral-400">
                  /{p.slug} · {p.category}
                </p>
              </div>
              <div className="space-x-3">
                <Link href={`/admin/projects/${p.id}`} className="text-[#0066FF] hover:underline">
                  Edit
                </Link>
                <Link href={`/projects/${p.slug}`} className="text-neutral-400 hover:text-white">
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
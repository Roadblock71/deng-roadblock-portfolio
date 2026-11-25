import { createServerSupabase } from '@/lib/supabase/server'
import Link from 'next/link'
import LogoutButton from '@/components/admin/LogoutButton'

export default async function AdminPage() {
  const supabase = await createServerSupabase()
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-5xl mx-auto p-6 text-neutral-100 min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-neutral-400">Manage your portfolio content</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/about"
            className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            Edit About Page
          </Link>
          <Link
            href="/admin/projects/new"
            className="bg-[#FF6B00] hover:bg-orange-500 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            + New Project
          </Link>
          <LogoutButton />
        </div>
      </div>

      {error && <p className="text-red-400 mb-4">{error.message}</p>}

      {/* Projects List Section */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Your Projects</h2>
        
        {!projects?.length ? (
          <p className="text-neutral-400">No projects yet. Add one to get started.</p>
        ) : (
          <ul className="space-y-3">
            {projects.map((p) => (
              <li
                key={p.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border border-neutral-800 bg-neutral-900 p-4 rounded-lg gap-4"
              >
                <div>
                  <p className="font-medium text-lg">{p.title}</p>
                  <p className="text-sm text-neutral-400">
                    /{p.slug} · {p.category}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Link 
                    href={`/projects/${p.slug}`} 
                    className="text-sm text-neutral-400 hover:text-white" 
                    target="_blank"
                  >
                    View Live
                  </Link>
                  <Link 
                    href={`/admin/projects/${p.id}`} 
                    className="bg-[#0066FF]/10 text-[#0066FF] hover:bg-[#0066FF]/20 px-3 py-1.5 rounded text-sm font-medium"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
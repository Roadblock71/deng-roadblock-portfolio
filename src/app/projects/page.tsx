import { createServerSupabase } from '@/lib/supabase/server'
import ProjectCard from '@/components/ui/ProjectCard'
import { Project } from '@/data/projects'

export const metadata = { 
  title: "Projects", 
  description: "Explore the software projects built by Deng Roadblock." 
}

export default async function ProjectsPage() {
  const supabase = await createServerSupabase()
  const { data: dbProjects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  // Map database snake_case columns to your existing TypeScript interface (camelCase)
  const projects: Project[] = (dbProjects || []).map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    shortDescription: p.short_description,
    description: p.description,
    technologies: p.tech_stack,
    highlights: p.highlights,
    liveUrl: p.live_url,
    repoUrl: p.repo_url,
    imageUrl: p.image_url,
    achievement: p.achievement,
    limitations: p.limitations,
  }))

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-4">Projects</h1>
      <p className="text-slate-400 mb-12 max-w-2xl">
        A collection of web applications, software development projects, and machine learning experiments I have built to learn and solve real-world problems.
      </p>
      
      {error && <p className="text-red-400 mb-8">Failed to load projects.</p>}

      {!projects.length && !error ? (
        <p className="text-slate-400">No projects found. Add some in the admin dashboard.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
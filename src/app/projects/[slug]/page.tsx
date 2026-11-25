import { createServerSupabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createServerSupabase();
  
  // Fetch this specific project from the database by its slug
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  // If it doesn't exist in the DB, show the 404 page
  if (!project || error) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Link href="/projects" className="text-sm text-primary hover:text-white transition-colors mb-8 inline-block">
        &larr; Back to Projects
      </Link>

      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {project.category}
          </span>
          {project.achievement && (
            <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full">
              🏆 {project.achievement}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">{project.title}</h1>

        <div className="flex flex-wrap gap-4 mb-8">
          {project.live_url && (
            <Link href={project.live_url} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
              Live Demo
            </Link>
          )}
          {project.repo_url && (
            <Link href={project.repo_url} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors">
              View Source Code
            </Link>
          )}
        </div>

        {project.image_url && (
          <div className="rounded-2xl overflow-hidden border border-slate-800 mb-12 bg-slate-900 flex items-center justify-center min-h-[300px]">
            <Image
              src={project.image_url}
              alt={`${project.title} screenshot`}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            {project.description && project.description.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                {project.description.map((paragraph: string, index: number) => (
                  <p key={index} className="text-slate-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </section>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Key Features & Highlights</h2>
                <ul className="space-y-3">
                  {project.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300">
                      <span className="text-primary mt-1">▪</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.limitations && project.limitations.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Known Limitations</h2>
                <ul className="space-y-3">
                  {project.limitations.map((limitation: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-slate-400 text-sm">
                      <span className="text-slate-500 mt-1">•</span>
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="md:col-span-1">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech: string) => (
                  <span key={tech} className="text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
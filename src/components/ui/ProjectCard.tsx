import Link from "next/link";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-primary/50 hover:bg-slate-900">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {project.category}
          </span>
          {project.achievement && (
            <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full">
              🏆 {project.achievement}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-3">
          {project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span key={tech} className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 mt-auto">
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm font-medium text-primary hover:text-white transition-colors"
        >
          View Details &rarr;
        </Link>
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Live Demo
          </Link>
        )}
      </div>
    </article>
  );
}
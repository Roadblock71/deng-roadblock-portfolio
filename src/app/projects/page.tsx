import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";

export const metadata = { title: "Projects", description: "Explore the software projects built by Deng Roadblock." };

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-4">Projects</h1>
      <p className="text-slate-400 mb-12 max-w-2xl">A collection of web applications, software development projects, and machine learning experiments I have built to learn and solve real-world problems.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
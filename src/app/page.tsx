import { socialLinks } from "@/data/socialLinks";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";
import { siteConfig } from "@/data/site";
import ProjectCard from "@/components/ui/ProjectCard";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createServerSupabase();

  // 1. Fetch featured projects
  const { data: dbProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(2);

  // 2. Fetch the IndabaX project specifically for the highlight section
  const { data: indabaXProject } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", "food-security-ss")
    .single();

  // 3. Fetch skills
  const { data: dbSkills } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  // Map projects to TypeScript interface
  const featuredProjects: Project[] = (dbProjects || []).map((p) => ({
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
  }));

  // Group skills by category for the UI
  const groupedSkills = (dbSkills || []).reduce((acc: any, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push({
      name: skill.name,
      level: skill.proficiency,
    });
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 md:pt-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Building Practical Software. <br />
            <span className="text-primary">Learning Through Real Projects.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
            I'm {siteConfig.name}, a South Sudanese software engineering student and developer focused on building practical web applications and exploring how technology can solve real-world problems. From web platforms to a machine learning project focused on food insecurity in South Sudan, I learn by building, testing, and improving.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Explore My Projects
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-primary hover:text-white transition-colors">
            View all &rarr;
          </Link>
        </div>
        
        {featuredProjects.length === 0 ? (
          <p className="text-slate-400">No featured projects yet. Check the admin panel.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* Dynamic IndabaX Highlight */}
      {indabaXProject && (
        <section className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 p-8 md:p-12 text-center">
            <span className="text-sm font-bold text-yellow-500 uppercase tracking-wider mb-2 block">
              Verified Achievement
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {indabaXProject.achievement || "Ranked 5th among 37 participants"}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-6">
              {indabaXProject.short_description}
            </p>
            <Link
              href={`/projects/${indabaXProject.slug}`}
              className="inline-block px-6 py-3 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-200 transition-colors"
            >
              View Project Details
            </Link>
          </div>
        </section>
      )}

      {/* Dynamic Skills Overview */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Skills Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(groupedSkills).map(([category, items]: [string, any]) => (
            <div key={category} className="rounded-xl border border-slate-800 bg-slate-900/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {items.map((item: any) => (
                  <li key={item.name} className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{item.name}</span>
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">{item.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* RoadblockCodes Section (Kept static as it's structural branding) */}
      <section className="container mx-auto px-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">RoadblockCodes</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {siteConfig.philosophy} This is my personal brand and learning journey. I share my experiences, challenges, and lessons learned while building software and exploring technology.
            </p>
            <Link
              href="/writing"
              className="text-primary hover:text-white font-medium transition-colors"
            >
              Read my writing &rarr;
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="RoadblockCodes Logo"
              width={300}
              height={100}
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
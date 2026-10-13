import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { siteConfig } from "@/data/site";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Home() {
  const featuredProjects = projects.slice(0, 2);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* IndabaX Highlight */}
      <section className="container mx-auto px-4">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 p-8 md:p-12 text-center">
          <span className="text-sm font-bold text-yellow-500 uppercase tracking-wider mb-2 block">
            Verified Achievement
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ranked 5th among 37 participants
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            In the IndabaX South Sudan 2026 Food Insecurity Forecasting Challenge, I developed a machine learning model to predict IPC Phase 3+ food insecurity, providing early-warning signals for humanitarian response.
          </p>
          <Link
            href="/projects/food-security-ss"
            className="inline-block px-6 py-3 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-200 transition-colors"
          >
            View Project Details
          </Link>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Skills Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className="rounded-xl border border-slate-800 bg-slate-900/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{skillGroup.category}</h3>
              <ul className="space-y-3">
                {skillGroup.items.map((item) => (
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

      {/* RoadblockCodes Section */}
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
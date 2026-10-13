import Image from "next/image";
import { siteConfig } from "@/data/site";

export const metadata = { title: "About", description: "Learn more about Deng Roadblock." };

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-8">About Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <div className="rounded-2xl overflow-hidden border border-slate-800 sticky top-24">
            <Image src="/images/profile.jpg" alt="Deng Roadblock" width={400} height={400} className="w-full h-auto object-cover" />
          </div>
        </div>
        <div className="md:col-span-2 space-y-6 text-slate-300 leading-relaxed">
          <p>I am a South Sudanese software engineering student and developer focused on building practical web applications and exploring how technology can solve real-world problems.</p>
          <p>My journey into software development began with a curiosity about how things work, which quickly turned into a passion for building. I learn by doing—writing code, breaking things, and figuring out how to fix them.</p>
          <p>I am particularly interested in full-stack web development and applying technology to address real-world challenges in South Sudan. Whether it's building a cybersecurity awareness platform or developing a machine learning model to forecast food insecurity, I believe in creating software that makes a tangible difference.</p>
          <p>My personal brand, <strong>RoadblockCodes</strong>, is built on the philosophy: <em>"{siteConfig.philosophy}"</em> I embrace challenges as opportunities to learn and grow, and I share my journey to inspire and connect with other developers.</p>
          <div className="pt-8 border-t border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4">My Approach</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><span className="text-primary mt-1">▹</span><span><strong>Learn by building:</strong> I believe practical projects are the best way to master new technologies.</span></li>
              <li className="flex items-start gap-3"><span className="text-primary mt-1">▹</span><span><strong>Embrace failure:</strong> Bugs and errors are learning opportunities, not dead ends.</span></li>
              <li className="flex items-start gap-3"><span className="text-primary mt-1">▹</span><span><strong>Solve real problems:</strong> I'm motivated by projects that address genuine needs in my community.</span></li>
              <li className="flex items-start gap-3"><span className="text-primary mt-1">▹</span><span><strong>Keep improving:</strong> Every project is a chance to refine my skills and build something better.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
import { siteConfig } from "@/data/site";

export const metadata = { title: "Writing", description: "RoadblockCodes - Learning, failing, fixing, and growing." };

export default function WritingPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-white mb-4">RoadblockCodes</h1>
      <p className="text-xl text-primary font-medium mb-8 italic">"{siteConfig.philosophy}"</p>
      <div className="prose prose-invert prose-slate max-w-none">
        <p className="text-slate-300 leading-relaxed mb-6">Welcome to RoadblockCodes, my personal learning and technology content brand. This is where I document my journey as a software engineering student and developer.</p>
        <p className="text-slate-300 leading-relaxed mb-6">I believe that the best way to learn is to build, break things, and figure out how to fix them. Through my writing, I share:</p>
        <ul className="space-y-3 text-slate-300 mb-8">
          <li className="flex items-start gap-3"><span className="text-primary mt-1">▹</span><span>Software development experiences and lessons learned</span></li>
          <li className="flex items-start gap-3"><span className="text-primary mt-1">▹</span><span>Programming challenges and how I solved them</span></li>
          <li className="flex items-start gap-3"><span className="text-primary mt-1">▹</span><span>Cybersecurity awareness and online safety</span></li>
          <li className="flex items-start gap-3"><span className="text-primary mt-1">▹</span><span>Reflections on my growth as a developer</span></li>
        </ul>
        <p className="text-slate-400 text-sm border-l-2 border-primary pl-4 py-2 my-8">New articles are coming soon. Check back later for insights from my latest projects and learning experiences.</p>
      </div>
    </div>
  );
}
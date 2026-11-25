import Image from "next/image";
import { siteConfig } from "@/data/site";
import { createServerSupabase } from "@/lib/supabase/server";

export const metadata = { 
  title: "About", 
  description: "Learn more about Deng Roadblock." 
};

export default async function AboutPage() {
  const supabase = await createServerSupabase();
  
  // Fetch the site_config data
  const { data: configData } = await supabase.from("site_config").select("*");
  
  // Convert the array of {key, value} into a simple object for easy access
  const config = (configData || []).reduce((acc: any, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  // Split the journey text by newlines to create multiple paragraphs
  const journeyParagraphs = (config.about_journey || "").split("\n").filter((p: string) => p.trim() !== "");

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-8">About Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <div className="rounded-2xl overflow-hidden border border-slate-800 sticky top-24 bg-slate-900 min-h-[300px] flex items-center justify-center">
            {config.profile_image_url ? (
              <img 
                src={config.profile_image_url} 
                alt="Deng Roadblock" 
                className="w-full h-auto object-cover" 
              />
            ) : (
              <span className="text-slate-500 text-sm">No image uploaded</span>
            )}
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6 text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white">
            {config.about_title}
          </h2>
          
          <p>{config.about_bio}</p>
          
          {journeyParagraphs.map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}

          <p>
            My personal brand, <strong>RoadblockCodes</strong>, is built on the philosophy: <em>"{siteConfig.philosophy}"</em> I embrace challenges as opportunities to learn and grow, and I share my journey to inspire and connect with other developers.
          </p>

          <div className="pt-8 border-t border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4">My Approach</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">▪</span>
                <span><strong>Learn by building:</strong> I believe practical projects are the best way to master new technologies.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">▪</span>
                <span><strong>Embrace failure:</strong> Bugs and errors are learning opportunities, not dead ends.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">▪</span>
                <span><strong>Solve real problems:</strong> I'm motivated by projects that address genuine needs in my community.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">▪</span>
                <span><strong>Keep improving:</strong> Every project is a chance to refine my skills and build something better.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/socialLinks";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="text-sm text-slate-500 italic">
          "{siteConfig.philosophy}"
        </p>
        <div className="flex gap-4">
          <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
            GitHub
          </Link>
          <Link href={`mailto:${socialLinks.email}`} className="text-slate-400 hover:text-primary transition-colors">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
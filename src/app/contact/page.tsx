import { socialLinks } from "@/data/socialLinks";
import Link from "next/link";

export const metadata = { title: "Contact", description: "Get in touch with Deng Roadblock." };

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
      <p className="text-slate-400 mb-12">I'm always open to discussing new projects, collaboration opportunities, or just connecting with other developers.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Email Card */}
        <Link href={`mailto:${socialLinks.email}`} className="flex flex-col items-center p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-primary/50 transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-4">
            <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          <span className="text-white font-medium mb-1">Email</span>
          <span className="text-sm text-slate-400 text-center break-all">{socialLinks.email}</span>
        </Link>

        {/* GitHub Card */}
        <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-primary/50 transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-4">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
          </svg>
          <span className="text-white font-medium mb-1">GitHub</span>
          <span className="text-sm text-slate-400">@Roadblock71</span>
        </Link>

        {/* WhatsApp Card */}
        <Link href={`https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-primary/50 transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-4">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
          </svg>
          <span className="text-white font-medium mb-1">WhatsApp</span>
          <span className="text-sm text-slate-400">{socialLinks.whatsapp}</span>
        </Link>

      </div>
    </div>
  );
}
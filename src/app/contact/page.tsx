import { socialLinks } from "@/data/socialLinks";
import { Mail, Github, MessageCircle } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Contact", description: "Get in touch with Deng Roadblock." };

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
      <p className="text-slate-400 mb-12">I'm always open to discussing new projects, collaboration opportunities, or just connecting with other developers.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href={`mailto:${socialLinks.email}`} className="flex flex-col items-center p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-primary/50 transition-colors group">
          <Mail className="w-8 h-8 text-primary mb-4" />
          <span className="text-white font-medium mb-1">Email</span>
          <span className="text-sm text-slate-400 text-center break-all">{socialLinks.email}</span>
        </Link>
        <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-primary/50 transition-colors group">
          <Github className="w-8 h-8 text-primary mb-4" />
          <span className="text-white font-medium mb-1">GitHub</span>
          <span className="text-sm text-slate-400">@Roadblock71</span>
        </Link>
        <Link href={`https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-primary/50 transition-colors group">
          <MessageCircle className="w-8 h-8 text-primary mb-4" />
          <span className="text-white font-medium mb-1">WhatsApp</span>
          <span className="text-sm text-slate-400">{socialLinks.whatsapp}</span>
        </Link>
      </div>
    </div>
  );
}
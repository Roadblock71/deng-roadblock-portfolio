import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createServerSupabase } from "@/lib/supabase/server";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/socialLinks";

const inter = Inter({ subsets: ["latin"] });

// 1. Dynamically generate SEO tags based on your Supabase profile picture
export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("site_config").select("value").eq("key", "profile_image_url").single();
  
  // Fallback to your logo if no profile picture is uploaded yet
  const ogImage = data?.value || "/images/logo.png"; 
  const siteUrl = "https://deng-roadblock-portfolio.vercel.app"; // Update this if you get a custom domain

  return {
    title: {
      default: `${siteConfig.name} | Software Developer`,
      template: `%s | ${siteConfig.name}`,
    },
    description: "I'm Deng Roadblock, a South Sudanese software engineering student and developer focused on building practical web applications.",
    openGraph: {
      title: `${siteConfig.name} | Software Developer`,
      description: "Building Practical Software. Learning Through Real Projects.",
      url: siteUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: `${siteConfig.name} Profile Picture`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} | Software Developer`,
      description: "Building Practical Software. Learning Through Real Projects.",
      images: [ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 2. Structured Data for Google Search (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Deng Roadblock",
    url: "https://deng-roadblock-portfolio.vercel.app",
    jobTitle: "Software Developer",
    description: "South Sudanese software engineering student and developer.",
    sameAs: [
      socialLinks.github,
      socialLinks.linkedin,
      // add any other social links here
    ].filter(Boolean),
  };

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-neutral-950 text-slate-200 antialiased`}>
        {/* Inject the structured data into the page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
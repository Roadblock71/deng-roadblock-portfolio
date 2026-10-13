import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
      <p className="text-slate-400 max-w-md mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">Return Home</Link>
    </div>
  );
}
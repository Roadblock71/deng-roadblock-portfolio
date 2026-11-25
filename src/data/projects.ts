export interface Project {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string[];
  technologies: string[];
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  achievement?: string;
  limitations?: string[];
}
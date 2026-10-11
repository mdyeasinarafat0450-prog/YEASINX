export type ProjectCategory =
  | 'All'
  | 'Websites'
  | 'Web Apps'
  | 'Dashboards'
  | 'UI/UX'
  | 'Experiments'
  | 'Motion Design';

export type PreviewMode = 'iframe' | 'thumbnail' | 'video' | 'external' | 'custom';

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  allCategories: ProjectCategory[];
  techStack: string[];
  description: string;
  longDescription: string;
  year: string;
  role: string;
  client: string;
  accentColor?: string;
  previewMode: PreviewMode;
  liveUrl: string;
  demoPath: string; // e.g. "/demos/vanta" or external url
  thumbnail: string;
  gallery?: string[];
  videoPreview?: string;
  features: string[];
  metrics?: { label: string; value: string }[];
  embedBlocked?: boolean;
  featured?: boolean;
}

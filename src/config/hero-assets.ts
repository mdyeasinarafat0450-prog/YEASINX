/**
 * Reusable Hero Asset Configuration
 * Stores main coder scene and wireframe scene asset paths, dimensions, and cloud configuration.
 */

export interface HeroAsset {
  src: string;
  fallbackSrc: string;
  workstationSrc: string;
  alt: string;
  width: number;
  height: number;
}

export interface HeroAssetsConfig {
  mainImage: HeroAsset;
  wireframeImage: HeroAsset;
  cloudProvider: {
    enabled: boolean;
    providerName: string;
    note: string;
  };
}

export const heroAssetsConfig: HeroAssetsConfig = {
  // Image A — Main Full-Color Coder Scene
  mainImage: {
    src: "/images/nexora-coder-main.webp",
    fallbackSrc: "/images/nexora-coder-main.jpg",
    workstationSrc: "/images/nexora-workstation-main.webp",
    alt: "NEXORA Developer sitting in gaming chair at multi-monitor coding workstation with neon-green lighting",
    width: 1024,
    height: 1024,
  },

  // Image B — Matching Wireframe Scene
  wireframeImage: {
    src: "/images/nexora-coder-wireframe.webp",
    fallbackSrc: "/images/nexora-coder-wireframe.jpg",
    workstationSrc: "/images/nexora-workstation-wireframe.webp",
    alt: "NEXORA 3D Character Wireframe showing seated coder, chair, monitors, desk, PC tower, and room topology",
    width: 1024,
    height: 682,
  },

  cloudProvider: {
    enabled: false,
    providerName: "Vercel Static Edge CDN / Next.js Image Optimizer",
    note: "Assets are optimized into WebP/AVIF and served via Vercel Edge. To connect Cloudinary or AWS S3, configure NEXT_PUBLIC_ASSETS_CDN_URL without committing API secrets to client code.",
  },
};

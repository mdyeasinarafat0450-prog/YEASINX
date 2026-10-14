import { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    id: "vanta",
    slug: "vanta",
    title: "VANTA",
    subtitle: "Creative Agency Website",
    category: "Websites",
    allCategories: ["Websites", "UI/UX"],
    techStack: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Lenis"],
    description: "An avant-garde digital agency website featuring brutalist typography, magnetic interactions, and smooth kinetic transitions.",
    longDescription: "VANTA is an experimental digital agency experience designed to elevate brand narratives through high-contrast typography, interactive cursor physics, and micro-interactions. Built from scratch with modular Next.js components and fluid layout engines.",
    year: "2025",
    role: "Lead Creative Developer & UI Architect",
    client: "Internal Demo / Concept Lab",
    accentColor: "#B6FF3B",
    previewMode: "iframe",
    liveUrl: "/demos/vanta",
    demoPath: "/demos/vanta",
    thumbnail: "/images/projects/vanta.svg",
    features: [
      "Dynamic interactive showcase with hover-reactive gallery",
      "Brutalist typography scale with responsive viewport calculations",
      "Custom cursor tracking & magnetic button physics",
      "Dark room aesthetic with ambient glow and grain filters"
    ],
    metrics: [
      { label: "Performance", value: "99/100" },
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Interactivity", value: "High" }
    ],
    featured: true
  },
  {
    id: "nexora",
    slug: "nexora",
    title: "NEXORA",
    subtitle: "Real-time SaaS Telemetry & Dashboard",
    category: "Dashboards",
    allCategories: ["Dashboards", "Web Apps"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Recharts/SVG", "Framer Motion"],
    description: "High-density enterprise telemetry platform featuring real-time data streaming, latency heatmaps, and customizable analytics widgets.",
    longDescription: "NEXORA delivers command-center visibility for distributed microservices. Features interactive metric filters, live throughput charts, server health nodes, and anomaly detection toggles with instant response rates.",
    year: "2025",
    role: "Full-Stack UI Engineer",
    client: "Internal Demo / Cloud Lab",
    accentColor: "#38BDF8",
    previewMode: "iframe",
    liveUrl: "/demos/nexora",
    demoPath: "/demos/nexora",
    thumbnail: "/images/projects/nexora.svg",
    features: [
      "Interactive time-series telemetry charts with live scrubbers",
      "Real-time server cluster status monitor and incident log",
      "Customizable metric thresholds with dynamic warning states",
      "Dark glassmorphic workspace with keyboard shortcuts"
    ],
    metrics: [
      { label: "Data Latency", value: "< 12ms" },
      { label: "Active Nodes", value: "1,420" },
      { label: "Uptime", value: "99.99%" }
    ],
    featured: true
  },
  {
    id: "monolith",
    slug: "monolith",
    title: "MONOLITH",
    subtitle: "Brutalist Architecture Studio",
    category: "Websites",
    allCategories: ["Websites", "UI/UX"],
    techStack: ["Next.js", "TypeScript", "GSAP ScrollTrigger", "CSS Grid", "Tailwind CSS"],
    description: "Minimalist spatial architecture portfolio honoring raw concrete, structural shadows, and monumental grid compositions.",
    longDescription: "A bespoke digital exhibition for an avant-garde architectural firm. Employs asymmetric editorial columns, high-resolution architectural photography frames, floorplan blueprints, and fluid project navigation.",
    year: "2024",
    role: "Front-End Developer & Art Director",
    client: "Internal Demo / Studio Lab",
    accentColor: "#E2E8F0",
    previewMode: "iframe",
    liveUrl: "/demos/monolith",
    demoPath: "/demos/monolith",
    thumbnail: "/images/projects/monolith.svg",
    features: [
      "Asymmetric editorial layout system with blueprint overlays",
      "Structural project filtering (Commercial, Residential, Spatial)",
      "Interactive material swatch inspection tool",
      "High-contrast monochromatic aesthetics with subtle grain"
    ],
    metrics: [
      { label: "Curated Works", value: "24 Projects" },
      { label: "Awards", value: "Design Nominee" },
      { label: "Viewport Scale", value: "Fluid" }
    ],
    featured: true
  },
  {
    id: "orbital",
    slug: "orbital",
    title: "ORBITAL",
    subtitle: "Futuristic Satellite OS & Product Landing",
    category: "Web Apps",
    allCategories: ["Web Apps", "Websites", "Experiments"],
    techStack: ["Next.js", "Three.js/WebGL", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description: "Interactive promotional experience for next-generation orbital telemetry hardware and deep-space communications.",
    longDescription: "ORBITAL blends aerospace engineering precision with cinematic storytelling. Includes an interactive orbital radius inspector, hardware module blueprints, live constellation simulation, and telemetry specs.",
    year: "2025",
    role: "Creative Technologist",
    client: "Internal Demo / SpaceTech Lab",
    accentColor: "#A855F7",
    previewMode: "iframe",
    liveUrl: "/demos/orbital",
    demoPath: "/demos/orbital",
    thumbnail: "/images/projects/orbital.svg",
    features: [
      "Interactive orbital mechanics and altitude flight calculator",
      "Interactive 3D-inspired constellation radar and trajectory map",
      "Hardware specifications sheet with toggleable payload states",
      "Cinematic sound effects audio triggers and telemetry HUD"
    ],
    metrics: [
      { label: "Orbital Altitude", value: "540 km" },
      { label: "Signal Band", value: "Ka-Band" },
      { label: "Payload Mass", value: "180 kg" }
    ],
    featured: true
  },
  {
    id: "kinetix",
    slug: "kinetix",
    title: "KINETIX",
    subtitle: "Interactive Particle Physics Sandbox",
    category: "Experiments",
    allCategories: ["Experiments", "Motion Design"],
    techStack: ["HTML5 Canvas", "Vector Math", "TypeScript", "Web Audio API"],
    description: "A real-time particle gravitational field simulator. Interactively manipulate 1,200+ kinetic nodes with mouse velocity and magnetic forcefields.",
    longDescription: "Built natively inside NEXORA's custom demo engine. Visitors can drag, repel, pulse, change gravity fields, color spectrums, and trigger kinetic bursts directly inside the preview panel without leaving the page.",
    year: "2025",
    role: "Creative Technologist & Algorithmic Design",
    client: "Creative Code Experiment",
    accentColor: "#B6FF3B",
    previewMode: "custom",
    liveUrl: "#",
    demoPath: "custom-kinetix",
    thumbnail: "/images/projects/kinetix.svg",
    features: [
      "Interactive gravitational attractor with dynamic spring stiffness",
      "Real-time particle count, damping, and collision toggles",
      "Shockwave impulse trigger on click and drag",
      "Zero dependencies — pure 60FPS canvas vector physics"
    ],
    metrics: [
      { label: "Active Particles", value: "1,200" },
      { label: "Physics Loop", value: "120 Hz" },
      { label: "Compute Engine", value: "Pure Canvas" }
    ],
    featured: false
  },
  {
    id: "neo-pulse",
    slug: "neo-pulse",
    title: "NEO//PULSE",
    subtitle: "Generative Audio Visualizer & Kinetic Reel",
    category: "Motion Design",
    allCategories: ["Motion Design", "Experiments"],
    techStack: ["GSAP", "SVG Morph", "Web Audio", "Framer Motion", "Cinema 4D"],
    description: "Cinematic motion reel combining procedural wireframes, rhythmic bassline pulses, and glitch typography transitions.",
    longDescription: "A multi-scene motion design sequence engineered for brand showcases and futuristic UI concepts. Includes selectable animation modes, frequency modulation, and beat-matched typography reveals.",
    year: "2024",
    role: "Motion Designer & 3D Artist",
    client: "Synthetics Studio",
    accentColor: "#F43F5E",
    previewMode: "video",
    liveUrl: "#",
    demoPath: "video-neopulse",
    thumbnail: "/images/projects/neopulse.svg",
    videoPreview: "/media/neopulse-preview.mp4",
    features: [
      "Procedural wireframe waveform rendering synced to audio spectrum",
      "Dynamic camera roll, depth of field, and chromatic aberration",
      "Interactive rhythm scrub and scene selector",
      "Smooth playback controls with loop and full-screen view"
    ],
    metrics: [
      { label: "Resolution", value: "4K UHD" },
      { label: "Motion Curves", value: "Custom Bezier" },
      { label: "FPS Target", value: "60 FPS" }
    ],
    featured: false
  },
  {
    id: "synapse-ai",
    slug: "synapse-ai",
    title: "SYNAPSE AI",
    subtitle: "Enterprise LLM Inference Platform",
    category: "Web Apps",
    allCategories: ["Web Apps", "UI/UX", "Dashboards"],
    techStack: ["React", "Python/FastAPI", "Tailwind CSS", "Enterprise Security"],
    description: "Enterprise model routing and fine-tuning suite with strict enterprise isolation and zero-retention governance.",
    longDescription: "Demonstrates graceful thumbnail & presentation fallback handling. Because this production enterprise portal enforces strict X-Frame-Options: DENY security headers, NEXORA displays high-fidelity UI documentation and interactive architecture slides.",
    year: "2024",
    role: "Senior Product Designer",
    client: "Confidential Enterprise Client",
    accentColor: "#EC4899",
    previewMode: "thumbnail",
    embedBlocked: true,
    liveUrl: "https://example.com/synapse-ai",
    demoPath: "external-synapse",
    thumbnail: "/images/projects/synapse.svg",
    gallery: [
      "/images/projects/synapse-1.svg",
      "/images/projects/synapse-2.svg",
      "/images/projects/synapse-3.svg"
    ],
    features: [
      "Multi-model latency benchmark comparison grid",
      "Token budget consumption heatmap by department",
      "Strict security header compliance with fallback renderer",
      "Comprehensive design system with over 80 Figma tokens"
    ],
    metrics: [
      { label: "TPS Throughput", value: "4.2M / day" },
      { label: "P99 Latency", value: "180ms" },
      { label: "Security", value: "SOC2 Type II" }
    ],
    featured: false
  },
  {
    id: "aetherium",
    slug: "aetherium",
    title: "AETHERIUM",
    subtitle: "Decentralized Liquidity Matrix",
    category: "UI/UX",
    allCategories: ["UI/UX", "Web Apps"],
    techStack: ["Ethers.js", "Next.js", "Tailwind CSS", "Framer Motion"],
    description: "Algorithmic automated market maker interface with slippage protection and multi-hop liquidity visualization.",
    longDescription: "A slick dark-mode Web3 DeFi interface crafted with biometric safety checks, real-time depth-of-book animations, and instant transaction previews. Designed for high-frequency algorithmic traders.",
    year: "2024",
    role: "Design Technologist",
    client: "Aetherium DAO",
    accentColor: "#10B981",
    previewMode: "external",
    liveUrl: "https://github.com",
    demoPath: "external-aetherium",
    thumbnail: "/images/projects/aetherium.svg",
    features: [
      "Interactive swap routing graph with gas fee optimization",
      "Dynamic liquidity concentration slider",
      "External portal launch integration with preview summary",
      "High-contrast accessible dark palette"
    ],
    metrics: [
      { label: "TVL Volume", value: "$18.4M" },
      { label: "Slippage", value: "< 0.05%" },
      { label: "Audits", value: "Passed" }
    ],
    featured: false
  }
];

export const projectCategories = [
  "All",
  "Websites",
  "Web Apps",
  "Dashboards",
  "UI/UX",
  "Experiments",
  "Motion Design"
] as const;

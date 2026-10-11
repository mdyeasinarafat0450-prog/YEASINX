# NEON//FRAME — Premium Interactive Portfolio

> **"I DESIGN DIGITAL EXPERIENCES."**  
> *Creative Developer · Web Designer · Motion Designer*

NEON//FRAME is an avant-garde personal portfolio website crafted with high-impact aesthetics (#080A09 dark palette with #B6FF3B neon green accents), futuristic typography, and a **genuine live project preview system** that allows visitors to explore and interact with websites and applications directly inside the portfolio without leaving the page.

---

## ⚡ Core Features

- **Cinematic Hero**:
  - Full-screen statement typography: *"I DESIGN DIGITAL EXPERIENCES."*
  - Interactive background vector matrix responding dynamically to cursor physics
  - Real-time latency indicator, scroll indicator, and functional *"Explore My Work"* and *"Let's Talk"* CTAs.

- **Interactive Portfolio & In-Browser Live Preview (Main Priority)**:
  - Responsive browser-like preview modal with realistic address bar, SSL indicator, and window controls.
  - **Live Interactive Embedded Environment**: Genuine interactive applications rendered inside responsive iframes or native sandboxes.
  - **Device Viewport Switcher**: Toggle between Desktop, Tablet, and Mobile preview widths directly inside the modal.
  - **Browser Fullscreen API**: True full-screen inspection mode with Escape / exit button support.
  - **Previous & Next Project Navigation**: Arrow keys (`←` / `→`) and toolbar controls.
  - **Scroll Position Preservation**: Background scroll position is locked and seamlessly restored upon modal exit.
  - **5 Preview Modes Supported**:
    1. `iframe` — Live interactive websites (e.g. internal demos or compatible external sites).
    2. `custom` — Real interactive WebGL/Canvas demos built directly into the portfolio (e.g. KINETIX particle physics sandbox).
    3. `video` — Procedural 60FPS motion reel with audio spectrum visualizer.
    4. `thumbnail` — Fallback mode with "Live preview unavailable" banner and presentation gallery when external security headers block iframes.
    5. `external` — Verified project overview with instant external launch button.

- **4 Real Interactive Local Demos**:
  - `/demos/vanta` — **VANTA**: Brutalist Creative Agency Website with works gallery and studio creed.
  - `/demos/nexora` — **NEXORA**: SaaS Telemetry & Cluster Dashboard with live data streaming and latency charts.
  - `/demos/monolith` — **MONOLITH**: Brutalist Architecture Studio with blueprint mode and tactile materials inspector.
  - `/demos/orbital` — **ORBITAL**: Aerospace Hardware & Satellite OS with dynamic orbital velocity / altitude Keplerian calculator.

- **Dynamic Category Filters**:
  - Instant filtering across: *All Projects*, *Websites*, *Web Apps*, *Dashboards*, *UI/UX*, *Experiments*, and *Motion Design*.

- **Editorial About & Skills**:
  - Heading: *"DESIGN WITH PURPOSE. BUILD WITH PRECISION."*
  - Verified technical stack: HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, GSAP, ScrollTrigger, Framer Motion, Git, GitHub, Vercel.

- **Validated Contact Form**:
  - Heading: *"LET’S BUILD SOMETHING EXTRAORDINARY."*
  - Editable direct email (`contact@neonframe.dev`) with one-click copy toast notification.
  - Live client-side input validation and genuine `mailto:` pre-formatted trigger.

- **Kinetic Micro-Interactions**:
  - Custom trailing glow cursor with hover elasticity.
  - Real-time UTC world clock in the footer.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation & Motion**: [GSAP](https://greensock.com/gsap/), [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)

---

## 🚀 Running Locally

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed:
```bash
node -v
npm -v
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Validating the Production Build

To test the production build locally:

```bash
npm run build
npm run start
```

---

## 📦 Uploading to GitHub

1. Initialize git and stage all files:
   ```bash
   git init
   git add .
   git commit -m "feat: complete NEON//FRAME interactive portfolio"
   ```

2. Link to your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/neon-frame.git
   git push -u origin main
   ```

---

## ☁️ Deploying to Vercel

### Method 1: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

### Method 2: Via Vercel Web Dashboard
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New Project"** and import your GitHub repository `neon-frame`.
3. Keep the default Next.js build settings (`npm run build`, output directory `.next`).
4. Click **Deploy**. Your portfolio will be live on a global Edge CDN within 60 seconds!

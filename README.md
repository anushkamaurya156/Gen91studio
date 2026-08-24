# Gen91Studio — Arvind Maurya Design House Portfolio

A fast, responsive design showcase portfolio for **Gen91Studio**, led by **Arvind Maurya** (Senior 3D & Graphic Designer with 10+ years of experience).

Built with **React 19**, **TanStack Start** (SSR), **TanStack Router**, **Tailwind CSS v4**, and **Framer Motion**, optimized for deployment on **Vercel** via Nitro serverless functions.

---

## Features

- **Interactive Visual Showcase**: Filterable gallery across 19 design disciplines (3D Modeling, Brand Identity, Product Rendering, Packaging, AI Generation, and more) with quick-preview lightbox and full-resolution asset inspection.
- **Dedicated Gallery Routes**: Dynamic category routes (`/work/:category`) with discipline metadata, toolsets, and asset counters.
- **In-Page Resume & PDF Downloads**: Complete curriculum vitae viewer with responsive typography and direct PDF downloads.
- **Dynamic SEO & Sitemap**: Automated dynamic `/sitemap.xml` indexing all category galleries and `/robots.txt`.
- **Fully Responsive**: Optimized for phones (375px+), tablets, and desktop displays with smooth touch navigation.

---

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React 19 + SSR + Nitro)
- **Routing**: [TanStack Router](https://tanstack.com/router) (Type-safe file-based routing)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + [tw-animate-css](https://github.com)
- **Motion & UI**: [Framer Motion](https://motion.dev), [Lucide React](https://lucide.dev), [Sonner](https://sonner.emilkowal.ski)
- **Server Engine**: [Nitro](https://nitro.unjs.io) with Vercel preset

---

## Project Structure

```text
├── public/                     # Static assets served directly
│   ├── Arvind-Maurya-Resume.pdf# Resume PDF document
│   ├── favicon.png             # Browser favicon
│   ├── robots.txt              # Search crawler declaration
│   └── Images/                 # 92 portfolio exhibits organized by category
├── src/
│   ├── assets/                 # Brand logo and bundled vector graphics
│   ├── components/
│   │   ├── site/               # Page sections (Hero, About, Work, Resume, Contact, Nav)
│   │   │   ├── data.ts         # Portfolio data, stats, skills, and resume copy
│   │   │   ├── motion-kit.tsx  # Scroll-reveal and animation wrappers
│   │   │   └── work-manifest-inline.ts # Typed portfolio asset manifest
│   │   └── ui/                 # Reusable UI primitives (Button, Input, Textarea, Sonner)
│   ├── lib/                    # Shared utility functions and error handlers
│   ├── routes/                 # File-based routes (__root, index, work.$category, sitemap)
│   ├── styles/                 # Global styles and Tailwind design tokens
│   ├── router.tsx              # Router initialization
│   ├── server.ts               # SSR entry point
│   └── start.ts                # Client hydration entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started Locally

### Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm, pnpm, or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/anushkamaurya156/Gen91studio.git
cd Gen91studio

# Install dependencies
npm install

# Start local development server (runs on http://127.0.0.1:3000)
npm run dev
```

### Production Build & Linting

```bash
# Run linter
npm run lint

# Format codebase
npm run format

# Create production build
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment (Vercel)

This repository is pre-configured with the Nitro `vercel` preset in `vite.config.ts`.

1. Import the repository in your [Vercel Dashboard](https://vercel.com).
2. Set Framework to **Other** (or Vite).
3. Set Build Command to `npm run build`.
4. Deploy — Vercel handles SSR functions and static assets automatically.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const contentDir = path.join(ROOT, "content");
const categoriesDir = path.join(contentDir, "categories");
const workItemsDir = path.join(contentDir, "work-items");
const siteSectionsDir = path.join(contentDir, "site-sections");

// Clean existing content directories
[categoriesDir, workItemsDir, siteSectionsDir].forEach((dir) => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
});

// Category definitions data
const CATEGORY_DEFINITIONS = [
  {
    name: "3D Modeling",
    slug: "3d-modeling",
    description:
      "High-poly and low-poly 3D models of consumer products, electronics, furniture, interior spaces, and automotive concepts.",
    tools: ["Blender", "3ds Max", "Cinema 4D", "ZBrush"],
    icon: "Boxes",
    sortOrder: 1,
  },
  {
    name: "3D Rendering",
    slug: "3d-rendering",
    description:
      "Photorealistic lighting, material texturing, and commercial studio visualisations for products, architecture, and marketing assets.",
    tools: ["KeyShot", "V-Ray", "Octane", "Blender Cycles"],
    icon: "Sparkles",
    sortOrder: 2,
  },
  {
    name: "AI Image Generation",
    slug: "ai-image-generation",
    description:
      "Art-directed AI prompt engineering, conceptual imagery, hyper-real visuals, and generative commercial assets tailored to brand language.",
    tools: ["Midjourney", "Stable Diffusion", "DALL-E", "Photoshop AI"],
    icon: "Wand2",
    sortOrder: 3,
  },
  {
    name: "Banner Design",
    slug: "banner-design",
    description:
      "High-impact digital web banners, event backdrops, promotional hoardings, and outdoor billboard designs engineered for brand visibility.",
    tools: ["Photoshop", "Illustrator", "CorelDRAW", "Canva Pro"],
    icon: "LayoutTemplate",
    sortOrder: 4,
  },
  {
    name: "Branding Projects",
    slug: "branding-projects",
    description:
      "Turnkey brand refreshes and launches for industrial, healthcare, retail, and corporate enterprises.",
    tools: ["Illustrator", "Photoshop", "Art Direction"],
    icon: "Layers",
    sortOrder: 5,
  },
  {
    name: "Calendar",
    slug: "calendar",
    description:
      "Bespoke corporate wall and desk calendar designs with thematic layouts, typography, and premium print finishes.",
    tools: ["InDesign", "Photoshop", "Illustrator"],
    icon: "CalendarIcon",
    sortOrder: 6,
  },
  {
    name: "Catalogue & Brochure Design",
    slug: "catalogue-brochure-design",
    description:
      "Multi-page technical catalogs, product brochures, specification sheets, and corporate company profiles with editorial hierarchy.",
    tools: ["Adobe InDesign", "CorelDRAW", "Photoshop", "Pre-Press"],
    icon: "BookOpen",
    sortOrder: 7,
  },
  {
    name: "Flyer",
    slug: "flyer",
    description:
      "High-impact single-page promotional flyers, direct mailers, and event handouts designed for immediate engagement.",
    tools: ["Photoshop", "Illustrator", "Print Prep"],
    icon: "FileText",
    sortOrder: 8,
  },
  {
    name: "Graphic Design",
    slug: "graphic-design",
    description:
      "Comprehensive print and digital graphic design solutions for advertising, corporate communications, and marketing campaigns.",
    tools: ["Photoshop", "Illustrator", "CorelDRAW"],
    icon: "Palette",
    sortOrder: 9,
  },
  {
    name: "Illustrations",
    slug: "illustrations",
    description:
      "Custom vector art, character illustrations, vehicle artwork, and editorial imagery crafted with rich detail.",
    tools: ["Illustrator", "Photoshop", "Procreate"],
    icon: "PenTool",
    sortOrder: 10,
  },
  {
    name: "Infographics",
    slug: "infographics",
    description:
      "Clear data visualisations, instructional diagrams, process workflows, and statistical graphics that simplify complex information.",
    tools: ["Illustrator", "After Effects", "Information Design"],
    icon: "BarChart3",
    sortOrder: 11,
  },
  {
    name: "Logo Designs",
    slug: "logo-designs",
    description:
      "Distinctive, memorable brand marks, wordmarks, monograms, and emblem suites crafted for instant recognition.",
    tools: ["Adobe Illustrator", "Type Design", "Vector Geometry"],
    icon: "Hexagon",
    sortOrder: 12,
  },
  {
    name: "Menu Card",
    slug: "menu-card",
    description:
      "Appetizing culinary menu cards, restaurant table tent layouts, and beverage lists with thoughtful typography and durable print specifications.",
    tools: ["InDesign", "Photoshop", "Illustrator"],
    icon: "Utensils",
    sortOrder: 13,
  },
  {
    name: "Packaging Design",
    slug: "packaging-design",
    description:
      "Shelf-ready structural packaging, rigid boxes, product labels, pouches, and dielines engineered for retail impact.",
    tools: ["Illustrator", "3D Mockup", "Dieline Engineering"],
    icon: "Package",
    sortOrder: 14,
  },
  {
    name: "Pattern Design",
    slug: "pattern-design",
    description:
      "Seamless surface patterns, textile prints, floral motifs, and geometric textures for merchandise, wallpapers, and packaging.",
    tools: ["Photoshop", "Illustrator", "Surface Pattern Design"],
    icon: "Grid",
    sortOrder: 15,
  },
  {
    name: "Social Media Design",
    slug: "social-media-design",
    description:
      "Scroll-stopping social media creatives, carousel posts, festive banners, and promotional templates for high engagement.",
    tools: ["Photoshop", "Illustrator", "Figma", "Canva Pro"],
    icon: "Share2",
    sortOrder: 16,
  },
  {
    name: "Tshirt Design",
    slug: "tshirt-design",
    description:
      "Bold apparel graphics, screen-printing artwork, merchandise illustrations, and custom typographic streetwear designs.",
    tools: ["Illustrator", "Photoshop", "Screen Print Separations"],
    icon: "Shirt",
    sortOrder: 17,
  },
  {
    name: "Visiting Card",
    slug: "visiting-card",
    description:
      "Luxury business cards, executive visiting cards with foil stamping, spot UV, embossed textures, and refined typography.",
    tools: ["Illustrator", "InDesign", "Specialty Print Finish"],
    icon: "CreditCard",
    sortOrder: 18,
  },
];

const categoryDetails = Object.fromEntries(
  CATEGORY_DEFINITIONS.map((c) => [c.name, c])
);
const categoryToSlug = Object.fromEntries(
  CATEGORY_DEFINITIONS.map((c) => [c.name, c.slug])
);

console.log("Writing categories...");
CATEGORY_DEFINITIONS.forEach((cat) => {
  const filePath = path.join(categoriesDir, `${cat.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(cat, null, 2), "utf8");
});
console.log(`Saved ${CATEGORY_DEFINITIONS.length} categories.`);

// Read raw manifest
const manifestContent = fs.readFileSync(
  path.join(ROOT, "src/components/site/work-manifest-inline.ts"),
  "utf8"
);
const manifestMatch = manifestContent.match(
  /export const WORK_MANIFEST:.*?=\s*(\[[\s\S]*?\]);/
);
const WORK_MANIFEST = eval(manifestMatch[1]);

console.log(`Found ${WORK_MANIFEST.length} work items in manifest.`);

// Write work items in category subfolders
const exhibitCounters = {};
let totalItemsSaved = 0;

WORK_MANIFEST.forEach((entry) => {
  const categoryName = entry.category;
  const fileName = entry.fileName;
  const slug = categoryToSlug[categoryName] || categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const catDef = categoryDetails[categoryName];

  exhibitCounters[categoryName] = (exhibitCounters[categoryName] || 0) + 1;
  const exhibitNumber = String(exhibitCounters[categoryName]).padStart(2, "0");
  const title = `${categoryName} Exhibit ${exhibitNumber}`;

  // Ensure category subfolder exists
  const catFolder = path.join(workItemsDir, slug);
  if (!fs.existsSync(catFolder)) {
    fs.mkdirSync(catFolder, { recursive: true });
  }

  // Create clean filename based on exhibit title / filename
  const cleanFileName = fileName
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  const itemFileSlug = `exhibit-${exhibitNumber}-${cleanFileName}`.slice(0, 60);

  const filePath = path.join(catFolder, `${itemFileSlug}.json`);
  const workItem = {
    title,
    category: `content/categories/${slug}.json`,
    image: entry.url,
    alt: `${categoryName} project — ${title} by Arvind Maurya`,
    description: catDef?.description || `High-quality ${categoryName.toLowerCase()} creative work.`,
    tech: catDef?.tools || ["Photoshop", "Illustrator"],
    fileName,
  };

  fs.writeFileSync(filePath, JSON.stringify(workItem, null, 2), "utf8");
  totalItemsSaved++;
});

console.log(`Saved ${totalItemsSaved} work items across ${Object.keys(exhibitCounters).length} category folders.`);

// Export site sections with _template
const STATS = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Brands Worked With" },
];

const SKILLS = [
  { name: "Corel Draw", level: 80 },
  { name: "Adobe Photoshop", level: 75 },
  { name: "Adobe Illustrator", level: 55 },
  { name: "Adobe Indesign", level: 40 },
  { name: "Adobe Premiere Pro", level: 55 },
  { name: "Adobe After Effects", level: 50 },
  { name: "Autodesk 3Ds max", level: 70 },
  { name: "Vray (Rendering)", level: 65 },
  { name: "Corona (Rendering)", level: 50 },
];

const EXPERTISE = [
  { name: "Graphic Design", level: 85 },
  { name: "Brand Identity Design", level: 75 },
  { name: "Corporate Branding", level: 83 },
  { name: "Catalogue & Brochure Design", level: 90 },
  { name: "Packaging Design", level: 75 },
  { name: "3D Modeling", level: 80 },
  { name: "Product Rendering", level: 70 },
  { name: "Video Editing", level: 50 },
  { name: "Social Media Design", level: 64 },
  { name: "AI Image Generation", level: 82 },
  { name: "Brand Identity & Visual Strategy", level: 65 },
  { name: "Print Design & Product Catalogues", level: 85 },
  { name: "Packaging & Product Presentation", level: 75 },
  { name: "Product Photography & Retouching", level: 80 },
  { name: "3D Visualisation", level: 85 },
  { name: "Motion Graphics", level: 65 },
];

const EXPERIENCE = [
  {
    company: "Remi Group",
    role: "3D Designer & Graphic Designer",
    duration: "Ongoing",
    achievement:
      "Created 3D renders, product visualization, product catalogues, banners, e-catalogues, and corporate presentation / PPT designs.",
  },
  {
    company: "Adorn India, Vasai East",
    role: "3D Graphic Designer, Video Editor & Social Media Designer",
    duration: "2025 | 6 Months",
    achievement:
      "Created 3D design and visual content for fashion/lifestyle, video editing and promotional social media creatives.",
  },
  {
    company: "Big Imports & Gifts, Bandra",
    role: "3D Graphic Designer & Video Editor",
    duration: "6 Months",
    achievement:
      "Created 3D product visuals, promotional and product showcase videos, and graphic design assets.",
  },
  {
    company: "V. K. Jewels, Marine Lines – East",
    role: "Graphic Designer & Video Editor",
    duration: "1.4 Years",
    achievement:
      "Designed jewellery branding materials, product packshots, promotional graphics, and managed video editing.",
  },
  {
    company: "Geo Lighting, Nalasopara East",
    role: "3D Modelling Designer & Social Media Manager",
    duration: "2 Years",
    achievement:
      "Developed detailed 3D models and photorealistic V-Ray renders for lighting products, plus managed social media content.",
  },
  {
    company: "SPC Machines, Nalasopara East",
    role: "Graphic Designer, Video Editor & 3D Modeller",
    duration: "1.5 Years",
    achievement:
      "Created 3D models, industrial machine product renders, marketing graphics, and company presentation videos.",
  },
  {
    company: "Neway Advertising, Vasai East",
    role: "Graphic Designer",
    duration: "6 Months",
    achievement:
      "Executed advertising and print design projects, banners, hoardings and brand creatives for clients.",
  },
  {
    company: "Oggo Exports, Lower Parel",
    role: "Graphic Designer & Textile Designer",
    duration: "1.11 Years",
    achievement:
      "Created textile print designs, packaging layouts, and export-ready graphic assets for apparel clients.",
  },
  {
    company: "Samarth Graphics, Vasai West",
    role: "3D Modeller & Graphic Designer",
    duration: "1 Year",
    achievement:
      "Delivered 3D modelling, product visualization and graphic design for client projects.",
  },
  {
    company: "Crystal Art, Bhayandar East",
    role: "Graphic Designer",
    duration: "1.2 Years",
    achievement:
      "Created branding, logo designs, and print media graphics for retail and commercial clients.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rahul Shetty",
    title: "Marketing Head, Industrial Group",
    quote:
      "Arvind rebuilt our entire brand language in under three months. The catalog he designed is still our strongest sales tool.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    title: "Founder, Lifestyle Retail",
    quote:
      "The packaging system he delivered lifted our shelf presence instantly. Precise, premium and delivered on time.",
    rating: 5,
  },
  {
    name: "Imran Qureshi",
    title: "Director, Export House",
    quote:
      "His 3D renders let us pitch products that had not been manufactured yet. Clients could not tell they were CG.",
    rating: 5,
  },
  {
    name: "Sneha Kulkarni",
    title: "Brand Manager, Jewellery",
    quote:
      "A rare designer who understands print craft and digital motion equally well. Every deliverable was flawless.",
    rating: 5,
  },
];

const RESUME_DATA = {
  name: "ARVIND MAURYA",
  headline: "SENIOR 3D & GRAPHIC DESIGNER | 10+ YEARS EXPERIENCE",
  contactLine: "Nalasopara West, Palghar – 401203 | +91 8999901362 | gen91studio@gmail.com",
  summary:
    "Creative and detail-oriented Senior 3D & Graphic Designer with 10+ years of experience in graphic design, 3D modelling, product visualization, branding, video editing, product photography, packaging and social media design. Experienced in creating high-quality visual content for advertising agencies, jewellery brands, export houses, lighting and industrial products, fashion/lifestyle businesses and corporate clients. Proficient in Autodesk 3ds Max, V-Ray, Corona Renderer, CorelDRAW, Adobe Photoshop and Adobe Premiere Pro, with experience integrating AI tools into creative workflows.",
  coreCompetencies: [
    "3D Modelling & Rendering",
    "Product Visualization",
    "3D Product Design",
    "Graphic Design",
    "Branding & Visual Identity",
    "Product Packshot Photography",
    "Catalogue & E-Catalogue Design",
    "Packaging Design",
    "Social Media Creative Design",
    "Video Editing",
    "Logo & Banner Design",
    "Print & Digital Design",
    "Textile Design",
    "PPT / Presentation Design",
    "Storyboarding",
    "AI-Assisted Design",
  ],
  experience: [
    {
      role: "3D Graphic Designer, Video Editor & Social Media Designer",
      company: "Adorn India, Vasai East",
      duration: "2025 | 6 Months",
      bullets: [
        "Created 3D design and visual content for the fashion and lifestyle business.",
        "Produced video editing and social media creatives for promotional communication.",
        "Supported ongoing visual communication and product/brand content requirements.",
      ],
    },
    {
      role: "3D Graphic Designer & Video Editor",
      company: "Big Imports & Gifts, Bandra",
      duration: "6 Months",
      bullets: [
        "Created 3D product visuals and graphic design assets for the gifts and imports business.",
        "Developed promotional and product showcase videos.",
        "Supported visual communication requirements across product and marketing content.",
      ],
    },
    {
      role: "Graphic Designer & Video Editor",
      company: "V. K. Jewels, Marine Lines – East",
      duration: "1.4 Years",
      bullets: [
        "Designed jewellery branding materials, product packshots and promotional graphics.",
        "Created visual content for print and digital marketing channels.",
        "Managed video editing for product and brand promotional content.",
      ],
    },
    {
      role: "3D Modelling Designer & Social Media Manager",
      company: "Geo Lighting, Nalasopara East",
      duration: "2 Years",
      bullets: [
        "Developed detailed 3D models and photorealistic renders for lighting products using Autodesk 3ds Max and V-Ray.",
        "Created product visuals for marketing and promotional purposes.",
        "Designed and managed social media content including posts, banners and product creatives.",
      ],
    },
    {
      role: "Graphic Designer, Video Editor & 3D Modeller",
      company: "SPC Machines, Nalasopara East",
      duration: "1.5 Years",
      bullets: [
        "Created 3D models and product renders for industrial machinery and equipment.",
        "Produced marketing graphics and visual communication materials.",
        "Handled video editing for company presentations and promotional content.",
      ],
    },
    {
      role: "Graphic Designer",
      company: "Neway Advertising, Vasai East",
      duration: "6 Months",
      bullets: [
        "Executed advertising and print design projects.",
        "Designed banners, hoardings and brand creatives for clients.",
      ],
    },
    {
      role: "Graphic Designer & Textile Designer",
      company: "Oggo Exports, Lower Parel",
      duration: "1.11 Years",
      bullets: [
        "Created textile print designs and packaging layouts.",
        "Developed export-ready graphic assets for apparel and export clients.",
      ],
    },
    {
      role: "3D Modeller & Graphic Designer",
      company: "Samarth Graphics, Vasai West",
      duration: "1 Year",
      bullets: [
        "Delivered 3D modelling, product visualization and graphic design for client projects.",
        "Created visual assets according to project and client requirements.",
      ],
    },
    {
      role: "Graphic Designer",
      company: "Crystal Art, Bhayandar East",
      duration: "1.2 Years",
      bullets: [
        "Created branding and logo designs.",
        "Designed print media graphics for retail and commercial clients.",
      ],
    },
  ],
  freelanceExperience: [
    {
      role: "3D Designer & Graphic Designer",
      company: "Remi Group",
      duration: "Ongoing",
      bullets: [
        "Created 3D renders and product visualization.",
        "Designed product catalogues, banners and e-catalogues.",
        "Developed presentation / PPT designs for corporate communication.",
      ],
    },
  ],
  technicalSkills: {
    "3D & Rendering": "Autodesk 3ds Max, V-Ray, Corona Renderer",
    "Graphic Design": "CorelDRAW, Adobe Photoshop",
    Video: "Adobe Premiere Pro",
    Additional:
      "Product Photography, Social Media Design, Email & Banner Design, Web Design Basics, AI Tools for Design, Storyboarding, Print Production",
  },
  education: [
    {
      degree: "Bachelor of Commerce (B.Com)",
      institution: "University of Mumbai, Mumbai",
    },
    {
      degree: "AAIP Diploma in Animation & Design",
      institution: "Arena Animation, Borivali",
    },
    {
      degree: "HSC",
      institution: "Viva Junior College of Commerce, Virar",
    },
    {
      degree: "SSC",
      institution: "Our Lady of Salvation High School, Dadar",
    },
  ],
  languages: ["Marathi — Native", "Hindi — Fluent", "English — Working Proficiency"],
};

const CONTACT = {
  email: "gen91studio@gmail.com",
  phone: "+91 89999 01362",
  whatsapp: "https://wa.me/918999901362",
  linkedin:
    "https://www.linkedin.com/in/arvind-maurya-86335240a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  location: "Laxmibahen Chheda Marg, Nalasopara West, Maharashtra, India",
};

const NAV_LINKS = [
  { label: "Studio", href: "/#about", hash: "about" },
  { label: "Expertise", href: "/#skills", hash: "skills" },
  { label: "Work", href: "/#services", hash: "services" },
  { label: "Experience", href: "/#experience", hash: "experience" },
  { label: "Testimonials", href: "/#testimonials", hash: "testimonials" },
  { label: "Resume", href: "/#resume", hash: "resume" },
  { label: "Contact", href: "/#contact", hash: "contact" },
];

console.log("Writing site sections with _template...");
fs.writeFileSync(
  path.join(siteSectionsDir, "hero.json"),
  JSON.stringify(
    {
      _template: "hero",
      eyebrow: "Gen91Studio — Independent Design House",
      headingLine1: "VISUALS THAT",
      headingHighlight: "STAND OUT",
      subtitle:
        "Premium visual identities, content and campaigns for businesses, startups, creators and brands ready to leave a lasting impression.",
      locationText: "Based in Mumbai, Maharashtra, India",
      profileImage: "/Images/profile.jpeg",
      badgeYears: 10,
      badgeYearsText: "Years of",
      badgeCraftText: "Creative Craft",
    },
    null,
    2
  ),
  "utf8"
);

fs.writeFileSync(
  path.join(siteSectionsDir, "about.json"),
  JSON.stringify(
    {
      _template: "about",
      label: "About Gen91studio",
      titleLine1: "A decade turning",
      titleHighlight: "briefs into brands",
      paragraphs: [
        "Gen91Studio is an independent creative design studio led by a designer with over 10 years of experience helping businesses, startups, creators, and brands stand out through premium visual communication.",
        "I create brand identities, corporate branding, brochures, catalogs, packaging, product photography, social media creatives, video content, logo design, 3D models, product mockups, and AI-generated visuals. Every project receives personal attention, from the first idea through to the final delivery.",
        "I believe good design should do more than look attractive. It should build trust, communicate value, and leave a lasting impression. By combining traditional design craft with modern tools such as 3D visualisation, motion, retouching, and AI-assisted imagery, I create visuals that help brands get noticed and remembered.",
      ],
      stats: STATS,
    },
    null,
    2
  ),
  "utf8"
);

fs.writeFileSync(
  path.join(siteSectionsDir, "skills.json"),
  JSON.stringify(
    {
      _template: "skills",
      eyebrow: "Skills & Expertise",
      title: "Craft, technology, and",
      titleHighlight: "ideas in motion",
      subtitle:
        "From brand systems and print design to 3D visuals, motion, and AI-assisted imagery, I create work that makes brands look sharper and communicate better.",
      skills: SKILLS,
      expertise: EXPERTISE,
    },
    null,
    2
  ),
  "utf8"
);

fs.writeFileSync(
  path.join(siteSectionsDir, "experience.json"),
  JSON.stringify(
    {
      _template: "experience",
      eyebrow: "Experience",
      title: "Ten years,",
      titleHighlight: "ten studios",
      subtitle:
        "A path from pre-press apprentice to creative director across industrial, export and retail brands.",
      experience: EXPERIENCE,
    },
    null,
    2
  ),
  "utf8"
);

fs.writeFileSync(
  path.join(siteSectionsDir, "testimonials.json"),
  JSON.stringify(
    {
      _template: "testimonials",
      eyebrow: "Testimonials",
      title: "What clients",
      titleHighlight: "say",
      testimonials: TESTIMONIALS,
    },
    null,
    2
  ),
  "utf8"
);

fs.writeFileSync(
  path.join(siteSectionsDir, "resume.json"),
  JSON.stringify({ _template: "resume", ...RESUME_DATA }, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(siteSectionsDir, "contact.json"),
  JSON.stringify(
    {
      _template: "contact",
      eyebrow: "Contact",
      title: "Let's build something",
      titleHighlight: "memorable",
      subtitle:
        "Tell us what you are building. We will help you find the right visual direction.",
      email: CONTACT.email,
      phone: CONTACT.phone,
      whatsapp: CONTACT.whatsapp,
      linkedin: CONTACT.linkedin,
      location: CONTACT.location,
    },
    null,
    2
  ),
  "utf8"
);

fs.writeFileSync(
  path.join(siteSectionsDir, "navigation.json"),
  JSON.stringify(
    {
      _template: "navigation",
      links: NAV_LINKS,
    },
    null,
    2
  ),
  "utf8"
);

console.log("Migration complete!");

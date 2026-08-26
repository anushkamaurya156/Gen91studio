// Content imports from JSON files managed by TinaCMS
import heroData from "../../../content/site-sections/hero.json";
import aboutData from "../../../content/site-sections/about.json";
import skillsData from "../../../content/site-sections/skills.json";
import experienceData from "../../../content/site-sections/experience.json";
import testimonialsData from "../../../content/site-sections/testimonials.json";
import resumeData from "../../../content/site-sections/resume.json";
import contactData from "../../../content/site-sections/contact.json";
import navigationData from "../../../content/site-sections/navigation.json";

// Import all category JSON files
const categoryModules = import.meta.glob<{
  default: {
    name: string;
    slug: string;
    description: string;
    tools: string[];
    icon: string;
    sortOrder?: number;
  };
}>("../../../content/categories/*.json", { eager: true });

// Import all work item JSON files
const workItemModules = import.meta.glob<{
  default: {
    title: string;
    category: string;
    image: string;
    alt?: string;
    description?: string;
    tech?: string[];
    fileName?: string;
  };
}>("../../../content/work-items/**/*.json", { eager: true });

export type CategoryMeta = {
  name: string;
  slug: string;
  description: string;
  tools: string[];
  icon: string;
  sortOrder?: number;
};

// Parse categories and sort by sortOrder
export const CATEGORY_DEFINITIONS: CategoryMeta[] = Object.values(categoryModules)
  .map((m) => m.default)
  .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));

export const CATEGORIES = ["All", ...CATEGORY_DEFINITIONS.map((c) => c.name)] as const;

export type CategoryName = (typeof CATEGORIES)[number];

export const SERVICE_CATEGORY_NAMES = CATEGORY_DEFINITIONS.map((c) => c.name);

// Fast lookup maps
export const SLUG_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  CATEGORY_DEFINITIONS.map((c) => [c.slug, c.name]),
);

export const CATEGORY_TO_SLUG: Record<string, string> = Object.fromEntries(
  CATEGORY_DEFINITIONS.map((c) => [c.name, c.slug]),
);

export const CATEGORY_DETAILS: Record<string, CategoryMeta> = Object.fromEntries(
  CATEGORY_DEFINITIONS.map((c) => [c.name, c]),
);

export function getCategorySlug(categoryName: string): string {
  if (categoryName === "All") return "all";
  return (
    CATEGORY_TO_SLUG[categoryName] ||
    categoryName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

export function getCategoryNameFromSlug(slug: string): string | undefined {
  if (slug === "all") return "All";
  return SLUG_TO_CATEGORY[slug];
}

export type WorkItem = {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  image: string;
  alt: string;
  description: string;
  tech: string[];
  fileName: string;
};

// Helper to resolve Tina reference (e.g. "content/categories/3d-modeling.json" or "3d-modeling")
function resolveCategoryInfo(categoryRef: string): {
  name: string;
  slug: string;
  meta?: CategoryMeta;
} {
  const clean = (categoryRef || "").replace(/^.*[\\/]/, "").replace(/\.json$/, "");

  // Match by slug first
  if (SLUG_TO_CATEGORY[clean]) {
    const name = SLUG_TO_CATEGORY[clean];
    return { name, slug: clean, meta: CATEGORY_DETAILS[name] };
  }

  // Match by name
  if (CATEGORY_DETAILS[clean]) {
    const meta = CATEGORY_DETAILS[clean];
    return { name: meta.name, slug: meta.slug, meta };
  }

  // Fallback
  return {
    name: clean,
    slug: getCategorySlug(clean),
    meta: undefined,
  };
}

// Build all project items
export const ALL_WORK_ITEMS: WorkItem[] = Object.entries(workItemModules).map(([filePath, mod]) => {
  const data = mod.default;
  const {
    name: categoryName,
    slug: categorySlug,
    meta: catDef,
  } = resolveCategoryInfo(data.category);

  // Extract ID from filename if not specified
  const fileBaseName = filePath.replace(/^.*[\\/]/, "").replace(/\.json$/, "");
  const fileName = data.fileName || `${fileBaseName}.jpg`;

  return {
    id: fileBaseName,
    title: data.title,
    category: categoryName,
    categorySlug,
    image: data.image,
    alt: data.alt || `${categoryName} project — ${data.title} by Arvind Maurya`,
    description:
      data.description ||
      catDef?.description ||
      `High-quality ${categoryName.toLowerCase()} creative work.`,
    tech: data.tech || catDef?.tools || ["Photoshop", "Illustrator"],
    fileName,
  };
});

export function getWorkItemsByCategory(categoryNameOrSlug: string): WorkItem[] {
  if (categoryNameOrSlug === "All" || categoryNameOrSlug === "all") {
    return ALL_WORK_ITEMS;
  }
  const resolvedSlug = SLUG_TO_CATEGORY[categoryNameOrSlug]
    ? categoryNameOrSlug
    : getCategorySlug(categoryNameOrSlug);

  return ALL_WORK_ITEMS.filter((item) => item.categorySlug === resolvedSlug);
}

// Section data exports
export const HERO_DATA = heroData;
export const ABOUT_DATA = aboutData;
export const SKILLS_DATA = skillsData;
export const EXPERIENCE_DATA = experienceData;
export const TESTIMONIALS_DATA = testimonialsData;
export const CONTACT_DATA = contactData;
export const NAVIGATION_DATA = navigationData;

export const NAV_LINKS = navigationData.links;
export const STATS = aboutData.stats;
export const SKILLS = skillsData.skills;
export const EXPERTISE = skillsData.expertise;
export const EXPERIENCE = experienceData.experience;
export const TESTIMONIALS = testimonialsData.testimonials;
export const RESUME_DATA = resumeData;
export const CONTACT = contactData;

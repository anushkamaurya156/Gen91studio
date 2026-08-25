import { useState, useMemo } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Eye,
  FolderOpen,
  Home,
  Sparkles,
  X,
  Layers,
} from "lucide-react";
import {
  CATEGORY_DEFINITIONS,
  CATEGORY_DETAILS,
  SLUG_TO_CATEGORY,
  getWorkItemsByCategory,
  type WorkItem,
} from "@/components/site/data";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Contact";
import { CursorGlow, Reveal, ScrollProgress } from "@/components/site/motion-kit";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/work/$category")({
  component: CategoryDetailPage,
  head: ({ params }) => {
    const categoryName = SLUG_TO_CATEGORY[params.category] || params.category;
    const catMeta = CATEGORY_DETAILS[categoryName];
    const title = `${categoryName} — Portfolio & Case Studies | Gen91 Studio`;
    const description =
      catMeta?.description ||
      `Explore ${categoryName} design projects, visual identity systems and creative work by Arvind Maurya at Gen91 Studio.`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
      ],
    };
  },
});

function CategoryDetailPage() {
  const { category: slug } = Route.useParams();
  const [lightbox, setLightbox] = useState<WorkItem | null>(null);

  const categoryName = SLUG_TO_CATEGORY[slug];
  const catMeta = categoryName ? CATEGORY_DETAILS[categoryName] : null;

  const items = useMemo(() => {
    if (!categoryName) return [];
    return getWorkItemsByCategory(categoryName);
  }, [categoryName]);

  // Find other categories for switcher
  const otherCategories = useMemo(() => {
    return CATEGORY_DEFINITIONS.filter((c) => c.slug !== slug);
  }, [slug]);

  if (!categoryName || !catMeta) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-background">
        <Nav />
        <div className="mx-auto max-w-lg text-center px-4 py-32">
          <h1 className="text-4xl font-display font-extrabold uppercase">Category Not Found</h1>
          <p className="mt-3 text-muted-foreground">
            The category <span className="text-primary font-mono font-bold">"{slug}"</span> does not
            exist.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild variant="hero">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <ScrollProgress />
      <CursorGlow />
      <Nav />

      <main className="relative z-10 pt-28 pb-20 sm:pt-36">
        {/* Breadcrumb Bar */}
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Home size={13} /> Home
            </Link>
            <span>/</span>
            <Link to="/" hash="services" className="hover:text-primary transition-colors">
              Work
            </Link>
            <span>/</span>
            <span className="font-semibold text-foreground uppercase tracking-wider">
              {categoryName}
            </span>
          </nav>
        </div>

        {/* Category Hero Header */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-6 sm:pt-8">
          <div className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-12 border-primary/30">
            <div
              aria-hidden
              className="bg-ember animate-pulse-glow absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-15 blur-[90px]"
            />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                <Sparkles size={13} /> Discipline Spotlight
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-foreground">
                {categoryName}
              </h1>

              <p className="text-sm sm:text-lg leading-relaxed font-light text-muted-foreground">
                {catMeta.description}
              </p>

              {/* Tools and Meta tags */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                  Tools:
                </span>
                {catMeta.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-border bg-secondary/80 px-2.5 py-1 text-xs font-medium text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Stats & Actions */}
              <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary/60 px-4 py-2.5 text-xs font-semibold text-foreground">
                  <Layers size={15} className="text-primary" />
                  <span>{items.length} Creative Assets</span>
                </div>

                <Button asChild variant="quiet" size="sm" className="rounded-full w-full sm:w-auto">
                  <Link to="/" hash="services">
                    <ArrowLeft size={14} /> Back to All Disciplines
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="hero"
                  size="sm"
                  className="rounded-full w-full sm:w-auto font-bold"
                >
                  <Link to="/" hash="contact">
                    Commission {categoryName} Project
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 mt-10 sm:mt-14">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <p className="eyebrow text-xs">Visual Showcase</p>
              <h2 className="font-display text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-foreground">
                {categoryName} Gallery
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {items.length} Exhibit{items.length !== 1 ? "s" : ""}
            </span>
          </div>

          {items.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center border-dashed">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                <FolderOpen size={30} />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold uppercase text-foreground">
                Projects Coming Soon
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Case studies and high-resolution deliverables for {categoryName} are currently being
                curated for this archive.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button asChild variant="hero" size="sm" className="rounded-full">
                  <Link to="/" hash="services">
                    Explore Other Categories
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-3 [&>*]:mb-5">
              {items.map((item, idx) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
                  className="glass-card group break-inside-avoid overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/60"
                >
                  <div className="relative overflow-hidden bg-muted/20">
                    <img
                      src={encodeURI(item.image)}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover grayscale-[0.25] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
                    />
                    <div className="absolute inset-0 bg-background/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 px-4">
                      <button
                        type="button"
                        onClick={() => setLightbox(item)}
                        className="bg-ember inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
                      >
                        <Eye size={14} /> Full Resolution
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="eyebrow text-[0.65rem]">{item.category}</span>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">
                        #{idx + 1}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tech.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border bg-secondary/40 px-2 py-0.5 text-[0.65rem] text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <Button
                        variant="ember"
                        size="sm"
                        className="rounded-full text-xs"
                        onClick={() => setLightbox(item)}
                      >
                        <Eye size={13} /> View
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        {/* Category Switcher Rail */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 mt-20 pt-10 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="eyebrow text-xs">Explore Other Disciplines</p>
              <h2 className="font-display text-xl font-bold uppercase text-foreground">
                All {CATEGORY_DEFINITIONS.length} Design Specialisations
              </h2>
            </div>
            <Link
              to="/"
              hash="services"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              Back to Services <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-3 no-scrollbar touch-pan-x">
            {CATEGORY_DEFINITIONS.map((c) => {
              const isActive = c.slug === slug;
              const count = getWorkItemsByCategory(c.name).length;
              return (
                <Link
                  key={c.slug}
                  to="/work/$category"
                  params={{ category: c.slug }}
                  className={`group shrink-0 rounded-2xl border p-3.5 sm:p-4 transition-all duration-300 min-w-[170px] sm:min-w-[200px] ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-[var(--shadow-glow)]"
                      : "border-border bg-card/60 hover:border-primary/50 hover:-translate-y-1"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground mb-1.5 sm:mb-2">
                    <span className="font-mono">{count} items</span>
                    {isActive && <Sparkles size={12} className="text-primary" />}
                  </div>
                  <h4 className="font-display text-xs sm:text-sm font-bold uppercase text-foreground group-hover:text-primary transition-colors">
                    {c.name}
                  </h4>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-background/95 p-3 sm:p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border-primary/40 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close modal"
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-md transition-transform hover:scale-110 hover:text-primary"
              >
                <X size={18} />
              </button>

              <div className="bg-black/40 flex items-center justify-center p-2 sm:p-6">
                <img
                  src={encodeURI(lightbox.image)}
                  alt={lightbox.alt}
                  decoding="async"
                  className="max-h-[68vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                />
              </div>

              <div className="p-5 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 border-t border-border">
                <div className="space-y-1.5">
                  <span className="eyebrow text-xs">{lightbox.category}</span>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-foreground">
                    {lightbox.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground max-w-2xl">
                    {lightbox.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
                  <Button
                    asChild
                    variant="hero"
                    size="sm"
                    className="rounded-full w-full sm:w-auto"
                  >
                    <a
                      href={lightbox.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={`${lightbox.title}.jpg`}
                    >
                      <Download size={14} /> Download Image
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

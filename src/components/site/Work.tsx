import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Eye, FolderOpen, Sparkles, X } from "lucide-react";
import {
  CATEGORIES,
  CATEGORY_DETAILS,
  getWorkItemsByCategory,
  type CategoryName,
  type WorkItem,
} from "./data";
import { Reveal, SectionHeading } from "./motion-kit";
import { Button } from "@/components/ui/button";

export function Work() {
  const [active, setActive] = useState<CategoryName>("All");
  const [lightbox, setLightbox] = useState<WorkItem | null>(null);

  const filteredItems = useMemo(() => {
    return getWorkItemsByCategory(active);
  }, [active]);

  const activeCategoryMeta = active !== "All" ? CATEGORY_DETAILS[active] : null;

  return (
    <section id="work" className="section-pad relative bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Portfolio & Archives"
          title={
            <>
              Selected <span className="text-ember">Creative Works</span>
            </>
          }
          subtitle="Explore 20 specialised visual disciplines across branding, 3D modeling, packaging, typography, and marketing systems."
        />

        {/* Category Filter Bar */}
        <Reveal className="mt-8 sm:mt-12">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 pt-1 sm:flex-wrap sm:justify-center no-scrollbar touch-pan-x">
            {CATEGORIES.map((cat) => {
              const isSelected = active === cat;
              const itemsCount = getWorkItemsByCategory(cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  aria-pressed={isSelected}
                  className={`group relative shrink-0 rounded-full border px-3.5 py-1.5 sm:px-5 sm:py-2.5 text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isSelected
                      ? "border-transparent bg-ember text-primary-foreground shadow-[var(--shadow-glow)] scale-105"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground bg-card/60"
                  }`}
                >
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    {cat}
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-mono leading-none ${
                        isSelected
                          ? "bg-black/30 text-white"
                          : "bg-secondary text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {itemsCount}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active Category Header Card (when a single category is selected) */}
        {activeCategoryMeta ? (
          <Reveal className="mt-6 sm:mt-8">
            <div className="glass-card rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 border-primary/30">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <Sparkles size={14} /> Category Spotlight
                </div>
                <h3 className="font-display text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-foreground">
                  {activeCategoryMeta.name}
                </h3>
                <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {activeCategoryMeta.description}
                </p>
                <div className="pt-1 sm:pt-2 flex flex-wrap gap-1.5 sm:gap-2">
                  {activeCategoryMeta.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-border bg-secondary/80 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-medium text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                <Button
                  asChild
                  variant="hero"
                  size="lg"
                  className="w-full sm:w-auto rounded-full shadow-md"
                >
                  <Link to="/work/$category" params={{ category: activeCategoryMeta.slug }}>
                    <FolderOpen size={16} /> Open Dedicated Gallery <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        ) : null}

        {/* Empty State for Categories with 0 images */}
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card mt-14 rounded-3xl p-12 text-center"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
              <FolderOpen size={30} />
            </div>
            <h4 className="mt-5 font-display text-2xl font-bold uppercase tracking-tight">
              Projects Under Curation
            </h4>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              New project case studies and creative assets for{" "}
              <span className="font-semibold text-foreground">{active}</span> are currently being
              documented.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                variant="hero"
                size="sm"
                className="rounded-full"
                onClick={() => setActive("All")}
              >
                View All Categories
              </Button>
              <Button asChild variant="quiet" size="sm" className="rounded-full">
                <a href="#contact">Enquire About {active}</a>
              </Button>
            </div>
          </motion.div>
        ) : null}

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <motion.div
            layout
            className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-3 [&>*]:mb-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card group break-inside-avoid overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/60"
                >
                  <div className="relative overflow-hidden bg-muted/20">
                    <img
                      src={encodeURI(item.image)}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover grayscale-[0.35] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
                    />
                    <div className="absolute inset-0 bg-background/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 px-4">
                      <button
                        type="button"
                        onClick={() => setLightbox(item)}
                        className="bg-ember inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
                        aria-label={`Preview ${item.title}`}
                      >
                        <Eye size={14} /> Quick View
                      </button>
                      <Link
                        to="/work/$category"
                        params={{ category: item.categorySlug }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-4 py-2.5 text-xs font-bold text-foreground backdrop-blur-md transition-transform hover:scale-105 hover:border-primary hover:text-primary"
                        aria-label={`View ${item.category} gallery`}
                      >
                        <FolderOpen size={14} /> Gallery
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        to="/work/$category"
                        params={{ category: item.categorySlug }}
                        className="eyebrow text-[0.65rem] hover:underline"
                      >
                        {item.category}
                      </Link>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">
                        Case File
                      </span>
                    </div>

                    <h3 className="mt-2.5 font-display text-lg font-bold tracking-tight text-foreground uppercase group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed font-light text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-secondary/40 px-2.5 py-0.5 text-[0.65rem] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                      <Button
                        variant="ember"
                        size="sm"
                        className="flex-1 rounded-full text-xs font-semibold"
                        onClick={() => setLightbox(item)}
                      >
                        <Eye size={14} /> Preview
                      </Button>
                      <Button
                        asChild
                        variant="quiet"
                        size="sm"
                        className="rounded-full px-3 text-xs"
                      >
                        <Link
                          to="/work/$category"
                          params={{ category: item.categorySlug }}
                          title={`View all ${item.category} designs`}
                        >
                          <ArrowRight size={14} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : null}

        {/* Global Bottom CTA: Browse Category Hub */}
        <Reveal className="mt-16 text-center">
          <div className="glass-card inline-flex flex-col sm:flex-row items-center gap-4 rounded-3xl p-6 sm:px-10">
            <div className="text-center sm:text-left">
              <h4 className="font-display text-base font-bold uppercase text-foreground">
                Looking for a custom design commission?
              </h4>
              <p className="text-xs text-muted-foreground">
                We craft identities, 3D product visuals, packaging, and commercial campaigns.
              </p>
            </div>
            <Button asChild variant="hero" size="lg" className="rounded-full shrink-0">
              <a href="#contact">
                Start a Conversation <ArrowRight size={16} />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>

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
            className="fixed inset-0 z-[70] grid place-items-center bg-background/95 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-3xl border-primary/40 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-md transition-transform hover:scale-110 hover:text-primary"
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
                  <div className="flex items-center gap-2">
                    <Link
                      to="/work/$category"
                      params={{ category: lightbox.categorySlug }}
                      onClick={() => setLightbox(null)}
                      className="eyebrow text-xs hover:underline"
                    >
                      {lightbox.category}
                    </Link>
                  </div>
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
                    <Link
                      to="/work/$category"
                      params={{ category: lightbox.categorySlug }}
                      onClick={() => setLightbox(null)}
                    >
                      <FolderOpen size={14} /> Full {lightbox.category} Gallery
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="quiet"
                    size="sm"
                    className="rounded-full w-full sm:w-auto"
                  >
                    <a
                      href={lightbox.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={`${lightbox.title}.jpg`}
                    >
                      <Download size={14} /> High-Res
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

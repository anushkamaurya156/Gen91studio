import {
  BookOpen,
  Boxes,
  Camera,
  Clapperboard,
  FileText,
  Fingerprint,
  Hexagon,
  Layers,
  MonitorPlay,
  Package,
  Sparkles,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "./data";
import { Reveal, SectionHeading } from "./motion-kit";

const icons: Record<string, LucideIcon> = {
  Fingerprint,
  Hexagon,
  BookOpen,
  FileText,
  Package,
  Boxes,
  Layers,
  Sparkles,
  Clapperboard,
  MonitorPlay,
  Wand2,
  Camera,
};

export function Services() {
  return (
    <section id="services" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              What we create for <span className="text-ember">brands</span>
            </>
          }
          subtitle="Premium visual services delivered end-to-end, from initial idea to final print or pixel."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = icons[service.icon] ?? Sparkles;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.07}>
                <article className="glass-card group relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/60">
                  <div
                    aria-hidden
                    className="bg-ember absolute -top-16 -right-16 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                  />
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon size={20} />
                    </span>
                    <span className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-base font-bold tracking-tight uppercase">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed font-light text-muted-foreground">
                    {service.copy}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

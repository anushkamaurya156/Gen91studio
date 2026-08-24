import { Quote, Star } from "lucide-react";
import { EXPERIENCE, TESTIMONIALS } from "./data";
import { Reveal, SectionHeading } from "./motion-kit";

export function Experience() {
  return (
    <section id="experience" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Ten years, <span className="text-ember">ten studios</span>
            </>
          }
          subtitle="A path from pre-press apprentice to creative director across industrial, export and retail brands."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div
            aria-hidden
            className="bg-ember absolute top-0 bottom-0 left-3 w-px opacity-40 md:left-1/2"
          />
          <ol className="space-y-8">
            {EXPERIENCE.map((job, i) => (
              <li key={job.company} className="relative pl-10 md:pl-0">
                <Reveal delay={0.04}>
                  <div
                    className={`md:grid md:grid-cols-2 md:gap-10 ${i % 2 === 0 ? "" : "md:[direction:rtl]"}`}
                  >
                    <div className="glass-card group rounded-3xl p-6 transition-all duration-500 [direction:ltr] hover:-translate-y-1 hover:border-primary/60">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-display text-[0.68rem] font-bold tracking-[0.2em] text-primary uppercase">
                          {job.duration}
                        </p>
                        <span className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground/40">
                          {String(EXPERIENCE.length - i).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold tracking-tight uppercase">
                        {job.company}
                      </h3>
                      <p className="font-display text-sm font-semibold text-foreground/80">
                        {job.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed font-light text-muted-foreground">
                        {job.achievement}
                      </p>
                    </div>
                    <div aria-hidden className="hidden md:block" />
                  </div>
                  <span
                    aria-hidden
                    className="bg-ember absolute top-7 left-[5px] h-2.5 w-2.5 rounded-full ring-4 ring-background md:left-1/2 md:-translate-x-1/2"
                  />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="section-pad bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              What clients <span className="text-ember">say</span>
            </>
          }
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.08}>
              <figure className="glass-card group relative h-full overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60">
                <div
                  aria-hidden
                  className="bg-ember absolute -top-16 -right-16 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                />
                <Quote className="text-primary" size={22} />
                <blockquote className="mt-4 text-sm leading-relaxed font-light text-muted-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="bg-ember grid h-11 w-11 shrink-0 place-items-center rounded-full font-display font-bold text-primary-foreground">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-semibold">
                      {t.name}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{t.title}</span>
                  </span>
                  <span
                    className="ml-auto flex shrink-0 gap-0.5"
                    aria-label={`${t.rating} out of 5`}
                  >
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} size={13} className="fill-primary text-primary" />
                    ))}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { STATS, SKILLS, EXPERTISE } from "./data";
import { Counter, Reveal, SectionHeading, SectionLabel } from "./motion-kit";

export function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <SectionLabel>About Gen91studio</SectionLabel>
            <h2 className="mt-5 text-4xl leading-[0.92] font-black tracking-tighter uppercase sm:text-5xl md:text-6xl">
              A decade turning <span className="text-ember">briefs into brands</span>
            </h2>
            <div className="mt-7 space-y-4 text-sm leading-relaxed font-light text-muted-foreground sm:text-base">
              <p>
                Gen91Studio is an independent creative design studio led by a designer with over 10
                years of experience helping businesses, startups, creators, and brands stand out
                through premium visual communication.
              </p>
              <p>
                I create brand identities, corporate branding, brochures, catalogs, packaging,
                product photography, social media creatives, video content, logo design, 3D models,
                product mockups, and AI-generated visuals. Every project receives personal
                attention, from the first idea through to the final delivery.
              </p>
              <p>
                I believe good design should do more than look attractive. It should build trust,
                communicate value, and leave a lasting impression. By combining traditional design
                craft with modern tools such as 3D visualisation, motion, retouching, and
                AI-assisted imagery, I create visuals that help brands get noticed and remembered.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 self-center sm:gap-5">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="glass-card group relative h-full overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60">
                  <div
                    aria-hidden
                    className="bg-ember absolute -top-14 -right-14 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                  />
                  <div className="text-ember font-display text-3xl sm:text-5xl font-black tracking-tighter">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 sm:mt-3 text-[0.62rem] sm:text-[0.68rem] font-semibold tracking-[0.16em] sm:tracking-[0.2em] text-muted-foreground uppercase leading-tight">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-pad relative bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills & Expertise"
          title={
            <>
              Craft, technology, and <span className="text-ember">ideas in motion</span>
            </>
          }
          subtitle="From brand systems and print design to 3D visuals, motion, and AI-assisted imagery, I create work that makes brands look sharper and communicate better."
        />

        <div className="mt-12 sm:mt-16 grid gap-10 sm:gap-16 lg:grid-cols-2">
          {/* Software & Tools Skills Column */}
          <div>
            <h3 className="mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3 text-base sm:text-lg font-bold tracking-tight text-foreground uppercase">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Software & Tools
            </h3>
            <div className="grid gap-y-5 sm:gap-y-7">
              {SKILLS.map((skill, i) => (
                <Reveal key={skill.name} delay={i * 0.03}>
                  <div className="group">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-xs sm:text-sm font-bold tracking-wide uppercase">
                        {skill.name}
                      </span>
                      <span className="font-display text-xs font-bold text-primary">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="bg-ember h-full origin-left rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: skill.level / 100 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Design & Discipline Expertise Column */}
          <div>
            <h3 className="mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3 text-base sm:text-lg font-bold tracking-tight text-foreground uppercase">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Expertise & Disciplines
            </h3>
            <div className="grid gap-y-5 sm:gap-y-7">
              {EXPERTISE.map((item, i) => (
                <Reveal key={item.name} delay={i * 0.03}>
                  <div className="group">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-xs sm:text-sm font-bold tracking-wide uppercase">
                        {item.name}
                      </span>
                      <span className="font-display text-xs font-bold text-primary">
                        {item.level}%
                      </span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="bg-ember h-full origin-left rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: item.level / 100 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Download, FileText } from "lucide-react";
import { RESUME_DATA } from "./data";
import { Reveal, SectionHeading } from "./motion-kit";
import { Button } from "@/components/ui/button";

export function Resume() {
  return (
    <section id="resume" className="section-pad relative overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Resume"
          title={
            <>
              Curriculum <span className="text-ember">Vitae</span>
            </>
          }
          subtitle="Preview the full professional resume below, or download a copy in PDF format."
        />

        <Reveal className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <Button
            asChild
            variant="hero"
            size="lg"
            className="rounded-full w-full sm:w-auto font-bold"
          >
            <a
              href="/Arvind-Maurya-Resume.pdf"
              download="Arvind-Maurya-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download /> Download Resume (PDF)
            </a>
          </Button>
          <Button
            asChild
            variant="ember"
            size="lg"
            className="rounded-full w-full sm:w-auto font-bold"
          >
            <a href="/Arvind-Maurya-Resume.pdf" target="_blank" rel="noopener noreferrer">
              <FileText /> View Full PDF
            </a>
          </Button>
        </Reveal>

        <Reveal className="mt-8 sm:mt-12">
          <div className="glass-card mx-auto max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-primary" />
                <span className="font-display text-[0.65rem] sm:text-[0.7rem] font-bold tracking-[0.18em] sm:tracking-[0.2em] text-muted-foreground uppercase truncate max-w-[200px] sm:max-w-none">
                  Arvind-Maurya-Resume.pdf
                </span>
              </div>
              <a
                href="/Arvind-Maurya-Resume.pdf"
                download="Arvind-Maurya-Resume.pdf"
                className="text-xs font-semibold text-primary hover:underline shrink-0"
              >
                Download PDF
              </a>
            </div>

            <div className="max-h-[750px] overflow-auto p-5 sm:p-10 md:p-12 space-y-8 sm:space-y-10">
              {/* Header */}
              <div className="border-b border-border/60 pb-5 sm:pb-6">
                <h3 className="font-display text-2xl sm:text-4xl font-black tracking-tight uppercase text-foreground">
                  {RESUME_DATA.name}
                </h3>
                <p className="mt-1 font-display text-xs sm:text-base font-bold tracking-wide text-primary uppercase">
                  {RESUME_DATA.headline}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground break-words leading-relaxed">
                  {RESUME_DATA.contactLine}
                </p>
              </div>

              {/* Professional Summary */}
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold tracking-[0.22em] sm:tracking-[0.25em] text-primary uppercase">
                  Professional Summary
                </h4>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground font-light">
                  {RESUME_DATA.summary}
                </p>
              </div>

              {/* Core Competencies */}
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold tracking-[0.22em] sm:tracking-[0.25em] text-primary uppercase">
                  Core Competencies
                </h4>
                <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                  {RESUME_DATA.coreCompetencies.map((comp) => (
                    <span
                      key={comp}
                      className="rounded-full border border-border/80 bg-surface/80 px-2.5 py-1 text-[11px] sm:text-xs text-foreground/90"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Professional Experience */}
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold tracking-[0.22em] sm:tracking-[0.25em] text-primary uppercase">
                  Professional Experience
                </h4>
                <div className="mt-4 sm:mt-5 space-y-6 sm:space-y-7">
                  {RESUME_DATA.experience.map((job, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                        <h5 className="font-display text-xs sm:text-base font-bold text-foreground">
                          {job.role} <span className="text-primary font-normal">|</span>{" "}
                          {job.company}
                        </h5>
                        <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground tracking-wide shrink-0">
                          {job.duration}
                        </span>
                      </div>
                      <ul className="space-y-1.5 pl-4 text-xs sm:text-sm text-muted-foreground list-disc">
                        {job.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Client / Freelance Experience */}
              <div>
                <h4 className="text-[11px] sm:text-xs font-bold tracking-[0.22em] sm:tracking-[0.25em] text-primary uppercase">
                  Additional Client / Freelance Experience
                </h4>
                <div className="mt-4 space-y-4">
                  {RESUME_DATA.freelanceExperience.map((job, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                        <h5 className="font-display text-xs sm:text-base font-bold text-foreground">
                          {job.role} <span className="text-primary font-normal">|</span>{" "}
                          {job.company}
                        </h5>
                        <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground tracking-wide shrink-0">
                          {job.duration}
                        </span>
                      </div>
                      <ul className="space-y-1.5 pl-4 text-xs sm:text-sm text-muted-foreground list-disc">
                        {job.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h4 className="text-xs font-bold tracking-[0.25em] text-primary uppercase">
                  Technical Skills
                </h4>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
                  {Object.entries(RESUME_DATA.technicalSkills).map(([cat, val]) => (
                    <div
                      key={cat}
                      className="rounded-2xl border border-border/60 bg-surface/50 p-3.5"
                    >
                      <span className="font-bold text-foreground block uppercase text-xs tracking-wider mb-1">
                        {cat}
                      </span>
                      <span className="text-muted-foreground">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Languages Grid */}
              <div className="grid gap-8 sm:grid-cols-2 pt-2 border-t border-border/60">
                <div>
                  <h4 className="text-xs font-bold tracking-[0.25em] text-primary uppercase">
                    Education
                  </h4>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-muted-foreground">
                    {RESUME_DATA.education.map((edu, idx) => (
                      <li key={idx}>
                        <strong className="text-foreground font-semibold block">
                          {edu.degree}
                        </strong>
                        <span>{edu.institution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold tracking-[0.25em] text-primary uppercase">
                    Languages
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {RESUME_DATA.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full border border-border/80 bg-surface/80 px-3.5 py-1 text-xs text-foreground"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

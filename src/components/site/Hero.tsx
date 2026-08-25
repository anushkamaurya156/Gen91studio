import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "./data";

const PROFILE_URL = "/Images/profile.jpeg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24 w-full max-w-full"
    >
      <div aria-hidden className="grid-noise absolute inset-0 -z-10 opacity-50" />
      <div
        aria-hidden
        className="bg-ember animate-pulse-glow absolute -top-32 left-1/2 -z-10 h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 sm:gap-14 lg:flex-row lg:gap-24">
        {/* Vertical location rail */}
        <div className="absolute inset-y-0 -left-14 hidden flex-col items-center justify-center gap-4 xl:flex">
          <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase opacity-80 [writing-mode:vertical-lr] rotate-180">
            Based in Mumbai, Maharashtra, India
          </span>
          <div className="h-32 w-px bg-primary/30" />
        </div>

        {/* Content column */}
        <div className="z-10 flex-1 space-y-6 sm:space-y-8 text-center lg:text-left min-w-0 w-full">
          <div className="space-y-3 sm:space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="eyebrow text-[0.65rem] sm:text-xs"
            >
              Gen91Studio — Independent Design House
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl lg:text-8xl leading-[0.95] sm:leading-[0.92] font-black tracking-tighter"
            >
              VISUALS THAT
              <br />
              <span className="text-ember">STAND OUT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.15 }}
              className="mx-auto max-w-xl text-sm sm:text-lg lg:text-xl leading-relaxed font-light text-muted-foreground lg:mx-0"
            >
              Premium visual identities, content and campaigns for businesses, startups, creators
              and brands ready to leave a lasting impression.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.35 }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 lg:justify-start w-full sm:w-auto"
          >
            <Button
              asChild
              variant="hero"
              size="lg"
              className="w-full sm:w-auto rounded-full font-bold"
            >
              <Link to="/" hash="services">
                View Our Work <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="ember"
              size="lg"
              className="w-full sm:w-auto rounded-full font-bold"
            >
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle /> WhatsApp Us
              </a>
            </Button>
            <Button
              asChild
              variant="quiet"
              size="lg"
              className="w-full sm:w-auto rounded-full font-bold"
            >
              <Link to="/" hash="contact">
                <Mail /> Start a Project
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Portrait column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-1 items-center justify-center pt-2 sm:pt-4 lg:pt-0 max-w-full"
        >
          <div
            aria-hidden
            className="bg-ember animate-pulse-glow absolute h-56 w-56 sm:h-80 sm:w-80 rounded-full opacity-20 blur-[100px]"
          />

          <div className="group relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
              aria-hidden
              className="absolute -inset-3 sm:-inset-6 rounded-full border border-dashed border-border transition-colors duration-500 group-hover:border-primary/50"
            />
            <div
              aria-hidden
              className="absolute -inset-1.5 sm:-inset-3 rounded-full border border-border"
            />

            <div className="glow-ring relative aspect-square w-48 sm:w-80 lg:w-96 overflow-hidden rounded-full border border-border">
              <img
                src={PROFILE_URL}
                alt="Gen91Studio founder and creative director"
                width={1024}
                height={1024}
                loading="eager"
                decoding="async"
                className="h-full w-full scale-105 object-cover grayscale transition-all duration-700 group-hover:scale-100 group-hover:grayscale-0"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"
              />
            </div>

            <div className="absolute right-0 -bottom-2 sm:-right-4 sm:-bottom-4 lg:-right-8 lg:-bottom-2 z-20 rotate-3 rounded-2xl border border-border bg-background p-1 shadow-lg transition-transform duration-300 hover:rotate-0">
              <div className="flex items-center gap-2 sm:gap-3 rounded-xl bg-secondary px-3 py-2 sm:px-5 sm:py-4">
                <span className="font-display text-xl sm:text-3xl font-extrabold text-primary">
                  10+
                </span>
                <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    Years of
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold tracking-wider text-foreground uppercase">
                    Creative Craft
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

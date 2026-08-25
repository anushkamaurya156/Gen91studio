import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span aria-hidden className="block h-px w-10 bg-primary" />
      <span className="eyebrow">{children}</span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className={centered ? "flex justify-center" : ""}>
        <SectionLabel>{eyebrow}</SectionLabel>
      </div>
      <h2 className="mt-5 text-4xl leading-[0.92] font-black tracking-tighter uppercase sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-5 text-sm leading-relaxed font-light text-muted-foreground sm:text-base ${
            centered ? "mx-auto max-w-xl" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 60;
    const id = setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / total, 3);
      setValue(Math.round(to * progress));
      if (frame >= total) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="bg-ember fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    />
  );
}

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 200, damping: 30 });
  const sy = useSpring(y, { stiffness: 200, damping: 30 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 130);
      y.set(e.clientY - 130);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[260px] w-[260px] rounded-full opacity-40 blur-3xl"
    >
      <div className="bg-ember h-full w-full rounded-full opacity-30" />
    </motion.div>
  );
}

export function Parallax({ children, distance = 60 }: { children: ReactNode; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yPos = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref}>
      <motion.div style={{ y: yPos }}>{children}</motion.div>
    </div>
  );
}

export function Loader() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setDone(true), 2500);
    return () => clearTimeout(t);
  }, []);

  if (!mounted || done) return null;

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.0, ease: "easeInOut" }}
      onAnimationComplete={() => setDone(true)}
      style={{ pointerEvents: "none" }}
      className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center text-center">
        <div className="font-display text-2xl sm:text-3xl font-black tracking-[0.3em] uppercase text-foreground">
          GEN91 STUDIO
        </div>
        <div className="mt-1.5 font-display text-[10px] sm:text-xs font-semibold tracking-[0.45em] uppercase text-muted-foreground">
          DESIGN HOUSE
        </div>
        <div className="mt-5 h-[2px] w-48 sm:w-56 overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="bg-ember h-full w-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.0, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

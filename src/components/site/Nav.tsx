import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "./data";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/alogo.png";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileNavClick = (hash: string) => {
    setOpen(false);
    if (pathname === "/" || pathname === "") {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${hash}`);
        }
      }, 260);
    }
  };

  const handleDesktopNavClick = (hash: string) => {
    if (pathname === "/" || pathname === "") {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card border-x-0 border-t-0 py-2" : "border-transparent py-3"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          to="/"
          hash="about"
          onClick={() => {
            if (open) setOpen(false);
            handleDesktopNavClick("about");
          }}
          aria-label="Gen91 Studio — Arvind Maurya Design House Home"
          className="flex shrink-0 items-center py-2"
        >
          <img
            src={logoAsset}
            alt="Gen91 Studio — Arvind Maurya Design House"
            width={120}
            height={120}
            decoding="async"
            className="h-10 w-auto object-contain sm:h-12 lg:h-13 transition-transform duration-300 hover:scale-105"
          />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const targetHash = link.hash || link.href.replace(/^.*#/, "");
            return (
              <li key={link.label}>
                <Link
                  to="/"
                  hash={targetHash}
                  onClick={() => handleDesktopNavClick(targetHash)}
                  className="relative text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:origin-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center justify-end gap-2">
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
            <Link to="/" hash="contact" onClick={() => handleDesktopNavClick("contact")}>
              Let's Talk
            </Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mx-4 mt-3 rounded-2xl border border-border/80 bg-popover/95 p-3 backdrop-blur-2xl shadow-2xl sm:mx-8">
              <ul className="grid gap-1">
                {NAV_LINKS.map((link) => {
                  const targetHash = link.hash || link.href.replace(/^.*#/, "");
                  return (
                    <li key={link.label}>
                      <Link
                        to="/"
                        hash={targetHash}
                        onClick={() => handleMobileNavClick(targetHash)}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:bg-secondary/80"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3 pt-3 border-t border-border/60">
                <Button asChild variant="hero" size="lg" className="w-full rounded-xl font-bold">
                  <Link to="/" hash="contact" onClick={() => handleMobileNavClick("contact")}>
                    Let's Talk
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

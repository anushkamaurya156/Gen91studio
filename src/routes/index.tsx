import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About, Skills } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Experience, Testimonials } from "@/components/site/Experience";
import { Resume } from "@/components/site/Resume";
import { Contact, Footer } from "@/components/site/Contact";
import { CursorGlow, Loader, ScrollProgress } from "@/components/site/motion-kit";

const title = "Gen91Studio — Premium Visual Design House";
const description =
  "Gen91Studio creates premium visuals for businesses, startups, creators and brands. 10+ years in branding, catalog design, packaging and 3D product visualisation.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Gen91Studio, graphic design studio Mumbai, brand identity design, 3D artist, packaging design, catalog design",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:alt", content: title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Gen91Studio",
          description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            addressCountry: "IN",
          },
          knowsAbout: [
            "Graphic Design",
            "Brand Identity Design",
            "3D Modeling",
            "Packaging Design",
            "Product Rendering",
          ],
        }),
      },
    ],
  }),
});

function Index() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash =
        window.location.hash ||
        (window.location.href.includes("#") ? window.location.href.split("#")[1] : "");
      if (hash) {
        const id = hash.replace(/^#/, "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          const timer = setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }, 250);
          return () => clearTimeout(timer);
        }
      }
    };

    const timer1 = setTimeout(scrollToHash, 60);
    const timer2 = setTimeout(scrollToHash, 300);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden w-full max-w-full">
      <Loader />
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main className="relative z-10 w-full max-w-full">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Experience />
        <Testimonials />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

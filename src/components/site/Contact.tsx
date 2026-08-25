import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { CONTACT, NAV_LINKS } from "./data";
import { Reveal, SectionHeading } from "./motion-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const details = [
  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
  },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat on WhatsApp", href: CONTACT.whatsapp },
  { icon: MapPin, label: "Location", value: CONTACT.location, href: undefined },
];

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = new FormData(form);
    const name = fields.get("name")?.toString() ?? "";
    const email = fields.get("email")?.toString() ?? "";
    const subject = fields.get("subject")?.toString() || "Project enquiry";
    const message = fields.get("message")?.toString() ?? "";
    setSending(true);
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    toast.success("Your email app is opening with your enquiry.");
    setSending(false);
  };

  return (
    <section id="contact" className="section-pad relative bg-surface/40 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let's build something <span className="text-ember">memorable</span>
            </>
          }
          subtitle="Tell us what you are building. We will help you find the right visual direction."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] w-full max-w-full">
          <Reveal className="min-w-0 w-full">
            <div className="grid h-full gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {details.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <div className="glass-card flex items-center gap-4 rounded-2xl p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/60">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.66rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        {label}
                      </span>
                      <span className="block truncate text-sm font-medium">{value}</span>
                    </span>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} target="_blank" rel="noreferrer noopener">
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0 w-full">
            <form onSubmit={onSubmit} className="glass-card rounded-3xl p-6 sm:p-8 w-full min-w-0 max-w-full">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label
                    htmlFor="name"
                    className="text-xs tracking-widest text-muted-foreground uppercase"
                  >
                    Name
                  </label>
                  <Input id="name" name="name" required placeholder="Your name" className="mt-2" />
                </div>
                <div className="min-w-0">
                  <label
                    htmlFor="email"
                    className="text-xs tracking-widest text-muted-foreground uppercase"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="mt-4 min-w-0">
                <label
                  htmlFor="subject"
                  className="text-xs tracking-widest text-muted-foreground uppercase"
                >
                  Subject
                </label>
                <Input id="subject" name="subject" placeholder="Project enquiry" className="mt-2" />
              </div>
              <div className="mt-4 min-w-0">
                <label
                  htmlFor="message"
                  className="text-xs tracking-widest text-muted-foreground uppercase"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your brand and timeline..."
                  className="mt-2"
                />
              </div>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="mt-6 w-full rounded-full"
                disabled={sending}
              >
                <Send /> {sending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Reveal>
        </div>

        <Reveal className="mt-6 w-full min-w-0">
          <div className="glass-card overflow-hidden rounded-3xl w-full max-w-full">
            <iframe
              title="Gen91 Studio location — Laxmibahen Chheda Marg, Nalasopara West, Maharashtra, India"
              src="https://www.google.com/maps?q=Laxmibahen+Chheda+Marg,+Nalasopara+West,+Maharashtra,+India&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full max-w-full grayscale-[0.6] contrast-125 border-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-display text-sm font-semibold">
            © 2026 Gen91Studio. All Rights Reserved.
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to="/"
                  hash={l.hash || l.href.replace(/^.*#/, "")}
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="WhatsApp"
            className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <MessageCircle size={16} />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            aria-label="Email"
            className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Mail size={16} />
          </a>
          <Link
            to="/"
            hash="top"
            aria-label="Back to top"
            className="bg-ember ml-2 grid h-10 w-10 place-items-center rounded-lg text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <ArrowUp size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

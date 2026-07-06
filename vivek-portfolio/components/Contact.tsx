"use client";

import { useState, FormEvent } from "react";
import { Mail, Phone, Calendar } from "lucide-react";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons";
import { site, socials } from "@/lib/config";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/RevealText";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative bg-surface px-6 py-28 md:px-10 md:py-40">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <Reveal>
            <h2 className="mb-6 font-display text-clamp-h2 leading-[0.9] text-ink text-balance">
              Let&apos;s Create Something Extraordinary.
            </h2>
            <p className="mb-10 max-w-md text-sm leading-relaxed text-ink-muted">
              Have a project in mind? Tell me what you&apos;re building — or book a call directly if
              you&apos;d rather talk it through.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mb-10 flex flex-col gap-4 font-mono text-sm text-ink">
              <a data-cursor="hover" href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-accent">
                <Mail className="h-4 w-4" /> {site.email}
              </a>
              <a data-cursor="hover" href={`tel:${site.phone}`} className="flex items-center gap-3 hover:text-accent">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
              <a
                data-cursor="hover"
                href={site.calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-accent"
              >
                <Calendar className="h-4 w-4" /> Schedule a call
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-5">
              <a data-cursor="hover" href={socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon className="h-5 w-5 text-ink-muted transition-colors hover:text-accent" />
              </a>
              <a data-cursor="hover" href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon className="h-5 w-5 text-ink-muted transition-colors hover:text-accent" />
              </a>
              <a data-cursor="hover" href={socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                <YoutubeIcon className="h-5 w-5 text-ink-muted transition-colors hover:text-accent" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-6">
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Field label="Name" name="name" type="text" required />
              <Field label="Email" name="email" type="email" required />
              <div>
                <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-ink-muted">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full border-b border-white/20 bg-transparent py-2 text-ink outline-none transition-colors focus:border-accent"
                />
              </div>

              <MagneticButton type="submit" disabled={status === "sending"} className="mt-2 w-fit">
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send Message"}
              </MagneticButton>

              {status === "error" && (
                <p className="font-mono text-xs text-accent">
                  Something went wrong — email {site.email} directly instead.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-ink-muted">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b border-white/20 bg-transparent py-2 text-ink outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

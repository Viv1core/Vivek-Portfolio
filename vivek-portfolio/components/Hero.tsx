"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { site } from "@/lib/config";
import MagneticButton from "@/components/MagneticButton";

const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE } },
};

function AnimatedLine({ text }: { text: string }) {
  return (
    <span className="block overflow-hidden">
      <motion.span variants={container} initial="hidden" animate="show" className="inline-flex flex-wrap">
        {text.split(" ").map((w, i) => (
          <span key={i} className="mr-[0.28em] overflow-hidden">
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const spotRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const spot = spotRef.current;
    if (!section || !spot) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      spot.style.transform = `translate3d(${e.clientX - rect.left - 250}px, ${
        e.clientY - rect.top - 250
      }px, 0)`;
    };

    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-bg px-6 pb-10 pt-32 md:px-10"
    >
      <div
        ref={spotRef}
        className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full opacity-[0.15] blur-[110px]"
        style={{ background: "radial-gradient(circle, #FF2D2D 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 opacity-70">
        <ParticleField />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 0%, #050505 78%)",
        }}
        aria-hidden="true"
      />

      <div className="flex-1" />

      <div className="relative z-10">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest2 text-ink-muted">
          {site.role.join("  ·  ")}
        </p>
        <h1 className="font-display text-clamp-hero leading-[0.86] tracking-tightest2 text-ink text-balance">
          <AnimatedLine text="Crafting Stories" />
          <span className="text-accent">
            <AnimatedLine text="That Command Attention." />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#work">View Work</MagneticButton>
          <MagneticButton href="#contact" variant="outline">
            Book A Call
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="relative z-10 mt-16 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest2 text-ink-muted"
      >
        <span>Scroll To Explore</span>
        <span className="hidden md:inline">Based In {site.location}</span>
      </motion.div>
    </section>
  );
}

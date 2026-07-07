"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleField from "./ParticleField";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LINES = [
  "CRAFTING STORIES",
  "THAT COMMAND",
  "ATTENTION.",
];

function useTimecode() {
  const [tc, setTc] = useState("00:00:00:00");

  useEffect(() => {
    let frame = 0;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const totalFrames = Math.floor(elapsed * 24);
      const ff = totalFrames % 24;
      const ss = Math.floor(totalFrames / 24) % 60;
      const mm = Math.floor(totalFrames / 24 / 60) % 60;
      const hh = Math.floor(totalFrames / 24 / 60 / 60);
      const pad = (n: number) => n.toString().padStart(2, "0");
      setTc(`${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`);
      frame = requestAnimationFrame(tick) as unknown as number;
      raf = frame;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return tc;
}

export default function Hero() {
  const timecode = useTimecode();
  const sectionRef = useRef<HTMLElement | null>(null);
  const statRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      gsap.to(counter, {
        value: 200,
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (statRef.current) {
            statRef.current.textContent = `${Math.floor(counter.value)}K+`;
          }
        },
      });

      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.8,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: barRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const lineVariants = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: "0%",
      transition: {
        delay: 0.15 + i * 0.1,
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--color-black)] bg-grid"
    >
      <ParticleField density={1.2} />
      <div className="ambient-sweep" />
      <div className="cursor-spotlight" />

      {/* Top HUD bar */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-8 sm:px-12">
        <div className="flex items-center gap-3">
          <span className="rec-dot" />
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-[var(--color-white-dim)]">
            REC <span className="timecode">{timecode}</span>
          </span>
        </div>
        <span className="eyebrow">DELHI, INDIA</span>
      </div>

      {/* Hero content */}
      <div className="hud-frame relative z-10 mx-4 mt-16 flex flex-col justify-center border border-[var(--color-white-faint)] px-6 py-16 sm:mx-10 sm:px-14 sm:py-24">
        <span className="hud-corner hud-corner-tl" />
        <span className="hud-corner hud-corner-tr" />
        <span className="hud-corner hud-corner-bl" />
        <span className="hud-corner hud-corner-br" />

        <p className="eyebrow mb-6">
          Video Editor &middot; Motion Designer &middot; Visual Storyteller
        </p>

        <h1 className="font-display text-[13vw] leading-[0.94] text-[var(--color-white)] sm:text-[6.4vw]">
          {HEADLINE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`block ${
                  i === HEADLINE_LINES.length - 1
                    ? "text-[var(--color-red)]"
                    : ""
                }`}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-[var(--color-white-dim)] sm:text-lg"
        >
          I help creators, brands, and businesses transform raw footage into
          content that captures attention, builds connection, and drives
          results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          
            href="#projects"
            data-cursor="view"
            className="btn-magnetic btn-magnetic-primary"
          >
            View Work
          </a>
          <a href="#contact" data-cursor="hover" className="btn-magnetic">
            Start A Project
          </a>
        </motion.div>
      </div>

      {/* Credibility dashboard */}
      <div className="relative z-10 mx-4 mb-16 mt-10 sm:mx-10">
        <div className="scanline-sweep relative overflow-hidden border border-[var(--color-white-faint)] bg-[var(--color-black-panel)] px-6 py-8 sm:px-10">
          <div className="scanline" />
          <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="rec-dot" />
                <span className="eyebrow">Editing Dashboard // Client Result</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span
                  ref={statRef}
                  className="font-display text-[4rem] leading-none text-[var(--color-white)] sm:text-[5.5rem]"
                >
                  0K+
                </span>
              </div>
              <p className="mt-2 font-mono text-sm tracking-widest text-[var(--color-white-dim)]">
                VIEWS GENERATED
              </p>
              <p className="font-mono text-xs tracking-widest text-[var(--color-white-dim)] opacity-70">
                FOR A SINGLE CLIENT
              </p>
            </div>

            <div className="w-full sm:w-72">
              <div className="mb-2 flex justify-between font-mono text-[0.65rem] tracking-widest text-[var(--color-white-dim)]">
                <span>PERFORMANCE</span>
                <span>MAX</span>
              </div>
              <div className="h-[2px] w-full bg-[var(--color-white-faint)]">
                <div
                  ref={barRef}
                  className="h-full w-full bg-[var(--color-red)]"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

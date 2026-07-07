"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const lineDraw = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[var(--color-black)] px-6 py-28 sm:px-14 sm:py-40"
    >
      <div className="pointer-events-none absolute right-6 top-16 opacity-30 sm:right-16">
        <motion.svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          style={{ rotate }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x="34"
              y="6"
              width="4"
              height="28"
              fill="var(--color-red)"
              transform={`rotate(${i * 60} 36 36)`}
              opacity={0.7}
            />
          ))}
        </motion.svg>
      </div>

      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-6"
        >
          About
        </motion.p>

        <h2 className="font-display text-[10vw] leading-[0.98] sm:text-[3.6rem]">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            GOOD EDITING IS INVISIBLE.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="block text-[var(--color-red)]"
          >
            GREAT EDITING IS UNFORGETTABLE.
          </motion.span>
        </h2>

        <div className="relative my-10 h-px w-full bg-[var(--color-white-faint)]">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[var(--color-red)]"
            style={{ scaleX: lineDraw, transformOrigin: "left" }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-[var(--color-white-dim)] sm:text-lg"
        >
          I don&apos;t just edit footage &mdash; I build the version of the
          story people remember.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-5 text-[var(--color-white-dim)] sm:text-lg"
        >
          Every frame should earn attention. Every cut should serve a
          purpose.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-5 text-[var(--color-white-dim)] sm:text-lg"
        >
          From short-form content to cinematic storytelling, I focus on
          pacing, emotion, retention and visual impact.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-5 text-[var(--color-white-dim)] sm:text-lg"
        >
          My work combines editing, motion design and storytelling into a
          single experience that keeps audiences engaged and clients
          growing.
        </motion.p>
      </div>
    </section>
  );
}

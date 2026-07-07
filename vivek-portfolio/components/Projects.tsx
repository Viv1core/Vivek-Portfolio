"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProjectData {
  title: string;
  category: string;
  tools: string;
  result: string;
}

const PROJECTS: ProjectData[] = [
  {
    title: "Creator Growth Campaign",
    category: "Short-Form Content",
    tools: "Premiere Pro, After Effects",
    result: "Generated 200K+ Views",
  },
  {
    title: "Personal Brand Reels",
    category: "Personal Branding",
    tools: "Premiere Pro, After Effects",
    result: "Improved Retention",
  },
  {
    title: "Motion Graphics Launch Film",
    category: "Motion Graphics",
    tools: "After Effects, Illustrator",
    result: "Elevated Brand Presence",
  },
  {
    title: "Documentary Story Edit",
    category: "Documentary",
    tools: "Premiere Pro, DaVinci Resolve",
    result: "Stronger Narrative Impact",
  },
  {
    title: "Short Form Content System",
    category: "Content Systems",
    tools: "Premiere Pro, CapCut",
    result: "Consistent Publishing Workflow",
  },
];

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    mvX.set(0);
    mvY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      data-cursor="view"
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex aspect-[4/5] cursor-none flex-col justify-between overflow-hidden border border-[var(--color-white-faint)] bg-[var(--color-black-panel)] p-6"
    >
      {/* animated conic border */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 0deg, var(--color-red), transparent 30%, transparent 70%, var(--color-red))",
          animation: hovered ? "spin 3.5s linear infinite" : undefined,
          padding: 1,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* placeholder gradient plate */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#161616] via-[#0d0d0d] to-[#060606] transition-transform duration-700 group-hover:scale-105" />

      <div className="scanline opacity-40" />

      {/* huge index number, background layer */}
      <span className="font-display pointer-events-none absolute bottom-2 left-4 -z-10 text-[22vw] leading-none text-[var(--color-white-faint)] sm:text-[5rem]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* top row: rec dot + category */}
      <div className="relative flex items-center justify-between">
        <span className="rec-dot" />
        <span className="font-mono text-[0.65rem] tracking-widest text-[var(--color-white-dim)]">
          {project.category.toUpperCase()}
        </span>
      </div>

      {/* middle: title */}
      <div className="relative">
        <h3 className="font-display text-[7vw] leading-[0.98] text-[var(--color-white)] sm:text-[1.9rem]">
          {project.title}
        </h3>
      </div>

      {/* bottom: tools + result */}
      <div className="relative flex flex-col gap-2">
        <span className="font-mono text-[0.65rem] tracking-widest text-[var(--color-white-dim)] opacity-70">
          {project.tools}
        </span>
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm tracking-widest text-[var(--color-red)]">
            {project.result}
          </span>
          <span className="translate-y-2 font-mono text-[0.65rem] tracking-widest text-[var(--color-white)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            VIEW &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-[var(--color-black)] px-6 py-28 sm:px-14 sm:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-6">Selected Work</p>
        <h2 className="font-display mb-16 text-[9vw] leading-[0.98] sm:text-[3.2rem]">
          THE EDIT ROOM.
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/config";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    setHovered(false);
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  };

  return (
    <motion.article
      data-cursor="hover"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative grid cursor-none grid-cols-1 gap-6 border-t border-white/10 py-10 md:grid-cols-12 md:gap-8 md:py-14"
    >
      <div className="flex items-start gap-4 font-mono text-xs uppercase tracking-widest2 text-ink-muted md:col-span-2">
        <span className="text-accent">{project.clipCode}</span>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-md bg-surface md:col-span-5">
        {project.video.source === "local" && project.video.localSrc && (
          <video
            ref={videoRef}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={project.video.localSrc}
            poster={project.video.poster}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-bg/10 transition-opacity duration-500 group-hover:opacity-0" />
        <div className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] tracking-widest2 text-ink/80">
          {project.timecode}
        </div>
      </div>

      <div className="md:col-span-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-3xl leading-none text-ink md:text-4xl">{project.title}</h3>
          <ArrowUpRight
            className={`h-6 w-6 shrink-0 text-accent transition-transform duration-500 ${
              hovered ? "translate-x-1 -translate-y-1" : ""
            }`}
          />
        </div>
        <p className="mb-4 max-w-md text-sm leading-relaxed text-ink-muted">{project.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest2 text-ink-muted"
            >
              {tool}
            </span>
          ))}
        </div>
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink/70">{project.results}</p>
      </div>
    </motion.article>
  );
}

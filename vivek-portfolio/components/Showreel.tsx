"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { showreel } from "@/lib/config";
import Reveal from "@/components/RevealText";

export default function Showreel() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggle = () => {
    if (showreel.source === "youtube") {
      setPlaying(true);
      return;
    }
    const el = videoRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
    } else {
      el.play();
    }
    setPlaying(!playing);
  };

  return (
    <section id="showreel" className="relative bg-bg px-6 py-28 md:px-10 md:py-40">
      <Reveal>
        <div className="mb-10 flex items-end justify-between font-mono text-xs uppercase tracking-widest2 text-ink-muted">
          <span>Showreel — 2026</span>
          <span>00:00:00:00 / 00:01:12:00</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          data-cursor="hover"
          onClick={toggle}
          className="group relative aspect-video w-full cursor-none overflow-hidden rounded-md border border-white/10 bg-surface"
        >
          {showreel.source === "local" ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={showreel.localSrc}
              poster={showreel.poster}
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : playing ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${showreel.youtubeId}?autoplay=1&rel=0`}
              title="Showreel"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${showreel.poster})` }}
            />
          )}

          {!(showreel.source === "youtube" && playing) && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-bg/30 transition-opacity duration-500 group-hover:bg-bg/10">
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-bg/60 backdrop-blur-sm md:h-24 md:w-24"
              >
                {playing ? (
                  <Pause className="h-7 w-7 text-ink" />
                ) : (
                  <Play className="ml-1 h-7 w-7 text-ink" />
                )}
              </motion.div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/80 to-transparent" />
        </div>
      </Reveal>
    </section>
  );
}

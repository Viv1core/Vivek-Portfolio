"use client";

import { useEffect, useState } from "react";
import { useScrollProgress } from "@/components/SmoothScroll";
import { progressToTimecode } from "@/lib/utils";

const REEL_LABEL = "REEL_VM_01";

export default function TimecodeHUD() {
  const progress = useScrollProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      className="timecode-hud fixed top-5 left-5 z-50 hidden select-none items-center gap-3 font-mono text-[11px] tracking-widest2 text-ink-muted md:flex"
      aria-hidden="true"
    >
      <span className="flex items-center gap-1.5 text-accent">
        <span className="h-1.5 w-1.5 animate-blink rounded-full bg-accent" />
        REC
      </span>
      <span className="text-ink">{progressToTimecode(progress)}</span>
      <span className="text-ink-muted/60">/</span>
      <span>{REEL_LABEL}</span>
    </div>
  );
}

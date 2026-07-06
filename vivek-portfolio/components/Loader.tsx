"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { site } from "@/lib/config";

export default function Loader() {
  const [percent, setPercent] = useState(0);
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setTimeout(() => setHidden(true), 950);
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 2.1,
      ease: "power2.inOut",
      onUpdate: () => setPercent(Math.floor(counter.value)),
    })
      .to(
        barRef.current,
        { scaleX: 1, duration: 2.1, ease: "power2.inOut" },
        "<"
      )
      .to(nameRef.current, {
        y: "-110%",
        duration: 0.9,
        ease: "power4.inOut",
      })
      .to(
        rootRef.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        "<0.05"
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-bg"
    >
      <div className="overflow-hidden">
        <div ref={nameRef} className="font-display text-[13vw] leading-[0.85] text-ink md:text-[7vw]">
          {site.name.toUpperCase()}
        </div>
      </div>

      <div className="mt-10 flex w-[70vw] max-w-md items-center gap-4 font-mono text-xs text-ink-muted md:w-[26vw]">
        <span className="w-10 tabular-nums text-ink">{String(percent).padStart(3, "0")}%</span>
        <div className="relative h-px flex-1 bg-white/10">
          <div
            ref={barRef}
            className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-accent"
          />
        </div>
        <span className="tracking-widest2">LOADING</span>
      </div>
    </div>
  );
}

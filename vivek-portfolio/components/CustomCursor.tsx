"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A minimal "playhead" cursor — a small square marker with a red dot,
 * echoing a video-editing timeline scrubber. Expands into a ring when
 * hovering interactive elements (anything with [data-cursor="hover"]).
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      root.style.setProperty("--cursor-x", `${curX}px`);
      root.style.setProperty("--cursor-y", `${curY}px`);
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest('[data-cursor="hover"]');
      if (hoverEl && ringRef.current) {
        gsap.to(ringRef.current, {
          scale: 2.4,
          borderColor: "rgba(255,45,45,1)",
          duration: 0.3,
          ease: "power3.out",
        });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest('[data-cursor="hover"]');
      if (hoverEl && ringRef.current) {
        gsap.to(ringRef.current, {
          scale: 1,
          borderColor: "rgba(255,45,45,0.7)",
          duration: 0.3,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor__ring" />
      <div className="custom-cursor__dot" />
    </div>
  );
}

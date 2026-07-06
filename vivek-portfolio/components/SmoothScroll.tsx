"use client";

import { createContext, useContext } from "react";
import { useLenis } from "@/hooks/useLenis";

const ScrollProgressContext = createContext(0);

export function useScrollProgress() {
  return useContext(ScrollProgressContext);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { progress } = useLenis();

  return (
    <ScrollProgressContext.Provider value={progress}>
      {children}
    </ScrollProgressContext.Provider>
  );
}

import { process } from "@/lib/config";
import Reveal from "@/components/RevealText";

export default function Process() {
  return (
    <section id="process" className="relative bg-bg px-6 py-28 md:px-10 md:py-40">
      <Reveal>
        <div className="mb-16 flex items-end justify-between">
          <h2 className="font-display text-clamp-h2 leading-[0.9] text-ink">The Edit Timeline</h2>
          <span className="hidden font-mono text-xs uppercase tracking-widest2 text-ink-muted md:inline">
            One Continuous Cut
          </span>
        </div>
      </Reveal>

      <div className="relative">
        <div className="absolute left-[13px] top-2 hidden h-[calc(100%-1rem)] w-px bg-white/10 md:left-[27px] md:block" />

        {process.map((step, index) => (
          <Reveal key={step.stage} delay={index * 0.05}>
            <div className="group relative grid grid-cols-1 gap-4 border-t border-white/10 py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10">
              <div className="flex items-center gap-4 md:col-span-3">
                <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-bg font-mono text-[10px] text-ink-muted transition-colors duration-500 group-hover:border-accent group-hover:text-accent md:h-14 md:w-14 md:text-xs">
                  {step.stage}
                </span>
                <span className="font-mono text-[11px] tracking-widest2 text-ink-muted">
                  {step.timecode}
                </span>
              </div>
              <h3 className="font-display text-3xl leading-none text-ink md:col-span-3 md:text-4xl">
                {step.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-ink-muted md:col-span-6">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

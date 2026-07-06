import Image from "next/image";
import { skills } from "@/lib/config";
import Reveal from "@/components/RevealText";

export default function About() {
  return (
    <section id="about" className="relative bg-surface px-6 py-28 md:px-10 md:py-40">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-bg">
            <Image
              src="/images/profile.jpg"
              alt="Portrait of Vivek Mishra"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
            <div className="pointer-events-none absolute inset-0 border border-white/10" />
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <Reveal>
            <span className="mb-6 block font-mono text-xs uppercase tracking-widest2 text-accent">
              About
            </span>
            <h2 className="mb-8 font-display text-clamp-h2 leading-[0.92] text-ink text-balance">
              I don&apos;t just edit footage — I build the version of the story that gets remembered.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-xl space-y-5 text-sm leading-relaxed text-ink-muted md:text-base">
              <p>
                I started editing with nothing but a phone and a rough idea of pacing. Every project
                since has been about the same instinct: cut what doesn&apos;t earn its place, and hold
                onto the frame that does.
              </p>
              <p>
                My work sits at the intersection of story structure and motion — treating pacing,
                sound, and typography as one language rather than separate crafts. No templated
                transitions, no filler. Just intentional cuts.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-ink"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { projects } from "@/lib/config";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/RevealText";

export default function Projects() {
  return (
    <section id="work" className="relative bg-bg px-6 py-28 md:px-10 md:py-40">
      <Reveal>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-clamp-h2 leading-[0.9] text-ink">Featured Work</h2>
          <span className="hidden font-mono text-xs uppercase tracking-widest2 text-ink-muted md:inline">
            {projects.length} Selected Clips
          </span>
        </div>
        <p className="max-w-lg text-sm text-ink-muted">
          A handful of projects, chosen for what they prove rather than how many there are.
        </p>
      </Reveal>

      <div className="mt-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

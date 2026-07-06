import { site } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg px-6 py-8 md:px-10">
      <div className="flex flex-col items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest2 text-ink-muted md:flex-row">
        <span>
          © {new Date().getFullYear()} {site.name}. All Rights Reserved.
        </span>
        <a href="#top" data-cursor="hover" className="transition-colors hover:text-ink">
          Back To Top ↑
        </a>
      </div>
    </footer>
  );
}

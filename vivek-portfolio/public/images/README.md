# /public/images

Drop your real image files here using these exact names (or update the paths
in `lib/config.ts` and the components that reference them):

| File                     | Used in               | Recommended size     |
|--------------------------|------------------------|-----------------------|
| `profile.jpg`            | About section          | 1200×1500 (4:5)      |
| `og-cover.jpg`           | Social share preview   | 1200×630              |
| `showreel-poster.jpg`    | Showreel poster frame  | 1920×1080             |
| `project-01.jpg` … `project-05.jpg` | Project card posters | 1600×900   |
| `favicon.ico`            | Browser tab icon       | 32×32 or 48×48        |

Any image referenced by a `src="/images/..."` path is served directly from
this folder — no code changes needed beyond swapping the file.

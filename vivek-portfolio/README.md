# Vivek Mishra — Portfolio

A premium, interactive portfolio built for a video editor / motion designer,
inspired by the interaction quality of sites like Active Theory — without
cloning their design. Built with Next.js 15, TypeScript, Tailwind CSS,
Framer Motion, GSAP, Lenis, Three.js, and React Three Fiber.

**Signature idea:** the whole site is framed as one continuous "edit" —
a persistent timecode readout ticks up as you scroll (top-left, desktop
only), the cursor is a small playhead marker, and section markers use real
SMPTE-style timecodes instead of generic numbering.

---

## 1. Folder structure

```
vivek-portfolio/
├─ app/
│  ├─ api/contact/route.ts     ← contact form endpoint (stub, see §6)
│  ├─ layout.tsx                ← fonts, metadata, global providers
│  ├─ page.tsx                  ← composes all sections
│  ├─ globals.css               ← design tokens, cursor, base styles
│  ├─ sitemap.ts                ← generates /sitemap.xml
│  └─ robots.ts                 ← generates /robots.txt
├─ components/                  ← Navbar, Hero, Showreel, Projects, About,
│                                   Process, Contact, Footer, Loader,
│                                   CustomCursor, TimecodeHUD, ParticleField,
│                                   MagneticButton, RevealText, SmoothScroll
├─ hooks/                       ← useLenis, useMousePosition
├─ lib/
│  ├─ config.ts                 ← ⭐ edit this for all content & asset paths
│  └─ utils.ts
├─ public/
│  ├─ images/                   ← drop photos here (see README inside)
│  └─ videos/                   ← drop MP4s here (see README inside)
├─ package.json
├─ next.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
└─ postcss.config.js
```

---

## 2. Editing content

Almost everything — your name, socials, project list, process steps, and
video sources — lives in **`lib/config.ts`**. Open that file first; you
rarely need to touch component code to update content.

---

## 3. Asset replacement guide

- **Images:** see `public/images/README.md` for exact filenames and sizes
  (profile photo, Open Graph cover, showreel poster, project posters).
- **Videos:** see `public/videos/README.md` for exact filenames.

Both folders are served as-is at `/images/...` and `/videos/...` — replace
a file and refresh, no code changes required.

---

## 4. Adding local MP4 files

1. Export your clips as H.264 MP4, ideally under ~15MB for hover-preview
   clips (they autoplay muted).
2. Drop them into `public/videos/` using the filenames listed in that
   folder's `README.md` (`showreel.mp4`, `project1.mp4` … `project5.mp4`).
3. In `lib/config.ts`, make sure `showreel.source` is `"local"` and each
   project's `video.source` is `"local"`.

## 5. Adding YouTube videos instead

1. Grab the video ID from the URL — the part after `v=`
   (`https://youtube.com/watch?v=XXXXXXXXXXX`).
2. In `lib/config.ts`:
   - For the showreel: set `showreel.source = "youtube"` and paste the ID
     into `showreel.youtubeId`.
   - For a project card: set that project's `video.source = "youtube"` and
     add a `video.youtubeId` field with the ID.
3. Save — the showreel section will lazy-load the YouTube embed on click.

---

## 6. Contact form

`app/api/contact/route.ts` validates and logs submissions but does not yet
send email. To make it functional, sign up for an email API (e.g.
[Resend](https://resend.com)), add your API key as an environment variable,
and call it inside that route handler. Until then, the form will still
show a success state and your `mailto:` / phone / Calendly links work
immediately with no setup.

---

## 7. Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## 8. Build & production commands

```bash
npm run build   # production build
npm start       # serves the build — defaults to port 3000
```

To use a specific port in production:

```bash
PORT=8080 npm start
```

---

## 9. Deploying on Paidboom (or any cPanel / VPS Node.js host)

Paidboom's shared plans use cPanel/Enhance-style panels with a **"Setup
Node.js App"** tool; VPS plans give you full SSH access. Use whichever
matches your plan:

### Option A — cPanel "Setup Node.js App" (shared/business hosting)

1. Zip the project (excluding `node_modules` and `.next`) and upload it via
   File Manager, or push it with Git if your plan supports it.
2. In cPanel, open **Setup Node.js App** → **Create Application**.
3. Set:
   - **Node.js version:** 20.x or later
   - **Application mode:** Production
   - **Application root:** the folder you uploaded to
   - **Application startup file:** leave as default; Next.js is started
     via `npm start`, so set the **Run Script** / startup command to
     `npm start` if the panel allows a custom command, or point it at a
     small `server.js` wrapper if it requires a JS entry file.
4. Click **Run NPM Install** in the same panel (or SSH in and run
   `npm install` manually).
5. Run `npm run build` via the panel's terminal/SSH.
6. Start (or restart) the app from the panel. Map your domain
   (`vivekmishra.online`) to the application in the **Domains** section.

### Option B — Paidboom VPS (SSH + PM2 + Nginx)

```bash
# on the server
git clone <your-repo-url> vivek-portfolio
cd vivek-portfolio
npm install
npm run build

# keep it alive with PM2
npm install -g pm2
pm2 start npm --name "vivek-portfolio" -- start
pm2 save
pm2 startup
```

Then point Nginx at it:

```nginx
server {
  listen 80;
  server_name vivekmishra.online www.vivekmishra.online;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Finish with `certbot --nginx -d vivekmishra.online` for free HTTPS.

> Since Paidboom's shared plans are primarily tuned for PHP/WordPress,
> confirm with their support which of the two options above your specific
> plan supports before you commit — a small VPS plan gives the most
> reliable Next.js hosting experience.

### Any other Node-friendly host (Vercel, Render, Railway, etc.)

These platforms detect Next.js automatically — connect the Git repo, leave
the build command as `next build` and start command as `next start`, and
deploy. No extra configuration needed.

---

## 10. Performance notes

- Fonts load via `next/font/google` (self-hosted at build time, no
  render-blocking requests).
- The Three.js particle field is dynamically imported with `ssr: false` so
  it never blocks first paint.
- Hover-preview videos use `preload="metadata"` and only start playing on
  interaction.
- Respect for `prefers-reduced-motion` is built into `globals.css`.

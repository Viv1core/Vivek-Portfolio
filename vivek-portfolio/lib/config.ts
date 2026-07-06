/**
 * ============================================================================
 * SITE CONFIG — edit this file to update content without touching components.
 * ============================================================================
 */

export const site = {
  name: "Vivek Mishra",
  role: ["Video Editor", "Motion Designer", "Visual Storyteller"],
  tagline: "Crafting Stories That Command Attention.",
  domain: "vivekmishra.online",
  url: "https://vivekmishra.online",
  email: "hello@vivekmishra.online",
  phone: "+91 00000 00000",
  location: "Delhi, India",
  calendlyUrl: "https://calendly.com/vivekmishra/intro-call",
};

export const socials = {
  instagram: "https://instagram.com/viv1core",
  instagramLab: "https://instagram.com/viv1lab",
  linkedin: "https://linkedin.com/in/vivekmishra",
  youtube: "https://youtube.com/@vivekmishra",
};

/**
 * ----------------------------------------------------------------------------
 * SHOWREEL
 * ----------------------------------------------------------------------------
 * Choose ONE source type: "local" or "youtube".
 *
 * LOCAL:   drop your file at /public/videos/showreel.mp4 and keep source:"local"
 * YOUTUBE: set source:"youtube" and paste the video ID (the part after v= )
 */
export const showreel = {
  source: "local" as "local" | "youtube",
  localSrc: "/videos/showreel.mp4",
  poster: "/images/showreel-poster.jpg",
  youtubeId: "dQw4w9WgXcQ", // replace with your real showreel video ID
};

/**
 * ----------------------------------------------------------------------------
 * FEATURED PROJECTS
 * ----------------------------------------------------------------------------
 * Each project supports either a local hover-preview video OR a YouTube ID.
 * Keep this list to 4-5 strong projects — quality over quantity.
 */
export type Project = {
  id: string;
  clipCode: string; // e.g. CLIP_01 — an editing-timeline style label
  timecode: string; // fake SMPTE timecode shown on the card, purely aesthetic
  title: string;
  description: string;
  tools: string[];
  results: string;
  category: string;
  year: string;
  video: {
    source: "local" | "youtube";
    localSrc?: string;
    youtubeId?: string;
    poster: string;
  };
};

export const projects: Project[] = [
  {
    id: "project-01",
    clipCode: "CLIP_01",
    timecode: "00:00:14:02",
    title: "Midnight Runners",
    description:
      "A high-octane brand film for a streetwear drop, cut to the pulse of the soundtrack — every hard cut lands on the beat.",
    tools: ["Premiere Pro", "After Effects", "Sound Design"],
    results: "2.4M views · 38% CTR lift for the client's launch campaign",
    category: "Brand Film",
    year: "2026",
    video: {
      source: "local",
      localSrc: "/videos/project1.mp4",
      poster: "/images/project-01.jpg",
    },
  },
  {
    id: "project-02",
    clipCode: "CLIP_02",
    timecode: "00:00:22:18",
    title: "The Founder's Cut",
    description:
      "A documentary-style founder story built around long-form interviews, restructured into a tight, emotional three-act edit.",
    tools: ["Premiere Pro", "Color Grading", "Story Structure"],
    results: "Used as the anchor asset for a $2M seed round deck",
    category: "Documentary",
    year: "2025",
    video: {
      source: "local",
      localSrc: "/videos/project2.mp4",
      poster: "/images/project-02.jpg",
    },
  },
  {
    id: "project-03",
    clipCode: "CLIP_03",
    timecode: "00:00:09:11",
    title: "Neon Circuit",
    description:
      "Kinetic typography and motion graphics for a tech product launch — built entirely from vector shape layers for a crisp, futuristic finish.",
    tools: ["After Effects", "Motion Graphics", "Illustrator"],
    results: "Featured on the client's homepage for 6 months",
    category: "Motion Graphics",
    year: "2025",
    video: {
      source: "local",
      localSrc: "/videos/project3.mp4",
      poster: "/images/project-03.jpg",
    },
  },
  {
    id: "project-04",
    clipCode: "CLIP_04",
    timecode: "00:00:31:07",
    title: "Field Notes",
    description:
      "A travel mini-series edited for pattern-break pacing — no templated transitions, just raw footage cut with intention.",
    tools: ["Premiere Pro", "Sound Design", "Color Grading"],
    results: "Grew the client's channel by 61K subscribers over the series",
    category: "Series",
    year: "2024",
    video: {
      source: "local",
      localSrc: "/videos/project4.mp4",
      poster: "/images/project-04.jpg",
    },
  },
  {
    id: "project-05",
    clipCode: "CLIP_05",
    timecode: "00:00:17:24",
    title: "Glasswing",
    description:
      "An abstract visual piece exploring light and glass through macro footage, graded for a cold, premium palette.",
    tools: ["After Effects", "Color Grading", "Motion Design"],
    results: "Selected for a regional design-and-motion showcase",
    category: "Experimental",
    year: "2024",
    video: {
      source: "local",
      localSrc: "/videos/project5.mp4",
      poster: "/images/project-05.jpg",
    },
  },
];

/**
 * ----------------------------------------------------------------------------
 * CREATIVE PROCESS — order carries real meaning here (it's a workflow).
 * ----------------------------------------------------------------------------
 */
export const process = [
  {
    stage: "01",
    timecode: "00:00:00:00",
    title: "Research",
    description:
      "Understanding the brief, the audience, and the reference points before a single clip is touched.",
  },
  {
    stage: "02",
    timecode: "00:04:12:00",
    title: "Story Structure",
    description:
      "Building the skeleton — a rough assembly that proves the story works before it's made beautiful.",
  },
  {
    stage: "03",
    timecode: "00:11:30:00",
    title: "Editing",
    description:
      "Fine cuts, pacing, and rhythm. Every trim earns its place against the music and the message.",
  },
  {
    stage: "04",
    timecode: "00:18:47:00",
    title: "Motion Design",
    description:
      "Typography, graphics, and transitions layered in — built to support the story, never to distract from it.",
  },
  {
    stage: "05",
    timecode: "00:24:09:00",
    title: "Sound Design",
    description:
      "Mixing, sound effects, and music sync — the layer most people feel and few people notice.",
  },
  {
    stage: "06",
    timecode: "00:29:58:00",
    title: "Delivery",
    description:
      "Exported, graded, and formatted for every platform it needs to live on. Final cut, locked.",
  },
];

export const skills = [
  "Premiere Pro",
  "After Effects",
  "Motion Graphics",
  "Storytelling",
  "Sound Design",
  "Color Grading",
];

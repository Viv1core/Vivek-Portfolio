import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a 0-1 progress value into a fake SMPTE-style timecode HH:MM:SS:FF */
export function progressToTimecode(progress: number, fps = 24): string {
  const clamped = Math.max(0, Math.min(1, progress));
  const totalFrames = Math.floor(clamped * (60 * 60 * fps)); // map to a 1hr "master" duration
  const frames = totalFrames % fps;
  const totalSeconds = Math.floor(totalFrames / fps);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

import { cn } from "@/lib/utils";

type WaveDividerProps = { className?: string; flip?: boolean };

/** Wavy edge; its colour comes from the text colour (fill-current). */
export function WaveDivider({ className, flip = false }: WaveDividerProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={cn("block h-10 w-full fill-current md:h-16", flip && "rotate-180", className)}
    >
      <path d="M0,44 C90,10 180,10 270,44 C360,78 450,78 540,44 C630,10 720,10 810,44 C900,78 990,78 1080,44 C1170,10 1260,10 1350,44 C1395,61 1420,66 1440,62 L1440,80 L0,80 Z" />
    </svg>
  );
}

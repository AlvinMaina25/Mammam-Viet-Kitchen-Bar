import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <p
        className={cn(
          "flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em] text-brand-purple",
          centered && "justify-center",
        )}
      >
        <span aria-hidden="true" className="h-1 w-8 bg-brand-purple" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.9] text-primary sm:text-6xl lg:text-7xl"
      >
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-foreground">{intro}</p>}
    </div>
  );
}

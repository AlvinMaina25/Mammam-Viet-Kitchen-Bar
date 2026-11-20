import { Instagram } from "lucide-react";

import { WaveDivider } from "@/components/site/WaveDivider";
import { Button } from "@/components/ui/button";
import { instagramImages, instagramUrl } from "@/data/site";
import { cn } from "@/lib/utils";

const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1", "rotate-1"];

export function InstagramSection() {
  return (
    <section
      id="instagram"
      aria-labelledby="instagram-title"
      className="relative scroll-mt-24 overflow-hidden bg-brand-red text-brand-black"
    >
      <WaveDivider flip className="text-background" />
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 lg:px-16 lg:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em]">
              <span aria-hidden="true" className="h-1 w-8 bg-brand-black" />
              @mammam.ke
            </p>
            <h2
              id="instagram-title"
              className="headline-pop mt-4 font-display text-5xl font-extrabold uppercase leading-[0.9] text-brand-yellow sm:text-6xl lg:text-7xl"
            >
              Good food looks good on you.
            </h2>
          </div>
          <Button asChild variant="sun" size="chunky" className="self-start lg:self-auto">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Instagram aria-hidden="true" /> Follow on Instagram
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {instagramImages.map((image, i) => (
            <li
              key={image.src}
              className={cn(
                "overflow-hidden rounded-lg border-4 border-brand-cream bg-brand-cream shadow-sticker transition-transform motion-reduce:transition-none md:hover:rotate-0",
                tilts[i],
              )}
            >
              <img src={image.src} alt={image.alt} loading="lazy" className="aspect-square w-full object-cover" />
            </li>
          ))}
        </ul>
      </div>
      <WaveDivider className="text-background" />
    </section>
  );
}

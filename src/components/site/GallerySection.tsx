import { useRef, useState } from "react";
import { Expand } from "lucide-react";

import { Lightbox } from "@/components/site/Lightbox";
import { SectionHeading } from "@/components/site/SectionHeading";
import { galleryImages } from "@/data/site";
import { cn } from "@/lib/utils";

/** Editorial tile sizes, matched by position to galleryImages (12-column grid on desktop). */
const tileLayouts = [
  "col-span-2 row-span-2 lg:col-span-7 lg:row-span-5",
  "lg:col-span-5 lg:row-span-3 lg:-rotate-1",
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-3 lg:row-span-2 lg:rotate-1",
  "row-span-2 lg:col-span-4 lg:row-span-4",
  "lg:col-span-5 lg:row-span-4",
  "col-span-2 lg:col-span-3 lg:row-span-4",
];

export function GallerySection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const tileRefs = useRef<Array<HTMLButtonElement | null>>([]);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-16 lg:py-28">
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title="The Mammam experience"
          intro="Lanterns, loud colours, full tables. Tap any photo to take a closer look."
        />

        <ul className="mt-14 grid auto-rows-[150px] grid-cols-2 gap-4 sm:auto-rows-[200px] lg:auto-rows-[88px] lg:grid-cols-12 lg:gap-5">
          {galleryImages.map((image, i) => (
            <li key={image.src} className={cn("min-h-0", tileLayouts[i])}>
              <button
                ref={(el) => {
                  tileRefs.current[i] = el;
                }}
                type="button"
                aria-haspopup="dialog"
                aria-label={`Open photo: ${image.alt}`}
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                className="group relative block h-full w-full overflow-hidden rounded-lg border-2 border-brand-black shadow-sticker focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-black bg-brand-yellow text-brand-black opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Expand className="size-4" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        images={galleryImages}
        index={index}
        open={open}
        onOpenChange={setOpen}
        onIndexChange={setIndex}
        onReturnFocus={(i) => tileRefs.current[i]?.focus()}
      />
    </section>
  );
}

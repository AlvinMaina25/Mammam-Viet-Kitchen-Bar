import type { KeyboardEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { SiteImage } from "@/data/site";

type LightboxProps = {
  images: SiteImage[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
  /** Called after closing so focus can go back to the matching thumbnail. */
  onReturnFocus: (index: number) => void;
};

const navButton =
  "flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-black bg-brand-yellow text-brand-black shadow-sticker transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-cream motion-reduce:transition-none";

export function Lightbox({
  images,
  index,
  open,
  onOpenChange,
  onIndexChange,
  onReturnFocus,
}: LightboxProps) {
  const count = images.length;
  const image = images[index];
  const go = (step: number) => onIndexChange((index + step + count) % count);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-brand-black/90 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          onKeyDown={handleKeyDown}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            onReturnFocus(index);
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 focus:outline-none md:p-10"
        >
          <DialogPrimitive.Title className="sr-only">
            Mammam gallery, photo {index + 1} of {count}
          </DialogPrimitive.Title>

          <DialogPrimitive.Close aria-label="Close gallery" className={`${navButton} absolute right-4 top-4 md:right-8 md:top-8`}>
            <X aria-hidden="true" className="size-5" />
          </DialogPrimitive.Close>

          {image && (
            <figure className="flex max-h-full min-h-0 flex-col items-center">
              <img
                src={image.src}
                alt={image.alt}
                className="max-h-[72vh] w-auto max-w-full rounded-md border-4 border-brand-cream object-contain"
              />
              <figcaption className="mt-4 max-w-xl text-center text-base text-brand-cream">
                {image.alt}
                <span className="ml-2 font-bold text-brand-yellow">
                  {index + 1} / {count}
                </span>
              </figcaption>
            </figure>
          )}

          <div className="flex items-center gap-4">
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={navButton}>
              <ChevronLeft aria-hidden="true" className="size-6" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={navButton}>
              <ChevronRight aria-hidden="true" className="size-6" />
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { bookingHref, drinks, drinksFeatureImage } from "@/data/site";

export function DrinksSection() {
  return (
    <section id="drinks" aria-labelledby="drinks-title" className="scroll-mt-24 bg-background">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden border-y-2 border-brand-black lg:grid-cols-2">
        <div className="relative flex items-center justify-center bg-brand-purple px-6 py-16 md:px-12 lg:py-24">
          <figure className="w-full max-w-sm -rotate-3 border-[10px] border-brand-cream bg-brand-cream shadow-sticker-lg">
            <img
              src={drinksFeatureImage.src}
              alt={drinksFeatureImage.alt}
              loading="lazy"
              width={464}
              height={427}
              className="aspect-square w-full object-cover"
            />
          </figure>
          <div
            aria-hidden="true"
            className="absolute right-6 top-8 flex h-28 w-28 rotate-12 items-center justify-center rounded-full border-2 border-brand-black bg-brand-yellow text-center font-display text-xl font-extrabold uppercase leading-none text-brand-black shadow-sticker md:right-12"
          >
            Shaken
            <br />
            not sorry
          </div>
        </div>

        <div className="px-6 py-16 md:px-12 lg:px-16 lg:py-24">
          <SectionHeading
            id="drinks-title"
            eyebrow="Drinks"
            title="Lychee martini me, immediately."
            intro="Our bar shakes up tropical cocktails with a Vietnamese twist. Pull up a stool."
          />
          <ul className="mt-10 divide-y-2 divide-dashed divide-border border-y-2 border-dashed border-border">
            {drinks.map((drink) => (
              <li key={drink.name} className="py-4">
                <p className="font-display text-2xl font-extrabold uppercase leading-none text-foreground">
                  {drink.name}
                </p>
                <p className="mt-1 text-base text-foreground">{drink.notes}</p>
              </li>
            ))}
          </ul>
          <Button asChild variant="brand" size="chunky" className="mt-10">
            <a href={bookingHref}>
              Book a Table <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

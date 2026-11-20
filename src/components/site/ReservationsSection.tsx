import { Phone } from "lucide-react";

import { ReservationForm } from "@/components/site/ReservationForm";
import { SectionHeading } from "@/components/site/SectionHeading";
import { images, locations } from "@/data/site";

export function ReservationsSection() {
  return (
    <section id="book-a-table" aria-labelledby="book-title" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-16 lg:py-28">
        <div className="grid overflow-hidden rounded-lg border-2 border-brand-black shadow-sticker-lg lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative flex flex-col justify-between gap-10 bg-brand-purple p-8 text-brand-cream md:p-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-brand-yellow">Reservations</p>
              <p className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
                Groups, dates, catch-ups. We'll keep the chopsticks ready.
              </p>
              <ul className="mt-8 space-y-3 text-base">
                {locations.map((loc) => (
                  <li key={loc.name}>
                    <a
                      href={loc.phoneHref}
                      className="inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
                    >
                      <Phone aria-hidden="true" className="size-4" /> {loc.name}: {loc.phoneDisplay}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="mx-auto w-full max-w-xs rotate-2 border-8 border-brand-cream bg-brand-cream shadow-sticker-lg">
              <img
                src={images.dining.src}
                alt={images.dining.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
          </div>

          <div className="bg-background p-8 md:p-12">
            <SectionHeading id="book-title" eyebrow="Book a table" title="Save me a seat." />
            <div className="mt-10">
              <ReservationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

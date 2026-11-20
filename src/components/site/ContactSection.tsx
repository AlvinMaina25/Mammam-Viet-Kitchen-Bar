import { ArrowUpRight, Instagram, Navigation, Phone } from "lucide-react";

import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { bookingHref, instagramUrl, locations } from "@/data/site";

const linkClass =
  "inline-flex items-center gap-2 font-semibold text-brand-purple underline-offset-4 hover:underline";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-16 lg:py-28">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Say hello."
          intro="Questions, group plans or just craving bún chả? Give your nearest Mammam a call."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {locations.map((loc) => (
            <div key={loc.name} className="rounded-lg border-2 border-brand-black bg-card p-6 shadow-sticker">
              <h3 className="font-display text-3xl font-extrabold uppercase leading-none text-foreground">
                {loc.name}
              </h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{loc.address}</p>
              <div className="mt-5 flex flex-col gap-3">
                <a href={loc.phoneHref} className={linkClass}>
                  <Phone aria-hidden="true" className="size-4" /> {loc.phoneDisplay}
                </a>
                <a href={loc.directionsHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Navigation aria-hidden="true" className="size-4" /> Get directions
                  <span className="sr-only"> to Mammam {loc.name} (opens Google Maps)</span>
                </a>
              </div>
            </div>
          ))}
          <div className="flex flex-col justify-between rounded-lg border-2 border-brand-black bg-brand-yellow p-6 shadow-sticker">
            <div>
              <h3 className="font-display text-3xl font-extrabold uppercase leading-none text-brand-black">
                Social
              </h3>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-black underline-offset-4 hover:underline">
                <Instagram aria-hidden="true" className="size-4" /> @mammam.ke
                <span className="sr-only"> on Instagram (opens in a new tab)</span>
              </a>
            </div>
            <Button asChild variant="brand" size="chunky" className="mt-6 self-start">
              <a href={bookingHref}>
                Book a Table <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

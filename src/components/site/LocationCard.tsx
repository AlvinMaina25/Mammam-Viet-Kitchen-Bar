import { ArrowUpRight, MapPin, Navigation, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { bookingHref, type Location } from "@/data/site";

type LocationCardProps = { location: Location };

export function LocationCard({ location }: LocationCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-brand-black bg-card shadow-sticker">
      <img
        src={location.image.src}
        alt={location.image.alt}
        loading="lazy"
        className="aspect-[16/10] w-full border-b-2 border-brand-black object-cover"
      />
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-foreground">
          <MapPin aria-hidden="true" className="size-4" /> {location.address}
        </p>
        <h3 className="mt-2 font-display text-5xl font-extrabold uppercase leading-none text-primary">
          {location.name}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-foreground">{location.blurb}</p>

        <div className="mt-6 flex flex-col gap-3 text-base font-semibold">
          <a
            href={location.phoneHref}
            className="inline-flex items-center gap-2 text-brand-purple underline-offset-4 hover:underline"
          >
            <Phone aria-hidden="true" className="size-4" /> {location.phoneDisplay}
          </a>
          <a
            href={location.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-purple underline-offset-4 hover:underline"
          >
            <Navigation aria-hidden="true" className="size-4" /> Get directions
            <span className="sr-only"> to Mammam {location.name} (opens Google Maps)</span>
          </a>
        </div>

        <div className="mt-auto pt-8">
          <Button asChild variant="brand" size="chunky">
            <a href={bookingHref}>
              Book a Table <ArrowUpRight aria-hidden="true" />
              <span className="sr-only"> at {location.name}</span>
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

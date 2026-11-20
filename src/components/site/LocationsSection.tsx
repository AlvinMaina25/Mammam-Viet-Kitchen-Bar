import { LocationCard } from "@/components/site/LocationCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { locations } from "@/data/site";

export function LocationsSection() {
  return (
    <section id="locations" aria-labelledby="locations-title" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-16 lg:py-28">
        <SectionHeading
          id="locations-title"
          eyebrow="Locations"
          title="Two spots. One big appetite."
          intro="Same flavours, two very different vibes. Pick your Mammam."
          align="center"
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
          {locations.map((location) => (
            <LocationCard key={location.name} location={location} />
          ))}
        </div>
      </div>
    </section>
  );
}

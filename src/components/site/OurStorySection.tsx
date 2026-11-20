import { SectionHeading } from "@/components/site/SectionHeading";
import { images, storyPoints } from "@/data/site";

export function OurStorySection() {
  return (
    <section id="our-story" aria-labelledby="story-title" className="scroll-mt-24 bg-background">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-6 py-20 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-16 lg:py-28">
        <div className="relative mx-auto w-full max-w-sm">
          <figure className="-rotate-2 border-[10px] border-brand-cream bg-brand-cream shadow-sticker-lg">
            <img
              src={images.banhMi.src}
              alt={images.banhMi.alt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
          <span
            aria-hidden="true"
            className="absolute -right-4 -top-6 rotate-6 rounded-sm border-2 border-brand-black bg-brand-yellow px-4 py-2 font-display text-xl font-extrabold uppercase text-brand-black shadow-sticker"
          >
            Street food at heart
          </span>
        </div>

        <div>
          <SectionHeading
            id="story-title"
            eyebrow="Our story"
            title="Big flavours from Vietnam's streets."
            intro="Mammam is all about the food you'd queue for on a Vietnamese street corner: smoky grills, fragrant broths, crunchy bánh mì and fresh herbs on everything. We serve it loud, bright and made for sharing, in Westlands and Karen."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {storyPoints.map((point) => (
              <li key={point.title} className="rounded-lg border-2 border-brand-black bg-card p-5 shadow-sticker">
                <h3 className="font-display text-2xl font-extrabold uppercase leading-none text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-base text-foreground">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

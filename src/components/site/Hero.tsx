import { ArrowRight, MapPin } from "lucide-react";

import interiorImage from "@/assets/interior.jpg";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/site/WaveDivider";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-brand-red text-brand-black"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-6 pb-28 pt-14 md:px-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-16 lg:pb-36 lg:pt-20">
        <div>
          <p className="fade-up flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em]">
            <span aria-hidden="true" className="h-1 w-10 bg-brand-black" />
            Vietnamese street food
          </p>
          <h1
            id="hero-title"
            className="fade-up fade-delay-1 headline-pop mt-6 font-display text-6xl font-extrabold uppercase leading-[0.86] text-brand-yellow sm:text-8xl lg:text-[112px]"
          >
            <span className="block">Come hungry.</span>
            <span className="mt-2 block">Leave happy.</span>
          </h1>
          <p className="fade-up fade-delay-2 mt-8 max-w-xl text-lg font-medium leading-relaxed sm:text-xl">
            Vietnamese street food, bold flavours and good times. Find us in Westlands and Karen.
          </p>
          <div className="fade-up fade-delay-3 mt-9 flex flex-wrap gap-4">
            <Button asChild variant="sun" size="chunky">
              <a href="#menu">
                Explore the Menu <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="ink" size="chunky">
              <a href="#locations">
                Find Your Mammam <MapPin aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <figure className="rotate-3 border-[10px] border-brand-cream bg-brand-cream shadow-sticker-lg">
            <img
              src={interiorImage}
              alt="Lanterns, green windows and red stools inside Mammam"
              width={463}
              height={572}
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
          <div
            aria-hidden="true"
            className="absolute -bottom-8 -left-2 flex h-32 w-32 -rotate-12 flex-col items-center justify-center rounded-full border-2 border-brand-black bg-brand-yellow text-center font-display uppercase leading-none shadow-sticker sm:-left-10 sm:h-36 sm:w-36"
          >
            <span className="text-sm font-bold tracking-wide">Now serving</span>
            <span className="mt-1 text-2xl font-extrabold">Westlands</span>
            <span className="text-sm font-bold">&amp;</span>
            <span className="text-2xl font-extrabold">Karen</span>
          </div>
        </div>
      </div>

      <WaveDivider className="absolute inset-x-0 bottom-0 text-background" />
    </section>
  );
}

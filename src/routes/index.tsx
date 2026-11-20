import { createFileRoute } from "@tanstack/react-router";

import { ContactSection } from "@/components/site/ContactSection";
import { DrinksSection } from "@/components/site/DrinksSection";
import { GallerySection } from "@/components/site/GallerySection";
import { InstagramSection } from "@/components/site/InstagramSection";
import { OurStorySection } from "@/components/site/OurStorySection";
import { ReservationsSection } from "@/components/site/ReservationsSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/Hero";
import { LocationsSection } from "@/components/site/LocationsSection";
import { SignatureFood } from "@/components/site/SignatureFood";
import { SiteHeader } from "@/components/site/SiteHeader";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

const pageDescription =
  "Vietnamese street food, bold flavours and good times. Find Mammam Viet Kitchen & Bar in Westlands and Karen.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mammam Viet Kitchen & Bar | Vietnamese Street Food, Westlands & Karen" },
      { name: "description", content: pageDescription },
      { property: "og:title", content: "Mammam Viet Kitchen & Bar" },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mammam Viet Kitchen & Bar" },
      { name: "twitter:description", content: pageDescription },
    ],
  }),
});

function Index() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <SignatureFood />
        <OurStorySection />
        <DrinksSection />
        <LocationsSection />
        <GallerySection />
        <ReservationsSection />
        <InstagramSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}

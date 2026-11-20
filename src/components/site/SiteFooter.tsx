import { Instagram, Phone } from "lucide-react";

import mammamLogo from "@/assets/mammam-logo.png";
import { WaveDivider } from "@/components/site/WaveDivider";
import { instagramUrl, locations, navigation } from "@/data/site";

const footerLink = "text-brand-cream underline-offset-4 transition-colors hover:text-brand-yellow hover:underline";

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <WaveDivider className="text-brand-black" />
      <div className="bg-brand-black pb-20 text-brand-cream md:pb-0">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-2 md:px-12 lg:grid-cols-4 lg:px-16">
          <div>
            <img src={mammamLogo} alt="Mammam Viet Kitchen & Bar" width={80} height={80} className="h-20 w-20 object-contain" />
            <p className="mt-4 max-w-xs text-base">Vietnamese street food, bold flavours and good times.</p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-display text-xl font-extrabold uppercase text-brand-yellow">Explore</h2>
            <ul className="mt-4 space-y-2">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={footerLink}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#book-a-table" className={footerLink}>
                  Book a Table
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-xl font-extrabold uppercase text-brand-yellow">Find us</h2>
            <ul className="mt-4 space-y-4">
              {locations.map((loc) => (
                <li key={loc.name}>
                  <p className="font-bold">{loc.address}</p>
                  <a href={loc.phoneHref} className={`${footerLink} mt-1 inline-flex items-center gap-2`}>
                    <Phone aria-hidden="true" className="size-4" /> {loc.phoneDisplay}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-extrabold uppercase text-brand-yellow">Follow</h2>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${footerLink} mt-4 inline-flex items-center gap-2`}
            >
              <Instagram aria-hidden="true" className="size-4" /> @mammam.ke
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <div className="border-t border-brand-cream/20">
          <p className="mx-auto max-w-[1440px] px-6 py-6 text-sm text-brand-cream/80 md:px-12 lg:px-16">
            Independent concept by Alvin Solutions. Not an official Mammam website.
          </p>
        </div>
      </div>
    </footer>
  );
}

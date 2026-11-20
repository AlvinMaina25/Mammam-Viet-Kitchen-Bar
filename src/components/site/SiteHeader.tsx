import { useState } from "react";
import { ArrowUpRight, Menu as MenuIcon, X } from "lucide-react";

import mammamLogo from "@/assets/mammam-logo.png";
import { Button } from "@/components/ui/button";
import { bookingHref, navigation } from "@/data/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const sectionIds = navigation.map((item) => item.href.slice(1));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { active, select } = useActiveSection(sectionIds);
  const isActive = (href: string) => href.slice(1) === active;

  return (
    <header className="sticky top-0 z-30 border-b-2 border-brand-black bg-background">
      <div className="relative mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-5 px-5 md:px-10">
        <a href="#home" className="flex shrink-0 items-center gap-3">
          <img
            src={mammamLogo}
            alt="Mammam Viet Kitchen & Bar"
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
          <span className="hidden text-xs font-bold uppercase tracking-[0.1em] text-foreground sm:block">
            Viet Kitchen &amp; Bar
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => select(item.href.slice(1))}
              aria-current={isActive(item.href) ? "true" : undefined}
              className={cn(
                "whitespace-nowrap text-sm font-semibold underline-offset-8 transition-colors hover:text-brand-purple hover:underline",
                isActive(item.href) ? "text-brand-purple underline" : "text-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
          <Button asChild variant="brand" size="chunky" className="h-11">
            <a href={bookingHref}>
              Book a Table <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </nav>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
        </Button>

        {open && (
          <nav
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full border-b-2 border-brand-black bg-background px-5 pb-5 lg:hidden"
          >
            <div className="flex flex-col">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    select(item.href.slice(1));
                    close();
                  }}
                  aria-current={isActive(item.href) ? "true" : undefined}
                  className={cn(
                    "border-b border-border py-3 text-sm font-semibold transition-colors hover:text-brand-purple",
                    isActive(item.href) ? "text-brand-purple underline underline-offset-4" : "text-foreground",
                  )}
                >
                  {item.label}
                </a>
              ))}
              <Button asChild variant="brand" size="chunky" className="mt-4">
                <a href={bookingHref} onClick={close}>
                  Book a Table <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

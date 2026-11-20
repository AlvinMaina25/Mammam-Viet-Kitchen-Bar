import { useEffect, useId, useRef, useState } from "react";

import { locations, whatsappHref } from "@/data/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.5 2 2 6.48 2 12c0 1.77.47 3.5 1.35 5.02L2 22l5.1-1.33A10.03 10.03 0 0 0 12.04 22C17.57 22 22 17.52 22 12S17.57 2 12.04 2Zm0 18.3c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.03.79.81-2.95-.2-.3A8.27 8.27 0 0 1 3.76 12c0-4.57 3.72-8.29 8.28-8.29 4.56 0 8.27 3.72 8.27 8.29 0 4.57-3.71 8.3-8.27 8.3Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuId = useId();

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) close(true);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6">
      {open && (
        <div
          id={menuId}
          className="absolute bottom-full right-0 mb-3 w-64 rounded-lg border-2 border-brand-black bg-card p-3 shadow-sticker"
        >
          <p className="px-2 pb-2 text-xs font-bold uppercase tracking-wide text-foreground">
            Chat with your nearest Mammam
          </p>
          <ul className="flex flex-col gap-2">
            {locations.map((loc, index) => (
              <li key={loc.name}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={whatsappHref(loc.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => close(false)}
                  className="flex items-center gap-3 rounded-md border-2 border-brand-black bg-background px-3 py-3 font-semibold text-brand-black transition-colors hover:bg-brand-yellow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple motion-reduce:transition-none"
                >
                  <WhatsAppIcon className="size-5 shrink-0 text-whatsapp-ink" />
                  WhatsApp {loc.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        ref={buttonRef}
        type="button"
        aria-label="Chat with Mammam on WhatsApp"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="flex size-16 items-center justify-center rounded-full border-2 border-brand-black bg-whatsapp text-whatsapp-foreground shadow-sticker transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <WhatsAppIcon className="size-8" />
      </button>
    </div>
  );
}

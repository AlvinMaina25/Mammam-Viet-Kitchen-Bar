import { useRef, type KeyboardEvent } from "react";

import type { MenuFilter } from "@/data/site";
import { cn } from "@/lib/utils";

type MenuTabsProps = {
  tabs: { value: MenuFilter; label: string }[];
  active: MenuFilter;
  onChange: (value: MenuFilter) => void;
  idPrefix: string;
};

export const tabId = (prefix: string, value: MenuFilter) => `${prefix}-tab-${value}`;
export const panelId = (prefix: string) => `${prefix}-panel`;

export function MenuTabs({ tabs, active, onChange, idPrefix }: MenuTabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    const tab = tabs[next];
    if (!tab) return;
    onChange(tab.value);
    refs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    focusTab(target);
  };

  return (
    <div role="tablist" aria-label="Filter the menu" className="flex flex-wrap gap-3">
      {tabs.map((tab, index) => {
        const selected = tab.value === active;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={tabId(idPrefix, tab.value)}
            aria-selected={selected}
            aria-controls={panelId(idPrefix)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "h-11 rounded-full border-2 border-brand-black px-6 text-sm font-bold uppercase tracking-wide text-brand-black transition-[background-color,box-shadow,transform] motion-reduce:transition-none",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              selected ? "-translate-y-0.5 bg-brand-yellow shadow-sticker" : "bg-card hover:bg-muted",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

import { useState } from "react";

import { MenuCard } from "@/components/site/MenuCard";
import { MenuTabs, panelId, tabId } from "@/components/site/MenuTabs";
import { SectionHeading } from "@/components/site/SectionHeading";
import { menuFilters, signatureDishes, type MenuFilter } from "@/data/site";
import { availableFilters, filterDishes } from "@/lib/menu";

const ID_PREFIX = "menu";

export function SignatureFood() {
  const [filter, setFilter] = useState<MenuFilter>("all");
  const tabs = availableFilters(menuFilters, signatureDishes);
  const dishes = filterDishes(signatureDishes, filter);
  const showAll = dishes.length === signatureDishes.length;
  const [featured, ...rest] = dishes;

  return (
    <section id="menu" aria-labelledby="menu-title" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-16 lg:py-28">
        <SectionHeading
          id="menu-title"
          eyebrow="Signature food"
          title="I came. I saw. I said yes to all."
          intro="Big, bright Vietnamese street food made for sharing. Order a bit of everything."
        />

        <div className="mt-10">
          <MenuTabs tabs={tabs} active={filter} onChange={setFilter} idPrefix={ID_PREFIX} />
        </div>

        <div
          key={filter}
          role="tabpanel"
          id={panelId(ID_PREFIX)}
          aria-labelledby={tabId(ID_PREFIX, filter)}
          className="tab-fade mt-10"
        >
          {showAll ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
              {featured && <MenuCard dish={featured} className="md:col-span-2 lg:row-span-2" />}
              {rest.map((dish) => (
                <MenuCard key={dish.name} dish={dish} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {dishes.map((dish) => (
                <MenuCard key={dish.name} dish={{ ...dish, featured: false }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

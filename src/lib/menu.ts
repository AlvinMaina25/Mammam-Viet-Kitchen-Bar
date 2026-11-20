import type { Dish, MenuFilter } from "@/data/site";

/** Dishes for a tab. Falls back to every dish so the menu can never render empty. */
export function filterDishes(dishes: Dish[], filter: MenuFilter): Dish[] {
  if (filter === "all") return dishes;
  const matches = dishes.filter((dish) => dish.category === filter);
  return matches.length > 0 ? matches : dishes;
}

/** Only offer tabs that have at least one dish behind them. */
export function availableFilters<T extends { value: MenuFilter }>(filters: T[], dishes: Dish[]): T[] {
  return filters.filter(
    (f) => f.value === "all" || dishes.some((dish) => dish.category === f.value),
  );
}

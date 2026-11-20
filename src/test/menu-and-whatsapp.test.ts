import { describe, expect, it } from "vitest";

import { locations, signatureDishes, whatsappHref, whatsappMessage } from "@/data/site";
import { availableFilters, filterDishes } from "@/lib/menu";

const filters = [
  { value: "all" as const, label: "All" },
  { value: "food" as const, label: "Food" },
  { value: "drinks" as const, label: "Drinks" },
];

describe("menu filtering", () => {
  it("returns every dish for All", () => {
    expect(filterDishes(signatureDishes, "all")).toHaveLength(signatureDishes.length);
  });

  it("returns only matching dishes for a category", () => {
    const food = filterDishes(signatureDishes, "food");
    expect(food.length).toBeGreaterThan(0);
    expect(food.every((d) => d.category === "food")).toBe(true);
    const drinks = filterDishes(signatureDishes, "drinks");
    expect(drinks.every((d) => d.category === "drinks")).toBe(true);
  });

  it("never renders an empty menu", () => {
    const foodOnly = signatureDishes.filter((d) => d.category === "food");
    expect(filterDishes(foodOnly, "drinks")).toEqual(foodOnly);
  });

  it("only offers tabs that have dishes", () => {
    const foodOnly = signatureDishes.filter((d) => d.category === "food");
    const values = availableFilters(filters, foodOnly).map((f) => f.value);
    expect(values).toEqual(["all", "food"]);
    expect(availableFilters(filters, signatureDishes)).toHaveLength(3);
  });
});

describe("WhatsApp links", () => {
  it("builds a wa.me link with the number and an encoded message", () => {
    const url = whatsappHref("254791214597");
    expect(url.startsWith("https://wa.me/254791214597?text=")).toBe(true);
    expect(decodeURIComponent(url.split("?text=")[1] ?? "")).toBe(whatsappMessage);
  });

  it("uses digits-only international numbers for every location", () => {
    for (const loc of locations) {
      expect(loc.whatsappNumber).toMatch(/^254\d{9}$/);
    }
  });
});

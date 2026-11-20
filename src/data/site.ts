import banhMiImage from "@/assets/banh-mi.jpg";
import bunChaImage from "@/assets/bun-cha.jpg";
import cocktailImage from "@/assets/cocktail.jpg";
import diningImage from "@/assets/dining.jpg";
import interiorImage from "@/assets/interior.jpg";
import lycheeMartiniImage from "@/assets/lychee-martini.jpg";
import springRollsImage from "@/assets/spring-rolls.jpg";

export type NavItem = { label: string; href: string };

export const navigation: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#our-story" },
  { label: "Locations", href: "#locations" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const bookingHref = "#book-a-table";

export const instagramUrl = "https://www.instagram.com/mammam.ke";

export type SiteImage = { src: string; alt: string };

export const images = {
  interior: { src: interiorImage, alt: "Red lanterns and green windows over the bar seating at Mammam" },
  dining: { src: diningImage, alt: "Friends laughing over drinks on a colourful evening at Mammam" },
  cocktail: { src: cocktailImage, alt: "A bright pink cocktail with rosemary and a dried orange slice" },
  lycheeMartini: { src: lycheeMartiniImage, alt: "A lychee martini with lychees on a skewer, glowing in warm light" },
  bunCha: { src: bunChaImage, alt: "A bowl of broth with vermicelli and fresh herbs" },
  banhMi: { src: banhMiImage, alt: "A hand holding a bánh mì in a red Mammam wrapper" },
  springRolls: { src: springRollsImage, alt: "Golden spring rolls lined up on a green plate" },
} satisfies Record<string, SiteImage>;

/** Order matters: the gallery grid lays tiles out in this sequence. */
export const galleryImages: SiteImage[] = [
  images.interior,
  images.lycheeMartini,
  images.springRolls,
  images.cocktail,
  images.dining,
  images.bunCha,
  images.banhMi,
];

export const instagramImages: SiteImage[] = [
  images.bunCha,
  images.cocktail,
  images.interior,
  images.banhMi,
  images.lycheeMartini,
  images.springRolls,
];

export const storyPoints = [
  {
    title: "Street food spirit",
    text: "Inspired by the noodle stalls, grills and sandwich carts of Vietnam's busy streets.",
  },
  {
    title: "Made to share",
    text: "Plates land in the middle of the table, so everyone gets a taste of everything.",
  },
  {
    title: "Two homes, one vibe",
    text: "Westlands and Karen each have their own feel, with the same bold flavours.",
  },
];

export type MenuCategory = "food" | "drinks";

export type Dish = {
  name: string;
  category: MenuCategory;
  description: string;
  tag?: string;
  image?: { src: string; alt: string };
  featured?: boolean;
};

export const signatureDishes: Dish[] = [
  {
    name: "Bún Chả",
    category: "food",
    description: "Grilled pork, rice vermicelli and a sweet, savoury dipping broth.",
    tag: "House favourite",
    image: { src: bunChaImage, alt: "A bowl of broth with vermicelli and fresh herbs" },
    featured: true,
  },
  {
    name: "Bánh Mì",
    category: "food",
    description: "Crackly baguette stuffed with pickled veg, chilli and a fistful of fresh herbs.",
    image: { src: banhMiImage, alt: "A loaded bánh mì sandwich" },
  },
  {
    name: "Spring Rolls",
    category: "food",
    description: "Crispy, fresh and made for dunking in nước chấm.",
    image: { src: springRollsImage, alt: "Golden spring rolls with dipping sauce" },
  },
  {
    name: "Noodle Dishes",
    category: "food",
    description: "Slurpable bowls of phở and stir-fried noodles, piled high with herbs.",
    tag: "Slurp responsibly",
  },
  {
    name: "Cocktails",
    category: "drinks",
    description: "Tropical, punchy and made to share with the table.",
    image: { src: cocktailImage, alt: "A bright pink cocktail garnished with orange" },
  },
];

export type MenuFilter = "all" | MenuCategory;

/** Menu tabs, in display order. A tab only shows when it has at least one dish. */
export const menuFilters: { value: MenuFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "food", label: "Food" },
  { value: "drinks", label: "Drinks" },
];

export type Drink = { name: string; notes: string };

export const drinksFeatureImage = {
  src: lycheeMartiniImage,
  alt: "A lychee martini on the bar at Mammam",
};

export const drinks: Drink[] = [
  { name: "Lychee Martini", notes: "Vodka, lychee, a little sparkle. The one everyone orders." },
  { name: "Vietnamese Espresso Martini", notes: "Strong coffee, condensed milk, zero regrets." },
  { name: "Passion Fruit Sour", notes: "Tart, foamy and sunshine in a glass." },
  { name: "Lemongrass Gin Fizz", notes: "Fresh, zesty and dangerously easy." },
];

export type Location = {
  name: string;
  /** Full venue name, shown on cards, contact and footer, and used for map directions. */
  address: string;
  blurb: string;
  phoneDisplay: string;
  phoneHref: string;
  /** International format, digits only, for wa.me links. */
  whatsappNumber: string;
  directionsHref: string;
  image: { src: string; alt: string };
};

export const whatsappMessage = "Hi Mammam, I'd like to ask about a table.";

export function whatsappHref(number: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage)}`;
}

function directionsTo(address: string) {
  return (
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(`Mammam Viet Kitchen & Bar, ${address}`)
  );
}

export const locations: Location[] = [
  {
    name: "Westlands",
    address: "Mwanzi Market, Westlands, Nairobi",
    blurb: "Sunlit windows, lanterns overhead and a bar built for long lunches.",
    phoneDisplay: "0791 214 597",
    phoneHref: "tel:+254791214597",
    whatsappNumber: "254791214597",
    directionsHref: directionsTo("Mwanzi Market, Westlands, Nairobi"),
    image: { src: interiorImage, alt: "Sunlit dining room at Mammam with red lanterns and green windows" },
  },
  {
    name: "Karen",
    address: "MyTown Mall, Karen, Nairobi",
    blurb: "Neon nights, colourful chairs and cocktails that keep the table going.",
    phoneDisplay: "0790 335 350",
    phoneHref: "tel:+254790335350",
    whatsappNumber: "254790335350",
    directionsHref: directionsTo("MyTown Mall, Karen, Nairobi"),
    image: { src: diningImage, alt: "Friends sharing drinks at a table at Mammam in the evening" },
  },
];

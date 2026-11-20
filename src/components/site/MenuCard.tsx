import type { Dish } from "@/data/site";
import { cn } from "@/lib/utils";

type MenuCardProps = { dish: Dish; className?: string };

export function MenuCard({ dish, className }: MenuCardProps) {
  const { name, description, tag, image, featured } = dish;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border-2 border-brand-black bg-card shadow-sticker",
        !image && "bg-brand-yellow",
        className,
      )}
    >
      {image ? (
        <div className={cn("overflow-hidden border-b-2 border-brand-black", featured ? "flex-1" : "")}>
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
              featured ? "aspect-[4/3] lg:aspect-auto lg:min-h-[420px]" : "aspect-[4/3]",
            )}
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="flex flex-1 items-center justify-center px-6 py-10 font-display text-8xl font-extrabold lowercase leading-none text-primary"
        >
          phở
        </div>
      )}
      <div className="p-6">
        {tag && (
          <p className="mb-3 inline-block -rotate-2 rounded-sm bg-brand-black px-2 py-1 text-xs font-bold uppercase tracking-wide text-brand-cream">
            {tag}
          </p>
        )}
        <h3
          className={cn(
            "font-display font-extrabold uppercase leading-none text-foreground",
            featured ? "text-5xl" : "text-3xl",
          )}
        >
          {name}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-foreground">{description}</p>
      </div>
    </article>
  );
}

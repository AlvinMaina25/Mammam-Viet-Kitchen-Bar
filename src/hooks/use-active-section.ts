import { useCallback, useEffect, useRef, useState } from "react";

const HEADER_OFFSET = 96;
const CLICK_LOCK_MS = 1200;

/**
 * Tracks which section is in view. A section counts as "in view" when it crosses the band
 * between the sticky header and the middle of the screen; the first one (in page order) wins.
 * `select` highlights a link straight away and ignores scroll updates until the jump settles.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const visible = useRef(new Set<string>());
  const lockUntil = useRef(0);
  const key = ids.join("|");

  useEffect(() => {
    const sectionIds = key.split("|");
    const pick = () => {
      if (Date.now() < lockUntil.current) return;
      const first = sectionIds.find((id) => visible.current.has(id));
      if (first) setActive(first);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.add(entry.target.id);
          else visible.current.delete(entry.target.id);
        }
        pick();
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px -55% 0px`, threshold: 0 },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    const release = () => {
      if (lockUntil.current === 0) return;
      lockUntil.current = 0;
      pick();
    };
    let timer: ReturnType<typeof setInterval> | undefined = setInterval(() => {
      if (lockUntil.current !== 0 && Date.now() >= lockUntil.current) release();
    }, 200);
    window.addEventListener("scrollend", release);

    return () => {
      observer.disconnect();
      window.removeEventListener("scrollend", release);
      if (timer) clearInterval(timer);
      timer = undefined;
    };
  }, [key]);

  const select = useCallback((id: string) => {
    lockUntil.current = Date.now() + CLICK_LOCK_MS;
    setActive(id);
  }, []);

  return { active, select };
}

import { z } from "zod";

export const reservationLocations = [
  { value: "westlands", label: "Westlands" },
  { value: "karen", label: "Karen" },
] as const;

export const guestOptions = Array.from({ length: 12 }, (_, i) => String(i + 1));

/** Local calendar date as YYYY-MM-DD (the format of <input type="date">). */
export function todayISO(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function createReservationSchema(getToday: () => string = () => todayISO()) {
  return z.object({
    location: z.enum(["westlands", "karen"], {
      errorMap: () => ({ message: "Choose Westlands or Karen." }),
    }),
    date: z
      .string()
      .min(1, "Pick a date.")
      .refine((value) => value >= getToday(), "Choose today or a future date."),
    time: z.string().min(1, "Pick a time."),
    guests: z
      .string()
      .min(1, "Tell us how many guests.")
      .refine((value) => guestOptions.includes(value), "Choose between 1 and 12 guests."),
    name: z
      .string()
      .trim()
      .min(1, "Tell us your name.")
      .max(80, "Keep your name under 80 characters."),
    phone: z
      .string()
      .trim()
      .min(1, "Add a phone number.")
      .refine((value) => {
        const digits = value.replace(/\D/g, "");
        return /^\+?[\d\s()-]+$/.test(value) && digits.length >= 9 && digits.length <= 15;
      }, "Enter a valid phone number, like 0791 214 597."),
  });
}

export type ReservationValues = z.infer<ReturnType<typeof createReservationSchema>>;

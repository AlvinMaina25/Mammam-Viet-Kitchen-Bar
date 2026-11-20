import { describe, expect, it } from "vitest";

import { createReservationSchema, todayISO } from "@/lib/reservation";

const schema = createReservationSchema(() => "2026-11-21");
const valid = {
  location: "westlands",
  date: "2026-11-21",
  time: "19:30",
  guests: "4",
  name: "Wanjiru",
  phone: "0791 214 597",
};

const errorsFor = (values: Record<string, unknown>) => {
  const result = schema.safeParse(values);
  return result.success ? {} : result.error.flatten().fieldErrors;
};

describe("reservation form rules", () => {
  it("accepts a complete booking for today", () => {
    expect(schema.safeParse(valid).success).toBe(true);
  });

  it("rejects a date in the past", () => {
    expect(errorsFor({ ...valid, date: "2026-11-20" }).date).toEqual([
      "Choose today or a future date.",
    ]);
  });

  it("only allows Westlands or Karen", () => {
    expect(errorsFor({ ...valid, location: "kilimani" }).location).toEqual([
      "Choose Westlands or Karen.",
    ]);
  });

  it("requires every field", () => {
    const errors = errorsFor({ location: undefined, date: "", time: "", guests: "", name: " ", phone: "" });
    expect(Object.keys(errors).sort()).toEqual(
      ["date", "guests", "location", "name", "phone", "time"].sort(),
    );
  });

  it("rejects a phone number that is too short", () => {
    expect(errorsFor({ ...valid, phone: "0791" }).phone).toBeDefined();
  });

  it("formats today's local date for the date picker", () => {
    expect(todayISO(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

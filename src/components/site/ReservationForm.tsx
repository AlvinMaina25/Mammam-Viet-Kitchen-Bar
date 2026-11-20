import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { CheckCircle2, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  createReservationSchema,
  guestOptions,
  reservationLocations,
  todayISO,
  type ReservationValues,
} from "@/lib/reservation";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-12 w-full rounded-md border-2 border-brand-black bg-card px-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple/40 aria-[invalid=true]:border-destructive";

type FieldProps = {
  id: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
  className?: string;
};

function Field({ id, label, error, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-bold uppercase tracking-wide text-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-brand-purple">
          {error}
        </p>
      )}
    </div>
  );
}

const emptyValues = { date: "", time: "", guests: "", name: "", phone: "" };

export function ReservationForm() {
  const schema = useMemo(() => createReservationSchema(), []);
  const [submitted, setSubmitted] = useState<ReservationValues | null>(null);
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  const successRef = useRef<HTMLDivElement>(null);

  // Set after hydration so the server and browser render the same markup.
  useEffect(() => setMinDate(todayISO()), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationValues>({
    resolver: zodResolver(schema),
    defaultValues: emptyValues,
  });

  const onSubmit = (values: ReservationValues) => {
    // Demo only: nothing is stored or sent anywhere.
    setSubmitted(values);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  const describedBy = (name: keyof ReservationValues) =>
    errors[name] ? `res-${name}-error` : undefined;

  if (submitted) {
    const locationLabel =
      reservationLocations.find((l) => l.value === submitted.location)?.label ?? submitted.location;
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start rounded-lg border-2 border-brand-black bg-card p-8 shadow-sticker focus:outline-none"
      >
        <CheckCircle2 aria-hidden="true" className="size-12 text-brand-purple" />
        <h3 className="mt-4 font-display text-4xl font-extrabold uppercase leading-none text-foreground">
          Thanks, {submitted.name}!
        </h3>
        <p className="mt-3 text-lg text-foreground">
          Table for {submitted.guests} at Mammam {locationLabel} on{" "}
          {format(parseISO(submitted.date), "EEEE d MMMM yyyy")} at {submitted.time}.
        </p>
        <p className="mt-6 flex items-start gap-3 rounded-md border-2 border-brand-black bg-brand-yellow p-4 text-base font-bold text-brand-black">
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          This is a demo. No booking has been made or sent.
        </p>
        <Button
          type="button"
          variant="ink"
          size="chunky"
          className="mt-8"
          onClick={() => {
            reset(emptyValues);
            setSubmitted(null);
          }}
        >
          Start a new request
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-6 sm:grid-cols-2">
      <fieldset className="sm:col-span-2" aria-describedby={describedBy("location")}>
        <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-foreground">
          Preferred location
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {reservationLocations.map((loc) => (
            <label key={loc.value} className="cursor-pointer">
              <input
                type="radio"
                value={loc.value}
                className="peer sr-only"
                aria-invalid={errors.location ? true : undefined}
                {...register("location")}
              />
              <span className="flex h-14 items-center justify-center rounded-md border-2 border-brand-black bg-card font-display text-2xl font-extrabold uppercase text-foreground transition-colors peer-checked:bg-brand-yellow peer-checked:shadow-sticker peer-focus-visible:ring-4 peer-focus-visible:ring-brand-purple/40">
                {loc.label}
              </span>
            </label>
          ))}
        </div>
        {errors.location && (
          <p id="res-location-error" className="mt-2 text-sm font-semibold text-brand-purple">
            {errors.location.message}
          </p>
        )}
      </fieldset>

      <Field id="res-date" label="Date" error={errors.date?.message}>
        <input
          id="res-date"
          type="date"
          min={minDate}
          className={fieldClass}
          aria-invalid={errors.date ? true : undefined}
          aria-describedby={describedBy("date")}
          {...register("date")}
        />
      </Field>

      <Field id="res-time" label="Time" error={errors.time?.message}>
        <input
          id="res-time"
          type="time"
          className={fieldClass}
          aria-invalid={errors.time ? true : undefined}
          aria-describedby={describedBy("time")}
          {...register("time")}
        />
      </Field>

      <Field id="res-guests" label="Number of guests" error={errors.guests?.message}>
        <select
          id="res-guests"
          className={cn(fieldClass, "appearance-none")}
          aria-invalid={errors.guests ? true : undefined}
          aria-describedby={describedBy("guests")}
          {...register("guests")}
        >
          <option value="">Select guests</option>
          {guestOptions.map((n) => (
            <option key={n} value={n}>
              {n} {n === "1" ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </Field>

      <Field id="res-name" label="Name" error={errors.name?.message}>
        <input
          id="res-name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className={fieldClass}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("name")}
          {...register("name")}
        />
      </Field>

      <Field id="res-phone" label="Phone" error={errors.phone?.message} className="sm:col-span-2">
        <input
          id="res-phone"
          type="tel"
          autoComplete="tel"
          placeholder="07xx xxx xxx"
          className={fieldClass}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={describedBy("phone")}
          {...register("phone")}
        />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" variant="brand" size="chunky" className="w-full sm:w-auto">
          Request a table
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">
          Demo form: nothing you enter is stored or sent.
        </p>
      </div>
    </form>
  );
}

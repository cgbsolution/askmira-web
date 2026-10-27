"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";

import { submitDemoRequest } from "@/app/actions/demo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  COMPANY_SIZES,
  demoRequestSchema,
  emptyDemoRequest,
  INTERESTS,
  MESSAGE_LIMIT,
  PHONE_ALLOWED,
  ROLES,
  TOPICS,
  type DemoRequest,
  type DemoRequestInput,
} from "@/lib/demo-schema";
import { cn } from "@/lib/utils";

/**
 * The demo request form. Fields validate when you leave them, then as you
 * type; the phone field refuses letters as they are typed; the button locks
 * while sending so a double click sends once; the server validates again.
 */
export function DemoForm({
  topic = "demo",
  showTopic = false,
  submitLabel = "Book my demo",
  className,
}: {
  topic?: string;
  showTopic?: boolean;
  submitLabel?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const form = useForm<DemoRequestInput, unknown, DemoRequest>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: emptyDemoRequest(topic, pathname),
    mode: "onTouched",
  });
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [sentTo, setSentTo] = React.useState<{ name: string; email: string } | null>(null);
  const sending = React.useRef(false);
  const successRef = React.useRef<HTMLHeadingElement>(null);
  const errorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (sentTo) successRef.current?.focus();
  }, [sentTo]);

  // A failed send shows its reason at the top of the form; bring it into view.
  React.useEffect(() => {
    if (!serverError) return;
    errorRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    errorRef.current?.focus({ preventScroll: true });
  }, [serverError]);

  async function onSubmit(values: DemoRequest) {
    if (sending.current) return;
    sending.current = true;
    setServerError(null);
    try {
      const result = await submitDemoRequest({ ...values, sourcePath: pathname });
      if (result.ok) {
        setSentTo({ name: values.fullName.split(" ")[0] ?? values.fullName, email: values.workEmail });
        form.reset(emptyDemoRequest(topic, pathname));
        return;
      }
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          if (field in values) form.setError(field as keyof DemoRequestInput, { type: "server", message });
        }
      }
      setServerError(result.message);
    } catch {
      setServerError("We couldn't reach our server. Please check your connection and try again.");
    } finally {
      sending.current = false;
    }
  }

  if (sentTo) {
    return (
      <div className={cn("flex flex-col items-start gap-4 rounded-3xl bg-white p-6 text-ink-900 sm:p-8", className)} role="status">
        <span className="grid size-12 place-items-center rounded-full bg-success-50 text-success-600">
          <CircleCheck className="size-6" aria-hidden />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="font-display text-display-4 font-semibold outline-none">
          Thank you, {sentTo.name}. Your request is with us.
        </h3>
        <p className="text-ink-600">
          We&apos;ll write to <span className="font-semibold text-ink-900">{sentTo.email}</span> to find a time that suits
          you. If that address has a typo, send the form again with the right one.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setSentTo(null)}>
            Send another request
          </Button>
          <Button asChild variant="link">
            <Link href="/resources">Browse guides while you wait</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { isSubmitting } = form.formState;
  const messageLength = form.watch("message")?.length ?? 0;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        aria-describedby={serverError ? "demo-form-error" : undefined}
        className={cn("grid gap-5 rounded-3xl bg-white p-5 text-ink-900 shadow-card sm:p-8", className)}
      >
        {serverError && (
          <Alert
            ref={errorRef}
            tabIndex={-1}
            variant="destructive"
            id="demo-form-error"
            className="border-destructive/30 outline-none"
          >
            <CircleAlert aria-hidden />
            <AlertTitle>Not sent</AlertTitle>
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        {showTopic && (
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What can we help with?</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger ref={field.ref} onBlur={field.onBlur} className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TOPICS.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" placeholder="Priya Ramesh" maxLength={100} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="priya@company.com"
                    maxLength={254}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input autoComplete="organization" placeholder="Your company" maxLength={120} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone <span className="font-normal text-ink-400">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    maxLength={20}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.replace(PHONE_ALLOWED, ""))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company size</FormLabel>
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger ref={field.ref} onBlur={field.onBlur} className="w-full">
                      <SelectValue placeholder="Number of employees" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COMPANY_SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size} employees
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Your role <span className="font-normal text-ink-400">(optional)</span>
                </FormLabel>
                <Select value={field.value || undefined} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger ref={field.ref} onBlur={field.onBlur} className="w-full">
                      <SelectValue placeholder="Choose one" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem asChild>
              <fieldset>
              <legend className="mb-2 text-sm font-semibold text-ink-800">
                Interested in <span className="font-normal text-ink-400">(optional)</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => {
                  const checked = field.value?.includes(interest.value) ?? false;
                  const id = `interest-${interest.value}`;
                  return (
                    <label
                      key={interest.value}
                      htmlFor={id}
                      className={cn(
                        "flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors select-none has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
                        checked ? "border-brand-300 bg-blush-50 text-brand-800" : "border-cream-300 text-ink-700 hover:bg-cream-50",
                      )}
                    >
                      <Checkbox
                        id={id}
                        checked={checked}
                        onCheckedChange={(state) => {
                          const next = new Set(field.value ?? []);
                          if (state === true) next.add(interest.value);
                          else next.delete(interest.value);
                          field.onChange(INTERESTS.map((i) => i.value).filter((v) => next.has(v)));
                        }}
                        className="size-4.5 rounded-full"
                      />
                      {interest.label}
                    </label>
                  );
                })}
              </div>
              <FormMessage />
              </fieldset>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Anything we should know? <span className="font-normal text-ink-400">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  maxLength={MESSAGE_LIMIT}
                  placeholder="For example: 3 legal entities, biometric devices at two plants, payroll run by a CA firm today."
                  {...field}
                />
              </FormControl>
              <FormDescription className={cn("text-right tabular-nums", messageLength > MESSAGE_LIMIT - 50 && "text-marigold-800")}>
                {messageLength.toLocaleString("en-IN")} / {MESSAGE_LIMIT.toLocaleString("en-IN")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* People never see or reach this field; bots fill it in. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <Label htmlFor="demo-website">Website</Label>
          <Input id="demo-website" tabIndex={-1} autoComplete="off" {...form.register("website")} />
        </div>

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  ref={field.ref}
                  checked={field.value}
                  onCheckedChange={(state) => field.onChange(state === true)}
                  onBlur={field.onBlur}
                  className="mt-0.5 size-5"
                />
              </FormControl>
              <div className="grid gap-1">
                <FormLabel className="block text-sm leading-snug font-normal text-ink-600">
                  AskMira may contact me about this request. My details are handled as described in the{" "}
                  <Link href="/privacy" className="font-semibold text-brand-800 underline underline-offset-2">
                    privacy policy
                  </Link>
                  .
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto sm:justify-self-start">
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              {submitLabel} <ArrowRight aria-hidden />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

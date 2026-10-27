import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata = { title: "Page not found" };

const SUGGESTIONS = [
  { href: "/platform", label: "Platform overview" },
  { href: "/features/payroll", label: "Payroll & compliance" },
  { href: "/resources", label: "Guides and resources" },
  { href: "/contact", label: "Contact us" },
];

export default function NotFound() {
  return (
    <section className="bg-background pt-36 pb-28 text-center lg:pt-48">
      <div className="container-site max-w-2xl">
        <p className="font-display text-7xl font-semibold text-brand-200">404</p>
        <h1 className="mt-4 font-display text-display-2 font-semibold text-ink-950">This page is not here</h1>
        <p className="mt-4 text-lead text-ink-600">
          The link may be old, or the address may have a typo. These might be what you were after:
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="inline-flex rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-ink-800 outline-none hover:border-brand-300 hover:text-brand-800 focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button asChild size="lg" variant="deep" className="mt-10">
          <Link href="/">
            Back to the home page <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}

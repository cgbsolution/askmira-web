import {
  Banknote,
  BookOpenCheck,
  Fingerprint,
  KeyRound,
  Landmark,
  MessageCircle,
  ReceiptIndianRupee,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import Image from "next/image";

import { cn } from "@/lib/utils";

/*
 * The reference puts customer logos here. AskMira has no approved customer
 * logos yet, so the strip shows what the product verifiably handles. When
 * customers agree to be named, add their logo files to `CUSTOMER_LOGOS` and
 * the strip switches to them.
 */
const CUSTOMER_LOGOS: { name: string; src: string }[] = [];

const CAPABILITIES: { icon: LucideIcon; label: string }[] = [
  { icon: Landmark, label: "PF with the ECR file" },
  { icon: ShieldCheck, label: "ESI" },
  { icon: ReceiptIndianRupee, label: "Professional tax and LWF by state" },
  { icon: ScrollText, label: "TDS · 24Q · Form 16" },
  { icon: Banknote, label: "HDFC, ICICI, SBI, Axis and Kotak bank files" },
  { icon: Fingerprint, label: "eSSL and ZKTeco devices" },
  { icon: BookOpenCheck, label: "Tally and Zoho Books journals" },
  { icon: KeyRound, label: "Google, Microsoft and OIDC sign-in" },
  { icon: MessageCircle, label: "WhatsApp notifications" },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  if (CUSTOMER_LOGOS.length > 0) {
    return (
      <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-14 pr-14">
        {CUSTOMER_LOGOS.map((logo) => (
          <li key={logo.name}>
            <Image src={logo.src} alt={hidden ? "" : logo.name} width={140} height={40} className="h-8 w-auto opacity-90 brightness-0 invert" />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {CAPABILITIES.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium whitespace-nowrap text-white backdrop-blur-sm"
        >
          <Icon className="size-4 text-marigold-300" aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}

export function TrustStrip() {
  const heading =
    CUSTOMER_LOGOS.length > 0 ? "HR teams that run on AskMira" : "Built for the way Indian companies pay and comply";
  return (
    <section aria-labelledby="trust-heading" className="relative overflow-hidden bg-gradient-to-r from-brand-900 via-brand-700 to-marigold-700 py-10 text-white sm:py-12">
      <div className="container-site">
        <h2 id="trust-heading" className="text-center text-base font-semibold text-white/90 sm:text-lg">
          {heading}
        </h2>
      </div>
      <div className={cn("mask-fade-x mt-6 flex overflow-hidden")}>
        <div className="animate-marquee flex w-max [--marquee-duration:55s] hover:[animation-play-state:paused]">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}

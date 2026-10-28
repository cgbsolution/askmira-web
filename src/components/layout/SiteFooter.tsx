import { ArrowRight, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { footerColumns, legalLinks } from "@/lib/content/nav";
import { siteConfig, signInUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

import { AskMiraLogo } from "./Logo";

const SOCIAL = [
  { key: "linkedin", label: "AskMira on LinkedIn", icon: Linkedin },
  { key: "x", label: "AskMira on X", icon: Twitter },
  { key: "youtube", label: "AskMira on YouTube", icon: Youtube },
  { key: "instagram", label: "AskMira on Instagram", icon: Instagram },
] as const;

const linkClass =
  "rounded-sm text-[0.9375rem] text-white/70 transition-colors outline-none hover:text-white focus-visible:text-white focus-visible:ring-[3px] focus-visible:ring-white/40";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { contact, social, legalName } = siteConfig;
  const socials = SOCIAL.filter((s) => social[s.key]);
  const hasContact = contact.email || contact.phone || contact.address;

  return (
    <footer className="bg-deep relative overflow-hidden text-white">
      <div aria-hidden className="bg-glow pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-30" />
      <div className="container-site relative pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_3fr]">
          <div className="max-w-xs">
            <AskMiraLogo className="h-9" />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/70">
              HR, payroll and culture for Indian companies — one employee record, statutory payroll built in, and connected
              apps for hiring, expenses, support, sales and procurement.
            </p>
            {hasContact && (
              <ul className="mt-6 space-y-2 text-[0.9375rem] text-white/70">
                {contact.email && (
                  <li className="flex items-center gap-2">
                    <Mail className="size-4 text-marigold-400" aria-hidden />
                    <a className={linkClass} href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.phone && (
                  <li className="flex items-center gap-2">
                    <Phone className="size-4 text-marigold-400" aria-hidden />
                    <a className={linkClass} href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.address && (
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-marigold-400" aria-hidden />
                    <span>{contact.address}</span>
                  </li>
                )}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-[0.75rem] font-semibold tracking-[0.1em] text-marigold-300 uppercase">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <Separator className="mt-14 bg-white/15" />
        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-display-4 font-semibold sm:text-3xl">
            Curious how it would work for you?{" "}
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-md text-marigold-300 outline-none hover:text-marigold-200 focus-visible:ring-[3px] focus-visible:ring-white/40"
            >
              Book a demo
              <ArrowRight className="size-6 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </p>
          {socials.length > 0 && (
            <ul className="flex gap-2">
              {socials.map(({ key, label, icon: Icon }) => (
                <li key={key}>
                  <a
                    href={social[key]}
                    aria-label={label}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:ring-[3px] focus-visible:ring-white/40"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Separator className="bg-white/15" />

        <div className="flex flex-col gap-4 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={cn(linkClass, "text-sm")}>
                  {link.title}
                </Link>
              </li>
            ))}
            <li>
              <a href={signInUrl} className={cn(linkClass, "text-sm")}>
                Sign in to AskMira
              </a>
            </li>
          </ul>
          <p>
            © {year} {legalName || "AskMira"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { LifeBuoy, Mail, MapPin, MessageSquareText, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { DemoForm } from "@/components/forms/DemoForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";
import { siteConfig, signInUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Ask about AskMira, pricing, partnerships or integrations. Existing customers can find help inside the product.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = siteConfig;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        eyebrowIcon={<MessageSquareText className="size-4" aria-hidden />}
        title="Talk to the AskMira team"
        lead="Questions about the product, pricing, a partnership or a security review — send us a note and we will reply by email."
        primary={null}
      />
      <section className="section-y-sm bg-background">
        <div className="container-site grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <Reveal>
            <DemoForm showTopic topic="other" submitLabel="Send message" className="border border-cream-200" />
          </Reveal>
          <Reveal delay={0.1} className="grid content-start gap-4">
            <div className="rounded-3xl border border-cream-200 bg-white p-7">
              <LifeBuoy className="size-6 text-brand-700" aria-hidden />
              <h2 className="mt-4 font-display text-xl font-semibold text-ink-950">Already using AskMira?</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                Sign in — every page has a short help guide, and your HR team can answer workspace questions.
              </p>
              <a
                href={signInUrl}
                className="mt-4 inline-flex rounded-sm font-semibold text-brand-800 underline underline-offset-4 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                Sign in to AskMira
              </a>
            </div>
            <div className="rounded-3xl border border-cream-200 bg-white p-7">
              <ShieldCheck className="size-6 text-brand-700" aria-hidden />
              <h2 className="mt-4 font-display text-xl font-semibold text-ink-950">Security review?</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                Choose &ldquo;Something else&rdquo; above and tell us about your questionnaire. Our{" "}
                <Link href="/security" className="font-semibold text-brand-800 underline underline-offset-4">
                  security page
                </Link>{" "}
                covers the basics.
              </p>
            </div>
            {(contact.email || contact.phone || contact.address) && (
              <div className="rounded-3xl bg-marigold-50 p-7">
                <h2 className="font-display text-xl font-semibold text-ink-950">Reach us directly</h2>
                <ul className="mt-4 grid gap-3 text-[0.9375rem] text-ink-700">
                  {contact.email && (
                    <li className="flex items-center gap-2">
                      <Mail className="size-4 text-marigold-800" aria-hidden />
                      <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                        {contact.email}
                      </a>
                    </li>
                  )}
                  {contact.phone && (
                    <li className="flex items-center gap-2">
                      <Phone className="size-4 text-marigold-800" aria-hidden />
                      <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>
                    </li>
                  )}
                  {contact.address && (
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 text-marigold-800" aria-hidden />
                      {contact.address}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

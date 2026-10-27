import { ArrowLeft, CalendarDays, Clock, Info } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/sections/CtaBand";
import { GuideCard, formatLongDate } from "@/components/sections/ResourceCard";
import { Eyebrow } from "@/components/sections/primitives";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { guideBySlug, guides } from "@/lib/content/resources";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return {};
  return pageMetadata({ title: guide.title, description: guide.summary, path: `/resources/guides/${slug}` });
}

const anchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();
  const others = guides.filter((g) => g.slug !== guide.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    dateModified: guide.updated,
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/resources/guides/${guide.slug}`,
  };

  return (
    <>
      <article>
        <header className="bg-gradient-to-b from-blush-50 to-background pt-32 pb-12 sm:pt-36 lg:pt-44">
          <div className="container-site max-w-4xl">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-brand-800 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <ArrowLeft className="size-4" aria-hidden /> All resources
            </Link>
            <div className="mt-6">
              <Eyebrow>{guide.category} guide</Eyebrow>
            </div>
            <h1 className="mt-5 font-display text-display-2 font-semibold text-ink-950">{guide.title}</h1>
            <p className="mt-5 text-lead text-ink-600">{guide.summary}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden /> {guide.readMinutes} min read
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden /> Updated{" "}
                <time dateTime={guide.updated}>{formatLongDate(guide.updated)}</time>
              </span>
            </div>
          </div>
        </header>

        <div className="container-site grid max-w-6xl gap-12 pb-20 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold tracking-[0.08em] text-ink-400 uppercase">On this page</p>
              <ol className="mt-3 grid gap-2 border-l border-cream-300">
                {guide.sections.map((s) => (
                  <li key={s.heading}>
                    <a
                      href={`#${anchor(s.heading)}`}
                      className="-ml-px block border-l-2 border-transparent py-0.5 pl-4 text-sm text-ink-600 outline-none hover:border-brand-500 hover:text-ink-950 focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0 max-w-[68ch]">
            {guide.sections.map((s) => (
              <section key={s.heading} id={anchor(s.heading)} className="mt-12 first:mt-0">
                <h2 className="font-display text-display-4 font-semibold text-ink-950">{s.heading}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mt-4 text-[1.0625rem] leading-[1.75] text-ink-700">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 grid list-disc gap-2.5 pl-6 text-[1.0625rem] leading-[1.7] text-ink-700 marker:text-brand-500">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.table && (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-cream-200 bg-white">
                    {/* table-ok: a static reference table in an article, not a data grid */}
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-cream-50 hover:bg-cream-50">
                          {s.table.head.map((h) => (
                            <TableHead key={h} className="h-11 px-4 font-semibold text-ink-700">
                              {h}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {s.table.rows.map((row) => (
                          <TableRow key={row[0]}>
                            {row.map((cell, i) => (
                              <TableCell key={i} className="px-4 py-3 align-top text-[0.9375rem] whitespace-normal text-ink-700 first:font-semibold first:text-ink-900">
                                {cell}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                {s.note && (
                  <Alert variant="warning" className="mt-5 rounded-2xl">
                    <Info aria-hidden />
                    <AlertDescription>{s.note}</AlertDescription>
                  </Alert>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>

      <section className="section-y-sm bg-white" aria-labelledby="more-guides">
        <div className="container-site">
          <h2 id="more-guides" className="font-display text-display-4 font-semibold text-ink-950">
            More guides
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {others.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  );
}

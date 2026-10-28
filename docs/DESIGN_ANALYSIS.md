# AskMira website — design analysis

Reference reviewed: hibob.com (home, Platform → Core, Solutions → HR, both mega menus), at 1440px
and 390px, on 2026-10-27. This records the patterns we adapted and how they map to AskMira. No
HiBob text, imagery or logos are reused.

## What the reference does

| Area | Pattern |
| --- | --- |
| Header | Transparent over a dark hero, then a floating white bar inset 16px with a rounded edge once you scroll. Logo, five menus (Platform, Solutions, Company, Resources) plus plain links, "Login", a solid red CTA. |
| Mega menus | White rounded panel under the bar. Platform: four product columns, each a headed group with a one-line description and 3–5 sub-links; a second row for AI items. Solutions: "By role / By size / By industry" columns with small illustrated icon tiles, plus a promo card. |
| Hero | Deep wine background, centred two-line serif headline (~64px), one-line sans subhead, two CTAs (solid red, pale pink). A large framed product screenshot sits below and is cut by the fold; a chat panel floats over its right edge. A wine → magenta → orange glow fills the bottom. |
| Trust | "Join N companies…" line with a live counter, then a logo marquee on the gradient band. |
| Platform tour | Pill tabs (Core, Talent, Payroll…). Each tab: left column with a serif title, subhead, five-item checklist, CTA + "Learn more"; right column a product shot in a rounded tinted panel that bleeds off the page edge. |
| Social proof | Horizontal carousel mixing video cards and quote cards, each with a segment chip (Enterprise, Mid-Market). |
| AI | Three cards with gradient image tops and a short title, text and arrow link. |
| Value band | Full-width wine band with three large numbers and a CTA. |
| Audience | "Built for every team": bold full-colour cards (HR, IT, Finance, Payroll) in a carousel. |
| Integrations | Rows of soft white logo tiles drifting horizontally, "All integrations →". |
| Closing | Rounded wine CTA panel; resources carousel; wine footer with four link columns, brand blurb, app badges, an oversized serif "Curious to learn more? Get a free demo →" line, social icons, legal row. |
| Product pages | Cream hero with an illustrated eyebrow badge, centred serif headline, two CTAs; a soft yellow "What is X?" band; stacked pastel panels, each with an eyebrow chip, serif title, checklist and "Learn more". |
| Type | Warm slab serif for every heading (tight tracking, heavy weight); geometric sans for body at 16–18px; uppercase bold buttons. |
| Colour | Wine (#5E0A2E-ish) for depth, hot red/pink for action, cream page background, pastel panels (blush, butter, lilac). |
| Motion | Gentle fade/rise on scroll, marquee logos, tab cross-fades, chat panel types in. Nothing blocks reading. |
| Mobile | Hamburger drawer; CTAs stack full-width; carousels become one card per view; the product shot shrinks rather than crops. |

## How AskMira adapts it

The reference's palette is unusually close to AskMira's logo kit, so we keep the **structure and
rhythm** and swap in our own tokens (`src/app/globals.css`, ramps copied from the portal):

| Reference | AskMira |
| --- | --- |
| Wine hero / bands / footer | `brand-950`–`brand-900` (AskMira Red's own darkest steps) |
| Hot pink CTA | AskMira Red `brand-500` |
| Pale pink secondary button | `blush-100` |
| Magenta → orange glow | Red → Marigold glow — the two logo colours |
| Cream background | Cream `cream-50` (the logo tile) |
| Pastel panels | `blush-50`, `marigold-50`, `cream-100` |
| Slab serif headings | Fraunces (already AskMira's display face in the portal) |
| Geometric sans body | Plus Jakarta Sans; product mockups use Inter, the portal's own face |
| Uppercase buttons | Sentence-case, semibold, fully rounded — closer to the logo's rounded lettering |

Differences on purpose:

- **No invented proof.** We have no approved customer logos, testimonials, ratings, analyst badges
  or ROI figures, so those slots carry what is verifiable instead: product facts (modules,
  statutory coverage, security controls) and clearly labelled placeholders that are easy to fill.
- **Integration honesty.** Each integration carries a status: *Available*, *In pilot* (built, not
  yet verified against a live partner account) or *Planned*, read from the backend's own notes.
- **India first.** Payroll content speaks to PF, ESI, PT, TDS, Form 16 and bank files, which is
  what the product actually ships.
- **No self sign-up.** Every CTA leads to a demo request; "Sign in" goes to the portal.
- **Mockups are built, not screenshotted.** Product previews are composed from the same shadcn
  primitives and tokens, modelled on the real portal shell (ink rail, marigold active pill,
  Fraunces greeting) and filled with the demo seed's sample people, and every preview says
  "Sample data".

## Page map

`/` · `/platform` · `/ai` · 12 feature pages (`/features/[slug]`) · `/solutions/[slug]` (6 audiences) ·
`/integrations` · `/customers` · `/resources` (guides, product updates, FAQ) · `/security` ·
`/about` · `/pricing` · `/demo` · `/contact` · `/privacy` · `/terms`, plus sitemap, robots and
Open Graph images.

## Section rhythm on the home page

Dark hero → trust strip → platform tabs → product showcase (interactive) → feature mosaic →
audiences → Ask Mira (AI) → India payroll band → integrations → security → resources + FAQ →
closing CTA with the demo form → footer. Light and dark sections alternate so the eye gets a
reset roughly every screen, the same cadence as the reference.

## Illustrations (2026-10-28)

The reference's pictures are drawn for each topic, in flat brand colours, on a soft tile. Ours
are too: `src/components/illustrations/spots.tsx` holds about 60 spot illustrations on a 48×48
grid, in wine, AskMira Red, soft pink and a touch of marigold, with a thin "cut" line wherever
shapes overlap. The tones live in `globals.css` (`.spot`); `.spot-muted` greys a picture back
for "planned" items.

- Use `SpotTile` (or `IconChip`, which wraps it) for any picture on a card, menu item, list or
  hero eyebrow (`EyebrowSpot`). Pick the drawing that shows the idea, not the nearest generic one.
- lucide line icons are only for UI glyphs: arrows, checks, chevrons, close, and inside the
  product mockups, which copy the real portal.
- Avoid the patterns that make a page look generated: line icons in circles on every card, big
  faded "01 / 02 / 03" numbers, decorative blobs, gradient headline text, grid-paper backgrounds.
- A new drawing should reuse the same grid, tones and cut lines. Check it on the blush, marigold,
  cream and muted tiles before using it.

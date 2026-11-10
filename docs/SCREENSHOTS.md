# Product screenshots

Every product picture on the site is a real screenshot of the app as it renders
today, shown in a macOS-style window (`components/product/AppWindow.tsx`). The
list, captions and hotspots live in `src/lib/content/screens.ts`; the images in
`src/assets/screens/` (2400 × 1500 JPEG, captured at 1440 × 900, 2× scale).

The drawn previews in `components/product/mock-*.tsx` are only a fallback for a
feature that has no screenshot yet (`featureScreens` in `screens.ts` decides).

## Where the screenshots come from — never real data

| App | Captured from | Data |
| --- | --- | --- |
| AskMira | local QA copy of the database (`askmira_site_qa` on the test cluster), portal run locally | `seed_flows.py` demo company "AskMira Demo" — made-up people |
| AnytimeHire | local backend + frontend against a throwaway database `ath_site_demo` (migrated to head 2026-11-10) | 6 jobs, 44 made-up candidates, `@example.com` emails |
| Expense Genie | the dashboard's own mock mode (`NEXT_PUBLIC_USE_MOCKS=true` and an empty `AUTH_JWT_SECRET`, set in a temporary `.env.development.local`), signed in as `admin@acme.com`, then the browser clock moved to 20 May 2026 so "this month" has its sample claims | the app's built-in "Acme" sample company |
| CGB Helpdesk | the older local copy (`E:\cgb-code\CGB-Helpdesk`, same screens) against a throwaway database `helpdesk_site_demo`; the logo is the current CGB Helpdesk logo | 26 made-up tickets, 16 assets |
| ProcureFlow | local API + frontend against a throwaway database `pf_site_demo`: Prisma migrations, `apply-security.ts`, then the repo's seeds (star-cement, slice1–9, slice10a). Background jobs off, Redis/email/storage pointed at dead local ports | the seed's tenant and suppliers renamed to made-up names ("Demo Manufacturing", "Tarun Steel", "Hilltop Thermal"…) because the seed uses real company names |
| Saleinx | a temporary copy of the app (another dev server owned the repo folder) against a throwaway database `sx_site_demo`: `drizzle/*.sql` in order (pgvector column stored as `real[]`, grants to Supabase roles skipped), then `seed-demo-data.ts` | tenant "Demo Company"; the seed's 30 real company names (Infosys, Stripe…) swapped for made-up ones with `.example` domains |

No screenshot was taken against a production or shared database.

## Re-theme, 2026-11-10

AnytimeHire, Expense Genie, ProcureFlow, Saleinx and CGB Helpdesk were re-themed
to AskMira's palette (maroon rail, Marigold active pill, cream page, Fraunces
titles), and the AnytimeHire, Expense Genie, ProcureFlow and Saleinx screens were
recaptured. Hide the Next.js dev badge (`nextjs-portal`) when capturing.

## Still missing

- **CGB Helpdesk** screens are still the older blue ones. The current app talks
  straight to Supabase from the browser, and only the production project exists.
  A demo project on Supabase (or a local Supabase) is needed to capture the
  re-themed screens.

## Refreshing

Run the app locally on sample data, sign in, open each page at 1440 × 900 with
device scale 2, wait for loading skeletons to clear, and save a JPEG. Resize to
2400 px wide (quality 80) into `src/assets/screens/` under the same file name.
Hotspot positions are percentages of the image, so re-check them if a screen's
layout changes.

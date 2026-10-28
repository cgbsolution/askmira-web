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
| AnytimeHire | local backend + frontend against a throwaway database `ath_site_demo` | 6 jobs, 44 made-up candidates, `@example.com` emails |
| Expense Genie | the dashboard's own mock mode (`NEXT_PUBLIC_USE_MOCKS=true`), browser clock set to 20 May 2026 so "this month" has its sample claims | the app's built-in "Acme" sample company |
| CGB Helpdesk | the older local copy (`E:\cgb-code\CGB-Helpdesk`, same screens) against a throwaway database `helpdesk_site_demo`; the logo is the current CGB Helpdesk logo | 26 made-up tickets, 16 assets |
| ProcureFlow, Saleinx | their public sign-in pages only | — |

No screenshot was taken against a production or shared database.

## Still missing

- **ProcureFlow and Saleinx** have no dashboard screenshots: they are login-only
  and no demo account was available. With a demo account (credentials kept in a
  password manager or environment variables, never in this repo) their
  dashboards can be captured the same way. Use a demo company, not live data.
- **CGB Helpdesk**: the current app runs on the production Supabase project, so it
  was not used. A demo organisation there, or a local Supabase, would allow
  screenshots of the newest screens.

## Refreshing

Run the app locally on sample data, sign in, open each page at 1440 × 900 with
device scale 2, wait for loading skeletons to clear, and save a JPEG. Resize to
2400 px wide (quality 80) into `src/assets/screens/` under the same file name.
Hotspot positions are percentages of the image, so re-check them if a screen's
layout changes.

# Integration status — AskMira and the connected apps

Checked on 2026-10-28 against source code. The website's `/connected-platform` page, the home
"Beyond HR" section and the Ask Mira page read their labels from
[src/lib/content/ecosystem.ts](../src/lib/content/ecosystem.ts); change a status there and every page follows.

| Label on the site | Meaning |
| --- | --- |
| Live | Built and working, checked in both products' code. |
| Partly connected | Some of it works; the rest is listed below. |
| Not connected yet | Both products have what is needed; the link between them is not built. |
| Planned | On the roadmap, not built. |

## What was inspected

| Product | Where | Inspected |
| --- | --- | --- |
| AskMira HRMS | `C:\cgbcode\askmira` | Source. `backend/app/services/products/*` (connectors), `positions/*` (headcount budgets, budget checks, scenarios), `models/hiring.py` (requisitions), `services/companion/tools.py` (Ask Mira lookups). |
| AnytimeHire | `C:\Users\Deepak\Desktop\code-files\Inteview-Tool` | Source. `app/routers/askmira.py` (the AskMira link), jobs, candidates, interviews, talent agent (`TALENT_AGENT.md`). |
| Expense Genie | `C:\cgbcode\expgenie` | Source. `expenses-backend/routes/askmira.js` (the AskMira link), categories (monthly budgets), integrations (SAP/HRMS config), dashboard pages, `expenses-ginie` mobile app. |
| CGB Helpdesk | `E:\cgb-code\CGB-Helpdesk` | Source. Tickets with SLA, assets with assignments, multi-organisation access. **This local copy has no AskMira endpoints**, so the live AskMira ↔ Helpdesk link was verified from AskMira's side only; the deployed helpdesk must be a newer version than this folder. |
| ProcureFlow | https://vendor.artboxsolutions.ai/ | **Public sign-in page only.** No password was available (none supplied, none in environment variables), and no local source was found. Public description: "Multi-tenant Procure-to-Pay for Indian manufacturing"; buyer portal plus a supplier portal. |
| Saleinx (the CRM; the brief calls it "Salenix") | https://crm.artboxsolutions.ai/ | **Public sign-in page only**, same reason. Public description: "operational CRM with built-in analytics, automation, and team collaboration". |

Because ProcureFlow and Saleinx could not be inspected, the site claims only their public
descriptions, and every connection to them is "Planned". To verify more, share the source
repositories or set credentials in a secure store (not in chat or code) and re-run the inspection.

## Connections

| From | To | Status | What exists | Still to build |
| --- | --- | --- | --- | --- |
| AskMira | AnytimeHire | Live | One-click connect (PKCE, per-workspace secret), single sign-on (one-time launch token), people sync (provision + roster sync), Ask Mira read-only lookups of jobs, candidates and interviews; AskMira's Hiring section shows AnytimeHire's records. | — |
| AskMira requisition | AnytimeHire job | Not connected yet | AskMira requisitions (department, openings, CTC range); AnytimeHire jobs API (department, max CTC budget). | On requisition approval, create or update the AnytimeHire job (signed `use=provision` call, as for people sync). |
| AnytimeHire hire | AskMira joiner | Not connected yet | AnytimeHire candidate status `hired`; AskMira onboarding creates joiners. | A signed call from AnytimeHire (or a poll from AskMira) that hands the hired candidate to Add employees → joiner plan. |
| AskMira | Expense Genie | Live | Same link pattern as AnytimeHire; claims shown inside AskMira (`/linked/expense/*`); Ask Mira lookups of claims and totals. | — |
| Expense Genie payout | AskMira payroll | Not connected yet | Expense Genie records payments (`POST /:id/payment`); AskMira pays salary reimbursements raised in AskMira. | Send approved, unpaid claims to the next payroll run; mark them paid in Expense Genie. |
| Expense Genie budgets | AskMira department budgets | Planned | Expense Genie budgets are monthly **per category** (`categories.monthly_budget`); its admin dashboard notes "no budgets table yet". | Department (or cost-centre) budgets in Expense Genie, or spend reported to AskMira by department. |
| AskMira | CGB Helpdesk | Live (AskMira side verified) | Raise and reply to tickets from AskMira (in the helpdesk, as the person); asset register; Ask Mira lookups of tickets and assets. | Bring the local `E:` copy up to date with the deployed version. |
| Saleinx forecast | AskMira budgets | Planned | — | Forecast feed (API or export) and a place beside the department budget. |
| ProcureFlow | AskMira budgets and approvals | Planned | — | People and departments from AskMira; purchase requests checked against department budgets. |
| ProcureFlow purchase | Asset register | Planned | — | Register delivered equipment as an asset and assign it to the joiner it was bought for. |
| Ask Mira | Budgets, Saleinx, ProcureFlow | Planned | Ask Mira has no budget lookup; AskMira enforces budgets only when positions are created. | Read-only lookups for each, under the asker's permissions (same `use=query` pattern). |

Not claimed anywhere on the site: SAP posting from Expense Genie (config exists, posting is
switched off in code by request), any live data exchange with Saleinx or ProcureFlow, Mira taking
actions or approving anything.

## The budget preview

`src/components/product/mock-budget.tsx` is labelled **"Concept preview · sample data"** because the
combined view (budget + Expense Genie spend + ProcureFlow commitments + Saleinx forecast) does not
exist. Its arithmetic is in the file header and adds up. What does exist in AskMira today — department
headcount budgets, budget checks on new positions, what-if scenarios, requisitions with a CTC range —
is listed beside it on the page.

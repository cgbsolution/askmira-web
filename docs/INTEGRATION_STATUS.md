# Connections — AskMira and the connected apps

Checked on 2026-11-05 against each product's code. The website's `/connected-platform` page, the
home "Beyond HR" section and the Ask Mira page read from
[src/lib/content/ecosystem.ts](../src/lib/content/ecosystem.ts); integrations from
[src/lib/content/integrations.ts](../src/lib/content/integrations.ts).

The site lists only what is built. Every connection below is built in both products; each one is
called out in the code that implements it.

## Connections

| From | To | What it does | Where it is built |
| --- | --- | --- | --- |
| AskMira | AnytimeHire | One-click connect (PKCE, per-workspace secret), single sign-on, people sync, Ask Mira lookups. | AskMira `services/products`; AnytimeHire `app/routers/askmira.py` |
| AskMira requisition | AnytimeHire job | The last approval opens the job there (`job.open`, keyed by the requisition, so never twice); HR can retry. | AskMira `services/hiring/linked_jobs.py` |
| AnytimeHire hire | AskMira joiner | Hired candidates listed under Onboarding → Add employees → Hired in AnytimeHire, the form filled in. | AnytimeHire query `hires`; AskMira `services/onboarding/linked_hires.py` |
| Saleinx order | AnytimeHire + P&L | Ask Mira books a won, approved order: positions open in AnytimeHire, prospective P&L in AskMira; a failed step undoes the rest. | AskMira `services/companion/order_win.py` |
| AskMira | Expense Genie | One-click connect, single sign-on, people sync, claims inside AskMira, Ask Mira lookups. | Expense Genie `routes/askmira.js` |
| Expense Genie claims | AskMira payroll | Approved, unpaid INR claims become untaxed reimbursement lines; the run's approval records each once and marks it paid in Expense Genie (retried hourly). | Expense Genie `payable`, `claims.paid`; AskMira `payroll/inputs.py` (ExpenseGenieClaimProvider), `payroll/linked_expenses.py` |
| Expense Genie spend | AskMira budgets | Approved claims added up by each submitter's department. | AskMira `services/positions/spend.py` |
| AskMira | CGB Helpdesk | Tickets inside AskMira, the asset register, Ask Mira lookups and ticket actions; managers' team tickets; joiners' equipment. | Helpdesk `src/lib/askmira` (scope `team`, `holdings`) |
| AskMira | Saleinx | One-click connect, single sign-on, people sync with Saleinx's roles; deals, pipeline, Wons to approve; Ask Mira lead/stage/approval actions. | Saleinx `src/lib/askmira` |
| AskMira | ProcureFlow | One-click connect, single sign-on, people sync with ProcureFlow's roles; approvals, requisitions, orders, invoices, budgets; Ask Mira approvals. | ProcureFlow `apps/api/src/integrations/askmira` |
| ProcureFlow budgets | AskMira budgets | Cost-centre allocated/committed/available beside the department of the same name. | AskMira `services/positions/spend.py` |
| ProcureFlow receipt | Asset register | Received units become assets — CGB Helpdesk's register (`asset.create`, IT team only) or AskMira's — once each. | ProcureFlow `receipts`; AskMira `services/assets/received.py` |
| Ask Mira | Every app | Lookups and confirmed actions as the person, with their role in each app. | AskMira `services/companion` |

## Integrations that use the customer's own account

LinkedIn, Naukri, Indeed, Google Calendar, Microsoft 365, Digio, WhatsApp, Slack, Microsoft Teams
and the BI bucket each connect with the customer's own account, key or bot. Their adapters follow
each provider's published API and are tested against faithful fakes of it (the S3 signing against
AWS's own published examples). Before a customer relies on one, run it once with that customer's
real account.

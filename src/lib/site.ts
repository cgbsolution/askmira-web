/**
 * Site-wide settings. Everything a launch needs to change — addresses, links,
 * contact details — lives here.
 *
 * Contact details and social profiles are deliberately empty: the repository
 * has no approved company details, and the site must not show invented ones.
 * An empty value hides its line or icon; fill it in and it appears.
 */

const trimSlash = (value: string) => value.replace(/\/+$/, "");

type SiteConfig = {
  name: string;
  title: string;
  description: string;
  url: string;
  appUrl: string;
  locale: string;
  contact: { email: string; phone: string; address: string };
  social: { linkedin: string; x: string; youtube: string; instagram: string };
  legalName: string;
  /** The person who answers privacy questions and grievances (DPDP s.8(9)). */
  grievanceOfficer: { name: string; email: string };
};

export const siteConfig: SiteConfig = {
  name: "AskMira",
  title: "AskMira — HR, payroll and culture for Indian companies",
  description:
    "AskMira runs attendance, leave, payroll and statutory filings for Indian companies, and connects HR to hiring, expenses, support, sales and procurement apps.",
  /** This website's public address — canonical URLs, sitemap, Open Graph. */
  url: trimSlash(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3200"),
  /** The AskMira portal ("Sign in"). */
  appUrl: trimSlash(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  locale: "en_IN",

  /** Shown in the footer and on /contact when set. */
  contact: {
    email: "",
    phone: "",
    address: "",
  },

  /** A footer icon appears for each profile that has a URL. */
  social: {
    linkedin: "",
    x: "",
    youtube: "",
    instagram: "",
  },

  /** The legal entity named in the copyright line and the legal pages. */
  legalName: "",

  /**
   * Named on /privacy. Set by environment so the real person is decided at
   * launch, not invented here; until then the page says none is named yet.
   */
  grievanceOfficer: {
    name: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_NAME ?? "",
    email: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_EMAIL ?? "",
  },
};

export const signInUrl = `${siteConfig.appUrl}/signin`;

/** Routes whose hero is the dark band, so the header starts in its light-on-dark state. */
export const DARK_HERO_ROUTES = new Set(["/", "/platform", "/ai", "/demo", "/connected-platform"]);

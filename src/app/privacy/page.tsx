import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "How the AskMira website handles the information you share with us.",
  path: "/privacy",
});

/** Who to write to, as configured for launch — never an invented address. */
function grievanceLine(): string {
  const { name, email } = siteConfig.grievanceOfficer;
  if (name && email) return `Our grievance officer is ${name}, at ${email}.`;
  if (email) return `Write to our grievance officer at ${email}.`;
  return "Our grievance officer will be named here before launch. Until then, send your request through the contact form and the AskMira team will answer it.";
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="29 October 2026"
      intro="This policy covers this website. How AskMira handles employee data inside a customer's workspace is set out in that customer's agreement with us, and in the privacy notice each workspace shows its own employees."
      sections={[
        {
          heading: "What we collect",
          paragraphs: ["When you fill in the demo or contact form, we collect what you type:"],
          list: [
            "Your name, work email and company",
            "Optionally, your phone number, role, company size, the modules you are interested in and your message",
            "The page you sent the form from, and the network address it came from (used to limit abuse)",
          ],
        },
        {
          heading: "What we do not collect",
          list: [
            "No advertising or third-party tracking scripts run on this website",
            "No cookies are set to profile you",
            "Fonts and images are served from this website, not from third parties",
          ],
        },
        {
          heading: "How we use it",
          list: [
            "To reply to your request and arrange a demo",
            "To prepare a quote if you ask for one",
            "Nothing else — we do not sell or share it for marketing",
          ],
        },
        {
          heading: "Where it is kept, and for how long",
          paragraphs: [
            "Form submissions are stored in the AskMira platform's database in India, visible only to the AskMira team. Each one is deleted automatically 12 months after the last time we were in touch about it, and sooner if you ask.",
            "Emails we send you about your request go through our email provider, Google, which may process them outside India.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Under India's Digital Personal Data Protection Act, 2023 you can ask to see, correct or erase the information you gave us, withdraw your consent to be contacted, and nominate someone to do this for you if you cannot.",
            grievanceLine(),
            "If you are not satisfied with our answer, you can complain to the Data Protection Board of India through its online complaint service.",
          ],
        },
      ]}
    />
  );
}

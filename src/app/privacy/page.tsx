import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "How the AskMira website handles the information you share with us.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="27 October 2026"
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
            "Form submissions are stored in the AskMira platform's database, visible only to the AskMira team, and kept for as long as we are discussing AskMira with you. You can ask us to delete them at any time.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Under India's Digital Personal Data Protection Act, 2023 you can ask to see, correct or erase the information you gave us, and withdraw your consent. Send the request through the contact form and we will act on it.",
          ],
        },
      ]}
    />
  );
}

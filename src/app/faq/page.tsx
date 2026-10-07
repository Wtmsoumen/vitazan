import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Frequently Asked Questions" };

export default function FAQPage() {
  return (
    <LegalPage
      title="Frequently Asked Questions"
      intro="Quick answers to common questions about browsing Vitazan, product information, and getting support. These are sample answers for layout review."
      sections={[
        { title: "Where can I find product information?", paragraphs: ["Visit the Shop page and open a product to view its description and available details. Product information on this sample site should be confirmed against current packaging and approved product materials."] },
        { title: "Can I ask a healthcare professional about a product?", paragraphs: ["Yes. If you have a health condition, take medication, or are unsure whether a product is suitable for you, ask a qualified healthcare professional before use."] },
        { title: "How can I contact Vitazan?", paragraphs: ["Use the Contact Us page to send a message to the support team. Response times and support hours should be added once confirmed."] },
        { title: "Where can I find order or delivery help?", paragraphs: ["For assistance with an order, contact support with your order reference and the email address used at checkout. Add confirmed delivery and returns details here when available."] },
      ]}
    />
  );
}

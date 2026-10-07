import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="These sample terms describe a general framework for browsing a website and placing an order. Replace this text with the company’s approved terms before publication."
      sections={[
        { title: "Using this website", paragraphs: ["You may use this website to learn about Vitazan and its products for lawful, personal purposes. Please provide accurate information when using forms or placing an order.", "Website content is provided for general information and may be updated as products and services change."] },
        { title: "Product information and orders", paragraphs: ["Product descriptions, availability, and prices shown online are examples and may change. An order is subject to confirmation and availability.", "If an order cannot be fulfilled, customer support should contact the customer using the details supplied at checkout."] },
        { title: "Health information", paragraphs: ["Website content is not medical advice and is not a substitute for advice from a qualified healthcare professional. Read product labels and consult a professional about questions specific to your health."] },
        { title: "Contact", paragraphs: ["For questions about these sample terms, contact the Vitazan support team through the Contact Us page."] },
      ]}
    />
  );
}

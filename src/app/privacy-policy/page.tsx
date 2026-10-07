import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This sample notice explains common privacy topics in plain language. It does not describe verified Vitazan data practices and must be replaced with an approved privacy notice."
      sections={[
        { title: "Information you provide", paragraphs: ["A website may receive information that you choose to submit, such as your name, email address, delivery details, or message when using a form or placing an order."] },
        { title: "How information may be used", paragraphs: ["Information submitted through the website may be used to respond to requests, process orders, provide support, and maintain the service. The company’s actual purposes and legal basis should be stated in the approved notice."] },
        { title: "Cookies and service providers", paragraphs: ["The website or service providers may use technical tools such as cookies to support site operation. Add the actual tools, providers, retention periods, and user choices here before publication."] },
        { title: "Your choices and contact", paragraphs: ["Add the process for privacy requests, applicable rights, and the correct privacy contact address after these details have been confirmed by the company."] },
      ]}
    />
  );
}

import type { Metadata } from "next";
import { Lato, Gilda_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/client/Header";
import Footer from "@/components/client/Footer";
import Layout from "@/components/client/layout";

const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

const gildaDisplay = Gilda_Display({
  variable: "--font-gilda",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vitazan - Your Trusted Vitality Store",
  description:
    "Vitazan - Natural health supplements for wellness unleashed. Shop cold & cough remedies, gut health, bone & joint care, vitamins & nutrition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${gildaDisplay.variable} antialiased`}>
      <Layout>
        <body className="min-h-full flex flex-col font-sans">{children}</body>
      </Layout>
    </html>
  );
}

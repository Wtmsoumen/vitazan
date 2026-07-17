import type { Metadata } from "next";
import { Inter, Gilda_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} ${gildaDisplay.variable} antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

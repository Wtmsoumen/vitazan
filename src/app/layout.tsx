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
  metadataBase: new URL("https://vitazan.com"),
  title: {
    default: "Vitazan - Your Trusted Vitality Store for Wellness Unleashed",
    template: "%s | Vitazan",
  },
  description:
    "Premium Ayurvedic health supplements crafted for wellness. Shop SENAX, HT-KOF, OSTEOMAC, RELOAD — cold & cough remedies, gut health, bone & joint care, vitamins & nutrition. GMP certified, plant-based, lab tested.",
  keywords: [
    "Vitazan",
    "Ayurvedic supplements",
    "health supplements",
    "herbal medicine",
    "cold and cough remedy",
    "bone health",
    "gut health",
    "vitamins",
    "nutrition",
    "SENAX",
    "HT-KOF",
    "OSTEOMAC",
    "RELOAD",
    "natural wellness",
    "plant based supplements",
    "GMP certified",
  ],
  authors: [{ name: "Vitazan", url: "https://vitazan.com" }],
  creator: "Vitazan",
  publisher: "Vitazan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/images/favicon.ico", sizes: "48x48" },
      { url: "/images/icon.png", sizes: "76x92", type: "image/png" },
      { url: "/images/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/images/icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vitazan.com",
    siteName: "Vitazan",
    title: "Vitazan - Your Trusted Vitality Store for Wellness Unleashed",
    description:
      "Premium Ayurvedic health supplements crafted for wellness. Shop cold & cough remedies, gut health, bone & joint care, vitamins & nutrition.",
    images: [
      {
        url: "/images/banner.png",
        width: 1600,
        height: 645,
        alt: "Vitazan - Premium Ayurvedic Health Supplements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitazan - Your Trusted Vitality Store for Wellness Unleashed",
    description:
      "Premium Ayurvedic health supplements crafted for wellness. Shop cold & cough remedies, gut health, bone & joint care, vitamins & nutrition.",
    images: ["/images/banner.png"],
    creator: "@vitazan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://vitazan.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${gildaDisplay.variable} antialiased`}>
      <head>
        <meta name="theme-color" content="#00485d" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <Layout>
        <body className="min-h-full flex flex-col font-sans">{children}</body>
      </Layout>
    </html>
  );
}

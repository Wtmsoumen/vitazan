import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Ayurvedic Health Supplements",
  description:
    "Browse Vitazan's premium Ayurvedic health supplements — SENAX for digestion, HT-KOF for cold & cough, OSTEOMAC for bone health, RELOAD for daily vitality. GMP certified, plant-based, lab tested.",
  keywords: [
    "buy Ayurvedic supplements",
    "herbal health products online",
    "Vitazan shop",
    "SENAX supplement",
    "HT-KOF cough syrup",
    "OSTEOMAC calcium",
    "RELOAD electrolyte",
    "natural remedies",
  ],
  openGraph: {
    title: "Shop Ayurvedic Health Supplements | Vitazan",
    description:
      "Browse Vitazan's premium Ayurvedic health supplements. GMP certified, plant-based, lab tested products for your wellness journey.",
    url: "https://vitazan.com/shop",
    images: [
      {
        url: "/images/banner_shop.png",
        width: 3200,
        height: 1200,
        alt: "Vitazan Shop - Premium Ayurvedic Health Supplements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Ayurvedic Health Supplements | Vitazan",
    description:
      "Browse Vitazan's premium Ayurvedic health supplements. GMP certified, plant-based, lab tested.",
    images: ["/images/banner_shop.png"],
  },
  alternates: {
    canonical: "https://vitazan.com/shop",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

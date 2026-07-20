import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vitazan - Your Trusted Vitality Store",
    short_name: "Vitazan",
    description:
      "Premium Ayurvedic health supplements for wellness unleashed. Shop cold & cough remedies, gut health, bone & joint care, vitamins & nutrition.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00485d",
    icons: [
      {
        src: "/images/icon.png",
        sizes: "76x92",
        type: "image/png",
      },
      {
        src: "/images/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}

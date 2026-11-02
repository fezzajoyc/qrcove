import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QRCove — free QR tools",
    short_name: "QRCove",
    description:
      "Free QR code generator and reader that runs entirely in your browser. No watermark, no expiry.",
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

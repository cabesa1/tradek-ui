import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TradeK",
    short_name: "TradeK",
    description: "Supply Chain Finance, procurement internacional e operações entre China e Brasil.",
    start_url: "/",
    display: "standalone",
    background_color: "#090b0a",
    theme_color: "#c3f929",
    lang: "pt-BR",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

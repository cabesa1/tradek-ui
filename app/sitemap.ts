import type { MetadataRoute } from "next";

const SITE_URL = "https://www.tradek.com.br";
const LAST_CONTENT_UPDATE = "2026-09-17";

const pages: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/scf", changeFrequency: "monthly", priority: 0.9 },
  { path: "/proc", changeFrequency: "monthly", priority: 0.9 },
  { path: "/motos", changeFrequency: "weekly", priority: 0.8 },
  { path: "/sobre", changeFrequency: "yearly", priority: 0.6 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contato", changeFrequency: "yearly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency,
    priority,
  }));
}

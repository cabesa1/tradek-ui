import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules:{userAgent:"*",allow:"/",disallow:["/admin/"]}, sitemap:"https://www.tradek.com.br/sitemap.xml", host:"https://www.tradek.com.br" }; }

import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { return ["","/scf","/proc","/motos","/sobre","/faq","/contato"].map((route,index)=>({url:`https://www.tradek.com.br${route}`,lastModified:new Date(),changeFrequency:index===0?"weekly":"monthly",priority:index===0?1:.7})); }

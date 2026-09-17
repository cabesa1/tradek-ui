import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/google-analytics";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tradek.com.br"),
  title: { default: "TradeK | Importação financiada e Procurement na China", template: "%s | TradeK" },
  description: "Crédito para importação, procurement internacional e fornecedores chineses. Estruture sua operação da China ao Brasil com a TradeK.",
  keywords: ["importação da China", "Supply Chain Finance", "procurement internacional", "fornecedores na China", "financiamento de importação"],
  applicationName: "TradeK",
  authors: [{ name: "TradeK", url: "https://www.tradek.com.br" }],
  creator: "TradeK",
  publisher: "TradeK",
  category: "Comércio exterior",
  openGraph: { title: "TradeK | Importe da Ásia sem travar o seu caixa", description: "Crédito, fornecedores e gestão para operações entre China e Brasil.", url: "/", siteName: "TradeK", locale: "pt_BR", type: "website" },
  twitter: { card: "summary_large_image", title: "TradeK | Importe da Ásia sem travar o seu caixa", description: "Crédito, fornecedores e gestão para operações entre China e Brasil." },
  robots: { index: true, follow: true },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://www.tradek.com.br/#organization", name: "TradeK", url: "https://www.tradek.com.br", email: "tradek@globalk.com.br", logo: "https://www.tradek.com.br/favicon.svg" },
    { "@type": "WebSite", "@id": "https://www.tradek.com.br/#website", url: "https://www.tradek.com.br", name: "TradeK", inLanguage: "pt-BR", publisher: { "@id": "https://www.tradek.com.br/#organization" } },
  ],
};

export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body><JsonLd data={organizationSchema}/>{children}<GoogleAnalytics/></body></html>; }

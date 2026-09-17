import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tradek.com.br"),
  title: { default: "TradeK | Importação financiada e Procurement na China", template: "%s | TradeK" },
  description: "Crédito para importação, procurement internacional e fornecedores chineses. Estruture sua operação da China ao Brasil com a TradeK.",
  openGraph: { title: "TradeK | Importe da Ásia sem travar o seu caixa", description: "Crédito, fornecedores e gestão para operações entre China e Brasil.", url: "/", siteName: "TradeK", locale: "pt_BR", type: "website" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }

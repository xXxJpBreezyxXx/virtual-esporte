import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "@/components/CheckoutProvider";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Virtual Esporte | Camisas de Seleções Premium - Copa 2026",
  description: "Compre Camisas de Seleções da Copa do Mundo 2026. Qualidade Tailandesa 1:1, Padrão Oficial, Frete Grátis e Compra Segura. Vista a sua paixão!",
  keywords: "camisas de futebol, camisas de seleções, copa do mundo 2026, camisa tailandesa 1:1, camisa de time premium, virtual esporte, camisa do brasil, camisa da argentina",
  openGraph: {
    title: "Virtual Esporte | Camisas de Seleções Premium - Copa 2026",
    description: "Camisas Tailandesas 1:1 Padrão Oficial. Frete Grátis para todo o Brasil. Qualidade Impecável.",
    url: "https://virtualesporte.com.br",
    siteName: "Virtual Esporte",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SportsStore",
  "name": "Virtual Esporte",
  "description": "Loja especializada em camisas de seleções de futebol premium, qualidade Tailandesa 1:1 para a Copa do Mundo 2026.",
  "url": "https://virtualesporte.com.br",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <CheckoutProvider>
          {children}
        </CheckoutProvider>
      </body>
    </html>
  );
}

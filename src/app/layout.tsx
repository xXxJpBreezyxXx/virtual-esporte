import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import Script from "next/script";
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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Virtual Esporte | Camisas de Seleções Premium - Copa 2026",
    description: "Camisas Tailandesas 1:1 Padrão Oficial. Frete Grátis para todo o Brasil. Qualidade Impecável.",
    url: "https://virtualesporte.com.br",
    siteName: "Virtual Esporte",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://virtualesporte.com.br/og-image.png",
        width: 1200,
        height: 630,
        alt: "Virtual Esporte - Camisas de Seleções Copa 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Esporte | Camisas Premium Copa 2026",
    description: "Camisas Tailandesas 1:1 Padrão Oficial. Frete Grátis para todo o Brasil.",
    images: ["https://virtualesporte.com.br/og-image.png"],
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T3CHKJLR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T3CHKJLR');`}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MYMY0SSFEQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MYMY0SSFEQ');
          `}
        </Script>

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

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/site";

// Güvenli URL (site.url boş/yanlışsa localhost'a düş)
const SAFE_URL =
  typeof site?.url === "string" && /^https?:\/\//i.test(site.url)
    ? site.url
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SAFE_URL),
  title: {
    default: "Mulun Hukuk & Danışmanlık",
    template: "%s | Mulun Hukuk & Danışmanlık",
  },
  description:
    "Yabancılar, İcra, Ceza ve Ticaret/Taşıma hukukunda butik ve sonuç odaklı hizmet.",
  alternates: { canonical: SAFE_URL },
  openGraph: {
    type: "website",
    url: SAFE_URL,
    title: "Mulun Hukuk & Danışmanlık",
    description:
      "Yabancılar, İcra, Ceza ve Ticaret/Taşıma hukukunda butik ve sonuç odaklı hizmet.",
    images: [`${SAFE_URL}/og.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mulun Hukuk & Danışmanlık",
    description:
      "Yabancılar, İcra, Ceza ve Ticaret/Taşıma hukukunda butik ve sonuç odaklı hizmet.",
    images: [`${SAFE_URL}/og.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#0a1b36",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Schema.org — LegalService
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site?.name ?? "Mulun Hukuk & Danışmanlık",
    url: SAFE_URL,
    image: `${SAFE_URL}/og.jpg`,
    logo: `${SAFE_URL}/og.jpg`,
    telephone: site?.phone || undefined,
    email: site?.email || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: site?.address?.street || undefined,
      addressLocality: site?.address?.locality || undefined,
      addressRegion: site?.address?.region || undefined,
      postalCode: site?.address?.postalCode || undefined,
      addressCountry: site?.address?.country || "TR",
    },
    geo: site?.coords
      ? { "@type": "GeoCoordinates", latitude: site.coords.lat, longitude: site.coords.lng }
      : undefined,
    areaServed: "TR",
  };

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Kritik görseller için preload */}
        <link rel="preload" as="image" href="/og.jpg" />
        <link rel="preload" as="image" href="/hero.jpg" />
      </head>
      <body>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        {children}

        {/* Google Analytics 4 — G-XXXXXXX'i kendi GA ID'nizle değiştirin */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
          `}
        </Script>

        {/* Microsoft Clarity — "abcd12345" yerine kendi Clarity ID'nizi yazın */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "abcd12345");
          `}
        </Script>
      </body>
    </html>
  );
}

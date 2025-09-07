export type SiteAddress = {
  street?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?: string; // ISO-2, örn: "TR"
};

export type SiteConfig = {
  name: string;
  url: string;               // Mutlaka tam URL (https ile)
  description?: string;
  email?: string;
  phone?: string;
  address?: SiteAddress;
  coords?: { lat: number; lng: number };
  defaultLocale?: "tr" | "en" | "ar";
  locales?: Array<"tr" | "en" | "ar">;
  logoPath?: string;
  ogImagePath?: string;
};

export const site: SiteConfig = {
  name: "Mulun Hukuk & Danışmanlık",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "Yabancılar, İcra, Ceza ve Ticaret/Taşıma hukukunda butik ve sonuç odaklı hizmet.",
  email: "", // örn: "info@mulunhukuk.com"
  phone: "", // örn: "+90 212 000 00 00"
  address: {
    street:
      "Kartaltepe Mah. Süvari Cad. Metropark Sefaköy Sitesi (Torkam E-5) D-1 Blok Ofis No: 9",
    locality: "Küçükçekmece",
    region: "İstanbul",
    postalCode: "", // varsa ekle
    country: "TR",
  },
  // coords: { lat: 41.0000, lng: 28.8000 }, // istersen ekleriz
  defaultLocale: "tr",
  locales: ["tr", "en", "ar"],
  logoPath: "/logo.png",
  ogImagePath: "/og.jpg",
};

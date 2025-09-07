// app/feed.xml/route.ts
import { NextResponse } from "next/server";
import { site } from "@/lib/site";

// Şimdilik makaleleri elden giriyoruz. Sonradan gerçek veriden doldurabilirsiniz.
const ARTICLES = [
  {
    title: "Geri Gönderme Merkezi Süreçlerinde Hak Arama Yolları",
    slug: "geri-gonderme-merkezi-hak-arama",
    date: "2025-08-10",
    excerpt: "İdari gözetim kararlarına karşı itiraz ve serbest bırakılma talepleri…",
  },
  {
    title: "Aidat Alacaklarının İcrası: Pratik Yol Haritası",
    slug: "aidat-alacaklari-icra",
    date: "2025-07-28",
    excerpt: "Aidat borçlarının hızlı tahsili için temel stratejiler…",
  },
  {
    title: "Taşıma Sözleşmelerinde CMR – Hamburg – Rotterdam",
    slug: "tasima-sozlesmeleri-sorumluluk",
    date: "2025-07-12",
    excerpt: "Hangi rejimde hangi sorumluluk sınırları geçerli? Kısa karşılaştırma…",
  },
];

export async function GET() {
  const base = site.url.replace(/\/$/, "");
  const items = ARTICLES.map((a) => {
    const url = `${base}/makaleler/${a.slug}`;
    return `
      <item>
        <title><![CDATA[${a.title}]]></title>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <pubDate>${new Date(a.date).toUTCString()}</pubDate>
        <description><![CDATA[${a.excerpt}]]></description>
      </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title><![CDATA[${site.name} – Makaleler]]></title>
      <link>${base}</link>
      <description><![CDATA[Yabancılar, İcra, Ceza ve Ticaret/Taşıma hukukunda içerikler]]></description>
      <language>tr-TR</language>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

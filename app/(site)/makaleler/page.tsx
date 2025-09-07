"use client";

import { useMemo, useState } from "react";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Search, ArrowDownAZ, ArrowUpAZ, Tag } from "lucide-react";
import { site } from "@/lib/site"; // JSON-LD için site bilgileri

type Article = {
  id: number;
  title: string;
  tag: string;
  date: string; // ISO (yyyy-mm-dd)
  excerpt: string;
  href: string; // detay sayfası yolu (örn: /makaleler/geri-gonderme-merkezi)
  image?: string; // ✅ küçük görsel (thumbnail)
};

// Örnek veri — görselleri public/articles/ altına koyabilirsiniz
const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Geri Gönderme Merkezi Süreçlerinde Hak Arama Yolları",
    tag: "Yabancılar",
    date: "2025-08-10",
    excerpt:
      "İdari gözetim kararlarına karşı itiraz ve serbest bırakılma talepleri adım adım…",
    href: "/makaleler/geri-gonderme-merkezi-hak-arama",
    image: "/articles/geri-gonderme.jpg",
  },
  {
    id: 2,
    title: "Site/Yönetim Aidat Alacaklarının İcrası: Pratik Yol Haritası",
    tag: "İcra",
    date: "2025-07-28",
    excerpt: "Aidat borçlarının hızlı tahsili için temel stratejiler…",
    href: "/makaleler/aidat-alacaklari-icra",
    image: "/articles/aidat-icra.jpg",
  },
  {
    id: 3,
    title:
      "Taşıma Sözleşmelerinde Sorumluluk Rejimleri: CMR – Hamburg – Rotterdam",
    tag: "Taşıma",
    date: "2025-07-12",
    excerpt:
      "Hangi rejimde hangi sorumluluk sınırları geçerli? Kısa karşılaştırma…",
    href: "/makaleler/tasima-sozlesmeleri-sorumluluk",
    image: "/articles/tasima-rejimleri.jpg",
  },
  {
    id: 4,
    title: "Ticari Sözleşmelerde Tahkim Klozu Nasıl Yazmalı?",
    tag: "Ticaret",
    date: "2025-06-30",
    excerpt:
      "Uygulanacak hukuk, yetkili merci ve dil seçiminde dikkat edilmesi gerekenler…",
    href: "/makaleler/tahkim-klozu-nasil-yazilir",
    image: "/articles/tahkim-klozu.jpg",
  },
];

export default function ArticlesPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<
    "date_desc" | "date_asc" | "title_asc" | "title_desc"
  >("date_desc");

  const tags = useMemo(() => {
    const t = Array.from(new Set(ARTICLES.map((a) => a.tag)));
    return t;
  }, []);

  const filtered = useMemo(() => {
    let list = ARTICLES.filter((a) => {
      const q = query.trim().toLowerCase();
      const text = (a.title + " " + a.excerpt).toLowerCase();
      const tagOk = tag ? a.tag === tag : true;
      const qOk = q ? text.includes(q) : true;
      return tagOk && qOk;
    });

    switch (sort) {
      case "date_desc":
        list = list.sort((a, b) => (a.date < b.date ? 1 : -1));
        break;
      case "date_asc":
        list = list.sort((a, b) => (a.date > b.date ? 1 : -1));
        break;
      case "title_asc":
        list = list.sort((a, b) => a.title.localeCompare(b.title, "tr"));
        break;
      case "title_desc":
        list = list.sort((a, b) => b.title.localeCompare(a.title, "tr"));
        break;
    }
    return list;
  }, [query, tag, sort]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* JSON-LD: BreadcrumbList (Makaleler) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Ana Sayfa",
                item: `${site.url}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Makaleler",
                item: `${site.url}/makaleler`,
              },
            ],
          }),
        }}
      />
      {/* JSON-LD: CollectionPage (Makaleler ana liste) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Makaleler",
            url: `${site.url}/makaleler`,
          }),
        }}
      />

      <TopBar />

      <section className="mx-auto w-full max-w-7xl px-5 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#0a1b36]">
          Makaleler
        </h1>

        {/* Arama + Sıralama + Etiketler */}
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          {/* Arama */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Makale ara…"
              className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0a1b36]/30"
            />
          </div>

          {/* Sıralama */}
          <div className="flex items-center gap-2 justify-start md:justify-end">
            <button
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                sort === "date_desc"
                  ? "bg-[#0a1b36] text-white border-[#0a1b36]"
                  : "border-gray-300"
              }`}
              onClick={() => setSort("date_desc")}
              title="Yeniden eskiye"
            >
              <ArrowDownAZ className="h-4 w-4" />
              Tarih (Yeni → Eski)
            </button>
            <button
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                sort === "date_asc"
                  ? "bg-[#0a1b36] text-white border-[#0a1b36]"
                  : "border-gray-300"
              }`}
              onClick={() => setSort("date_asc")}
              title="Eskiden yeniye"
            >
              <ArrowUpAZ className="h-4 w-4" />
              Tarih (Eski → Yeni)
            </button>
            <button
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                sort === "title_asc"
                  ? "bg-[#0a1b36] text-white border-[#0a1b36]"
                  : "border-gray-300"
              }`}
              onClick={() => setSort("title_asc")}
              title="A → Z"
            >
              A→Z
            </button>
            <button
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                sort === "title_desc"
                  ? "bg-[#0a1b36] text-white border-[#0a1b36]"
                  : "border-gray-300"
              }`}
              onClick={() => setSort("title_desc")}
              title="Z → A"
            >
              Z→A
            </button>
          </div>
        </div>

        {/* Etiketler */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm ${
              tag === null
                ? "bg-[#0a1b36] text-white border-[#0a1b36]"
                : "border-gray-300"
            }`}
            onClick={() => setTag(null)}
          >
            <Tag className="h-4 w-4" />
            Tümü
          </button>
          {tags.map((t) => (
            <button
              key={t}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm ${
                tag === t
                  ? "bg-[#0a1b36] text-white border-[#0a1b36]"
                  : "border-gray-300"
              }`}
              onClick={() => setTag(t)}
            >
              <Tag className="h-4 w-4" />
              {t}
            </button>
          ))}
        </div>

        {/* Liste — Thumbnail’li kartlar */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filtered.map((a) => (
            <article
              key={a.id}
              className="rounded-lg border border-gray-200 p-5 hover:shadow-md transition"
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                {a.image && (
                  <div className="relative shrink-0 w-32 h-24 md:w-40 md:h-28 rounded overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                )}

                {/* Metin */}
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-500">
                    {new Date(a.date).toLocaleDateString("tr-TR")}
                  </div>
                  <h2 className="mt-1 text-lg font-semibold text-[#5b3924] line-clamp-2">
                    {a.title}
                  </h2>
                  <div className="mt-1 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                    {a.tag}
                  </div>
                  <p className="mt-2 text-[15px] text-gray-700 line-clamp-2">
                    {a.excerpt}
                  </p>
                  <a
                    href={a.href}
                    className="mt-3 inline-block text-sm text-[#0a1b36] underline underline-offset-2 hover:no-underline"
                  >
                    Devamını oku
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center text-gray-500">
            Kriterlere uygun makale bulunamadı.
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

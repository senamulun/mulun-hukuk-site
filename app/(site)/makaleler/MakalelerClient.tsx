"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// --- Veri tipi ---
type Article = {
  title: string;
  date: string; // ISO
  slug: string;
  tag: "Yabancılar" | "İcra" | "Ceza" | "Ticaret" | "Taşıma" | "Sözleşmeler";
  excerpt: string;
  keywords: string[];
};

// --- Örnek veri (ileride CMS'e bağlanabilir) ---
const ARTICLES: Article[] = [
  {
    title: "Geri Gönderme Merkezi Süreçlerinde Hak Arama",
    date: "2025-08-10",
    slug: "geri-gonderme-merkezi-hak-arama",
    tag: "Yabancılar",
    excerpt: "İdari gözetim ve serbest bırakılma taleplerine ilişkin temel başvuru yolları.",
    keywords: ["deport", "idari gözetim", "serbest bırakılma", "yabancılar hukuku"],
  },
  {
    title: "Site Aidat Alacaklarının İcrası: Pratik Yol Haritası",
    date: "2025-07-28",
    slug: "site-aidat-alacaklarinin-icrasi",
    tag: "İcra",
    excerpt: "Aidat borçlarının hızlı tahsili için temel stratejiler.",
    keywords: ["aidat", "icra takibi", "itirazın kaldırılması", "yönetim"],
  },
  {
    title: "Taşıma Sözleşmelerinde Sorumluluk Rejimleri: CMR – Hamburg – Rotterdam",
    date: "2025-07-12",
    slug: "tasima-sozlesmeleri-sorumluluk-rejimleri",
    tag: "Taşıma",
    excerpt: "Hangi rejimde hangi sorumluluk sınırları geçerli? Kısa karşılaştırma.",
    keywords: ["CMR", "Hamburg", "Rotterdam", "navlun", "hasar"],
  },
  {
    title: "Ticari Sözleşmelerde Tahkim Klozu Nasıl Yazmalı?",
    date: "2025-06-30",
    slug: "ticari-sozlesmelerde-tahkim-klozu",
    tag: "Ticaret",
    excerpt: "Uygulanacak hukuk, yetkili merci ve dil seçiminde dikkat edilmesi gerekenler.",
    keywords: ["tahkim", "sözleşme", "uygulanacak hukuk", "yetki"],
  },
];

const TAGS: Article["tag"][] = ["Yabancılar", "İcra", "Ceza", "Ticaret", "Taşıma", "Sözleşmeler"];

// --- Yardımcılar ---
function normalize(str: string) {
  return str
    .toLowerCase()
    .replaceAll("ı", "i")
    .replaceAll("ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ö", "o")
    .replaceAll("ş", "s")
    .replaceAll("ü", "u");
}

function getAlphaIndex(articles: Article[]) {
  const set = new Set<string>();
  for (const a of articles) {
    const letters = [
      (a.title[0] || "").toUpperCase(),
      ...a.keywords.map((k) => (k[0] || "").toUpperCase()),
    ];
    letters.forEach((L) => {
      if (/[A-ZÇĞİÖŞÜ]/i.test(L)) set.add(L.toUpperCase());
    });
  }
  const AZ = [
    "A","B","C","Ç","D","E","F","G","Ğ","H","I","İ","J","K","L","M",
    "N","O","Ö","P","R","S","Ş","T","U","Ü","V","Y","Z"
  ];
  return AZ.filter((L) => set.has(L));
}

// --- Sıralama seçenekleri ---
type SortKey = "date-desc" | "date-asc" | "title-asc" | "title-desc";

export default function MakalelerClient() {
  // Arama / filtre durumları
  const [query, setQuery] = useState("");               // genel metin araması (başlık+özet+keywords)
  const [kwQuery, setKwQuery] = useState("");           // sadece anahtar kelime araması
  const [activeTag, setActiveTag] = useState<Article["tag"] | null>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("date-desc");

  const alpha = useMemo(() => getAlphaIndex(ARTICLES), []);

  const filtered = useMemo(() => {
    const q = normalize(query);
    const kq = normalize(kwQuery);

    let list = ARTICLES.filter((a) => {
      // Tag filtresi
      if (activeTag && a.tag !== activeTag) return false;

      // Harf indeksi filtresi (başlık veya keywords ilk harfi)
      if (activeLetter) {
        const titleFirst = (a.title[0] || "").toUpperCase();
        const kwHas = a.keywords.some((k) => (k[0] || "").toUpperCase() === activeLetter);
        if (titleFirst !== activeLetter && !kwHas) return false;
      }

      // Genel metin araması (başlık + özet + keywords)
      if (q) {
        const hay = `${a.title} ${a.excerpt} ${a.keywords.join(" ")}`;
        if (!normalize(hay).includes(q)) return false;
      }

      // Sadece keyword araması
      if (kq) {
        const hasKeyword = a.keywords.some((k) => normalize(k).includes(kq));
        if (!hasKeyword) return false;
      }

      return true;
    });

    // Sıralama
    list = list.slice(); // kopya
    switch (sort) {
      case "date-desc":
        list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
        break;
      case "date-asc":
        list.sort((a, b) => +new Date(a.date) - +new Date(b.date));
        break;
      case "title-asc":
        list.sort((a, b) => a.title.localeCompare(b.title, "tr"));
        break;
      case "title-desc":
        list.sort((a, b) => b.title.localeCompare(a.title, "tr"));
        break;
    }

    return list;
  }, [query, kwQuery, activeTag, activeLetter, sort]);

  return (
    <>
      {/* Arama & Filtre & Sıralama */}
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {/* 1) Genel metin araması */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Makale ara: ikamet, deport, tahkim…"
          className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-[#0a1b36]/30"
        />

        {/* 2) Sadece anahtar kelime araması */}
        <input
          value={kwQuery}
          onChange={(e) => setKwQuery(e.target.value)}
          placeholder="Anahtar kelime: cmr, tahkim, navlun…"
          className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-[#0a1b36]/30"
        />

        {/* 3) Sıralama */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="w-full rounded border px-3 py-2 bg-white"
          title="Sıralama"
        >
          <option value="date-desc">Yeniden → Eskiye</option>
          <option value="date-asc">Eskiden → Yeniye</option>
          <option value="title-asc">Başlık A → Z</option>
          <option value="title-desc">Başlık Z → A</option>
        </select>
      </div>

      {/* Taglar + Temizle */}
      <div className="mt-3 flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag((prev) => (prev === t ? null : t))}
            className={`rounded px-3 py-1 text-sm border transition ${
              activeTag === t
                ? "bg-[#0a1b36] text-white border-[#0a1b36]"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {t}
          </button>
        ))}
        {(activeTag || query || kwQuery || activeLetter) && (
          <button
            onClick={() => {
              setActiveTag(null);
              setQuery("");
              setKwQuery("");
              setActiveLetter(null);
              setSort("date-desc");
            }}
            className="rounded px-3 py-1 text-sm border bg-white hover:bg-gray-50"
          >
            Temizle
          </button>
        )}
      </div>

      {/* Kelime İndeksi (A-Z) */}
      <div className="mt-3 overflow-x-auto">
        <div className="flex items-center gap-2 text-sm">
          {[
            "A","B","C","Ç","D","E","F","G","Ğ","H","I","İ","J","K","L","M",
            "N","O","Ö","P","R","S","Ş","T","U","Ü","V","Y","Z"
          ].map((L) => {
            const enabled = useMemo(() => alpha.includes(L), [alpha]);
            const active = activeLetter === L;
            return (
              <button
                key={L}
                disabled={!enabled}
                onClick={() => setActiveLetter(active ? null : L)}
                className={`h-8 w-8 rounded border text-center ${
                  !enabled
                    ? "opacity-30 cursor-not-allowed"
                    : active
                    ? "bg-[#5b3924] text-white border-[#5b3924]"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                }`}
                title={enabled ? `“${L}” ile başlayanlar` : "Bu harfle kayıt yok"}
              >
                {L}
              </button>
            );
          })}
        </div>
      </div>

      {/* Liste */}
      <div className="mt-6 space-y-4">
        {filtered.map((a) => (
          <article key={a.slug} className="border rounded-lg bg-white p-5 shadow">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-[#5b3924]">
                <Link href={`/makaleler/${a.slug}`}>{a.title}</Link>
              </h3>
              <span className="shrink-0 rounded bg-[#ede7dd] px-2 py-1 text-xs text-gray-700">
                {a.tag}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {new Date(a.date).toLocaleDateString("tr-TR")}
            </p>
            <p className="mt-2 text-sm text-gray-700">{a.excerpt}</p>

            {/* Keyword etiketleri: tıklayınca keyword aramasına yazar */}
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {a.keywords.map((k) => (
                <button
                  key={k}
                  onClick={() => {
                    setKwQuery(k);
                    setActiveLetter(null);
                  }}
                  className="rounded border px-2 py-1 bg-white hover:bg-gray-50"
                  title={`“${k}” ile anahtar kelime araması yap`}
                >
                  #{k}
                </button>
              ))}
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            Kriterlere uygun makale bulunamadı.
          </div>
        )}
      </div>
    </>
  );
}

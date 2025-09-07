"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import {
  BookOpen,
  FileText,
  Gavel,
  Globe2,
  Briefcase,
  ShieldCheck,
  ScrollText,
  Ship,
  Search,
  ExternalLink,
} from "lucide-react";

/** Basit renk paleti (lacivert & kahverengi uyumlu) */
const palette = {
  navy: "#0a1b36",
  brown: "#5b3924",
  sand: "#f8f5f1",
};

type Law = {
  id: string;
  title: string;
  no: string;
  year?: number;
  category:
    | "yabancilar"
    | "icra"
    | "ceza"
    | "ticaret"
    | "tasima"
    | "sozlesmeler"
    | "usul"
    | "tuketici";
  link: string; // mevzuat.gov.tr linki
  image?: string;
  icon?: React.ElementType;
};

// ——— Örnek önemli mevzuatlar ———
const LAWS: Law[] = [
  {
    id: "yvukk",
    title: "Yabancılar ve Uluslararası Koruma Kanunu",
    no: "6458",
    year: 2013,
    category: "yabancilar",
    link: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6458.pdf",
    icon: Globe2,
    image: "/mevzuat/yabancilar.jpg",
  },
  {
    id: "iik",
    title: "İcra ve İflas Kanunu",
    no: "2004",
    category: "icra",
    link: "https://www.mevzuat.gov.tr/MevzuatMetin/1.3.2004.pdf",
    icon: Gavel,
    image: "/mevzuat/icra.jpg",
  },
  {
    id: "tck",
    title: "Türk Ceza Kanunu",
    no: "5237",
    year: 2004,
    category: "ceza",
    link: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5237.pdf",
    icon: ShieldCheck,
    image: "/mevzuat/ceza.jpg",
  },
  {
    id: "cmk",
    title: "Ceza Muhakemesi Kanunu",
    no: "5271",
    year: 2004,
    category: "usul",
    link: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5271.pdf",
    icon: FileText,
    image: "/mevzuat/cmk.jpg",
  },
  {
    id: "ttk",
    title: "Türk Ticaret Kanunu",
    no: "6102",
    year: 2011,
    category: "ticaret",
    link: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6102.pdf",
    icon: Briefcase,
    image: "/mevzuat/ticaret.jpg",
  },
  {
    id: "hmk",
    title: "Hukuk Muhakemeleri Kanunu",
    no: "6100",
    year: 2011,
    category: "usul",
    link: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6100.pdf",
    icon: ScrollText,
    image: "/mevzuat/hmk.jpg",
  },
  {
    id: "tkhk",
    title: "Tüketicinin Korunması Hakkında Kanun",
    no: "6502",
    year: 2013,
    category: "tuketici",
    link: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6502.pdf",
    icon: BookOpen,
    image: "/mevzuat/tuketici.jpg",
  },
  {
    id: "cmr",
    title: "CMR – Karayoluyla Uluslararası Eşya Taşıma Sözleşmesi",
    no: "Onay Kanunu",
    category: "tasima",
    link: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=1966-1&MevzuatTur=1&MevzuatTertip=3",
    icon: Ship,
    image: "/mevzuat/tasima.jpg",
  },
];

const CATS: { key: Law["category"]; label: string; Icon: React.ElementType }[] = [
  { key: "yabancilar", label: "Yabancılar", Icon: Globe2 },
  { key: "icra", label: "İcra ve İflas", Icon: Gavel },
  { key: "ceza", label: "Ceza", Icon: ShieldCheck },
  { key: "ticaret", label: "Ticaret", Icon: Briefcase },
  { key: "tasima", label: "Taşıma", Icon: Ship },
  { key: "sozlesmeler", label: "Sözleşmeler", Icon: ScrollText },
  { key: "usul", label: "Usul", Icon: FileText },
  { key: "tuketici", label: "Tüketici", Icon: BookOpen },
];

export default function MevzuatPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Law["category"] | "all">("all");
  const [sort, setSort] = useState<"alpha" | "year">("alpha");

  const filtered = useMemo(() => {
    let list = LAWS.filter((l) =>
      (active === "all" ? true : l.category === active) &&
      (query
        ? (l.title + " " + (l.no || "")).toLowerCase().includes(query.toLowerCase())
        : true)
    );

    if (sort === "alpha") {
      list = list.sort((a, b) => a.title.localeCompare(b.title, "tr"));
    } else {
      list = list.sort((a, b) => (b.year || 0) - (a.year || 0));
    }
    return list;
  }, [query, active, sort]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBar />

      {/* Hero benzeri başlık */}
      <section
        className="relative flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/hero2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "50vh",
        }}
        id="mevzuat"
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 px-6 py-16">
          <h1 className="text-3xl md:text-4xl font-semibold">Mevzuat</h1>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            Sıklıkla başvurduğumuz kanunlar ve düzenlemeler — mevzuat.gov.tr bağlantılarıyla.
          </p>
        </div>
      </section>

      {/* Filtre / Arama / Sıralama */}
      <section className="mx-auto max-w-7xl px-5 py-8 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Kategoriler */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActive("all")}
              className={`px-3 py-1.5 rounded-md border ${
                active === "all"
                  ? "bg-[#0a1b36] text-white border-[#0a1b36]"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Tümü
            </button>
            {CATS.map(({ key, label, Icon }) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(key);
                }}
                className={`px-3 py-1.5 rounded-md border inline-flex items-center gap-2 ${
                  active === key
                    ? "bg-[#0a1b36] text-white border-[#0a1b36]"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" /> {label}
              </a>
            ))}
          </div>

          {/* Arama + Sıralama */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                placeholder="Ara: örn. icra, 6458, ticaret…"
                className="pl-8 pr-3 py-2 rounded-md border border-gray-300"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 rounded-md border border-gray-300"
              value={sort}
              onChange={(e) => setSort(e.target.value as "alpha" | "year")}
              aria-label="Sırala"
            >
              <option value="alpha">A → Z</option>
              <option value="year">Yıla göre (yeni → eski)</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <article
              key={l.id}
              id={l.category}
              className="overflow-hidden rounded-xl border border-gray-200 shadow-sm"
            >
              {/* Görsel alanı */}
              <div className="relative h-40 w-full bg-gradient-to-br from-[#0a1b36] to-[#5b3924]">
                {l.image ? (
                  <Image
                    src={l.image}
                    alt={l.title}
                    fill
                    className="object-cover opacity-85"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {l.icon ? (
                      <l.icon className="h-10 w-10 text-white/85" />
                    ) : (
                      <BookOpen className="h-10 w-10 text-white/85" />
                    )}
                  </div>
                )}
              </div>

              {/* Metin */}
              <div className="p-4">
                <div className="text-xs text-gray-500">
                  {CATS.find((c) => c.key === l.category)?.label || "Mevzuat"}{" "}
                  {l.year ? `• ${l.year}` : ""}
                </div>
                <h2
                  className="mt-1 text-[17px] font-semibold"
                  style={{ color: palette.navy }}
                >
                  {l.title}
                </h2>
                <div className="mt-1 text-sm text-gray-600">Kanun No: {l.no}</div>

                <div className="mt-4 flex justify-between items-center">
                  <Link
                    href={l.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-[#0a1b36] px-3 py-2 text-white text-sm hover:opacity-90"
                  >
                    Mevzuatı Aç <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center text-gray-500">
            Kriterlere uygun mevzuat bulunamadı.
          </div>
        )}

        {/* Bilgilendirme notu */}
        <div className="mt-8 rounded-xl border bg-white p-4 text-sm text-gray-600">
          <strong>Not:</strong> Bağlantılar Resmî Gazete ve mevzuat.gov.tr
          kaynaklarına yönlendirir. Güncel metinler için lütfen ilgili resmi
          kaynağı kontrol edin.
        </div>
      </section>

      <Footer />
    </div>
  );
}

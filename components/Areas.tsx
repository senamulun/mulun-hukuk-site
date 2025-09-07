"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Globe2,
  Gavel,
  ShieldCheck,
  Briefcase,
  Ship,
  ScrollText,
} from "lucide-react";

type Area = {
  key: string;
  id: string;
  icon: any;
  title: string;
  lead: string;
  bullets: string[];
};

const AREAS: Area[] = [
  {
    key: "yabancilar",
    id: "yabancilar",
    icon: Globe2,
    title: "Yabancılar ve Göçmen Hukuku",
    lead:
      "İkamet, çalışma izni, vatandaşlık, geri gönderme merkezi işlemleri ve itirazlar.",
    bullets: [
      "İdari gözetim ve serbest bırakılma başvuruları",
      "Deport kararlarına itiraz",
      "İkamet/çalışma izni – uzatma ve itiraz",
      "Vatandaşlık başvuruları ve ret iptalleri",
    ],
  },
  {
    key: "icra",
    id: "icra",
    icon: Gavel,
    title: "İcra ve İflas Hukuku",
    lead: "Alacak tahsili, itirazın iptali/kaldırılması, haciz ve tasfiye.",
    bullets: [
      "Site/Yönetim aidat icra takipleri",
      "Kambiyo senetlerine dayalı takipler",
      "İhtiyati haciz ve ihtiyati tedbir",
      "İflas ve konkordato danışmanlığı",
    ],
  },
  {
    key: "agirceza",
    id: "agirceza",
    icon: ShieldCheck,
    title: "Ceza Hukuku (Ağır Ceza)",
    lead:
      "Soruşturma ve kovuşturma evrelerinde etkin savunma ve mağdur vekilliği.",
    bullets: [
      "Gözaltı ve ifade alma süreçlerinde müdafilik",
      "Nitelikli dolandırıcılık ve bilişim suçları",
      "Uyuşturucu ve örgüt suçları",
      "İstinaf ve temyiz başvuruları",
    ],
  },
  {
    key: "ticaret",
    id: "ticaret",
    icon: Briefcase,
    title: "Ticaret Hukuku",
    lead: "Şirketler hukuku, sözleşmeler ve uyuşmazlık çözümü.",
    bullets: [
      "Şirket kuruluşu ve genel kurul işlemleri",
      "Hisse devri, pay sözleşmeleri",
      "Ticari sözleşmelerin hazırlanması",
      "Tahkim ve arabuluculuk",
    ],
  },
  {
    key: "tasima",
    id: "tasima",
    icon: Ship,
    title: "Taşıma ve Lojistik Hukuku",
    lead:
      "Deniz, kara ve hava taşımasına ilişkin sorumluluk ve sigorta uyuşmazlıkları.",
    bullets: [
      "Navlun, çarter ve taşıma sözleşmeleri",
      "Hasar ve gecikme talepleri",
      "CMR, Hamburg ve Rotterdam rejimleri",
      "Sigorta tazminat süreçleri",
    ],
  },
  {
    key: "sozlesmeler",
    id: "sozlesmeler",
    icon: ScrollText,
    title: "Sözleşmeler Hukuku",
    lead:
      "Özel ve ticari sözleşmelerin uçtan uca tasarımı ve uyuşmazlık yönetimi.",
    bullets: [
      "Satış, hizmet, distribütörlük, franchise",
      "KVKK uyumlu sözleşme kurguları",
      "Şablon sözleşme setleri",
      "Uygulamada risk analizleri",
    ],
  },
];

export default function Areas() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q) return AREAS;
    const s = q.toLowerCase();
    return AREAS.filter(
      (a) =>
        a.title.toLowerCase().includes(s) ||
        a.lead.toLowerCase().includes(s) ||
        a.bullets.join(" ").toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      {/* Başlık + Arama */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold text-[#0a1b36]">
          Çalışma Alanlarımız
        </h2>
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ara: örn. ikamet, tahkim, CMR…"
            className="w-full rounded-md border border-gray-300 bg-white pl-8 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0a1b36]/30"
          />
        </div>
      </div>

      {/* Kartlar */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {filtered.map((a) => (
          <div
            key={a.key}
            id={a.id}
            className="scroll-mt-28 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-2 flex items-center gap-3">
              <a.icon className="h-6 w-6 text-[#5b3924]" />
              <div>
                <div className="text-lg font-medium">{a.title}</div>
                <div className="text-sm text-gray-600">{a.lead}</div>
              </div>
            </div>
            <ul className="mt-3 list-inside list-disc space-y-1 text-[15px] text-gray-700">
              {a.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bilgilendirme notu */}
      <div className="mt-8 rounded-xl border bg-white p-4 text-sm text-gray-600">
        <strong>Not:</strong> Bu site bilgilendirme amaçlıdır; Türkiye Barolar
        Birliği kurallarına uygun hazırlanmıştır.
      </div>
    </section>
  );
}

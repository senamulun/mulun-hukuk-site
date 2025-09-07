import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const BASE_URL = "http://localhost:3000";

export const metadata: Metadata = {
  title: "Çalışma Alanlarımız",
  description: "Yabancılar, İcra-İflas, Ceza, Ticaret/Taşıma ve Sözleşmeler hukukunda hizmetlerimiz.",
  alternates: { canonical: `${BASE_URL}/calisma-alanlari` },
};

const AREAS = [
  { title: "Yabancılar ve Göçmen Hukuku", bullets: ["İkamet & çalışma izinleri", "Vatandaşlık başvuruları", "Deport itirazları"] },
  { title: "İcra ve İflas Hukuku", bullets: ["Aidat icra takipleri", "Kambiyo senetleri", "İhtiyati haciz"] },
  { title: "Ceza Hukuku", bullets: ["Soruşturma/kovuşturma", "Uyuşturucu ve örgüt suçları", "Bilişim suçları"] },
  { title: "Ticaret ve Taşıma Hukuku", bullets: ["Çarter & navlun", "Şirketler hukuku", "Sözleşme uyuşmazlıkları"] },
];

export default function CalismaAlanlari() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Deport kararına itiraz süresi nedir?",
        "acceptedAnswer": { "@type": "Answer", "text": "Genellikle tebliğden itibaren 7 gün. Somut olaya göre değişebilir." }
      },
      {
        "@type": "Question",
        "name": "Aidat alacağı için icra takibi nasıl başlatılır?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yönetim kararları ve borç dökümü ile başlatılır; itiraz halinde ilgili dava yolları." }
      },
      {
        "@type": "Question",
        "name": "Taşıma sözleşmesinde hasar halinde kim sorumludur?",
        "acceptedAnswer": { "@type": "Answer", "text": "Rejime (CMR/Hamburg/Rotterdam) göre değişir; ihbar ve tespit kritik önemdedir." }
      }
    ]
  };

  return (
    <div>
      <TopBar />
      <main className="max-w-6xl mx-auto p-10">
        <BreadcrumbJsonLd
          items={[
            { name: "Ana Sayfa", item: `${BASE_URL}/` },
            { name: "Çalışma Alanları", item: `${BASE_URL}/calisma-alanlari` },
          ]}
        />
        <h1 className="text-2xl font-bold text-[#0a1b36]">Çalışma Alanlarımız</h1>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {AREAS.map((a) => (
            <div key={a.title} className="border rounded-lg bg-white p-5 shadow">
              <h3 className="text-lg font-semibold text-[#5b3924]">{a.title}</h3>
              <ul className="list-disc list-inside text-[15px] text-gray-700 mt-2 space-y-1">
                {a.bullets.map((b) => (<li key={b}>{b}</li>))}
              </ul>
            </div>
          ))}
        </div>

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
      </main>
      <Footer />
    </div>
  );
}

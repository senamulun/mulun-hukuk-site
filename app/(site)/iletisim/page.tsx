import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const BASE_URL = "http://localhost:3000";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Mulun Hukuk & Danışmanlık iletişim formu ve konum bilgileri.",
  alternates: { canonical: `${BASE_URL}/iletisim` },
};

export default function Iletisim() {
  const LAT = 40.99977401265656;
  const LNG = 28.79897241749506;
  const ZOOM = 18;
  const mapsSrc = `https://www.google.com/maps?q=${LAT},${LNG}&z=${ZOOM}&output=embed`;

  return (
    <div>
      <TopBar />
      <main className="max-w-6xl mx-auto p-6 md:p-10">
        <BreadcrumbJsonLd
          items={[
            { name: "Ana Sayfa", item: `${BASE_URL}/` },
            { name: "İletişim", item: `${BASE_URL}/iletisim` },
          ]}
        />

        <h1 className="text-2xl font-bold text-[#0a1b36]">İletişim</h1>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Google Form */}
          <div className="border rounded-lg bg-white p-4 shadow">
            <h2 className="font-semibold text-lg mb-4">Bize Yazın</h2>
            <div className="relative w-full overflow-hidden rounded-md">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfRG_bhlQIJknuDVgP_reQJKr80mQND7Hu8H7OLEcZCeT5slQ/viewform?embedded=true"
                width="100%"
                height="640"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                loading="lazy"
                style={{ border: "none" }}
                title="Mulun Hukuk & Danışmanlık - İletişim Formu"
              />
            </div>
            <p className="mt-3 text-xs text-gray-500">
              * KVKK bilgilendirmesi: Gönderdiğiniz veriler yalnızca iletişim ve randevu amacıyla işlenecektir.
            </p>
          </div>

          {/* İletişim Bilgileri + Harita */}
          <div className="border rounded-lg bg-white p-6 shadow space-y-4">
            <div>
              <h2 className="font-semibold text-lg">İletişim Bilgileri</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>
                  Kartaltepe Mah. Süvari Cad. Metropark Sefaköy Sitesi (Torkam E-5),
                  D-1 Blok Ofis No: 9 — Küçükçekmece / İSTANBUL
                </li>
                <li>E-posta: (eklenecek)</li>
                <li>Telefon: (eklenecek)</li>
              </ul>
            </div>

            <div className="relative w-full overflow-hidden rounded-md">
              <iframe
                src={mapsSrc}
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mulun Hukuk & Danışmanlık - Konum"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

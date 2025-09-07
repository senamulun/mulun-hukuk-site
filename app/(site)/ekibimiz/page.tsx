import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const BASE_URL = "http://localhost:3000";

export const metadata: Metadata = {
  title: "Ekibimiz",
  description: "Kurucu ortaklarımız ve odak alanlarımız.",
  alternates: { canonical: `${BASE_URL}/ekibimiz` },
};

export default function Ekibimiz() {
  return (
    <div>
      <TopBar />
      <main className="max-w-5xl mx-auto p-10">
        <BreadcrumbJsonLd
          items={[
            { name: "Ana Sayfa", item: `${BASE_URL}/` },
            { name: "Ekibimiz", item: `${BASE_URL}/ekibimiz` },
          ]}
        />
        <h1 className="text-2xl font-bold text-[#0a1b36]">Ekibimiz</h1>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="border rounded-lg bg-white p-5 shadow">
            <h3 className="text-lg font-semibold text-[#5b3924]">Av. Rahime Nursena MULUN</h3>
            <p className="text-sm text-gray-600">Kurucu Ortak | Avukat</p>
            <p className="mt-2 text-gray-700 text-[15px]">
              Yabancılar & Göçmen hukuku, ceza hukuku…
            </p>
          </div>
          <div className="border rounded-lg bg-white p-5 shadow">
            <h3 className="text-lg font-semibold text-[#5b3924]">Av. Fatih Mehmet MULUN</h3>
            <p className="text-sm text-gray-600">Kurucu Ortak | Avukat</p>
            <p className="mt-2 text-gray-700 text-[15px]">
              İcra–iflas, ticaret/taşıma hukuku…
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

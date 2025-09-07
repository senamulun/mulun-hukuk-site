import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const BASE_URL = "http://localhost:3000";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Mulun Hukuk & Danışmanlık — ofis profilimiz, yaklaşımımız ve değerlerimiz.",
  alternates: { canonical: `${BASE_URL}/hakkimizda` },
};

export default function Hakkimizda() {
  return (
    <div>
      <TopBar />
      <main className="max-w-4xl mx-auto p-10">
        <BreadcrumbJsonLd
          items={[
            { name: "Ana Sayfa", item: `${BASE_URL}/` },
            { name: "Hakkımızda", item: `${BASE_URL}/hakkimizda` },
          ]}
        />
        <h1 className="text-2xl font-bold text-[#0a1b36]">Hakkımızda</h1>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Mulun Hukuk & Danışmanlık; Av. Rahime Nursena MULUN ve Av. Fatih Mehmet MULUN tarafından kurulmuş,
          çözüm odaklı ve şeffaf iletişimi esas alan bir hukuk bürosudur…
        </p>
      </main>
      <Footer />
    </div>
  );
}

// components/HeroCarousel.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = {
  src: string;        // /public içindeki görsel yolu
  alt: string;        // erişilebilirlik
  title?: string;     // başlık (opsiyon)
  subtitle?: string;  // alt başlık (opsiyon)
};

const SLIDES: Slide[] = [
  { src: "/hero1.jpg", alt: "Mulun Hukuk - Yabancılar ve Göçmen Hukuku", title: "Mulun Hukuk & Danışmanlık", subtitle: "Yabancılar, İcra, Ceza ve Ticaret/Taşıma hukukunda butik ve sonuç odaklı hizmet." },
  { src: "/hero2.jpg", alt: "Mulun Hukuk - İcra ve Ağır Ceza", title: "Hızlı İletişim, Şeffaf Süreç", subtitle: "Her dosya için net yol haritası ve düzenli bilgilendirme." },
  { src: "/hero3.jpg", alt: "Mulun Hukuk - Ticaret/Taşıma Hukuku", title: "Ölçülebilir Sonuçlar", subtitle: "Önceliklendirme ve kilometre taşlarına dayalı takip." },
];

// Otomatik geçiş süresi (ms)
const AUTOPLAY_MS = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const go = (dir: 1 | -1) => {
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return SLIDES.length - 1;
      if (next >= SLIDES.length) return 0;
      return next;
    });
  };

  // Autoplay
  useEffect(() => {
    // her değişimde zamanlayıcıyı sıfırla
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(1), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index]);

  // Klavye ile kontrol (← →)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = SLIDES[index];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center text-white">
      {/* Arka plan görseli */}
      <div className="absolute inset-0">
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt}
          fill
          priority
          className="object-cover transition-opacity duration-500 ease-in-out"
        />
        {/* okunabilirlik için koyu overlay */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Ortadaki beyaz 4 çizgi (senin hero stilin) */}
        <div className="mb-6 flex items-center justify-center gap-[10px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[90px] w-[18px] rounded-[2px] bg-white" />
          ))}
        </div>

        {active.title && (
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {active.title}
          </h1>
        )}
        {active.subtitle && (
          <p className="mt-3 text-lg md:text-xl max-w-2xl mx-auto">
            {active.subtitle}
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="/iletisim" className="px-5 py-2 rounded-lg bg-white text-black font-medium">
            İletişim
          </a>
          <a href="/calisma-alanlari" className="px-5 py-2 rounded-lg border border-white/70 text-white font-medium">
            Çalışma Alanları
          </a>
        </div>
      </div>

      {/* Sol/Sağ ok butonları */}
      <button
        aria-label="Önceki"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-3 py-2 hover:bg-black/50 transition"
      >
        ←
      </button>
      <button
        aria-label="Sonraki"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-3 py-2 hover:bg-black/50 transition"
      >
        →
      </button>

      {/* Nokta (indicator) butonları */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slayt ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

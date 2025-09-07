'use client';

import { useEffect, useRef, useState } from "react";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import StripesMark from "@/components/StripesMark";
import WhyUs from "@/components/WhyUs";
import Areas from "@/components/Areas";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = ["/hero.jpg", "/hero2.jpg", "/hero3.jpg"];
const AUTOPLAY_MS = 5000;

export default function Page() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((p) => (p + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  // Video
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoVisible, setVideoVisible] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const safePlay = async () => {
      try { await v.play(); } catch { setTimeout(() => v.play().catch(() => {}), 250); }
    };

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!videoRef.current) return;
        if (e.isIntersecting) safePlay();
        else videoRef.current.pause();
      }
    }, { threshold: 0.2 });

    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBar />

      {/* HERO */}
      <section
        className="
          relative group flex flex-col items-center justify-center text-center text-white
          overflow-hidden min-h-[90vh]
          border-t-0 shadow-none outline-none
        "
      >
        {/* Üst saç teli çizgiyi kapatan şerit (header ile aynı renk) */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#0a1b36] z-20 pointer-events-none" />

        {slides.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              current === i ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/45" />

        <button
          onClick={prev}
          aria-label="Önceki"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white/80 
                     opacity-0 group-hover:opacity-100 transition hover:bg-black/55"
        >
          <ArrowLeft size={32} />
        </button>
        <button
          onClick={next}
          aria-label="Sonraki"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white/80 
                     opacity-0 group-hover:opacity-100 transition hover:bg-black/55"
        >
          <ArrowRight size={32} />
        </button>

        <div className="relative z-10 flex flex-col items-center px-6 py-28">
          <div className="mb-6">
            <StripesMark width={18} height={90} />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold">
            Mulun Hukuk &amp; Danışmanlık
          </h1>
          <p className="mt-3 text-lg md:text-xl max-w-2xl">
            Yabancılar, İcra, Ceza ve Ticaret/Taşıma hukukunda butik ve sonuç odaklı hizmet.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/iletisim" className="px-5 py-2 rounded-lg bg-white text-black font-medium">
              İletişim
            </a>
            <a
              href="/calisma-alanlari"
              className="px-5 py-2 rounded-lg border border-white/70 text-white font-medium"
            >
              Çalışma Alanları
            </a>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slayt ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === current ? "bg-white" : "bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      <WhyUs />

      {/* Video bant */}
      <section className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden">
        <div className="relative">
          <video
            ref={videoRef}
            className="block w-full object-cover"
            style={{ height: "min(70vh, 860px)" }}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            poster="/video-poster.jpg"
            onError={() => setVideoVisible(false)}
            onCanPlay={() => setVideoVisible(true)}
          >
            <source src="/media/hukuk.mp4" type="video/mp4" />
            <source src="/HUKUK%20%26%20DANI%C5%9EMANLIK.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <div className="max-w-4xl">
              <h2 className="text-white/95 text-3xl md:text-4xl font-semibold tracking-wide">
                Güven • Şeffaflık • Sonuç
              </h2>
              <p className="mt-3 text-white/85 text-sm md:text-base">
                Dosyanızın her aşamasında ölçülebilir adımlar, düzenli bilgilendirme ve sonuç odaklı strateji.
              </p>
            </div>
          </div>
        </div>

        {!videoVisible && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero2.jpg')" }}
          />
        )}
      </section>

      <Areas />

      <section
        className="relative flex items-center justify-center text-center text-white mb-0 pb-0"
        style={{
          backgroundImage: "url('/quote-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl px-6 py-14">
          <p className="text-2xl md:text-3xl leading-relaxed">
            “Hakim; insana, tabiata, gerçeğe, olağana sırt çevirmeden ve katı
            kalıplar içinde sıkışıp kalmadan uyuşmazlığa insan kokusu taşıyan bir
            çözüm getirmek zorunluluğundadır.”
          </p>
          <p className="mt-6 text-sm text-gray-200 italic">
            — Yargıtay 1. HD. E. 1976/9370, K. 1976/13138, 31.12.1976
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a1b36] to-transparent" />
      </section>

      <Footer />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** public/ altındaki video yolu; örn: /media/hukuk.mp4 */
  src?: string;
  /** poster (opsiyonel) */
  poster?: string;
  /** yüksekliği kontrol et (vh cinsinden) */
  heightVH?: number;
};

export default function VideoBand({
  src = "/media/hukuk.mp4",
  poster = "/hero.jpg",
  heightVH = 70,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Autoplay'i garantiye al (iOS/Safari playsInline + muted ister)
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // ilk çabada başlamazsa, kısa bir gecikmeyle tekrar dene
        setTimeout(() => v.play().catch(() => {}), 300);
      }
    };

    // sayfaya gelir gelmez dener
    tryPlay();

    // görünürken oynat, görünmezken durdur (kaynak tasarrufu)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            tryPlay();
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(v);

    return () => io.disconnect();
  }, []);

  return (
    <section className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        className="block w-full object-cover"
        style={{ height: `min(${heightVH}vh, 860px)` }}
        src={src}
        poster={poster}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
      />

      {/* Koyu degrade örtü */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />

      {/* Slogan */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <h3 className="text-white/95 text-3xl md:text-4xl font-semibold tracking-wide">
            Güven • Şeffaflık • Sonuç
          </h3>
          <p className="mt-3 text-white/80 text-sm md:text-base">
            Dosyanızın her aşamasında ölçülebilir adımlar, düzenli bilgilendirme
            ve sonuç odaklı strateji.
          </p>
        </div>
      </div>
    </section>
  );
}

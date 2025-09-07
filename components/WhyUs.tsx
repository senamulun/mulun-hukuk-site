"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Clock, Users, Scale, BadgeCheck, Target, Sparkles } from "lucide-react";

const ITEMS = [
  {
    id: "why-1",
    title: "Bireysel ve Şeffaf Süreç",
    text:
      "Her dosya için net yol haritası, kilometre taşları ve düzenli bilgilendirme ile ilerleriz.",
    icon: ShieldCheck,
    img: "/why-1.jpg",
    align: "left" as const,
  },
  {
    id: "why-2",
    title: "Hızlı Erişim, Güçlü İletişim",
    text:
      "Müvekkil iletişimini önceliklendirir, hızlı geri dönüş ve takvimli çalışma kültürü uygularız.",
    icon: Clock,
    img: "/why-2.jpg",
    align: "right" as const,
  },
  {
    id: "why-3",
    title: "Alan Odaklı Tecrübe",
    text:
      "Yabancılar, İcra, Ceza ve Ticaret/Taşıma hukukunda yoğun dosya deneyimi.",
    icon: Users,
    img: "/why-3.jpg",
    align: "left" as const,
  },
];

const KPIS = [
  { label: "İlk Yanıt", value: "< 24s" },
  { label: "Memnuniyet", value: "%95+" },
  { label: "Aktif Dosya", value: "100+" },
  { label: "Uzmanlık Yılı", value: "10+" },
];

const PROOFS = [
  { icon: BadgeCheck, label: "Yazılı süreç bilgilendirmesi" },
  { icon: ShieldCheck, label: "KVKK uyumlu dosya yönetimi" },
  { icon: Target, label: "Somut hedef ve takvim" },
];

export default function WhyUs() {
  return (
    <section id="neden-biz" className="relative isolate mx-auto max-w-7xl px-6 py-20 overflow-hidden">
      {/* Dinamik arka plan */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#6b8e23]/30 to-emerald-500/30 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-400/20 to-[#6b8e23]/20 blur-2xl animate-spin-slow" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tl from-[#6b8e23]/20 to-emerald-400/20 blur-3xl animate-bounce-slow" />
      </div>

      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-1.5 text-xs font-medium tracking-wide text-zinc-600">
          <Sparkles className="h-3.5 w-3.5" /> Neden MULUN Hukuk?
        </span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#0a1b36] sm:text-5xl">
          Güven veren <span className="text-[#6b8e23]">uzmanlık</span>, şeffaf <span className="text-emerald-700">süreç</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base text-zinc-600">
          Bireysel ve sonuç odaklı dosya yönetimiyle, her aşamada ölçülebilir ilerleme ve açık iletişim.
        </p>
      </div>

      <div className="mt-14 flex flex-col gap-14">
        {ITEMS.map((it, idx) => {
          const Left = (
            <div className="relative h-[280px] w-full overflow-hidden rounded-2xl ring-1 ring-inset ring-zinc-200 md:h-[320px] md:w-3/5">
              <Image
                src={it.img}
                alt={it.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={idx === 0}
              />
            </div>
          );

          const Right = (
            <div className="md:w-2/5">
              <div className="mb-3 flex items-center gap-2">
                <it.icon className="h-6 w-6 text-[#5b3924]" />
                <h3 className="text-xl font-semibold text-[#0a1b36]">{it.title}</h3>
              </div>
              <p className="text-[16px] leading-7 text-gray-700">{it.text}</p>
              <div className="mt-4 h-1 w-28 rounded-full bg-gradient-to-r from-[#6b8e23] via-emerald-500 to-[#6b8e23]" />
            </div>
          );

          return (
            <div
              key={it.id}
              className={`flex flex-col items-center gap-8 md:gap-14 ${
                it.align === "left" ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {Left}
              {Right}
            </div>
          );
        })}
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-zinc-200 bg-white/80 p-6 text-center shadow-sm backdrop-blur"
          >
            <div className="text-3xl font-bold tracking-tight text-[#0a1b36]">{k.value}</div>
            <div className="mt-2 text-xs uppercase tracking-wider text-zinc-500">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-sm text-zinc-700">
        {PROOFS.map((p) => (
          <div key={p.label} className="inline-flex items-center gap-2">
            <p.icon className="h-4 w-4 text-[#6b8e23]" /> {p.label}
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-5 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm sm:grid-cols-3">
        {[
          { icon: Scale, label: "Etik ve Dürüstlük" },
          { icon: Users, label: "Bireysel Hizmet" },
          { icon: Clock, label: "Zamanında Sonuç" },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-2">
            <f.icon className="h-5 w-5 text-[#5b3924]" />
            <span className="text-sm text-gray-700">{f.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/iletisim"
          className="inline-flex items-center justify-center rounded-xl bg-[#6b8e23] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#6b8e23]/40"
        >
          Ücretsiz Ön Değerlendirme Al
        </Link>
        <Link
          href="/hakkimizda"
          className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3.5 text-base font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50"
        >
          Hakkımızda
        </Link>
      </div>
    </section>
  );
}

// Tailwind için ek animasyon sınıfları
// globals.css'e ekleyebilirsin:
// .animate-spin-slow { animation: spin 20s linear infinite; }
// .animate-bounce-slow { animation: bounce 6s infinite; }

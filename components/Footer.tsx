// components/Footer.tsx
"use client";

import { MapPin, Mail, Phone } from "lucide-react";
import StripesMark from "./StripesMark"; // dört çizgi ikonu

export default function Footer() {
  return (
    <footer
      // ÖNEMLİ: mt-10 ve üst border kaldırıldı -> boşluk/çizgi kaybolur
      className="relative overflow-hidden mt-0"
      style={{
        backgroundColor: "#0f1c33", // soft lacivert
        // borderTop: "1px solid rgba(255,255,255,0.15)", // KALDIRILDI
      }}
    >
      {/* Sağ tarafa dört çizgi (stripes) watermark */}
      <div className="absolute right-10 inset-y-0 my-auto pointer-events-none select-none z-0 opacity-10">
        <StripesMark width={18} height={200} bars={4} color="#5b85d9" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8 px-5 py-10 text-white/90">
        {/* Logo + telif */}
        <div className="flex flex-col items-center space-y-2">
          <div
            className="h-20 w-72 bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: "url('/og.jpg')" }}
            aria-label="Mulun Hukuk & Danışmanlık logosu"
          />
          <div className="text-xs text-center">
            © {new Date().getFullYear()} Tüm hakları saklıdır.
          </div>
          <div className="text-xs text-center">
            Bu site bilgilendirme amaçlıdır; reklam içermez.
          </div>
        </div>

        {/* Sayfalar */}
        <div>
          <div className="text-sm font-semibold">Sayfalar</div>
          <ul className="mt-2 space-y-1 text-sm">
            {[
              ["Ana Sayfa", "/"],
              ["Hakkımızda", "/hakkimizda"],
              ["Ekibimiz", "/ekibimiz"],
              ["Çalışma Alanları", "/calisma-alanlari"],
              ["Makaleler", "/makaleler"],
              ["İletişim", "/iletisim"],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Odak Alanları */}
        <div>
          <div className="text-sm font-semibold">Odak Alanları</div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {[
              "Yabancılar Hukuku",
              "İcra",
              "Ceza",
              "Ticaret",
              "Taşıma",
              "Sözleşmeler",
            ].map((t) => (
              <span
                key={t}
                className="rounded bg-white/10 px-2 py-1 text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* İletişim */}
        <div>
          <div className="text-sm font-semibold">İletişim</div>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4" /> Kartaltepe Mah. Süvari Cad.
              Metropark Sefaköy Sitesi (Torkam E-5) D-1 Blok Ofis No: 9
              Küçükçekmece/İSTANBUL
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> (e-posta eklenecek)
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> (telefon eklenecek)
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

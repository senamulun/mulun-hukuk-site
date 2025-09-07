"use client";

import { useCallback } from "react";
import { Facebook, Instagram, Linkedin, Twitter, Globe } from "lucide-react";

// Diğer lacivertten bir ton daha koyu
const STRIP_BG = "#071225";

export default function TopStrip() {
  // Google Translate için cookie ayarla + sayfayı yenile
  const translateTo = useCallback((lang: "tr" | "en" | "ar") => {
    const map: Record<string, string> = {
      tr: "/tr/tr",
      en: "/tr/en",
      ar: "/tr/ar",
    };
    const pair = map[lang] || "/tr/tr";

    const setCookie = (name: string, value: string) => {
      const domain = window.location.hostname;
      document.cookie = `${name}=${value}; path=/;`;
      document.cookie = `${name}=${value}; path=/; domain=.${domain};`;
    };

    setCookie("googtrans", pair);
    window.location.reload();
  }, []);

  return (
    <div className="w-full text-white" style={{ backgroundColor: STRIP_BG }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs md:text-[13px]">
        {/* Sol: Sosyal medya */}
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1 opacity-80">
            <Globe className="h-3.5 w-3.5" /> Bizi takip edin:
          </span>
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener nofollow"
              className="opacity-80 hover:opacity-100 transition"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener nofollow"
              className="opacity-80 hover:opacity-100 transition"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener nofollow"
              className="opacity-80 hover:opacity-100 transition"
              aria-label="X"
              title="X (Twitter)"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener nofollow"
              className="opacity-80 hover:opacity-100 transition"
              aria-label="Facebook"
              title="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Sağ: Dil butonları */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => translateTo("tr")}
            className="rounded px-2 py-1 hover:bg-white/10"
            aria-label="Türkçe"
            title="Türkçe"
          >
            TR
          </button>
          <button
            onClick={() => translateTo("en")}
            className="rounded px-2 py-1 hover:bg-white/10"
            aria-label="English"
            title="English"
          >
            EN
          </button>
          <button
            onClick={() => translateTo("ar")}
            className="rounded px-2 py-1 hover:bg-white/10"
            aria-label="العربية"
            title="العربية"
          >
            AR
          </button>
        </div>
      </div>
    </div>
  );
}

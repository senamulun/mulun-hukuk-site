/* /app/components/TopBar.tsx — Mobile hamburger hep görünür, logo taşma yapmaz */
'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import FourLinesIcon from "@/components/FourLinesIcon";
import ThemeToggle from "@/components/ThemeToggle";
import { ChevronDown, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { site } from "@/lib/site";

type NavChild = { href: string; label: string };
type NavItem = { href: string; label: string; children?: NavChild[] };

const navItems: NavItem[] = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/ekibimiz", label: "Ekibimiz" },
  {
    href: "/calisma-alanlari",
    label: "Çalışma Alanları",
    children: [
      { href: "/calisma-alanlari/yabancilar", label: "Yabancılar Hukuku" },
      { href: "/calisma-alanlari/icra", label: "İcra ve İflas" },
      { href: "/calisma-alanlari/ceza", label: "Ceza Hukuku" },
      { href: "/calisma-alanlari/ticaret", label: "Ticaret Hukuku" },
      { href: "/calisma-alanlari/tasima", label: "Taşıma Hukuku" },
      { href: "/calisma-alanlari/sozlesmeler", label: "Sözleşmeler Hukuku" },
    ],
  },
  {
    href: "/mevzuat",
    label: "Mevzuat",
    children: [
      { href: "/mevzuat#yabancilar", label: "Yabancılar" },
      { href: "/mevzuat#icra", label: "İcra ve İflas" },
      { href: "/mevzuat#ceza", label: "Ceza" },
      { href: "/mevzuat#ticaret", label: "Ticaret" },
      { href: "/mevzuat#tasima", label: "Taşıma" },
      { href: "/mevzuat#sozlesmeler", label: "Sözleşmeler" },
      { href: "/mevzuat#usul", label: "Usul (HMK/CMK)" },
      { href: "/mevzuat#tuketici", label: "Tüketici" },
    ],
  },
  { href: "/makaleler", label: "Makaleler" },
  { href: "/iletisim", label: "İletişim" },
];

/* ——— Boyut/scroll ayarları ——— */
const PRESET = {
  shrinkAt: 20,
};

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href + "#");
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Route değişince mobil menüyü kapat
  useEffect(() => {
    setOpen(false);
    setOpenSub(false);
  }, [pathname]);

  // Scroll’da küçült
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsShrunk(window.scrollY > PRESET.shrinkAt);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  const changeLang = (lang: "tr" | "en" | "ar") => {
    const url = new URL(window.location.href);
    if (lang === "tr") {
      window.location.href = url.origin + url.pathname + url.search + url.hash;
    } else {
      const target = `https://translate.google.com/translate?sl=tr&tl=${lang}&u=${encodeURIComponent(url.href)}`;
      window.location.href = target;
    }
  };

  const logoSrc = site?.ogImagePath || "/og.jpg";
  const brandName = site?.name || "Mulun Hukuk & Danışmanlık";

  const rowPad = isShrunk ? "py-1 md:py-1" : "py-3 md:py-3";

  return (
    <header className="sticky top-0 z-50 overflow-x-clip">
      {/* ÜST ÇUBUK */}
      <div className="w-full bg-[#081325] text-white text-xs md:text-sm px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-4 w-4 hover:text-blue-400" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
            <Twitter className="h-4 w-4 hover:text-sky-400" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4 hover:text-blue-500" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-4 w-4 hover:text-pink-400" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="mx-1 opacity-40" aria-hidden="true">|</span>
          <button onClick={() => changeLang("tr")} className="px-2 hover:underline">TR</button>
          <button onClick={() => changeLang("en")} className="px-2 hover:underline">EN</button>
          <button onClick={() => changeLang("ar")} className="px-2 hover:underline">AR</button>
        </div>
      </div>

      {/* ANA NAVBAR — scroll’da küçülür */}
      <div className="bg-[#0a1b36] border-b border-[#0a1b36] transition-all duration-300">
        <div className={`relative mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 ${rowPad} transition-all duration-300`}>
          {/* LOGO — (Basitleştirildi: fill/absolute yok, object-contain ile taşma olmaz) */}
          <Link href="/" className="flex items-center gap-2 min-w-0 shrink-0" aria-label={`${brandName} anasayfa`}>
            <div className="h-10 sm:h-12 md:h-16 w-auto">
              <Image
                src={logoSrc}
                alt={brandName}
                width={420}         /* intrinsic */
                height={120}
                priority
                className="h-full w-auto object-contain block select-none"
                sizes="(max-width: 768px) 160px, 320px"
              />
            </div>
            {/* İsteğe bağlı marka yazısı (mobilde gizli) */}
            <span className="hidden sm:block text-sm md:text-base font-medium truncate text-white/90">
              Mulun Hukuk &amp; Danışmanlık
            </span>
          </Link>

          {/* MASAÜSTÜ MENÜ */}
          <nav className="hidden md:flex items-center gap-5" aria-label="Ana menü">
            {navItems.map((item) =>
              !item.children ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition ${isActive(item.href) ? "text-white" : "text-white/80 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              ) : (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-sm transition ${isActive(item.href) ? "text-white" : "text-white/80 hover:text-white"}`}
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">{item.label} alt menüsü</span>
                  </Link>
                  <div className="absolute top-full left-0 hidden group-hover:block group-focus-within:block bg-[#0a1b36] min-w-[220px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2 text-sm transition ${
                          isActive(child.href) ? "text-white bg-white/10" : "text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            )}
          </nav>

          {/* MOBİL MENÜ BUTONU — daima görünür */}
          <button
            type="button"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors z-[65]"
          >
            <FourLinesIcon className="h-5 w-7" />
          </button>
        </div>
      </div>

      {/* MOBİL OVERLAY */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* MOBİL DRAWER */}
      <aside
        id="mobile-drawer"
        className={`fixed right-0 top-0 z-[61] h-full w-[82%] max-w-[360px] transform bg-[#0a1b36] text-white transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobil menü"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="relative h-12 w-auto">
            <Image
              src={logoSrc}
              alt={brandName}
              width={220}
              height={60}
              className="h-full w-auto object-contain"
              sizes="220px"
              priority
            />
          </div>
          <button onClick={closeMenu} aria-label="Menüyü kapat" className="rounded-md p-2 hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6l-12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-3 flex items-center gap-3 border-b border-white/10 text-sm">
          <span className="text-white/70">Dil:</span>
          <button onClick={() => changeLang("tr")} className="px-2 py-1 rounded hover:bg-white/10">TR</button>
          <button onClick={() => changeLang("en")} className="px-2 py-1 rounded hover:bg-white/10">EN</button>
          <button onClick={() => changeLang("ar")} className="px-2 py-1 rounded hover:bg-white/10">AR</button>
          <span className="mx-1 opacity-30" aria-hidden="true">|</span>
          <ThemeToggle />
        </div>

        <nav className="flex flex-col px-5 py-4" aria-label="Mobil menü">
          {navItems.map((item) =>
            !item.children ? (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`py-3 text-base border-b border-white/10 transition ${
                  isActive(item.href) ? "text-white" : "text-white/90 hover:text-white"
                }`}
              >
                {item.labe

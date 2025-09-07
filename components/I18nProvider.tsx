"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  dict: Dict;
  setLocale: (l: Locale) => void;
  t: (key: string, fallback?: string) => string;
};

const C = createContext<Ctx | null>(null);

export function I18nProvider({
  locale: initial,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dict;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initial);

  const value = useMemo<Ctx>(
    () => ({
      locale,
      dict,
      setLocale,
      // t: anahtarı çevirir, yoksa fallback veya anahtarın kendisini döndürür
      t: (key, fallback = key) => dict[key] ?? fallback,
    }),
    [locale, dict]
  );

  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useI18n() {
  const ctx = useContext(C);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

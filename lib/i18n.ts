import tr from "@/locales/tr.json";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

export type Locale = "tr" | "en" | "ar";
export type Dict = Record<string, string>;

const MAP: Record<Locale, Dict> = { tr, en, ar };

export function getDictionary(lang: Locale): Dict {
  return MAP[lang] || tr; // yoksa TR’ye düş
}

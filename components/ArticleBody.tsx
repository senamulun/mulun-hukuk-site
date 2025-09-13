"use client";

import * as React from "react";
import ArticleBody from "@/components/ArticleBody.client";

type Article = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  excerpt: string;
  image?: string;
  content: string; // HTML
};

type TocItem = { id: string; text: string; level: 2 | 3 };

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export default function ArticleBody({ article }: { article: Article }) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [toc, setToc] = React.useState<TocItem[]>([]);

  // Başlıklara id ekle + TOC üret + smooth scroll
  React.useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const items: TocItem[] = [];
    const headings = Array.from(
      el.querySelectorAll("h2, h3")
    ) as HTMLHeadingElement[];

    headings.forEach((h) => {
      if (!h.id) h.id = slugify(h.textContent || "bolum");
      const level = (h.tagName.toLowerCase() === "h2" ? 2 : 3) as 2 | 3;
      items.push({ id: h.id, text: h.textContent || "", level });
    });

    setToc(items);

    const onClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName.toLowerCase() === "a" && target.hash) {
        const id = target.hash.slice(1);
        const targetEl = document.getElementById(id);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", `#${id}`);
        }
      }
    };

    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [article.slug]);

  return (
    <>
      {/* Başlık Bloğu */}
      <section className="mx-auto w-full max-w-5xl px-5 pt-10">
        <div className="text-xs text-gray-500">
          {new Date(article.date).toLocaleDateString("tr-TR")}
        </div>
        <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-[#0a1b36]">
          {article.title}
        </h1>
        <div className="mt-2 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
          {article.tag}
        </div>

        {/* Kapak görseli */}
        {article.image && (
          <div className="mt-6 relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </section>

      {/* İçerik + TOC */}
      <section className="mx-auto w-full max-w-5xl px-5 py-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* İçerik */}
        <article
          ref={contentRef}
          className="prose prose-lg max-w-none scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* İçindekiler */}
        <aside className="lg:sticky lg:top-24 h-fit rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 text-[#0a1b36] font-semibold mb-3">
            <ListTree className="h-4 w-4" />
            İçindekiler
          </div>
          {toc.length === 0 ? (
            <div className="text-sm text-gray-500">Başlık bulunamadı.</div>
          ) : (
            <nav className="space-y-2 text-sm">
              {toc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className={`block hover:underline ${
                    t.level === 3 ? "pl-4 text-gray-600" : ""
                  }`}
                >
                  {t.text}
                </a>
              ))}
            </nav>
          )}
        </aside>
      </section>
    </>
  );
}

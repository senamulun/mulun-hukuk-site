import React, { use } from "react";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import ArticleBody from "@/components/ArticleBody";

/** Örnek makale verisi (görseller dahil) — isterseniz ortak bir dosyaya taşıyın */
const ARTICLES = [
  {
    slug: "geri-gonderme-merkezi-hak-arama",
    title: "Geri Gönderme Merkezi Süreçlerinde Hak Arama Yolları",
    tag: "Yabancılar",
    date: "2025-08-10",
    excerpt:
      "İdari gözetim kararlarına karşı itiraz ve serbest bırakılma talepleri adım adım…",
    image: "/articles/geri-gonderme.jpg",
    content: `
      <h2>İdari Gözetim Kararına İtiraz</h2>
      <p>Bu bölümde idari gözetim kararına itirazın usulü ele alınır...</p>
      <h3>Yetkili Mahkeme</h3>
      <p>Yetkili sulh ceza hakimliği, başvurunun usulü ve süreler...</p>
      <h2>Serbest Bırakılma Talebi</h2>
      <p>Serbest bırakılmaya ilişkin esaslar ve belgelendirme...</p>
      <h2>Yargı Yolu ve Süreler</h2>
      <p>2577 sayılı İYUK kapsamında dava açma süreleri...</p>
    `,
  },
  {
    slug: "aidat-alacaklari-icra",
    title: "Site/Yönetim Aidat Alacaklarının İcrası: Pratik Yol Haritası",
    tag: "İcra",
    date: "2025-07-28",
    excerpt: "Aidat borçlarının hızlı tahsili için temel stratejiler…",
    image: "/articles/aidat-icra.jpg",
    content: `
      <h2>Takip Türünün Seçimi</h2>
      <p>İlamsız, ilamlı, kambiyo senedine mahsus takip...</p>
      <h2>Yetki ve Görev</h2>
      <p>Yetki itirazı ve görevli mahkeme başlıkları...</p>
      <h3>Sulh Hukuk vs İcra Hukuk</h3>
      <p>Pratik ayrımlar ve stratejiler...</p>
    `,
  },
  {
    slug: "tasima-sozlesmeleri-sorumluluk",
    title:
      "Taşıma Sözleşmelerinde Sorumluluk Rejimleri: CMR – Hamburg – Rotterdam",
    tag: "Taşıma",
    date: "2025-07-12",
    excerpt:
      "Hangi rejimde hangi sorumluluk sınırları geçerli? Kısa karşılaştırma…",
    image: "/articles/tasima-rejimleri.jpg",
    content: `
      <h2>CMR Sözleşmesi</h2>
      <p>Karayoluyla uluslararası taşımada uygulama...</p>
      <h2>Hamburg Kuralları</h2>
      <p>Deniz yolu taşımalarında sorumluluk çerçevesi...</p>
      <h2>Rotterdam Kuralları</h2>
      <p>Modern multimodal yaklaşım...</p>
    `,
  },
  {
    slug: "tahkim-klozu-nasil-yazilir",
    title: "Ticari Sözleşmelerde Tahkim Klozu Nasıl Yazmalı?",
    tag: "Ticaret",
    date: "2025-06-30",
    excerpt:
      "Uygulanacak hukuk, yetkili merci ve dil seçiminde dikkat edilmesi gerekenler…",
    image: "/articles/tahkim-klozu.jpg",
    content: `
      <h2>Yetkili Kurum ve Yer</h2>
      <p>ICC, ISTAC seçimi; koltuk ve dil...</p>
      <h2>Uygulanacak Hukuk</h2>
      <p>Lex arbitri ile sözleşme hukuku ayrımı...</p>
      <h3>Kamu Düzeni Sınırları</h3>
      <p>Yargılamada sınırlayıcı ilkeler...</p>
    `,
  },
];

type Params = { slug: string };

export default function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  // Next 15: params Promise -> React.use ile unwrap
  const { slug } = use(params);

  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return notFound();

  // JSON-LD verisi
  const articleUrl = `${site.url}/makaleler/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    image: `${site.url}${article.image}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/og.jpg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <TopBar />

      {/* ArticleBody (client) DOM işlemlerini üstlenir: TOC, smooth scroll, başlıklara id vs. */}
      <ArticleBody article={article} />

      <Footer />
    </div>
  );
}

/** Opsiyonel: SSG için */
export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

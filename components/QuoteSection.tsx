"use client";

import { motion } from "framer-motion";

export default function QuoteSection() {
  return (
    <section className="relative">
      {/* ===== Dalgalı Geçiş + Animasyon ===== */}
      <div className="absolute -top-[1px] left-0 right-0 overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-[200%] h-24 animate-wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44C208.24,72.3,103.43,95.78,0,120H1200V0C1070.18,21.72,939,43.15,807.88,54.48,675.09,65.95,543.64,58.08,411.56,48.29,381.86,46,351.76,50.73,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      {/* ===== Quote Alanı ===== */}
      <div
        className="relative flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/hukuk-books.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* İçerik */}
        <motion.div
          className="relative z-10 max-w-4xl px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-3xl md:text-4xl font-semibold leading-relaxed italic">
            ❝ Hakim; insana, tabiata, gerçeğe, olağana sırt çevirmeden ve katı
            kalıplar içinde sıkışıp kalmadan uyuşmazlığa insan kokusu taşıyan bir
            çözüm getirmek zorunluluğundadır. ❞
          </p>

          <motion.p
            className="mt-6 text-sm md:text-lg text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            viewport={{ once: true }}
          >
            — Yargıtay 1. HD. E. 1976/9370, K. 1976/13138, 31.12.1976
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

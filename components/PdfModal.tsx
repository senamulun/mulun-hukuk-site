"use client";

import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string | null;
  title?: string;
};

export default function PdfModal({ open, onClose, src, title }: Props) {
  if (!open || !src) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60">
      <div className="relative w-[95vw] max-w-5xl h-[85vh] rounded-xl overflow-hidden bg-white dark:bg-[#0a0f1a]">
        <div className="flex items-center justify-between border-b px-4 py-2 text-sm dark:border-white/10">
          <div className="font-medium">{title || "Önizleme"}</div>
          <div className="flex items-center gap-2">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50 dark:border-white/20 dark:hover:bg-white/10"
            >
              Yeni sekmede aç
            </a>
            <button onClick={onClose} aria-label="Kapat">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* Not: Bazı resmi siteler iframe’e izin vermez. İzin vermezse boş görünür; kullanıcı “Yeni sekmede aç” ile gidebilir. */}
        <iframe
          src={src}
          className="h-[calc(85vh-40px)] w-full"
          title={title || "PDF"}
        />
      </div>
    </div>
  );
}

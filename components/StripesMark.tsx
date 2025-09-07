// components/StripesMark.tsx
import React from "react";

export type StripesMarkProps = {
  /** Tek bir şeridin (bar) genişliği (px) */
  width: number;
  /** Şeritlerin yüksekliği (px) */
  height: number;
  /** Renk (hex, rgb, vb.) */
  color?: string;
  /** Şerit sayısı (varsayılan: 4) */
  bars?: number;
  /** Şeritler arası boşluk (px, varsayılan: 6) */
  gap?: number;
  /** Dikey (true) / yatay (false) çizim (varsayılan: true) */
  vertical?: boolean;
  className?: string;
  /** Opaklık (0–1 arası, varsayılan: 1) */
  opacity?: number;
};

export function StripesMark({
  width,
  height,
  color = "#5b85d9",
  bars = 4,
  gap = 6,
  vertical = true,
  className,
  opacity = 1,
}: StripesMarkProps) {
  const totalW = vertical ? bars * width + (bars - 1) * gap : width;
  const totalH = vertical ? height : bars * height + (bars - 1) * gap;

  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      fill="none"
      className={className}
      aria-hidden
      focusable="false"
    >
      {Array.from({ length: bars }).map((_, i) => (
        <rect
          key={i}
          x={vertical ? i * (width + gap) : 0}
          y={vertical ? 0 : i * (height + gap)}
          width={width}
          height={height}
          rx={2}
          ry={2}
          fill={color}
          opacity={opacity}
        />
      ))}
    </svg>
  );
}

export default StripesMark;

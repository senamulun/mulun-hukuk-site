"use client";

import React from "react";

interface StripesMarkProps {
  width?: number;
  height?: number;
}

export default function StripesMark({
  width = 18,
  height = 90,
}: StripesMarkProps) {
  const stripes = [0, 1, 2, 3]; // 4 çizgi
  return (
    <div className="flex gap-[10px]">
      {stripes.map((i) => (
        <div
          key={i}
          style={{
            width: width,
            height: height,
            borderRadius: 2,
            background: "#ffffff", // tamamen beyaz çizgi
          }}
        />
      ))}
    </div>
  );
}

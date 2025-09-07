"use client";

import React from "react";

interface FourLinesIconProps {
  className?: string;
  lineClassName?: string;
}

/**
 * Dört çizgili hamburger menü ikonu
 */
export default function FourLinesIcon({
  className = "w-6 h-6",
  lineClassName = "bg-current",
}: FourLinesIconProps) {
  return (
    <div className={`flex flex-col justify-between ${className}`} style={{ height: "20px" }}>
      <span className={`block h-[2px] rounded ${lineClassName}`} />
      <span className={`block h-[2px] rounded ${lineClassName}`} />
      <span className={`block h-[2px] rounded ${lineClassName}`} />
      <span className={`block h-[2px] rounded ${lineClassName}`} />
    </div>
  );
}

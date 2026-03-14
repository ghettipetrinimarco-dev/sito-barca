"use client";

import { useEffect, useState } from "react";

function formatNumber(n: number, useComma: boolean, useDot: boolean): string {
  if (useComma) return n.toLocaleString("en-US");
  if (useDot) return n.toLocaleString("de-DE");
  return String(n);
}

export function CountUpStat({
  value,
  inView,
  duration = 1.8,
}: {
  value: string;
  inView: boolean;
  duration?: number;
}) {
  const hasPlus = value.endsWith("+");
  const useComma = value.includes(",");
  const useDot = value.includes(".");
  const raw = value.replace(/[^0-9]/g, "");
  const isNumeric = raw.length > 0 && !/[a-zA-Z]/.test(value);
  const target = isNumeric ? parseInt(raw, 10) : 0;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || !isNumeric) return;
    setCount(0);
    const totalFrames = Math.round(duration * 60);
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      // cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress >= 1) {
        setCount(target);
        clearInterval(timer);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration, isNumeric]);

  if (!isNumeric) return <>{value}</>;
  return <>{formatNumber(count, useComma, useDot)}{hasPlus ? "+" : ""}</>;
}

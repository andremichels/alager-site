// Molecule: StatCounter — animated number counter with label
// Used in Home hero and Governance section
"use client";

import { useEffect, useState, useRef } from "react";
import { MonoLabel } from "@/components/atoms/MonoLabel";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasAnimated.current = true;
          const start = performance.now();
          const dur = 1200;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
            setCurrent(Math.round(value * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <div
        className="serif"
        style={{
          fontSize: 48,
          lineHeight: 1,
          color: "var(--color-green-deep)",
          letterSpacing: "-0.02em",
        }}
      >
        {current}
        {suffix}
      </div>
      <MonoLabel>{label}</MonoLabel>
    </div>
  );
}

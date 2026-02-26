"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { STATS } from "@/lib/constants";

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 2000);

  const formatNumber = (n: number) => {
    if (n >= 1000) return n.toLocaleString();
    return n.toString();
  };

  return (
    <div className="flex flex-col items-center text-center">
      <span ref={ref} className="font-heading text-4xl font-extrabold text-warm-amber sm:text-5xl">
        {formatNumber(count)}
        {suffix}
      </span>
      <span className="mt-2 font-body text-sm font-medium text-deep-espresso/70">
        {label}
      </span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-light-sand py-16 sm:py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 sm:gap-12 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}

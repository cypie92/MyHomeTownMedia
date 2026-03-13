"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { STATS } from "@/lib/constants";

function StatItem({ value, suffix, label, featured }: { value: number; suffix: string; label: string; featured?: boolean }) {
  const { count, ref } = useCountUp(value, 2000);

  const formatNumber = (n: number) => {
    if (n >= 1000) return n.toLocaleString();
    return n.toString();
  };

  return (
    <div className="flex flex-col items-center text-center">
      <span ref={ref} className={`font-heading font-extrabold text-warm-amber ${featured ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"}`}>
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
  const featured = STATS.filter((s) => s.featured);
  const regular = STATS.filter((s) => !s.featured);

  return (
    <section className="bg-light-sand py-16 sm:py-20">
      <div className="mx-auto max-w-5xl space-y-10 px-6">
        {/* Row 1 — featured */}
        <div className="flex justify-center gap-12 sm:gap-20">
          {featured.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
        {/* Row 2 — regular */}
        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {regular.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

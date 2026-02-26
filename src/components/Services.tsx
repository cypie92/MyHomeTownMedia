"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AIDA_STEPS } from "@/lib/constants";

function AidaStep({
  step,
  index,
}: {
  step: (typeof AIDA_STEPS)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
        isEven ? "" : "lg:direction-rtl"
      }`}
    >
      {/* Content side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={isEven ? "" : "lg:order-2 lg:text-right"}
      >
        <div className={`flex items-center gap-4 ${isEven ? "" : "lg:justify-end"}`}>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-warm-amber font-heading text-2xl font-extrabold text-white">
            {step.letter}
          </span>
          <div>
            <h3 className="font-heading text-xl font-bold text-deep-espresso sm:text-2xl">
              {step.title}
            </h3>
            <p className="font-body text-sm italic text-warm-gray">
              &ldquo;{step.tagline}&rdquo;
            </p>
          </div>
        </div>

        <h4 className="mt-4 font-heading text-lg font-bold text-warm-amber">
          {step.heading}
        </h4>
        <p className="mt-2 font-body text-base leading-relaxed text-warm-gray">
          {step.description}
        </p>

        <div className={`mt-4 flex flex-wrap gap-2 ${isEven ? "" : "lg:justify-end"}`}>
          {step.formats.map((format) => (
            <span
              key={format}
              className="rounded-full bg-light-sand px-3 py-1 font-body text-xs font-semibold text-deep-espresso/70"
            >
              {format}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className={isEven ? "" : "lg:order-1"}
      >
        <div className="flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded-2xl bg-light-sand">
          <div className="flex flex-col items-center gap-2 text-warm-gray/50">
            <svg
              className="h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-2.625 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h13.5c.621 0 1.125-.504 1.125-1.125m-14.625 0h14.625"
              />
            </svg>
            <span className="text-xs font-medium">{step.heading}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="services" ref={sectionRef} className="bg-soft-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-center sm:mb-20"
        >
          <span className="font-body text-xs font-semibold tracking-[0.2em] text-warm-amber uppercase">
            Our Services
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-deep-espresso sm:text-4xl lg:text-5xl">
            How We Build Your Brand
          </h2>
        </motion.div>

        {/* AIDA Timeline */}
        <div className="relative">
          {/* Animated vertical line (desktop only) */}
          <div className="absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 bg-light-sand lg:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-warm-amber/40"
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-16 sm:gap-24">
            {AIDA_STEPS.map((step, index) => (
              <AidaStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

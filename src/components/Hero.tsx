"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-soft-white"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-24 pb-16 lg:grid-cols-5 lg:gap-16 lg:pt-0 lg:pb-0">
        {/* Left Content */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="mb-4 inline-block rounded-full bg-light-sand px-4 py-1.5 font-body text-xs font-semibold tracking-wide text-warm-amber uppercase">
              Malaysia&apos;s Leading Social Media Marketing Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mt-4 font-heading text-4xl leading-tight font-extrabold text-deep-espresso sm:text-5xl lg:text-6xl"
          >
            Empowering Brands
            <br />
            Through <span className="text-warm-amber">Digital Stories</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-6 max-w-lg font-body text-lg leading-relaxed text-warm-gray"
          >
            We build lasting brand value through innovative, data-driven social
            media strategies — reaching over 100 million people monthly across
            Malaysia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            className="mt-8"
          >
            <a
              href="#about"
              className="inline-block rounded-full bg-warm-amber px-8 py-3.5 font-heading text-base font-bold text-white shadow-lg shadow-warm-amber/25 transition-all hover:bg-warm-amber-hover hover:shadow-xl hover:shadow-warm-amber/30"
            >
              Explore Our Work
            </a>
          </motion.div>
        </div>

        {/* Right Image */}
        <div className="relative lg:col-span-2">
          {/* Decorative blob */}
          <div className="absolute -top-8 -right-8 -z-0 h-72 w-72 rounded-full bg-light-sand blur-3xl sm:h-96 sm:w-96" />

          <motion.div
            style={{ y: imageY }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-3xl bg-light-sand"
            >
              {/* Placeholder */}
              <div className="flex flex-col items-center gap-3 text-warm-gray/50">
                <svg
                  className="h-16 w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <span className="text-sm font-medium">Team Photo</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

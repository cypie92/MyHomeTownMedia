"use client";

import { motion } from "framer-motion";
import Scrollytelling from "./Scrollytelling";

export default function Services() {
  return (
    <section id="services" className="bg-soft-white pt-20 pb-0 sm:pt-28">
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

      </div>

      {/* Scrollytelling — What We Create */}
      <div>
        <Scrollytelling />
      </div>
    </section>
  );
}

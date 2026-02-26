"use client";

import { motion } from "framer-motion";
import { CLIENT_LOGOS } from "@/lib/constants";

export default function TrustedBy() {
  return (
    <section id="clients" className="bg-soft-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <span className="font-body text-xs font-semibold tracking-[0.2em] text-warm-amber uppercase">
            Our Clients
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-deep-espresso sm:text-4xl">
            Trusted by Brands Across Malaysia
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CLIENT_LOGOS.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: Math.floor(index / 4) * 0.15 + (index % 4) * 0.05,
                ease: "easeOut",
              }}
              className="group flex h-24 items-center justify-center rounded-2xl bg-light-sand transition-all hover:bg-warm-ivory hover:shadow-sm sm:h-28"
            >
              <span className="font-heading text-sm font-bold text-warm-gray/50 transition-colors group-hover:text-warm-amber">
                {logo}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

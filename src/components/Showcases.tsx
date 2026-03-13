"use client";

import { motion } from "framer-motion";

const SHOWCASES = [
  {
    id: "s6oZUBtBFh0",
    title: "Showcase 1",
  },
  {
    id: "CZpMg-8zkQI",
    title: "Showcase 2",
  },
  {
    id: "UZunrHplGQU",
    title: "Showcase 3",
  },
];

export default function Showcases() {
  return (
    <section className="bg-soft-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <span className="font-body text-xs font-semibold tracking-[0.2em] text-warm-amber uppercase">
            Our Work
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-deep-espresso sm:text-4xl lg:text-5xl">
            Showcases
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-warm-gray leading-relaxed">
            Take a look at some of the amazing work we&apos;ve done for our clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {SHOWCASES.map((showcase, index) => (
            <motion.div
              key={showcase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="aspect-video w-full overflow-hidden bg-light-sand relative">
                {/* Increased scale/height hack to crop out the YouTube logo at the bottom and title at the top */}
                <div className="absolute inset-0 overflow-hidden bg-black pointer-events-none">
                  <iframe
                    src={`https://www.youtube.com/embed/${showcase.id}?rel=0&modestbranding=1&controls=0&disablekb=1&fs=0`}
                    title={showcase.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute -top-[25%] h-[150%] w-full border-0 pointer-events-auto"
                  ></iframe>
                </div>
                {/* Transparent overlays to block clicking the YouTube Title and Logo area just in case */}
                <div className="absolute left-0 right-0 top-0 h-20 bg-transparent z-10" />
                <div className="absolute bottom-0 right-0 h-16 w-32 bg-transparent z-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

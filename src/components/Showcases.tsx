"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SHOWCASES = [
  { id: "s6oZUBtBFh0", title: "Brand Story Film", chapter: 1 },
  { id: "CZpMg-8zkQI", title: "Product Launch Campaign", chapter: 2 },
  { id: "UZunrHplGQU", title: "Social Media Series", chapter: 3 },
  { id: "dQw4w9WgXcQ", title: "Community Documentary", chapter: 4 },
  { id: "9bZkp7q19f0", title: "Event Highlight Reel", chapter: 5 },
];

export default function Showcases() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <section className="bg-soft-white py-20 sm:py-28">
        <div className="mx-auto max-w-[90rem] px-6">
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

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {SHOWCASES.slice(0, 3).map((showcase, index) => (
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
                className="group overflow-hidden rounded-2xl bg-warm-ivory shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="aspect-video w-full overflow-hidden bg-light-sand relative">
                  <div className="absolute inset-0 overflow-hidden bg-black pointer-events-none">
                    <iframe
                      src={`https://www.youtube.com/embed/${showcase.id}?rel=0&modestbranding=1&controls=0&disablekb=1&fs=0`}
                      title={showcase.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute -top-[25%] h-[150%] w-full border-0 pointer-events-auto"
                    ></iframe>
                  </div>
                  <div className="absolute left-0 right-0 top-0 h-20 bg-transparent z-10" />
                  <div className="absolute bottom-0 right-0 h-16 w-32 bg-transparent z-10" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="group inline-flex items-center gap-2 rounded-full bg-warm-amber px-8 py-3.5 font-heading text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-warm-amber-hover hover:shadow-xl hover:scale-105 active:scale-100"
            >
              View More Showcases
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── Immersive Storytelling Modal ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#1a1a1a]/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Shell */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-[90vh] w-[95vw] max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-[#1a1a1a] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header — Fixed Navbar */}
              <div className="relative z-20 flex shrink-0 items-center justify-between border-b border-white/10 bg-[#1a1a1a]/80 px-6 py-5 backdrop-blur-lg sm:px-10">
                <div>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-body text-xs font-bold tracking-[0.25em] text-warm-amber uppercase"
                  >
                    Our Portfolio
                  </motion.p>
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-1 font-heading text-xl font-extrabold text-white sm:text-2xl"
                  >
                    The Work That Speaks
                  </motion.h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 transition-all duration-300 hover:bg-warm-amber hover:text-white hover:border-warm-amber"
                >
                  <svg className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="relative flex-1 overflow-y-auto no-scrollbar scroll-smooth bg-[#111]">

                {/* Intro Hero Section */}
                <div className="relative flex min-h-[35vh] items-center justify-center px-6 py-12 text-center sm:px-12">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_100%)] pointer-events-none" />
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 max-w-3xl font-heading text-xl font-medium leading-relaxed text-white/80 sm:text-2xl md:text-3xl"
                  >
                    Every project begins with a <span className="text-white">vision</span> and ends with an <span className="text-warm-amber">impact</span>. Here are the stories we&apos;ve helped bring to life.
                  </motion.p>
                </div>

                {/* Timeline Sections */}
                <div className="relative mx-auto max-w-5xl pb-16">
                  {/* Vertical Timeline Guide Line */}
                  <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gradient-to-b from-transparent via-warm-amber/20 to-transparent sm:left-1/2 md:block" />

                  {SHOWCASES.map((item, index) => {
                    const isEven = index % 2 === 0;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative mb-24 px-6 sm:px-12 md:flex md:items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                      >
                        {/* Timeline Center Node (Desktop only) */}
                        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex h-12 w-12 items-center justify-center z-20">
                          <div className="absolute inset-0 animate-ping rounded-full bg-warm-amber/20" style={{ animationDuration: "3s" }} />
                          <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-warm-amber bg-[#1a1a1a] text-xs font-bold text-warm-amber shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                            {item.chapter}
                          </div>
                        </div>

                        {/* Video Panel */}
                        <div className={`mb-8 md:mb-0 md:w-1/2 ${isEven ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"}`}>
                          <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                            <div className="absolute inset-0 overflow-hidden bg-black pointer-events-none">
                              <iframe
                                src={`https://www.youtube.com/embed/${item.id}?rel=0&modestbranding=1&controls=0&disablekb=1&fs=0`}
                                title={item.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute -top-[25%] h-[150%] w-full border-0 pointer-events-auto"
                              ></iframe>
                            </div>
                            <div className="absolute left-0 right-0 top-0 h-16 bg-transparent z-10" />
                            <div className="absolute bottom-0 right-0 h-12 w-28 bg-transparent z-10" />

                            {/* Chapter badge on mobile */}
                            <div className="absolute bottom-3 left-3 flex items-center gap-3 md:hidden z-20">
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-warm-amber text-[10px] font-bold text-white shadow-lg">
                                {item.chapter}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Title Panel */}
                        <div className={`md:w-1/2 ${isEven ? "md:pl-12 lg:pl-16" : "md:pr-12 lg:pr-16 md:text-right"}`}>
                          <h4 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                            {item.title}
                          </h4>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer CTA */}
                <div className="relative border-t border-white/10 bg-[#1a1a1a] px-6 py-20 text-center sm:px-12">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-2xl"
                  >
                    <h4 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                      Like what you see?
                    </h4>
                    <p className="mt-4 font-body text-lg text-white/60">
                      Let&apos;s create something extraordinary for your brand.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                      <a
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-2 rounded-full bg-warm-amber px-8 py-4 font-heading text-base font-semibold text-white shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:bg-[#b8860b] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105"
                      >
                        Start Your Project
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

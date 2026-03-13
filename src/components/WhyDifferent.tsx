"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SERVICES_STORY } from "@/lib/constants";

/* First 5 items shown on the page */
const VISIBLE_SERVICES = SERVICES_STORY.slice(0, 5);

const icons: Record<string, React.ReactNode> = {
  media: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
  ),
  video: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z" />
    </svg>
  ),
  sales: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  news: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    </svg>
  ),
  ecommerce: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  community: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  strategy: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
    </svg>
  ),
  influencer: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  event: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  design: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  analytics: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
};

export default function WhyDifferent() {
  const [showModal, setShowModal] = useState(false);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  return (
    <>
      <section className="bg-light-sand py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-14 text-center"
          >
            <span className="font-body text-xs font-semibold tracking-[0.2em] text-warm-amber uppercase">
              What We Do
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold text-deep-espresso sm:text-4xl lg:text-5xl">
              We Don&apos;t Just Manage Pages
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base text-warm-gray leading-relaxed">
              We build brands, drive sales, and create communities — here&apos;s how we do it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VISIBLE_SERVICES.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="group relative overflow-hidden rounded-2xl bg-warm-ivory p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-warm-amber/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-light-sand text-warm-amber transition-colors duration-300 group-hover:bg-warm-amber group-hover:text-white">
                    {icons[item.icon]}
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-deep-espresso">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-warm-gray">
                    {item.narrative.length > 80 ? item.narrative.slice(0, 80) + "…" : item.narrative}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-12 hidden text-center"
          >
            <button
              onClick={() => setShowModal(true)}
              className="group inline-flex items-center gap-2 rounded-full bg-warm-amber px-8 py-3.5 font-heading text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-warm-amber-hover hover:shadow-xl hover:scale-105 active:scale-100"
            >
              Explore More Services
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── Immersive Storytelling Modal ─── */}
      <AnimatePresence>
        {showModal && (
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
              onClick={() => setShowModal(false)}
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
                    Our Story in Services
                  </motion.p>
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-1 font-heading text-xl font-extrabold text-white sm:text-2xl"
                  >
                    The Full Journey
                  </motion.h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 transition-all duration-300 hover:bg-warm-amber hover:text-white hover:border-warm-amber"
                >
                  <svg className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable Timeline area */}
              <div className="relative flex-1 overflow-y-auto no-scrollbar scroll-smooth bg-[#111]">
                
                {/* Intro Hero Section */}
                <div className="relative flex min-h-[40vh] items-center justify-center px-6 py-12 text-center sm:px-12">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_100%)] pointer-events-none" />
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 max-w-3xl font-heading text-xl font-medium leading-relaxed text-white/80 sm:text-2xl md:text-3xl"
                  >
                    Every great brand has a story. Here&apos;s how we help you tell yours — from <span className="text-white">first impression</span> to <span className="text-warm-amber">lasting impact</span>.
                  </motion.p>
                </div>

                {/* Timeline Sections */}
                <div className="relative mx-auto max-w-5xl pb-32">
                  {/* Vertical Timeline Guide Line (Hidden on tiny screens, centered on large) */}
                  <div className="absolute bottom-0 left-6 top-0 hidden w-px bg-gradient-to-b from-transparent via-warm-amber/20 to-transparent sm:left-1/2 md:block" />

                  {SERVICES_STORY.map((item, index) => {
                    const isEven = index % 2 === 0;

                    return (
                      <motion.div
                        key={item.chapter}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative mb-24 px-6 sm:px-12 md:flex md:items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                      >
                        {/* Timeline Center Node (Desktop only) */}
                        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex h-12 w-12 items-center justify-center z-20">
                          <div className="absolute inset-0 animate-ping rounded-full bg-warm-amber/20" style={{ animationDuration: '3s' }} />
                          <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-warm-amber bg-[#1a1a1a] text-xs font-bold text-warm-amber shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                            {item.chapter}
                          </div>
                        </div>

                        {/* Image Panel */}
                        <div className={`mb-8 md:mb-0 md:w-1/2 ${isEven ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"}`}>
                          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                            <Image
                              src={item.image!}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent" />
                            
                            {/* Icon & Chapter tag inside image bottom */}
                            <div className="absolute bottom-4 left-4 flex items-center gap-3 md:hidden">
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-warm-amber text-[10px] font-bold text-white">
                                {item.chapter}
                              </span>
                            </div>
                            <div className="absolute bottom-4 right-4 text-warm-amber/80 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                              {icons[item.icon]}
                            </div>
                          </div>
                        </div>

                        {/* Text Panel */}
                        <div className={`md:w-1/2 ${isEven ? "md:pl-12 lg:pl-16" : "md:pr-12 lg:pr-16 md:text-right"}`}>
                          <h4 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                            {item.title}
                          </h4>
                          <p className="mt-4 font-body text-base leading-relaxed text-white/70">
                            {item.narrative}
                          </p>
                          <div className={`mt-6 flex ${isEven ? "justify-start" : "justify-start md:justify-end"}`}>
                            <span className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-4 py-2 font-body text-xs font-medium text-warm-amber backdrop-blur-sm">
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                              {item.highlight}
                            </span>
                          </div>
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
                      Ready to write your brand&apos;s next chapter?
                    </h4>
                    <p className="mt-4 font-body text-lg text-white/60">
                      Let&apos;s build something extraordinary together.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                      <a
                        href="#contact"
                        onClick={() => setShowModal(false)}
                        className="inline-flex items-center gap-2 rounded-full bg-warm-amber px-8 py-4 font-heading text-base font-semibold text-white shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:bg-[#b8860b] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105"
                      >
                        Start Your Journey
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

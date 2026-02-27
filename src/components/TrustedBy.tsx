"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CATEGORY_TABS = [
  { id: "home-living", label: "Home & Living", img: "/images/clients/home-living.png" },
  { id: "property", label: "Property", img: "/images/clients/property.png" },
  { id: "events", label: "Events", img: "/images/clients/events.png" },
  { id: "it-tech-automotive", label: "IT & Automotive", img: "/images/clients/it-tech-automotive.png" },
  { id: "fashion-sports", label: "Fashion & Sports", img: "/images/clients/fashion-sports.png" },
  { id: "food-beverages", label: "Food & Beverages", img: "/images/clients/food-beverages.png" },
  { id: "lifestyle-personal-care", label: "Lifestyle & Care", img: "/images/clients/lifestyle-personal-care.png" },
  { id: "education", label: "Education", img: "/images/clients/education.png" },
  { id: "travel-accommodation", label: "Travel & Hotels", img: "/images/clients/travel-accommodation.png" },
];

export default function TrustedBy() {
  const [activeTab, setActiveTab] = useState(CATEGORY_TABS[0].id);

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

        <div className="flex flex-col items-center">
          {/* Tabs Container */}
          <div className="relative w-full max-w-[100vw] [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] sm:[mask-image:none]">
            <div className="mb-12 flex w-full overflow-x-auto pb-4 sm:flex-wrap sm:justify-center gap-3 sm:gap-3 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 snap-center rounded-full px-5 py-2.5 font-heading text-sm font-semibold transition-all duration-300 ${activeTab === tab.id
                    ? "bg-deep-espresso text-white shadow-lg shadow-deep-espresso/20"
                    : "bg-light-sand text-warm-gray hover:bg-warm-ivory hover:text-deep-espresso"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Category Image Panel */}
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-deep-espresso/5 sm:p-10">
            <AnimatePresence mode="wait">
              {CATEGORY_TABS.map(
                (tab) =>
                  tab.id === activeTab && (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="flex w-full items-center justify-center pointer-events-none relative h-[200px]"
                    >
                      <Image
                        src={tab.img}
                        alt={`${tab.label} partners and clients`}
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

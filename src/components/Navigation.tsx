"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import Image from "next/image";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);


  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="sticky top-0 z-50 w-full transition-all duration-300 bg-soft-white/95 backdrop-blur-md shadow-sm border-b border-deep-espresso/5"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-heading text-lg sm:text-xl font-extrabold tracking-tight sm:tracking-normal text-deep-espresso">
            <Image src="/logo.webp" alt="My Hometown Media Logo" width={40} height={40} className="h-8 w-auto sm:h-10 object-contain" />
            <span>My Hometown<span className="text-warm-amber">Media</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium text-warm-gray transition-colors hover:text-deep-espresso"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-warm-amber px-5 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-warm-amber-hover"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-deep-espresso transition-all duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
            />
            <span
              className={`block h-0.5 w-6 bg-deep-espresso transition-all duration-300 ${mobileOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`block h-0.5 w-6 bg-deep-espresso transition-all duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-soft-white md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-heading text-2xl font-bold text-deep-espresso transition-colors hover:text-warm-amber"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-warm-amber px-8 py-3 font-heading text-lg font-bold text-white transition-colors hover:bg-warm-amber-hover"
            >
              Get in Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Existing vertical scroll parallax
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Mouse hover panning parallax (gyroscope effect)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the raw mouse coordinates so the image doesn't snap instantly
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transform normalized mouse (-1 to 1) into subtle physical pixel movement across the screen
  const panX = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const panY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();

    // Calculate normalized position from center (-1 to 1)
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  // Reset image perfectly to center when mouse leaves the banner
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Trigger slight initial pan on mount for visual interest
  useEffect(() => {
    mouseX.set(0.1);
    mouseY.set(-0.1);
    const timeout = setTimeout(() => {
      mouseX.set(0);
      mouseY.set(0);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[calc(100svh-76px)] items-center justify-center overflow-hidden"
    >
      {/* Absolute Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: imageY }}
          className="h-[120%] w-full"
        >
          {/* Inner motion container translates X/Y based on mouse, scaled slightly to avoid edge peeking */}
          <motion.div
            style={{ x: panX, y: panY }}
            className="h-full w-full scale-105"
          >
            <img
              src="/images/crew.png"
              alt="My Hometown Media Team"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Dark Overlay Tint to make white text readable */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-deep-espresso/90 via-deep-espresso/60 to-deep-espresso/40" />

      {/* Foreground Content Stack */}
      <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-6 inline-block rounded-full border border-soft-white/20 bg-soft-white/10 px-4 py-1.5 font-body text-xs font-semibold tracking-wide text-soft-white uppercase backdrop-blur-md">
            Malaysia&apos;s Leading Social Media Marketing Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mt-2 font-heading text-4xl leading-tight font-extrabold text-white sm:text-6xl lg:text-7xl"
        >
          Empowering Brands
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Through <span className="text-warm-amber">Digital Stories</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-soft-white/90 sm:text-xl"
        >
          We build lasting brand value through innovative, data-driven social
          media strategies — reaching over 100 million people monthly across
          Malaysia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#about"
            className="inline-block rounded-full bg-warm-amber px-10 py-4 font-heading text-lg font-bold text-white shadow-xl shadow-warm-amber/20 transition-all hover:-translate-y-1 hover:bg-warm-amber-hover hover:shadow-2xl hover:shadow-warm-amber/30"
          >
            Explore Our Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}

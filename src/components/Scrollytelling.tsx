"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const SECTIONS = [
  {
    title: "Photo / Content",
    description:
      "We craft stunning visuals that stop the scroll. From professional product shots to lifestyle photography, every image is designed to tell your brand's story and leave a lasting impression.",
    image: "/images/photo.jpeg",
  },
  {
    title: "Video",
    description:
      "Cinematic storytelling that brings your brand to life. Our video production captures attention from the first frame — polished, purposeful, and built to convert viewers into fans.",
    image: "/images/video.jpeg",
  },
  {
    title: "Reels",
    description:
      "Short, punchy, and impossible to ignore. We produce scroll-stopping reels optimized for Instagram, TikTok, and Facebook — designed to ride the algorithm and reach millions.",
    image: "/images/reels.jpeg",
  },
  {
    title: "Live",
    description:
      "Real-time connection that builds trust. Our live streaming expertise drives engagement, showcases products authentically, and turns passive viewers into active customers — all in real-time.",
    image: "/images/live.jpeg",
  },
];

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sectionCount = SECTIONS.length;
    const index = Math.min(
      Math.floor(latest * sectionCount),
      sectionCount - 1
    );
    if (index !== prevIndexRef.current) {
      setDirection(index > prevIndexRef.current ? 1 : -1);
      prevIndexRef.current = index;
    }
    setActiveIndex(index);

    // Only enable mandatory snap when between first and last steps
    // so the user can freely scroll out at the edges
    const inSnapZone = latest > 0.05 && latest < 0.92;
    document.documentElement.style.scrollSnapType = inSnapZone
      ? "y mandatory"
      : "";
  });

  useEffect(() => {
    return () => {
      document.documentElement.style.scrollSnapType = "";
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-light-sand">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="mx-auto flex max-w-7xl">
          {/* Left Column — Scrollable text */}
          <div className="w-1/2 px-6 lg:px-12">
            {SECTIONS.map((section, i) => (
              <div
                key={i}
                className="flex h-screen snap-start snap-always items-center pt-[72px]"
              >
                <motion.div
                  animate={{ opacity: activeIndex === i ? 1 : 0.25 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-md"
                >
                  <h3 className="font-heading text-3xl font-extrabold text-deep-espresso lg:text-4xl">
                    {section.title}
                  </h3>
                  <p className="mt-4 font-body text-base leading-relaxed text-warm-gray lg:text-lg">
                    {section.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right Column — Sticky phone */}
          <div className="w-1/2">
            <div className="sticky top-[72px] flex h-[calc(100vh-72px)] items-center justify-center">
              <PhoneMockup activeIndex={activeIndex} direction={direction} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <MobileScrollytelling />
    </div>
  );
}

function PhoneMockup({ activeIndex, direction }: { activeIndex: number; direction: number }) {
  return (
    <div className="relative h-[75vh] w-[calc(75vh*0.49)]">
      {/* Screen content — TikTok-style vertical slide */}
      <div className="absolute inset-[3%] overflow-hidden rounded-[2.5rem]" style={{ zIndex: 0 }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            className="absolute inset-0"
            initial={{ y: direction > 0 ? "100%" : "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: direction > 0 ? "-100%" : "100%" }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            <Image
              src={SECTIONS[activeIndex].image}
              alt={SECTIONS[activeIndex].title}
              fill
              className="object-cover"
              sizes="32vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Phone frame overlay */}
      <Image
        src="/images/phone_frame.png"
        alt="Phone frame"
        fill
        className="pointer-events-none object-contain"
        style={{ zIndex: 10 }}
        sizes="32vw"
        priority
      />
    </div>
  );
}

function MobileScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sectionCount = SECTIONS.length;
    const index = Math.min(
      Math.floor(latest * sectionCount),
      sectionCount - 1
    );
    if (index !== prevIndexRef.current) {
      setDirection(index > prevIndexRef.current ? 1 : -1);
      prevIndexRef.current = index;
    }
    setActiveIndex(index);
  });

  return (
    <div ref={containerRef} className="md:hidden">
      {/* Sticky phone at top */}
      <div className="sticky top-16 z-10 flex justify-center py-6">
        <div className="relative h-[420px] w-[210px]">
          <div className="absolute inset-[3%] overflow-hidden rounded-[1.8rem]" style={{ zIndex: 0 }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                className="absolute inset-0"
                initial={{ y: direction > 0 ? "100%" : "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: direction > 0 ? "-100%" : "100%" }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                <Image
                  src={SECTIONS[activeIndex].image}
                  alt={SECTIONS[activeIndex].title}
                  fill
                  className="object-cover"
                  sizes="210px"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <Image
            src="/images/phone_frame.png"
            alt="Phone frame"
            fill
            className="pointer-events-none object-contain"
            style={{ zIndex: 10 }}
            sizes="210px"
          />
        </div>
      </div>

      {/* Scrolling text cards */}
      <div className="relative z-20 px-6 pt-4 pb-20">
        {SECTIONS.map((section, i) => (
          <div key={i} className="flex min-h-[70vh] items-end pb-12">
            <motion.div
              animate={{ opacity: activeIndex === i ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-warm-ivory/90 p-6 shadow-sm ring-1 ring-deep-espresso/5 backdrop-blur-md"
            >
              <h3 className="font-heading text-2xl font-extrabold text-deep-espresso">
                {section.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-warm-gray">
                {section.description}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ROW_1 = [
  { name: "Brand A", logo: null },
  { name: "Brand B", logo: null },
  { name: "Brand C", logo: null },
  { name: "Brand D", logo: null },
  { name: "Brand E", logo: null },
  { name: "Brand F", logo: null },
  { name: "Brand G", logo: null },
  { name: "Brand H", logo: null },
  { name: "Brand I", logo: null },
  { name: "Brand J", logo: null },
];

const ROW_2 = [
  { name: "Brand K", logo: null },
  { name: "Brand L", logo: null },
  { name: "Brand M", logo: null },
  { name: "Brand N", logo: null },
  { name: "Brand O", logo: null },
  { name: "Brand P", logo: null },
  { name: "Brand Q", logo: null },
  { name: "Brand R", logo: null },
  { name: "Brand S", logo: null },
  { name: "Brand T", logo: null },
];

function LogoCard({ name }: { name: string }) {
  return (
    <div className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-deep-espresso/5 sm:h-24 sm:w-52">
      {/* Replace with <Image> when real logos are available */}
      <span className="font-heading text-xs font-semibold text-warm-gray/60 select-none">
        {name}
      </span>
    </div>
  );
}

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

function ScrollRow({
  brands,
  direction = "left",
  duration = 25,
  mobileDuration = 15,
}: {
  brands: typeof ROW_1;
  direction?: "left" | "right";
  duration?: number;
  mobileDuration?: number;
}) {
  const isMobile = useIsMobile();
  const activeDuration = isMobile ? mobileDuration : duration;
  // Duplicate items to create seamless loop
  const items = [...brands, ...brands];

  return (
    <div className="relative w-full overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        key={activeDuration}
        className="flex gap-6"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration: activeDuration,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {items.map((brand, i) => (
          <LogoCard key={`${brand.name}-${i}`} name={brand.name} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section id="clients" className="bg-light-sand py-20 sm:py-28">
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
      </div>

      <div className="flex flex-col gap-4">
        <ScrollRow brands={ROW_1} direction="left" duration={25} />
        <ScrollRow brands={ROW_2} direction="right" duration={25} />
      </div>
    </section>
  );
}

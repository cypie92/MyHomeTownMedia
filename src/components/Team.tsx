"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Photo wall data — replace placeholders with real team photos later
const TEAM_PHOTOS = [
  { id: 1, src: "/hosts/1.png", alt: "Team brainstorming session", span: "tall" as const },
  { id: 2, src: "/hosts/crew.png", alt: "Group photo at company event", span: "wide" as const },
  { id: 3, src: "/hosts/3.png", alt: "Behind the scenes filming", span: "normal" as const },
  { id: 4, src: "/hosts/4.png", alt: "Team celebration", span: "normal" as const },
  { id: 5, src: "/hosts/host.png", alt: "On-location shoot", span: "wide" as const },
  { id: 6, src: "/hosts/6.png", alt: "Office hangout", span: "tall" as const },
  { id: 7, src: "/hosts/7.png", alt: "Award ceremony", span: "normal" as const },
  { id: 8, src: "/hosts/8.png", alt: "Creative workshop", span: "normal" as const },
];

// Deterministic rotations so they don't shift on re-render
const ROTATIONS = [-3, 2, -1.5, 2.5, -2, 1.5, -2.5, 3];

// Push-pin SVG component
function PushPin() {
  return (
    <svg
      className="absolute -top-3 left-1/2 z-10 h-7 w-7 -translate-x-1/2 drop-shadow-md"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="10" r="5" className="fill-warm-amber" />
      <circle cx="12" cy="10" r="2.5" fill="white" fillOpacity={0.4} />
      <line x1="12" y1="15" x2="12" y2="22" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Placeholder component for when real photos aren't available yet
function PhotoPlaceholder({ alt, span }: { alt: string; span: string }) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-light-sand ${span === "wide" ? "bg-gradient-to-br" : "bg-gradient-to-tr"} from-light-sand to-warm-amber/10`}>
      <div className="flex flex-col items-center gap-3 px-4 text-center">
        <svg className="h-12 w-12 text-warm-amber/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
          />
        </svg>
        <span className="font-body text-xs text-warm-gray/50">{alt}</span>
      </div>
    </div>
  );
}

function PhotoCard({
  photo,
  index,
  isSelected,
  onOpen,
}: {
  photo: (typeof TEAM_PHOTOS)[number];
  index: number;
  isSelected: boolean;
  onOpen: (photo: (typeof TEAM_PHOTOS)[number]) => void;
}) {
  const rotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{
        rotate: 0,
        scale: 1.05,
        y: -8,
        zIndex: 20,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      style={{ rotate: rotation }}
      className={`group relative cursor-pointer ${
        photo.span === "tall"
          ? "sm:row-span-2"
          : photo.span === "wide"
            ? "sm:col-span-2"
            : ""
      } ${isSelected ? "invisible" : ""}`}
      onClick={() => onOpen(photo)}
    >
      <PushPin />

      {/* Polaroid frame — this is the shared layout element */}
      <motion.div
        layoutId={`photo-${photo.id}`}
        className="relative overflow-hidden rounded-sm bg-white p-3 pb-5 shadow-[4px_6px_16px_rgba(0,0,0,0.15)] transition-shadow duration-300 group-hover:shadow-[6px_10px_30px_rgba(0,0,0,0.25)] sm:p-4 sm:pb-6"
        style={{ rotate: rotation }}
      >
        {/* Photo */}
        <div
          className={`relative w-full overflow-hidden bg-light-sand aspect-square ${
            photo.span === "tall"
              ? "sm:aspect-[3/4]"
              : photo.span === "wide"
                ? "sm:aspect-[16/9]"
                : "sm:aspect-square"
          }`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes={photo.span === "wide" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 -z-10">
            <PhotoPlaceholder alt={photo.alt} span={photo.span} />
          </div>
        </div>

        {/* Handwritten-style caption */}
        <motion.p
          layoutId={`caption-${photo.id}`}
          className="mt-2 truncate text-center font-body text-[11px] text-deep-espresso/60 italic"
        >
          {photo.alt}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function Team() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof TEAM_PHOTOS)[number] | null>(null);

  const handleClose = useCallback(() => setSelectedPhoto(null), []);

  // Lock body scroll & listen for Escape when lightbox is open
  useEffect(() => {
    if (!selectedPhoto) return;
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedPhoto, handleClose]);

  return (
    <LayoutGroup>
      <section id="team" className="relative overflow-hidden bg-light-sand py-20 sm:py-28">
        {/* Cork board texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-16 text-center"
          >
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-warm-amber">
              Our People
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold text-deep-espresso sm:text-4xl lg:text-5xl">
              Meet the Team
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-warm-gray">
              Behind every great story is an even greater team. Here&apos;s a glimpse into the people and moments that make us who we are.
            </p>
          </motion.div>

          {/* Masonry Photo Wall */}
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 sm:auto-rows-[180px] sm:grid-cols-3 sm:gap-8 md:grid-cols-4 md:gap-10">
            {TEAM_PHOTOS.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                isSelected={selectedPhoto?.id === photo.id}
                onOpen={setSelectedPhoto}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Expanded photo overlay — shared layout animation */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={handleClose}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* The Polaroid card animates from grid position to center */}
            <motion.div
              layoutId={`photo-${selectedPhoto.id}`}
              className="relative z-10 overflow-hidden rounded-sm bg-white p-2 pb-6 shadow-2xl sm:p-6 sm:pb-12"
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ rotate: 0 }}
            >
              <div className={`relative overflow-hidden bg-light-sand ${
                selectedPhoto.span === "tall"
                  ? "aspect-[3/4] w-[70vw] max-w-md sm:w-[40vw]"
                  : selectedPhoto.span === "wide"
                    ? "aspect-[16/9] w-[88vw] max-w-4xl sm:w-[70vw]"
                    : "aspect-square w-[80vw] max-w-lg sm:w-[50vw]"
              }`}>
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-cover"
                  sizes="85vw"
                  priority
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 -z-10">
                  <PhotoPlaceholder alt={selectedPhoto.alt} span={selectedPhoto.span} />
                </div>
              </div>

              <motion.p
                layoutId={`caption-${selectedPhoto.id}`}
                className="mt-4 text-center font-body text-sm text-deep-espresso/70 italic sm:mt-5 sm:text-base"
              >
                {selectedPhoto.alt}
              </motion.p>
            </motion.div>

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.15 }}
              onClick={handleClose}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-warm-amber hover:text-white sm:right-8 sm:top-8 sm:h-12 sm:w-12"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

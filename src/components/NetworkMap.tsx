"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { STATES_DATA, NATIONAL_PAGES } from "@/lib/constants";
import { SVG_VIEWBOX, STATE_PATHS, STATE_CENTERS } from "@/lib/malaysia-svg";

function getStateColor(stateId: string): string {
  const data = STATES_DATA[stateId];
  if (!data) return "#E8DFD3";
  if (data.facebook && data.instagram) return "#E09145";
  if (data.facebook) return "#1877F2";
  if (data.instagram) return "#E4405F";
  return "#E8DFD3";
}

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "facebook") {
    return (
      <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  if (platform === "tiktok") {
    return (
      <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  );
}

export default function NetworkMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const hoveredData = hoveredState ? STATES_DATA[hoveredState] : null;
  const hoveredCenter = hoveredState ? STATE_CENTERS[hoveredState] : null;

  return (
    <section className="relative overflow-hidden bg-soft-white py-20 sm:py-28">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-light-sand/60 blur-3xl" />
      </div>
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3">
        <div className="h-[400px] w-[400px] rounded-full bg-soft-peach/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 text-center sm:mb-16"
        >
          <span className="font-body text-xs font-semibold tracking-[0.2em] text-warm-amber uppercase">
            Our Network
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-deep-espresso sm:text-4xl lg:text-5xl">
            Covering Every Corner
            <br className="hidden sm:block" /> of Malaysia
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-base leading-relaxed text-warm-gray">
            With dedicated pages across all 14 states, we connect your brand
            to every community in the nation.
          </p>
        </motion.div>

        {/* Map Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-deep-espresso/[0.06] bg-white p-6 shadow-[0_8px_40px_-12px_rgba(44,30,19,0.08)] sm:p-10"
        >
          {/* Map inner container with sea background */}
          <div className="relative overflow-hidden rounded-2xl bg-[#EFF6FA]">
            {/* Subtle dot pattern overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(#2C1E13 0.8px, transparent 0.8px)",
                backgroundSize: "16px 16px",
              }}
            />

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredData && hoveredCenter && (
                <motion.div
                  key={hoveredState}
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="pointer-events-none absolute z-30"
                  style={{
                    left: `${(hoveredCenter.x / 900) * 100}%`,
                    top: `${(hoveredCenter.y / 500) * 100}%`,
                    transform: "translate(-50%, -120%)",
                  }}
                >
                  <div className="rounded-2xl border border-deep-espresso/[0.06] bg-white px-5 py-4 shadow-[0_12px_40px_-8px_rgba(44,30,19,0.15)]">
                    {/* Tooltip arrow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[6px]">
                      <div className="h-3 w-3 rotate-45 border-r border-b border-deep-espresso/[0.06] bg-white" />
                    </div>

                    <div className="flex items-baseline gap-2">
                      <p className="font-heading text-base font-bold text-deep-espresso">
                        {hoveredData.name}
                      </p>
                      <p className="font-body text-xs text-warm-gray">{hoveredData.nameMY}</p>
                    </div>

                    <div className="mt-3 space-y-2">
                      {hoveredData.facebook && (
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1877F2]/10 text-[#1877F2]">
                            <PlatformIcon platform="facebook" />
                          </div>
                          <span className="font-body text-xs text-deep-espresso/80">{hoveredData.facebook}</span>
                        </div>
                      )}
                      {hoveredData.instagram && (
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#E4405F]/10 text-[#E4405F]">
                            <PlatformIcon platform="instagram" />
                          </div>
                          <span className="font-body text-xs text-deep-espresso/80">{hoveredData.instagram}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SVG Map */}
            <svg
              viewBox={SVG_VIEWBOX}
              className="relative z-10 w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="state-glow">
                  <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#E09145" floodOpacity="0.3" />
                </filter>
                <filter id="state-shadow">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#2C1E13" floodOpacity="0.05" />
                </filter>
              </defs>

              {/* State paths */}
              {Object.entries(STATE_PATHS).map(([stateId, path]) => {
                const isHovered = hoveredState === stateId;
                const data = STATES_DATA[stateId];
                const color = getStateColor(stateId);
                const hasData = !!data;

                return (
                  <path
                    key={stateId}
                    d={path}
                    className="cursor-pointer"
                    fill={
                      isHovered
                        ? color
                        : hasData
                          ? "#FFF8F0"
                          : "#F0EBE5"
                    }
                    stroke={isHovered ? color : hasData ? "#DDD2C5" : "#E0D8CE"}
                    strokeWidth={isHovered ? 2 : 0.8}
                    strokeLinejoin="round"
                    filter={isHovered ? "url(#state-glow)" : "url(#state-shadow)"}
                    onMouseEnter={() => setHoveredState(stateId)}
                    onMouseLeave={() => setHoveredState(null)}
                    style={{
                      transition: "fill 0.25s ease, stroke 0.25s ease, stroke-width 0.2s ease",
                    }}
                  />
                );
              })}

              {/* State name labels */}
              {Object.entries(STATE_CENTERS).map(([stateId, center]) => {
                const data = STATES_DATA[stateId];
                if (!data) return null;
                const isSmall = ["perlis", "penang", "kl", "melaka", "putrajaya", "labuan"].includes(stateId);
                if (isSmall) return null;
                const isHovered = hoveredState === stateId;

                return (
                  <text
                    key={`label-${stateId}`}
                    x={center.x}
                    y={center.y}
                    fontSize={isHovered ? 11 : 9}
                    fontFamily="system-ui, sans-serif"
                    fontWeight={isHovered ? "700" : "500"}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="pointer-events-none select-none"
                    fill={isHovered ? "#FFFFFF" : "#6B5D52"}
                    style={{ transition: "fill 0.25s ease, font-size 0.2s ease" }}
                  >
                    {data.name}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Legend inside card */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-warm-amber ring-2 ring-warm-amber/20" />
              <span className="font-body text-xs font-medium text-warm-gray">Facebook + Instagram</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#1877F2] ring-2 ring-[#1877F2]/20" />
              <span className="font-body text-xs font-medium text-warm-gray">Facebook only</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#E4405F] ring-2 ring-[#E4405F]/20" />
              <span className="font-body text-xs font-medium text-warm-gray">Instagram only</span>
            </div>
          </div>
        </motion.div>

        {/* Platform summary pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {[
            { platform: "facebook", count: 15, label: "Facebook Pages", color: "#1877F2" },
            { platform: "instagram", count: 8, label: "Instagram Pages", color: "#E4405F" },
            { platform: "tiktok", count: 2, label: "TikTok Accounts", color: "#2C1E13" },
            { platform: "xhs", count: 2, label: "XHS Accounts", color: "#FF2442" },
          ].map((item) => (
            <div
              key={item.platform}
              className="flex items-center gap-2.5 rounded-full border border-deep-espresso/[0.06] bg-white px-5 py-2.5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div style={{ color: item.color }}>
                <PlatformIcon platform={item.platform} />
              </div>
              <span className="font-heading text-lg font-extrabold text-deep-espresso">{item.count}</span>
              <span className="font-body text-xs text-warm-gray">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* National pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-2xl text-center"
        >
          <p className="font-body text-sm leading-relaxed text-warm-gray">
            Plus national flagship pages:{" "}
            {NATIONAL_PAGES.map((page, i) => (
              <span key={i}>
                <span className="font-medium text-deep-espresso/60">{page.name}</span>
                {i < NATIONAL_PAGES.length - 1 && <span className="text-warm-gray/30"> &middot; </span>}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { STATES_DATA, NATIONAL_PAGES } from "@/lib/constants";
import { STATE_PATHS, STATE_CENTERS } from "@/lib/malaysia-svg";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useClickOutside } from "@/hooks/useClickOutside";

// Bring East Malaysia (Borneo) closer to West Malaysia (Peninsular)
const EAST_MALAYSIA = new Set(["sarawak", "sabah", "labuan"]);
const EAST_SHIFT_X = -200;

// Tighter viewBox that removes empty space
const MAP_VIEWBOX = "5 15 695 295";
const VB_X = 5;
const VB_Y = 15;
const VB_W = 695;
const VB_H = 295;

// Mobile region-specific viewBoxes for the mini map in bottom sheet
const WEST_VIEWBOX = "10 38 236 260";
const EAST_VIEWBOX = "448 10 442 307";

type MobileRegion = "west" | "east";

// Small states that need larger invisible hit areas (desktop only)
const SMALL_STATES = new Set(["perlis", "penang", "kl", "melaka", "putrajaya", "labuan"]);

// Card dimensions for positioning (desktop)
const CARD_W = 280;
const CARD_H = 160;
const CARD_PAD = 12;

// States ordered for the mobile list
const WEST_STATE_IDS = [
  "perlis", "kedah", "penang", "perak", "kelantan", "terengganu",
  "pahang", "selangor", "kl", "nSembilan", "melaka", "johor",
];
const EAST_STATE_IDS = ["sabah", "sarawak"];

function getStateColor(stateId: string): string {
  const data = STATES_DATA[stateId];
  if (!data) return "#E8DFD3";
  if (data.facebook || data.instagram) return "#E09145";
  return "#E8DFD3";
}

function getStatePxCoords(
  stateId: string,
  containerWidth: number,
  containerHeight: number,
): { x: number; y: number } | null {
  const center = STATE_CENTERS[stateId];
  if (!center) return null;
  const cx = EAST_MALAYSIA.has(stateId) ? center.x + EAST_SHIFT_X : center.x;
  const x = ((cx - VB_X) / VB_W) * containerWidth;
  const y = ((center.y - VB_Y) / VB_H) * containerHeight;
  return { x, y };
}

function computeCardPosition(
  statePx: { x: number; y: number },
  containerW: number,
  containerH: number,
): { left: number; top: number; originX: string; originY: string } {
  const inRightHalf = statePx.x > containerW / 2;
  const inBottomHalf = statePx.y > containerH / 2;

  let left = inRightHalf ? statePx.x - CARD_W - 20 : statePx.x + 20;
  let top = inBottomHalf ? statePx.y - CARD_H - 20 : statePx.y + 20;

  left = Math.max(CARD_PAD, Math.min(left, containerW - CARD_W - CARD_PAD));
  top = Math.max(CARD_PAD, Math.min(top, containerH - CARD_H - CARD_PAD));

  const originX = `${statePx.x - left}px`;
  const originY = `${statePx.y - top}px`;

  return { left, top, originX, originY };
}

function connectorEdgePoint(
  statePx: { x: number; y: number },
  cardLeft: number,
  cardTop: number,
): { x: number; y: number } {
  const cardRight = cardLeft + CARD_W;
  const cardBottom = cardTop + CARD_H;
  const cx = Math.max(cardLeft, Math.min(statePx.x, cardRight));
  const cy = Math.max(cardTop, Math.min(statePx.y, cardBottom));
  return { x: cx, y: cy };
}

function PlatformIcon({ platform, className }: { platform: string; className?: string }) {
  const cls = className ?? "h-4 w-4 shrink-0";
  if (platform === "facebook") {
    return (
      <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  if (platform === "tiktok") {
    return (
      <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    );
  }
  return (
    <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-deep-espresso/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ─── Staggered card content ─────────────────────────────────────
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
};

interface CardContentProps {
  stateId: string;
  onClose: () => void;
  showCloseButton?: boolean;
}

function CardContent({ stateId, onClose, showCloseButton = true }: CardContentProps) {
  const data = STATES_DATA[stateId];
  if (!data) return null;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative">
      {showCloseButton && (
        <button
          onClick={onClose}
          className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-deep-espresso/60 shadow-md transition-colors hover:bg-gray-50 hover:text-deep-espresso"
        >
          <CloseIcon />
        </button>
      )}

      <motion.div variants={staggerItem} className="flex items-baseline gap-2 pr-8">
        <p className="font-heading text-base font-bold text-deep-espresso">{data.name}</p>
        <p className="font-body text-xs text-warm-gray">{data.nameMY}</p>
      </motion.div>

      <div className="mt-3 space-y-2">
        {data.facebook && (
          <motion.div variants={staggerItem}>
            {data.facebookUrl ? (
              <a
                href={data.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-[#1877F2]/5"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1877F2]/10 text-[#1877F2]">
                  <PlatformIcon platform="facebook" />
                </div>
                <span className="flex-1 font-body text-xs text-deep-espresso/80">{data.facebook}</span>
                <ExternalLinkIcon />
              </a>
            ) : (
              <div className="flex items-center gap-2.5 px-2 py-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1877F2]/10 text-[#1877F2]">
                  <PlatformIcon platform="facebook" />
                </div>
                <span className="font-body text-xs text-deep-espresso/80">{data.facebook}</span>
              </div>
            )}
          </motion.div>
        )}
        {data.instagram && (
          <motion.div variants={staggerItem}>
            {data.instagramUrl ? (
              <a
                href={data.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-[#E4405F]/5"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E4405F]/10 text-[#E4405F]">
                  <PlatformIcon platform="instagram" />
                </div>
                <span className="flex-1 font-body text-xs text-deep-espresso/80">{data.instagram}</span>
                <ExternalLinkIcon />
              </a>
            ) : (
              <div className="flex items-center gap-2.5 px-2 py-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E4405F]/10 text-[#E4405F]">
                  <PlatformIcon platform="instagram" />
                </div>
                <span className="font-body text-xs text-deep-espresso/80">{data.instagram}</span>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Mini map for mobile bottom sheet (non-interactive) ──────────
function MiniMap({ stateId }: { stateId: string }) {
  const isEast = EAST_MALAYSIA.has(stateId);
  const viewBox = isEast ? EAST_VIEWBOX : WEST_VIEWBOX;

  return (
    <div className="overflow-hidden rounded-xl bg-[#EFF6FA]">
      <svg viewBox={viewBox} className="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="mini-glow">
            <feDropShadow dx="0" dy="1" stdDeviation="4" floodColor="#E09145" floodOpacity="0.6" />
          </filter>
          <filter id="mini-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#2C1E13" floodOpacity="0.05" />
          </filter>
        </defs>
        {Object.entries(STATE_PATHS)
          .filter(([id]) => (isEast ? EAST_MALAYSIA.has(id) : !EAST_MALAYSIA.has(id)))
          .map(([id, path]) => {
            const isSelected = id === stateId;
            const data = STATES_DATA[id];
            const hasData = !!data;
            return (
              <path
                key={id}
                d={path}
                fill={isSelected ? "#E09145" : hasData ? "#FFF8F0" : "#F0EBE5"}
                stroke={isSelected ? "#E09145" : hasData ? "#DDD2C5" : "#E0D8CE"}
                strokeWidth={isSelected ? 2 : 0.8}
                strokeLinejoin="round"
                filter={isSelected ? "url(#mini-glow)" : "url(#mini-shadow)"}
              />
            );
          })}
      </svg>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────
export default function NetworkMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [mobileRegion, setMobileRegion] = useState<MobileRegion>("west");
  const isClosingRef = useRef(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const desktopCardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // ── Switch mobile region ──
  const switchRegion = useCallback((region: MobileRegion) => {
    if (region === mobileRegion) return;
    setSelectedState(null);
    setHoveredState(null);
    setMobileRegion(region);
  }, [mobileRegion]);

  // ── Dismiss handler ──
  const dismiss = useCallback(() => {
    setSelectedState(null);
    isClosingRef.current = true;
    setTimeout(() => {
      isClosingRef.current = false;
    }, 300);
  }, []);

  // ── Click outside (desktop only) ──
  useClickOutside(desktopCardRef, dismiss, !!selectedState && !isMobile);

  // ── Dismiss on window resize ──
  useEffect(() => {
    if (!selectedState) return;
    function handleResize() {
      dismiss();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedState, dismiss]);

  // ── Lock body scroll on mobile when sheet is open ──
  useEffect(() => {
    if (isMobile && selectedState) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobile, selectedState]);

  // ── State click handler ──
  const handleStateClick = useCallback(
    (stateId: string) => {
      if (isClosingRef.current) return;
      if (!STATES_DATA[stateId]) return;
      if (selectedState) {
        dismiss();
        setTimeout(() => {
          setSelectedState(stateId);
        }, 150);
      } else {
        setSelectedState(stateId);
      }
    },
    [selectedState, dismiss],
  );

  // ── Compute card position (desktop) ──
  const containerRect = mapContainerRef.current?.getBoundingClientRect();
  const containerW = containerRect?.width ?? 800;
  const containerH = containerRect?.height ?? 400;

  const selectedPx = selectedState ? getStatePxCoords(selectedState, containerW, containerH) : null;
  const cardPos = selectedPx ? computeCardPosition(selectedPx, containerW, containerH) : null;
  const connectorEnd = selectedPx && cardPos ? connectorEdgePoint(selectedPx, cardPos.left, cardPos.top) : null;

  // ── Render state paths helper (desktop) ──
  function renderStatePaths(isEast: boolean) {
    return Object.entries(STATE_PATHS)
      .filter(([id]) => (isEast ? EAST_MALAYSIA.has(id) : !EAST_MALAYSIA.has(id)))
      .map(([stateId, path]) => {
        const isSelected = selectedState === stateId;
        const isHovered = hoveredState === stateId;
        const isActive = isSelected || isHovered;
        const data = STATES_DATA[stateId];
        const color = getStateColor(stateId);
        const hasData = !!data;

        return (
          <path
            key={stateId}
            d={path}
            className="cursor-pointer"
            fill={isActive ? color : hasData ? "#FFF8F0" : "#F0EBE5"}
            stroke={isActive ? color : hasData ? "#DDD2C5" : "#E0D8CE"}
            strokeWidth={isActive ? 2 : 0.8}
            strokeLinejoin="round"
            filter={isSelected ? "url(#state-selected-glow)" : isHovered ? "url(#state-glow)" : "url(#state-shadow)"}
            onMouseEnter={() => setHoveredState(stateId)}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => handleStateClick(stateId)}
            style={{ transition: "fill 0.25s ease, stroke 0.25s ease, stroke-width 0.2s ease" }}
          />
        );
      });
  }

  // ── Render state labels helper (desktop) ──
  function renderStateLabels(isEast: boolean) {
    return Object.entries(STATE_CENTERS)
      .filter(([id]) => (isEast ? EAST_MALAYSIA.has(id) : !EAST_MALAYSIA.has(id)))
      .map(([stateId, center]) => {
        const data = STATES_DATA[stateId];
        if (!data) return null;
        const isSmall = SMALL_STATES.has(stateId);
        if (isSmall) return null;
        const isActive = selectedState === stateId || hoveredState === stateId;

        return (
          <text
            key={`label-${stateId}`}
            x={center.x}
            y={center.y}
            fontSize={9}
            fontFamily="system-ui, sans-serif"
            fontWeight="500"
            textAnchor="middle"
            dominantBaseline="middle"
            className="pointer-events-none select-none"
            fill={isActive ? "#FFFFFF" : "#6B5D52"}
            style={{ transition: "fill 0.25s ease" }}
          >
            {data.name}
          </text>
        );
      });
  }

  // ── Render small-state hit areas (desktop) ──
  function renderSmallStateHitAreas(isEast: boolean) {
    return Object.entries(STATE_CENTERS)
      .filter(([id]) => SMALL_STATES.has(id) && (isEast ? EAST_MALAYSIA.has(id) : !EAST_MALAYSIA.has(id)))
      .map(([stateId, center]) => {
        if (!STATES_DATA[stateId]) return null;
        return (
          <circle
            key={`hit-${stateId}`}
            cx={center.x}
            cy={center.y}
            r={15}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState(stateId)}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => handleStateClick(stateId)}
          />
        );
      });
  }

  // ── Mobile state list for current region ──
  const mobileStateIds = mobileRegion === "west" ? WEST_STATE_IDS : EAST_STATE_IDS;
  const mobileStates = mobileStateIds
    .filter((id) => {
      const d = STATES_DATA[id];
      return d && (d.facebook || d.instagram);
    });

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
          {/* ── Mobile: Tabs + State List ── */}
          {isMobile ? (
            <>
              {/* Region tabs */}
              <div className="mb-5 flex items-center justify-center gap-2">
                {([
                  { id: "west" as MobileRegion, label: "West Malaysia" },
                  { id: "east" as MobileRegion, label: "East Malaysia" },
                ]).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => switchRegion(tab.id)}
                    className={`shrink-0 rounded-full px-5 py-2.5 font-heading text-sm font-semibold transition-all duration-300 ${
                      mobileRegion === tab.id
                        ? "bg-deep-espresso text-white shadow-lg shadow-deep-espresso/20"
                        : "bg-light-sand text-warm-gray hover:bg-warm-ivory hover:text-deep-espresso"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* State list */}
              <div className="space-y-1">
                {mobileStates.map((stateId) => {
                  const data = STATES_DATA[stateId];
                  if (!data) return null;
                  return (
                    <button
                      key={stateId}
                      onClick={() => setSelectedState(stateId)}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors active:bg-light-sand/80 hover:bg-light-sand/50"
                    >
                      {/* State name */}
                      <span className="flex-1 font-heading text-sm font-semibold text-deep-espresso">
                        {data.name}
                      </span>

                      {/* Platform icons */}
                      <div className="flex items-center gap-1.5">
                        {data.facebook && (
                          <span className="text-[#1877F2]">
                            <PlatformIcon platform="facebook" className="h-3.5 w-3.5" />
                          </span>
                        )}
                        {data.instagram && (
                          <span className="text-[#E4405F]">
                            <PlatformIcon platform="instagram" className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>

                      <ChevronRightIcon />
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* ── Desktop: Interactive Map ── */
            <>
              <div ref={mapContainerRef} className="relative overflow-hidden rounded-2xl bg-[#EFF6FA]">
                {/* Subtle dot pattern overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: "radial-gradient(#2C1E13 0.8px, transparent 0.8px)",
                    backgroundSize: "16px 16px",
                  }}
                />

                {/* Dim overlay when state is selected */}
                <AnimatePresence>
                  {selectedState && (
                    <motion.div
                      key="map-dim"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 z-20 bg-deep-espresso/20"
                      onClick={dismiss}
                    />
                  )}
                </AnimatePresence>

                {/* SVG Map */}
                <svg
                  viewBox={MAP_VIEWBOX}
                  className="relative z-10 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="state-glow">
                      <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#E09145" floodOpacity="0.3" />
                    </filter>
                    <filter id="state-selected-glow">
                      <feDropShadow dx="0" dy="1" stdDeviation="4" floodColor="#E09145" floodOpacity="0.6" />
                    </filter>
                    <filter id="state-shadow">
                      <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#2C1E13" floodOpacity="0.05" />
                    </filter>
                  </defs>

                  {/* West Malaysia (Peninsular) */}
                  <g>{renderStatePaths(false)}</g>

                  {/* East Malaysia (Borneo) - shifted closer */}
                  <g transform={`translate(${EAST_SHIFT_X}, 0)`}>
                    {renderStatePaths(true)}
                  </g>

                  {/* West Malaysia labels */}
                  {renderStateLabels(false)}

                  {/* East Malaysia labels - shifted */}
                  <g transform={`translate(${EAST_SHIFT_X}, 0)`}>
                    {renderStateLabels(true)}
                  </g>

                  {/* Small state hit areas - West */}
                  {renderSmallStateHitAreas(false)}

                  {/* Small state hit areas - East */}
                  <g transform={`translate(${EAST_SHIFT_X}, 0)`}>
                    {renderSmallStateHitAreas(true)}
                  </g>
                </svg>

                {/* Desktop card + connector */}
                <AnimatePresence>
                  {selectedState && selectedPx && cardPos && connectorEnd && (
                    <>
                      {/* Connector line overlay */}
                      <motion.svg
                        key="connector"
                        className="pointer-events-none absolute inset-0 z-30"
                        style={{ width: "100%", height: "100%" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <motion.line
                          x1={selectedPx.x}
                          y1={selectedPx.y}
                          x2={connectorEnd.x}
                          y2={connectorEnd.y}
                          stroke="#E09145"
                          strokeWidth={1.5}
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </motion.svg>

                      {/* Card */}
                      <motion.div
                        key={`card-${selectedState}`}
                        ref={desktopCardRef}
                        className="absolute z-40"
                        style={{
                          left: cardPos.left,
                          top: cardPos.top,
                          width: CARD_W,
                          transformOrigin: `${cardPos.originX} ${cardPos.originY}`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
                      >
                        <div className="rounded-2xl border border-deep-espresso/[0.06] bg-white px-5 py-4 shadow-[0_12px_40px_-8px_rgba(44,30,19,0.15)]">
                          <CardContent stateId={selectedState} onClose={dismiss} />
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Legend (desktop only) */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-warm-amber ring-2 ring-warm-amber/20" />
                <span className="font-body text-xs font-medium text-warm-gray">Active state page</span>
              </div>
            </>
          )}
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

      {/* ── Mobile Bottom Sheet ── */}
      <AnimatePresence>
        {isMobile && selectedState && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={dismiss}
            />

            {/* Sheet */}
            <motion.div
              key="mobile-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.8 }}
              className="fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl bg-white px-6 pb-10 pt-3 shadow-[0_-8px_40px_-12px_rgba(44,30,19,0.15)]"
            >
              {/* Drag handle */}
              <div className="mb-3 flex items-center justify-center">
                <div className="h-1 w-10 rounded-full bg-deep-espresso/15" />
              </div>

              {/* Close button */}
              <div className="mb-3 flex justify-end">
                <button
                  onClick={dismiss}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-deep-espresso/5 text-deep-espresso/60 transition-colors hover:bg-deep-espresso/10"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Mini map */}
              <div className="mx-auto mb-4 max-w-[200px]">
                <MiniMap stateId={selectedState} />
              </div>

              {/* Content */}
              <CardContent stateId={selectedState} onClose={dismiss} showCloseButton={false} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TEAM_MEMBERS } from "@/lib/constants";

function InstaCard({
  member,
  index,
}: {
  member: (typeof TEAM_MEMBERS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="w-[280px] flex-shrink-0 snap-center sm:w-[300px]"
    >
      <div className="overflow-hidden rounded-3xl border border-deep-espresso/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
        {/* Header — name only */}
        <div className="border-b border-deep-espresso/5 px-5 py-3">
          <h3 className="font-heading text-xl font-bold text-deep-espresso">
            {member.name}
          </h3>
        </div>

        {/* Square Image */}
        <div className="relative aspect-square w-full bg-light-sand overflow-hidden">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-warm-gray/40">
                <svg
                  className="h-16 w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Instagram Footer */}
        <div className="px-4 py-3">
          {/* Action Icons */}
          <div className="flex items-center gap-4">
            {/* Heart */}
            <button className="text-deep-espresso/70 transition-colors hover:text-red-500">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
            {/* Comment */}
            <button className="text-deep-espresso/70 transition-colors hover:text-warm-amber">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
              </svg>
            </button>
            {/* Send */}
            <button className="text-deep-espresso/70 transition-colors hover:text-warm-amber">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
            {/* Bookmark (right-aligned) */}
            <button className="ml-auto text-deep-espresso/70 transition-colors hover:text-warm-amber">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Create a massive seamless buffer so we don't run out of elements when scrolling manually
  const extendedMembers = [...TEAM_MEMBERS, ...TEAM_MEMBERS, ...TEAM_MEMBERS, ...TEAM_MEMBERS, ...TEAM_MEMBERS];

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    // We want the click to advance one card width (300px + 20px gap)
    const scrollAmount = 320;

    // Smoothly scroll the container manually
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="team" className="bg-soft-white py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left"
        >
          <div>
            <span className="font-body text-xs font-semibold tracking-[0.2em] text-warm-amber uppercase">
              Our People
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold text-deep-espresso sm:text-4xl lg:text-5xl">
              Meet the Creators
            </h2>
            <p className="mt-3 max-w-lg font-body text-base text-warm-gray">
              The voices and faces that bring your brand to life across Malaysia.
            </p>
          </div>

          {/* Desktop navigation arrows */}
          <div className="mt-6 hidden gap-2 sm:mt-0 sm:flex">
            <button
              onClick={() => scroll("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-deep-espresso/15 text-deep-espresso transition-all hover:border-warm-amber hover:bg-warm-amber hover:text-white"
              aria-label="Scroll left"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-deep-espresso/15 text-deep-espresso transition-all hover:border-warm-amber hover:bg-warm-amber hover:text-white"
              aria-label="Scroll right"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Interactive CSS Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradients */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-soft-white to-transparent sm:w-32" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 z-10 w-16 bg-gradient-to-l from-soft-white to-transparent sm:w-32" />

        {/* 
          We use a standard overflowing flex container that allows manual scroll via JS buttons.
          Inside it, the wrapper animates continuously using CSS `animate-marquee`.
          When hovered, the CSS animation pauses, allowing manual scroll to take visual priority.
        */}
        <div
          ref={scrollRef}
          className="scrollbar-hide overflow-x-auto w-full group"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused] pr-5">
            {extendedMembers.map((member, index) => (
              <div key={`card-${index}`} className="transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100">
                <InstaCard member={member} index={index % 10} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

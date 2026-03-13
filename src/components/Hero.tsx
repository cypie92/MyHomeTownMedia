"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

// YouTube IFrame API type declarations
declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        config: {
          videoId: string;
          playerVars: Record<string, number | string>;
          events: Record<string, (e: unknown) => void>;
        }
      ) => YTPlayer;
      PlayerState: { ENDED: number };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  mute: () => void;
  playVideo: () => void;
  seekTo: (seconds: number) => void;
  destroy: () => void;
}

const YOUTUBE_VIDEO_ID = "ht9ZTLa1CuI";

export default function Hero() {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  const resizeVideo = useCallback(() => {
    const container = playerContainerRef.current;
    if (!container) return;

    const iframe = container.querySelector("iframe");
    if (!iframe) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const videoRatio = 16 / 9;
    const containerRatio = containerWidth / containerHeight;

    let width: number;
    let height: number;

    // Scale to cover the container, like CSS object-fit: cover
    if (containerRatio > videoRatio) {
      width = containerWidth;
      height = containerWidth / videoRatio;
    } else {
      height = containerHeight;
      width = containerHeight * videoRatio;
    }

    iframe.style.width = `${width}px`;
    iframe.style.height = `${height}px`;
  }, []);

  useEffect(() => {
    let player: YTPlayer | null = null;

    const onPlayerReady = () => {
      if (player) {
        player.mute();
        player.playVideo();
      }
    };

    const onPlayerStateChange = (event: unknown) => {
      const { data } = event as { data: number };
      // When video ends, loop it
      if (data === window.YT.PlayerState.ENDED && player) {
        player.seekTo(0);
        player.playVideo();
      }
      // When video starts playing, fade in
      if (data === 1) {
        setVideoReady(true);
      }
    };

    const createPlayer = () => {
      const el = document.getElementById("yt-hero-player");
      if (!el) return;

      player = new window.YT.Player(el, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          showinfo: 0,
          mute: 1,
          playsinline: 1,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
      playerRef.current = player;

      // Initial resize after iframe is created
      setTimeout(resizeVideo, 100);
    };

    // Load YouTube IFrame API if not already loaded
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    window.addEventListener("resize", resizeVideo);

    return () => {
      window.removeEventListener("resize", resizeVideo);
      if (player) {
        try {
          player.destroy();
        } catch {
          // Player may already be destroyed
        }
      }
    };
  }, [resizeVideo]);

  return (
    <div>
      {/* Sticky video section — stays pinned while page scrolls over it */}
      <section
        className="sticky top-0 z-0 aspect-video h-auto overflow-hidden md:aspect-auto md:h-[calc(100svh-76px)]"
      >
        {/* YouTube Video Background */}
        <div
          ref={playerContainerRef}
          className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ pointerEvents: "none" }}
        >
          <div
            id="yt-hero-player"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Fallback background while video loads */}
        <div
          className={`absolute inset-0 bg-[#1a1a1a] transition-opacity duration-1000 ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Subtle overlay for visual depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/20 via-transparent to-[#1a1a1a]/30" />
      </section>

      {/* Content section — scrolls up and covers the video */}
      <section className="relative z-10 bg-[#1a1a1a] md:-mt-10 md:rounded-t-3xl md:bg-light-sand/25 md:shadow-[0_-10px_40px_rgba(0,0,0,0.3)] md:backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-10 pb-10 text-center md:pt-20 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="mb-6 inline-block rounded-full border border-soft-white/40 bg-soft-white/25 px-4 py-1.5 font-body text-xs font-semibold tracking-wide text-soft-white uppercase backdrop-blur-md">
              Malaysia&apos;s Leading Social Media Marketing Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-soft-white/90 sm:text-xl"
          >
            We build lasting brand value through innovative, data-driven social
            media strategies — reaching over 100 million people monthly across
            Malaysia.
          </motion.p>

        </div>
      </section>
    </div>
  );
}

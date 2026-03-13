"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Palette } from "lucide-react";

const themes = [
  { name: "Amber", light: "light-amber", dark: "dark-amber", swatch: "#E09145", darkSwatch: "#F59E0B" },
  { name: "Teal", light: "light-teal", dark: "dark-teal", swatch: "#2A9D8F", darkSwatch: "#14B8A6" },
  { name: "Rose", light: "light-rose", dark: "dark-rose", swatch: "#D8436B", darkSwatch: "#F43F5E" },
  { name: "Indigo", light: "light-indigo", dark: "dark-indigo", swatch: "#6366F1", darkSwatch: "#818CF8" },
  { name: "Emerald", light: "light-emerald", dark: "dark-emerald", swatch: "#10B981", darkSwatch: "#34D399" },
  { name: "Slate", light: "light-slate", dark: "dark-slate", swatch: "#475569", darkSwatch: "#94A3B8" },
  { name: "Ocean", light: "light-ocean", dark: "dark-ocean", swatch: "#0369A1", darkSwatch: "#38BDF8" },
  { name: "Coral", light: "light-coral", dark: "dark-coral", swatch: "#E8613C", darkSwatch: "#FB923C" },
  { name: "Violet", light: "light-violet", dark: "dark-violet", swatch: "#9333EA", darkSwatch: "#A855F7" },
];

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const isDark = theme?.startsWith("dark-") ?? false;

  if (!mounted) {
    return (
      <div className="relative inline-block text-left">
        <button className="flex items-center justify-center p-2 rounded-md transition-colors">
          <Palette className="w-5 h-5 text-warm-gray" />
        </button>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-md hover:bg-deep-espresso/5 transition-colors focus:outline-none focus:ring-2 focus:ring-warm-amber"
        aria-label="Theme switcher"
      >
        <Palette className="w-5 h-5 text-deep-espresso" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-lg bg-warm-ivory ring-1 ring-deep-espresso/10 z-50 overflow-hidden border border-deep-espresso/10">
          <div className="p-3" role="menu" aria-orientation="vertical">
            {/* Dark/Light mode toggle */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-deep-espresso/10">
              <span className="font-body text-xs font-semibold text-warm-gray uppercase tracking-wider">
                {isDark ? "Dark" : "Light"} Mode
              </span>
              <button
                onClick={() => {
                  // Toggle dark/light while keeping the same color
                  const currentColor = theme?.replace(/^(light|dark)-/, "") ?? "amber";
                  setTheme(isDark ? `light-${currentColor}` : `dark-${currentColor}`);
                }}
                className="relative flex h-7 w-12 items-center rounded-full bg-deep-espresso/10 p-0.5 transition-colors hover:bg-deep-espresso/15"
                aria-label="Toggle dark mode"
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full bg-warm-amber shadow-sm transition-transform duration-200 ${
                    isDark ? "translate-x-5" : "translate-x-0"
                  }`}
                >
                  {isDark ? (
                    <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            </div>

            {/* Color palette grid */}
            <p className="font-body text-[10px] font-semibold text-warm-gray/60 uppercase tracking-widest mb-2">
              Color Palette
            </p>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => {
                const currentValue = isDark ? t.dark : t.light;
                const isActive = theme === currentValue;
                const color = isDark ? t.darkSwatch : t.swatch;

                return (
                  <button
                    key={t.name}
                    onClick={() => {
                      setTheme(currentValue);
                    }}
                    className={`flex flex-col items-center gap-1.5 rounded-lg px-2 py-2.5 transition-all ${
                      isActive
                        ? "bg-warm-amber/10 ring-1 ring-warm-amber/30"
                        : "hover:bg-deep-espresso/5"
                    }`}
                    role="menuitem"
                  >
                    <div
                      className={`h-7 w-7 rounded-full shadow-sm transition-transform ${
                        isActive ? "scale-110 ring-2 ring-warm-amber ring-offset-1" : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                    <span
                      className={`font-body text-[10px] leading-tight ${
                        isActive
                          ? "font-bold text-warm-amber"
                          : "font-medium text-deep-espresso/70"
                      }`}
                    >
                      {t.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

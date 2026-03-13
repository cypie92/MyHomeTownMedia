"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const themes = [
  { name: "Light Amber", value: "light-amber" },
  { name: "Light Teal", value: "light-teal" },
  { name: "Light Rose", value: "light-rose" },
  { name: "Dark Amber", value: "dark-amber" },
  { name: "Dark Teal", value: "dark-teal" },
  { name: "Dark Rose", value: "dark-rose" },
];

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative inline-block text-left">
        <button className="flex items-center justify-center p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <Palette className="w-5 h-5 text-warm-gray" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-warm-amber"
        aria-label="Theme switcher"
      >
        <Palette className="w-5 h-5 text-deep-espresso" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-soft-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden border border-deep-espresso/10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                  theme === t.value
                    ? "bg-warm-amber/10 text-warm-amber font-semibold"
                    : "text-deep-espresso hover:bg-black/5"
                }`}
                role="menuitem"
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from 'react';
import { Home, Library, Plus } from 'lucide-react';

const DOCK_ITEMS = [
  { icon: Home, label: 'Home' },
  { icon: Library, label: 'Collection' },
  { icon: Plus, label: 'Upload' },
];

export function Dock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="flex items-center gap-4 bg-zinc-900/50 backdrop-blur-md rounded-3xl px-4 py-3">
      {DOCK_ITEMS.map((item, index) => {
        const Icon = item.icon;
        const isHovered = hoveredIndex === index;

        return (
          <button
            key={item.label}
            className="relative group px-2 h-8"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Hover pill background */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-b from-white/10 to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Icon */}
            <div className="relative flex items-center justify-center text-zinc-400 group-hover:text-white transition-all duration-300 group-hover:translate-y-[-2px]">
              <Icon 
                className="w-5 h-5 transition-all duration-300 group-hover:scale-110" 
                strokeWidth={1.5}
              />
            </div>

            {/* Label pill */}
            {isHovered && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-zinc-800/90 backdrop-blur-md rounded-full whitespace-nowrap text-[13px] font-medium">
                {item.label}
              </div>
            )}
          </button>
        );
      })}
    </nav>
  );
}
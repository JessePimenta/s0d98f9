"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useColorStore } from '@/lib/store';

interface Supporter {
  id: number;
  username: string;
  avatar: string;
  supportDate: string;
  purchasesInCommon: number;
  gradient: string;
}

// Sample data with timestamps
const SUPPORTERS: Supporter[] = [
  {
    id: 1,
    username: '@musiclover',
    avatar: 'https://i.imgur.com/w6j5yFr.png',
    supportDate: '2024-01-19T10:00:00Z',
    purchasesInCommon: 4,
    gradient: `radial-gradient(circle at 30% 30%,
      #EAFFCE 0%,
      #6CB587 60%,
      #6CB587 100%
    )`
  },
  {
    id: 2,
    username: '@beatmaker',
    avatar: 'https://i.imgur.com/X3Zfhwh.png',
    supportDate: '2024-01-18T15:30:00Z',
    purchasesInCommon: 3,
    gradient: `radial-gradient(circle at 30% 30%,
      #8380DE 0%,
      #474578 60%,
      #474578 100%
    )`
  },
  {
    id: 3,
    username: '@vinylhead',
    avatar: 'https://i.imgur.com/VfQ8HKz.png',
    supportDate: '2024-01-17T09:15:00Z',
    purchasesInCommon: 2,
    gradient: `radial-gradient(circle at 30% 30%,
      #8380DE 0%,
      #5B81AD 60%,
      #5B81AD 100%
    )`
  },
  {
    id: 4,
    username: '@synthwave',
    avatar: 'https://i.imgur.com/w6j5yFr.png',
    supportDate: '2024-01-16T20:45:00Z',
    purchasesInCommon: 5,
    gradient: `radial-gradient(circle at 30% 30%,
      #EAFFCE 0%,
      #6CB587 60%,
      #474578 100%
    )`
  },
  {
    id: 5,
    username: '@basshead',
    avatar: 'https://i.imgur.com/X3Zfhwh.png',
    supportDate: '2024-01-15T12:20:00Z',
    purchasesInCommon: 1,
    gradient: `radial-gradient(circle at 30% 30%,
      #8380DE 0%,
      #474578 60%,
      #474578 100%
    )`
  }
].sort((a, b) => new Date(b.supportDate).getTime() - new Date(a.supportDate).getTime());

export function SupportersSpiral() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSupporter, setHoveredSupporter] = useState<Supporter | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { secondaryColor } = useColorStore();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredSupporter) {
        setTooltipPosition({
          x: e.clientX + 10,
          y: e.clientY + 10
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hoveredSupporter]);

  const calculatePosition = (index: number) => {
    const totalSupporters = SUPPORTERS.length;
    const spiralRadius = 120; // Base radius of the spiral
    const angleStep = (2 * Math.PI) / totalSupporters;
    const radiusStep = spiralRadius / totalSupporters;

    const angle = index * angleStep;
    const radius = spiralRadius - (index * radiusStep);
    
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const scale = 1 - (index * 0.1); // Gradually reduce size for perspective effect

    return { x, y, scale };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Center point indicator */}
        <div className="absolute w-2 h-2 bg-white/20 rounded-full" />
        
        {/* Spiral guide line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.1 }}
        >
          <path
            d={SUPPORTERS.map((_, i) => {
              const pos = calculatePosition(i);
              return i === 0 ? `M ${pos.x + 200} ${pos.y + 200}` : `L ${pos.x + 200} ${pos.y + 200}`;
            }).join(' ')}
            stroke="white"
            fill="none"
            strokeWidth="1"
          />
        </svg>

        {/* Supporters */}
        {SUPPORTERS.map((supporter, index) => {
          const { x, y, scale } = calculatePosition(index);
          const size = 40 * scale;

          return (
            <div
              key={supporter.id}
              className="absolute transition-transform duration-300 hover:scale-110"
              style={{
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                zIndex: SUPPORTERS.length - index
              }}
              onMouseEnter={() => setHoveredSupporter(supporter)}
              onMouseLeave={() => setHoveredSupporter(null)}
            >
              <div
                className="rounded-full ring-2 ring-black/20 shadow-lg"
                style={{
                  width: size,
                  height: size,
                  background: supporter.gradient,
                  backgroundBlendMode: 'overlay'
                }}
              />
            </div>
          );
        })}

        {/* Tooltip */}
        {hoveredSupporter && (
          <div
            className="fixed z-50 bg-black/90 backdrop-blur-md rounded-lg px-3 py-2 pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y
            }}
          >
            <div className="text-sm">
              <p className="font-medium text-white">{hoveredSupporter.username}</p>
              <p className="text-xs" style={{ color: secondaryColor }}>
                {hoveredSupporter.purchasesInCommon} purchases in common
              </p>
              <p className="text-xs" style={{ color: secondaryColor }}>
                Supported on {formatDate(hoveredSupporter.supportDate)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
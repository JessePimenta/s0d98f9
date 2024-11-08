"use client";

import { useState } from 'react';
import { Play, Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import { useColorStore } from '@/lib/store';

interface MusicPlayerProps {
  isVisible: boolean;
  currentTrack?: {
    title: string;
    artist: string;
  };
  isExpanded?: boolean;
}

export function MusicPlayer({ isVisible, currentTrack, isExpanded }: MusicPlayerProps) {
  const [volumeLevel, setVolumeLevel] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const { textColor, secondaryColor, containerBgColor, borderColor } = useColorStore();

  const getVolumeIcon = () => {
    if (isMuted) return VolumeX;
    if (volumeLevel > 0.5) return Volume2;
    if (volumeLevel > 0) return Volume1;
    return Volume;
  };

  const VolumeIcon = getVolumeIcon();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-500">
      <div 
        className={`max-w-[1400px] mx-auto px-4 transition-all duration-500 ${
          isExpanded ? 'pb-8' : 'pb-5'
        }`}
      >
        <div 
          className="backdrop-blur-lg rounded-[60px] transition-all duration-500"
          style={{ 
            backgroundColor: containerBgColor,
            borderTop: `1px solid ${borderColor}`,
            transform: isExpanded ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <div className="py-3 px-6 grid grid-cols-[220px,1fr] gap-4">
            {/* Track Info */}
            <div className="flex items-center gap-3 w-[220px]">
              <img
                src="https://i.imgur.com/X3Zfhwh.png"
                alt="Track Cover"
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p 
                  className="font-medium truncate"
                  style={{ color: textColor }}
                >
                  {currentTrack?.title || "No track selected"}
                </p>
                <p 
                  className="text-sm truncate"
                  style={{ color: secondaryColor }}
                >
                  {currentTrack?.artist || "Unknown artist"}
                </p>
              </div>
            </div>

            {/* Controls and Progress */}
            <div className="flex items-center gap-4">
              {/* Playback Controls */}
              <div className="flex items-center gap-1 w-[96px]">
                <button className="w-8 h-8 text-zinc-400 hover:text-zinc-500 hover:scale-103 transition-all flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M19 20L9 12L19 4V20Z" />
                    <rect x="7" y="4" width="2" height="16" />
                  </svg>
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:scale-103 transition-transform">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" strokeWidth={0} />
                </button>
                <button className="w-8 h-8 text-zinc-400 hover:text-zinc-500 hover:scale-103 transition-all flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M5 4L15 12L5 20V4Z" />
                    <rect x="15" y="4" width="2" height="16" />
                  </svg>
                </button>
              </div>

              {/* Progress and Volume */}
              <div className="flex-1 flex items-center gap-4">
                <div className="flex-1 h-12 flex items-center">
                  <div className="w-full h-[8px] bg-zinc-800 rounded-full overflow-hidden">
                    <div className="relative w-full h-full">
                      {Array.from({ length: 100 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute top-1/2 -translate-y-1/2 w-[2px] bg-zinc-600"
                          style={{
                            left: `${i * 1}%`,
                            height: `${Math.random() * 200}%`,
                            opacity: i < 30 ? 1 : 0.3
                          }}
                        />
                      ))}
                      <div className="absolute top-0 left-0 w-[30%] h-full bg-white/20" />
                    </div>
                  </div>
                </div>
                <span 
                  className="text-sm whitespace-nowrap w-[80px] text-right"
                  style={{ color: secondaryColor }}
                >
                  0:00 / 3:12
                </span>
                
                {/* Volume Control */}
                <div className="relative w-12 h-12">
                  <div 
                    className="absolute inset-0 bg-zinc-800/80 rounded-full cursor-pointer overflow-hidden"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const y = e.clientY - rect.top;
                      const newLevel = 1 - (y / rect.height);
                      setVolumeLevel(Math.max(0, Math.min(1, newLevel)));
                    }}
                  >
                    {/* Volume Fill */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-[#3a3a3a] transition-all duration-150"
                      style={{ height: `${volumeLevel * 100}%` }}
                    />
                    
                    {/* Volume Icon */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                    >
                      <VolumeIcon className="w-5 h-5 text-white" fill="white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
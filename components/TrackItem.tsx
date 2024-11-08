"use client";

import { Play, Pause } from "lucide-react";
import { useColorStore } from "@/lib/store";

interface TrackItemProps {
  track: {
    id: number;
    title: string;
    artist: string;
    duration: string;
  };
  isPlaying: boolean;
  onPlay: () => void;
}

export function TrackItem({ track, isPlaying, onPlay }: TrackItemProps) {
  const { textColor, secondaryColor } = useColorStore();

  return (
    <div className="flex items-center gap-4 p-6 rounded-[16px] hover:bg-white/5 group">
      <button 
        onClick={onPlay}
        className="w-5 h-5 p-1 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white fill-white" />
        ) : (
          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate" style={{ color: textColor }}>{track.title}</p>
        <p className="text-sm truncate" style={{ color: secondaryColor }}>{track.artist}</p>
      </div>
      <div className="w-16 text-right">
        <span className="text-sm group-hover:hidden" style={{ color: secondaryColor }}>
          {track.duration}
        </span>
        <span className="hidden text-sm group-hover:inline underline cursor-pointer" style={{ color: secondaryColor }}>
          buy
        </span>
      </div>
    </div>
  );
}
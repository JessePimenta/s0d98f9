"use client";

import { Play, Expand, Minimize } from "lucide-react";
import { useState, useEffect } from "react";

const LECHUGA_ARTWORK = "https://i.imgur.com/X3Zfhwh.png";

interface AlbumCoverProps {
  onPlay: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  artworkUrl: string | null;
}

export function AlbumCover({ onPlay, isExpanded, onToggleExpand, artworkUrl }: AlbumCoverProps) {
  const [transform, setTransform] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState<string>(LECHUGA_ARTWORK);

  useEffect(() => {
    // Always use Lechuga artwork as default
    const imageToLoad = LECHUGA_ARTWORK;

    const img = new Image();
    img.src = imageToLoad;
    img.onload = () => {
      setIsLoaded(true);
      setCurrentArtwork(imageToLoad);
    };
  }, [artworkUrl]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isExpanded) return;
    
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    const rotateX = (0.5 - y) * 8;
    const rotateY = (x - 0.5) * 8;

    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    if (!isExpanded) return;
    setTransform("");
  };

  if (!isLoaded) {
    return (
      <div className="aspect-square bg-zinc-900/50 rounded-[32px] animate-pulse" />
    );
  }

  return (
    <div 
      className={`relative perspective-1000 cursor-pointer transition-all duration-500 ease-out ${
        isExpanded ? "w-[90%] mx-auto" : "w-full"
      }`}
    >
      <div
        className={`aspect-square relative group transition-transform duration-500 ${
          isExpanded ? "scale-105" : ""
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onPlay}
      >
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat rounded-[32px] overflow-hidden transition-all duration-300 preserve-3d will-change-transform ${
            isExpanded ? "hover:scale-[1.02]" : ""
          }`}
          style={{
            backgroundImage: `url("${currentArtwork}")`,
            transform: isExpanded ? transform : undefined,
            opacity: isLoaded ? 1 : 0
          }}
        >
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-full backdrop-blur-md bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Play 
                className="w-12 h-12 text-white ml-1" 
                fill="white"
                strokeWidth={0}
              />
            </div>
          </div>

          <div className="absolute bottom-4 right-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
              className="w-10 h-10 rounded-full backdrop-blur-md bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/30"
            >
              {isExpanded ? (
                <Minimize className="w-5 h-5 text-white" />
              ) : (
                <Expand className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
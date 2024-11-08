"use client";

import { useColorStore } from "@/lib/store";
import { ShaderCanvas } from "./ShaderCanvas";
import { shaderPresets } from "@/lib/shaders";

interface BackgroundImageProps {
  artworkUrl: string;
}

export function BackgroundImage({ artworkUrl }: BackgroundImageProps) {
  const { backgroundUrl, youtubeUrl, currentShader, isBackgroundBlurred, containerColor } = useColorStore();
  
  // Use backgroundUrl from store if available, otherwise fallback to prop
  const displayUrl = backgroundUrl || artworkUrl;

  const getRgbValues = () => {
    const match = containerColor.match(/\d+/g);
    if (!match || match.length < 3) return '18, 18, 18';
    return `${match[0]}, ${match[1]}, ${match[2]}`;
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background Image */}
      {displayUrl && !youtubeUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-300"
          style={{ 
            backgroundImage: `url(${displayUrl})`,
            filter: isBackgroundBlurred ? 'blur(20px) saturate(180%)' : 'none',
            transform: `scale(${isBackgroundBlurred ? 1.2 : 1})`,
            opacity: 0.6
          }}
        />
      )}

      {/* YouTube Background */}
      {youtubeUrl && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${getYoutubeId(youtubeUrl)}?autoplay=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&loop=1&playlist=${getYoutubeId(youtubeUrl)}&playsinline=1&enablejsapi=1&origin=${window.location.origin}&mute=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className={`absolute w-[300%] h-[300%] -top-[100%] -left-[100%] pointer-events-none transition-all duration-75 ${
              isBackgroundBlurred ? 'blur-2xl' : 'blur-none'
            }`}
            style={{ 
              border: 'none',
              opacity: 0.8,
              transform: `scale(${isBackgroundBlurred ? 1.2 : 1})`,
            }}
          />
        </div>
      )}

      {/* Shader Layer */}
      {currentShader && shaderPresets[currentShader] && (
        <div className="absolute inset-0 bg-transparent w-full h-full mix-blend-soft-light">
          <ShaderCanvas 
            fragmentShader={shaderPresets[currentShader]}
            className="opacity-80 !h-full"
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212]"
        style={{ 
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(${getRgbValues()}, 0.95))`
        }}
      />
    </div>
  );
}

function getYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
    /^([a-zA-Z0-9_-]{11})$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}
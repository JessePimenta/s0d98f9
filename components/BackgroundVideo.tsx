"use client";

import { useColorStore } from "@/lib/store";
import { ShaderCanvas } from "./ShaderCanvas";
import { shaderPresets } from "@/lib/shaders";
import { useEffect, useState, useRef } from "react";
import { useAudioAnalyzer } from "@/lib/hooks/useAudioAnalyzer";

const LECHUGA_ARTWORK = "https://i.imgur.com/X3Zfhwh.png";

export function BackgroundVideo() {
  const { backgroundUrl, youtubeUrl, currentShader, isGifBackground, isBackgroundBlurred, layout, containerColor } = useColorStore();
  const [videoId, setVideoId] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { scale, error, isInitialized } = useAudioAnalyzer();

  const getYoutubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
      /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  useEffect(() => {
    if (youtubeUrl) {
      const id = getYoutubeId(youtubeUrl);
      if (id) {
        setVideoId(id);
      } else {
        setVideoId(null);
      }
    } else {
      setVideoId(null);
    }
  }, [youtubeUrl]);

  useEffect(() => {
    if (isGifBackground) {
      sessionStorage.removeItem('albumArtwork');
    }
  }, [isGifBackground]);

  const getBackgroundScale = () => {
    const blurScale = isBackgroundBlurred ? 1.5 : 1;
    const audioScale = scale ? 1 + ((scale - 1) * 0.3) : 1;
    return blurScale * audioScale;
  };

  const getRgbValues = () => {
    const match = containerColor.match(/\d+/g);
    if (!match || match.length < 3) return '18, 18, 18';
    return `${match[0]}, ${match[1]}, ${match[2]}`;
  };

  const displayUrl = youtubeUrl ? '' : (backgroundUrl || LECHUGA_ARTWORK);
  const isClassicLayout = layout === 'classic';

  return (
    <div className="fixed inset-0 w-full h-full">
      {/* Base background color */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: containerColor
        }}
      />

      {displayUrl && (
        <div 
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-300 ${
            isBackgroundBlurred ? 'blur-2xl' : 'blur-none'
          }`}
          style={{ 
            backgroundImage: `url(${displayUrl})`,
            transform: `scale(${getBackgroundScale()})`,
            opacity: 0.8
          }}
        />
      )}

      {videoId && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1&origin=${window.location.origin}&mute=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className={`absolute w-[300%] h-[300%] -top-[100%] -left-[100%] pointer-events-none transition-all duration-75 ${
              isBackgroundBlurred ? 'blur-2xl' : 'blur-none'
            }`}
            style={{ 
              border: 'none',
              opacity: 0.8,
              transform: `scale(${getBackgroundScale()})`,
            }}
          />
        </div>
      )}

      {currentShader && shaderPresets[currentShader] && (
        <div className="absolute inset-0 w-full h-full">
          <ShaderCanvas 
            fragmentShader={shaderPresets[currentShader]}
            className="mix-blend-soft-light opacity-50"
          />
        </div>
      )}

      {/* Top gradient (fades from solid to transparent) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `linear-gradient(rgb(${getRgbValues()}), rgba(${getRgbValues()}, 0) 35%)`
        }}
      />

      {/* Bottom gradient (fades from transparent to solid) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `linear-gradient(rgba(${getRgbValues()}, 0) 65%, rgb(${getRgbValues()}))`
        }}
      />

      {isClassicLayout ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,38,38,0.94)_0%,rgba(38,38,38,0.94)_100%)] backdrop-blur-[10px]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.6)_100%)]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
      )}

      {!isInitialized && !error && (
        <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg">
          <p className="text-white text-sm">Click anywhere to enable audio reactivity</p>
        </div>
      )}
    </div>
  );
}
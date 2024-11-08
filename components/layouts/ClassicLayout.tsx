"use client";

import React from "react";
import { Header } from "@/components/Header";
import { AlbumCover } from "@/components/AlbumCover";
import { TrackList } from "@/components/TrackList";
import { MusicPlayer } from "@/components/MusicPlayer";
import { useColorStore } from "@/lib/store";

interface ClassicLayoutProps {
  isPlayerVisible: boolean;
  currentTrack?: { title: string; artist: string };
  isExpanded: boolean;
  onPlay: (track?: { title: string; artist: string }) => void;
  onToggleExpand: () => void;
  albumArtist: string;
  releaseTitle: string;
  artworkUrl: string | null;
}

export function ClassicLayout({
  isPlayerVisible,
  currentTrack,
  isExpanded,
  onPlay,
  onToggleExpand,
  albumArtist,
  releaseTitle,
  artworkUrl
}: ClassicLayoutProps) {
  const { textColor, secondaryColor } = useColorStore();

  return (
    <div className="min-h-screen w-full bg-[#121212]">
      <Header />
      
      <main className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="rounded-xl bg-[#181818] shadow-2xl overflow-hidden">
          <div className="px-8 py-8 border-b border-white/10">
            <div className="flex gap-8">
              <div className="w-[280px] h-[280px] flex-shrink-0">
                <AlbumCover 
                  onPlay={() => onPlay()} 
                  isExpanded={isExpanded}
                  onToggleExpand={onToggleExpand}
                  artworkUrl={artworkUrl}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h1 
                  className="text-2xl font-medium mb-1"
                  style={{ color: textColor }}
                >
                  {releaseTitle}
                </h1>
                <p 
                  className="text-lg mb-6"
                  style={{ color: secondaryColor }}
                >
                  {albumArtist}
                </p>

                <div className="grid grid-cols-3 gap-x-12 gap-y-4 mb-8">
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Released</p>
                    <p className="text-sm text-white">January 19, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Genre</p>
                    <p className="text-sm text-white">Electronic</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Label</p>
                    <p className="text-sm text-white">TraTraTrax</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Type</p>
                    <p className="text-sm text-white">Album</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Total length</p>
                    <p className="text-sm text-white">59:13</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">Format</p>
                    <p className="text-sm text-white">WAV</p>
                  </div>
                </div>

                <button className="h-10 px-8 bg-white rounded-full text-black font-medium hover:bg-white/90 transition-colors">
                  Buy for $5
                </button>
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            <TrackList onPlay={onPlay} currentTrack={currentTrack} albumArtist={albumArtist} />
          </div>

          <div className="px-8 py-6 border-t border-white/10">
            <h2 className="text-lg font-medium text-white mb-4">Description</h2>
            <p className="text-sm text-zinc-400 max-w-[800px]">
              We are very excited to announce a new chapter in our journey. Here we are blazing a new trail, making our way to document and leave a first class record of sound design, Field Recording and cutting edge electronic music made in Sur América. We present our first album by {albumArtist}.
            </p>
          </div>
        </div>
      </main>

      <MusicPlayer 
        isVisible={isPlayerVisible}
        currentTrack={currentTrack}
        isExpanded={isExpanded}
      />
    </div>
  );
}
"use client";

import { useState } from "react";
import { Wand2, Share2 } from "lucide-react";
import { useColorStore } from "@/lib/store";
import { generateGradient } from "@/lib/colors";
import { TrackItem } from "@/components/TrackItem";
import { Description } from "@/components/Description";
import { CustomizeSidebar } from "@/components/CustomizeSidebar";
import { BackgroundImage } from "@/components/BackgroundImage";

const ARTWORK_URL = "https://catalog.works/_next/image?url=https%3A%2F%2Farweave-m.b-cdn.net%2FMBBIYv5YosKZBde5udoKALm6BToiwmABMk4qjZUiGLI%3Fwidth%3D500%26height%3D500%26optimizer%3Dimage&w=3840&q=75";

const DESCRIPTION = `This E.P. contains PANIC ROOM's reinterpretation of ELP's 'Bitches Crystal', an instrumental mix of 'Dark Star' from the Satellite album and the track 'Sandstorms' from the now deleted 'Little Satellite' EP.

★ Also included on the CD is the animated film for 'Satellite' created by Cole Jefferies (in mp4 format).`;

const tracks = [
  { id: 1, title: "Model", duration: "4:13", artist: "Dreams" },
  { id: 2, title: "Broken Signal", duration: "4:45", artist: "Dreams" }
];

const supporters = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`
}));

export default function ReleasePage() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const { textColor, secondaryColor, buttonColor, buttonTextColor, containerColor } = useColorStore();

  // Helper function to get the base color without alpha
  const getBaseColor = () => {
    const match = containerColor.match(/\d+/g);
    if (!match || match.length < 3) return 'rgb(18, 18, 18)';
    return `rgb(${match[0]}, ${match[1]}, ${match[2]})`;
  };

  return (
    <div className="min-h-screen text-white relative" style={{ backgroundColor: containerColor }}>
      {/* Background */}
      <BackgroundImage artworkUrl={ARTWORK_URL} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header Actions */}
        <div className="max-w-[1280px] mx-auto px-8 pt-8">
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="w-10 h-10 bg-[#262626] rounded-xl font-medium hover:bg-white/5 transition-colors flex items-center justify-center"
            >
              <Wand2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-96px)]">
          {/* Top Section */}
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="grid grid-cols-[300px,1fr] gap-12">
              {/* Cover Art */}
              <div className="aspect-square bg-[#1a1a1a] rounded-[20px] overflow-hidden shadow-xl relative group">
                <img 
                  src={ARTWORK_URL}
                  alt="Album Cover"
                  className="w-full h-full object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-20 h-20 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                      <path d="M5 4L19 12L5 20V4Z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Release Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-medium mb-2" style={{ color: textColor }}>Model / Broken Signal</h1>
                  <h2 className="text-xl" style={{ color: secondaryColor }}>Dreams</h2>
                </div>

                <div className="grid grid-cols-3 gap-x-0 gap-y-4 text-sm">
                  <div>
                    <p style={{ color: secondaryColor }} className="mb-1">Release date</p>
                    <p style={{ color: textColor }}>Oct 23, 2024</p>
                  </div>
                  <div>
                    <p style={{ color: secondaryColor }} className="mb-1">Genre</p>
                    <p style={{ color: textColor }}>experimental</p>
                  </div>
                  <div>
                    <p style={{ color: secondaryColor }} className="mb-1">Label</p>
                    <p style={{ color: textColor }}>None</p>
                  </div>
                  <div>
                    <p style={{ color: secondaryColor }} className="mb-1">Type</p>
                    <p style={{ color: textColor }}>EP</p>
                  </div>
                  <div>
                    <p style={{ color: secondaryColor }} className="mb-1">Total length</p>
                    <p style={{ color: textColor }}>8:59</p>
                  </div>
                  <div>
                    <p style={{ color: secondaryColor }} className="mb-1">Format</p>
                    <p style={{ color: textColor }}>WAV</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section Wrapper */}
          <div className="relative mt-16" style={{ backgroundColor: getBaseColor() }}>
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-x-0 inset-y-1 h-70 z-[-100] bg-gradient-to-b from-transparent -translate-y-full pointer-events-none" 
              style={{ 
                backgroundImage: `linear-gradient(to bottom, transparent, ${getBaseColor()})`,
                opacity: '0.99'
              }}
            />
            
            {/* Content Container */}
            <div 
              className="max-w-[1280px] z-10 rounded-t-[32px] mx-auto px-8 min-h-[calc(100vh-200px)]" 
              style={{
                borderColor: `${textColor}20`,
                backgroundColor: containerColor
              }}
            >
              <div className="grid grid-cols-[1fr,420px] gap-40 py-12">
                {/* Track List */}
                <div className="space-y-2 max-w-[800px]">
                  {tracks.map((track) => (
                    <TrackItem
                      key={track.id}
                      track={track}
                      isPlaying={currentTrack === track.id}
                      onPlay={() => setCurrentTrack(currentTrack === track.id ? null : track.id)}
                    />
                  ))}
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      className="flex-1 h-10 rounded-xl font-medium transition-colors"
                      style={{
                        backgroundColor: buttonColor,
                        color: buttonTextColor
                      }}
                    >
                      Buy for $2
                    </button>
                    <button
                      className="w-10 h-10 rounded-xl font-medium transition-colors flex items-center justify-center"
                      style={{
                        backgroundColor: buttonColor,
                        color: buttonTextColor
                      }}
                    >
                      <Share2 className="w-4 h-4" style={{ color: buttonTextColor }} />
                    </button>
                  </div>

                  {/* Description */}
                  <Description text={DESCRIPTION} />

                  {/* Supporters */}
                  <div>
                    <h3 className="text-sm font-medium mb-3" style={{ color: textColor }}>Supporters</h3>
                    <div className="flex -space-x-2">
                      {supporters.map((supporter) => (
                        <div
                          key={supporter.id}
                          className="w-8 h-8 rounded-full  ring-[#121212]"
                          style={{
                            background: generateGradient(supporter.id),
                            backgroundBlendMode: 'overlay'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-sm font-medium mb-3" style={{ color: textColor }}>Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {['techno', 'breakbeat', 'club'].map((tag) => (
                        <button
                          key={tag}
                          className="px-3 py-1 rounded-full text-sm transition-colors"
                          style={{
                            backgroundColor: buttonColor,
                            color: buttonTextColor
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Customize Sidebar */}
      <CustomizeSidebar 
        isOpen={isCustomizing}
        onOpenChange={setIsCustomizing}
        onAddGif={() => {}}
        layout="default"
        onLayoutChange={() => {}}
      />
    </div>
  );
}
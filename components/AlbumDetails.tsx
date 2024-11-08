"use client";

import { useState } from 'react';
import { useColorStore } from '@/lib/store';
import { MOCK_SUPPORTERS } from '@/lib/constants';
import { SupportersDialog } from './SupportersDialog';
import { MOCK_SPLITS } from '@/lib/constants';
import { SplitAvatars } from './SplitAvatars';

interface AlbumDetailsProps {
  layout?: 'default' | 'vertical' | 'reversed' | 'minimal' | 'classic';
  albumArtist: string;
}

export function AlbumDetails({ layout = 'default', albumArtist }: AlbumDetailsProps) {
  const { textColor, secondaryColor } = useColorStore();
  const [showSupportersDialog, setShowSupportersDialog] = useState(false);
  const [hoveredSupporterIndex, setHoveredSupporterIndex] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {/* Details Header */}
      <div className="">
        <h2 className={`text-md font-medium inline-block ${layout !== 'classic' ? 'border-b-2 border-white pb-1 text-md' : ''}`}>
          Details
        </h2>
        <div className="h-px bg-white/10" />
      </div>

      {/* Data Points - Only shown in default layout */}
      {(layout === 'default' || layout === 'reversed' || layout === 'vertical') && (
        <div className="grid grid-cols-4 gap-8">
          <div>
            <p className="text-md mb-2" style={{ color: secondaryColor }}>Label</p>
            <p className="text-md font-medium" style={{ color: textColor }}>TraTraTrax</p>
          </div>
          <div>
            <p className="text-md mb-2" style={{ color: secondaryColor }}>Release Date</p>
            <p className="text-md font-medium" style={{ color: textColor }}>January 19, 2025</p>
          </div>
          <div>
            <p className="text-md mb-2" style={{ color: secondaryColor }}>Genre</p>
            <p className="text-md font-medium" style={{ color: textColor }}>Techno</p>
          </div>
          <div>
            <p className="text-md mb-2" style={{ color: secondaryColor }}>Splits</p>
            <SplitAvatars splits={MOCK_SPLITS} />
          </div>
        </div>
      )}

      {/* Description */}
      <div className="space-y-4">
        <p className="text-md leading-relaxed" style={{ color: textColor }}>
          We are very excited to announce a new chapter in our journey. Here we are blazing a new trail, making our way to document and leave a first class record of sound design, Field Recording and cutting edge electronic music made in Sur América. We present our first album by {albumArtist}.
        </p>
        <button 
          className="text-sm hover:underline"
          style={{ color: secondaryColor }}
        >
          View more
        </button>
      </div>

      {/* Supporters */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {MOCK_SUPPORTERS.slice(0, 3).map((supporter, i) => (
            <div
              key={supporter.id}
              className="relative w-6 h-6 rounded-full ring-2 ring-black/20 transition-transform hover:scale-110 cursor-pointer group"
              style={{ background: supporter.gradient }}
              onMouseEnter={() => setHoveredSupporterIndex(i)}
              onMouseLeave={() => setHoveredSupporterIndex(null)}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-black/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <p className="text-[13px] font-medium text-white whitespace-nowrap">
                    {supporter.username}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          className="text-md hover:underline"
          style={{ color: textColor }}
          onClick={() => setShowSupportersDialog(true)}
        >
          30 supporters
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {['techno', 'club', 'field recording', 'Uruguay'].map((tag) => (
          <button
            key={tag}
            className="px-4 py-1.5 bg-zinc-800/80 rounded-full text-sm hover:bg-zinc-700/80 transition-colors"
            style={{ color: textColor }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Supporters Dialog */}
      {showSupportersDialog && (
        <SupportersDialog 
          supporters={MOCK_SUPPORTERS}
          onClose={() => setShowSupportersDialog(false)}
        />
      )}
    </div>
  );
}
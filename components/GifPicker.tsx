"use client";

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface GifPickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

const GIPHY_API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';

export function GifPicker({ onSelect, onClose }: GifPickerProps) {
  const [search, setSearch] = useState('shader');
  const [gifs, setGifs] = useState<Array<{ id: string; url: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchGifs = async (query: string) => {
    if (!query) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=50&rating=g`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch GIFs');
      }
      
      const data = await response.json();
      
      setGifs(
        data.data.map((gif: any) => ({
          id: gif.id,
          url: gif.images.original.url
        }))
      );
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load with shader GIFs
  useState(() => {
    searchGifs('shader');
  });

  return (
    <div className="w-[400px] bg-zinc-900/95 backdrop-blur-xl rounded-xl overflow-hidden">
      <div className="p-4">
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                searchGifs(e.target.value);
              }}
              placeholder="Search GIFs..."
              className="w-full px-4 py-2 pl-10 bg-zinc-800/50 rounded-xl text-[13px] text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800/50 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="h-[500px] overflow-y-auto p-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-white/50">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {gifs.map((gif) => (
              <button
                key={gif.id}
                onClick={() => onSelect(gif.url)}
                className="relative aspect-video overflow-hidden rounded-lg hover:ring-2 hover:ring-white/20 transition-all bg-zinc-800/50"
              >
                <img
                  src={gif.url}
                  alt="GIF"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
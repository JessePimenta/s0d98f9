"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GifPicker } from '@/components/GifPicker';

export default function SetupPage() {
  const router = useRouter();
  const [artistName, setArtistName] = useState('');
  const [releaseTitle, setReleaseTitle] = useState('');
  const [albumArtwork, setAlbumArtwork] = useState<string | null>(null);
  const [showGifPicker, setShowGifPicker] = useState(false);

  const handleArtworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAlbumArtwork(url);
      sessionStorage.setItem('albumArtwork', url);
      sessionStorage.setItem('backgroundUrl', url);
      sessionStorage.removeItem('trackList');
    }
  };

  const handleGifSelect = (url: string) => {
    setAlbumArtwork(url);
    sessionStorage.setItem('albumArtwork', url);
    sessionStorage.setItem('backgroundUrl', url);
    sessionStorage.removeItem('trackList');
    setShowGifPicker(false);
  };

  const handleContinue = () => {
    if (artistName) sessionStorage.setItem('artistName', artistName);
    if (releaseTitle) sessionStorage.setItem('releaseTitle', releaseTitle);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-medium">Create Release</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Artist Name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 rounded-[12px] text-white placeholder:text-zinc-500"
          />

          <input
            type="text"
            placeholder="Release Title"
            value={releaseTitle}
            onChange={(e) => setReleaseTitle(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 rounded-[12px] text-white placeholder:text-zinc-500"
          />
        </div>

        <div className="mx-auto max-w-sm space-y-4">
          <div 
            className="aspect-square bg-zinc-800 rounded-[20px] border-2 border-dashed border-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-800/70 transition-colors"
            onClick={() => document.getElementById('artwork-upload')?.click()}
          >
            {albumArtwork ? (
              <img 
                src={albumArtwork} 
                alt="Album Artwork" 
                className="w-full h-full object-cover rounded-[20px]"
              />
            ) : (
              <div className="text-center">
                <p className="text-sm text-zinc-400">Upload Album Artwork</p>
                <p className="text-xs text-zinc-500 mt-1">Add your release cover image</p>
              </div>
            )}
          </div>
          <input
            id="artwork-upload"
            type="file"
            accept="image/*"
            onChange={handleArtworkUpload}
            className="hidden"
          />
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-3 bg-white text-black rounded-[12px] font-medium hover:bg-white/90 transition-colors"
        >
          Continue
        </button>
      </div>

      {showGifPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative">
            <GifPicker 
              onSelect={handleGifSelect} 
              onClose={() => setShowGifPicker(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
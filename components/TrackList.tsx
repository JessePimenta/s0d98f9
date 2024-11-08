"use client";

interface Track {
  id: number;
  title: string;
  duration: string;
  artist: string;
}

interface TrackListProps {
  tracks: Track[];
}

export function TrackList({ tracks }: TrackListProps) {
  return (
    <div className="space-y-1">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 group"
        >
          <button className="w-8 h-8 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="text-white/60">
              <path d="M5 4L19 12L5 20V4Z" />
            </svg>
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <p className="font-medium">{track.title}</p>
              <p className="text-sm text-white/40">{track.duration}</p>
            </div>
            <p className="text-sm text-white/60">{track.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
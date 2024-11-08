"use client";

export function CoverArt() {
  return (
    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=500&h=500" 
        alt="Album Cover"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
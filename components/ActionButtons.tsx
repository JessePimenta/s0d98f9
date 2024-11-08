"use client";

export function ActionButtons() {
  return (
    <div className="space-y-4">
      <button className="w-full h-12 bg-zinc-800 text-white rounded-full font-medium hover:bg-zinc-700 transition-colors">
        Buy for $10
      </button>
      <button className="w-full h-12 bg-zinc-800 rounded-full font-medium hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
        <img src="/images/share.svg" alt="Share" className="w-6 h-6" />
        Share
      </button>
    </div>
  );
}
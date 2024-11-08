"use client";

import { useColorStore } from '@/lib/store';
import { generateGradient } from '@/lib/colors';

interface Split {
  id: number;
  username: string;
}

interface SplitAvatarsProps {
  splits: Split[];
}

export function SplitAvatars({ splits }: SplitAvatarsProps) {
  const { textColor } = useColorStore();

  return (
    <div className="flex -space-x-2">
      {splits.map((split) => (
        <div
          key={split.id}
          className="w-6 h-6 rounded-full ring-2 ring-black/20 transition-transform hover:scale-110 relative group"
          style={{ 
            background: generateGradient(split.id),
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2 px-3 py-1.5 bg-black/90 backdrop-blur-sm rounded-full text-[13px] font-medium text-white whitespace-nowrap group-hover:block hidden shadow-[0_0_0_1px_rgba(0,0,0,0.4)]">
            {split.username}
          </div>
        </div>
      ))}
    </div>
  );
}
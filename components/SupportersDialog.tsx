"use client";

import { X } from 'lucide-react';
import { useColorStore } from '@/lib/store';
import { generateGradient } from '@/lib/colors';

interface Supporter {
  id: number;
  username: string;
  purchasesInCommon: number;
}

interface SupportersDialogProps {
  supporters: Supporter[];
  onClose: () => void;
}

export function SupportersDialog({ supporters, onClose }: SupportersDialogProps) {
  const { textColor, secondaryColor } = useColorStore();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-zinc-900 rounded-xl w-[400px] max-h-[580px] overflow-hidden relative z-10">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-lg font-medium" style={{ color: textColor }}>Supporters</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(580px - 57px)' }}>
          {supporters.map((supporter) => (
            <div key={supporter.id} className="mx-2 mb-0.5">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full ring-2 ring-black/20 shadow-lg"
                    style={{ 
                      background: generateGradient(supporter.id),
                      backgroundBlendMode: 'overlay'
                    }}
                  />
                  <div>
                    <p className="font-medium" style={{ color: textColor }}>{supporter.username}</p>
                    <p className="text-sm" style={{ color: secondaryColor }}>
                      {supporter.purchasesInCommon} purchases in common
                    </p>
                  </div>
                </div>
                <button
                  className="px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
                  style={{ color: textColor }}
                >
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
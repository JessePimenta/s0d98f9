"use client";

import { motion } from "framer-motion";

interface Supporter {
  id: number;
  name: string;
  avatar: string;
}

interface SupporterGridProps {
  supporters: Supporter[];
}

export function SupporterGrid({ supporters }: SupporterGridProps) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {supporters.map((supporter) => (
        <motion.div
          key={supporter.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 + supporter.id * 0.05 }}
          className="aspect-square relative group"
        >
          <div className="absolute inset-0 rounded-full overflow-hidden bg-zinc-800 hover:scale-110 transition-transform">
            <img 
              src={supporter.avatar} 
              alt={supporter.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
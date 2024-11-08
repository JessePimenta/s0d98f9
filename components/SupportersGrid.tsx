"use client";

import { motion } from "framer-motion";
import { generateGradient } from "@/lib/colors";

interface Supporter {
  id: number;
  name: string;
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
          <div 
            className="absolute inset-0 rounded-full overflow-hidden hover:scale-110 transition-transform"
            style={{ 
              background: generateGradient(supporter.id),
              backgroundBlendMode: 'overlay'
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
"use client";

import { useState } from 'react';
import { useColorStore } from '@/lib/store';

interface DescriptionProps {
  text: string;
  maxLength?: number;
}

export function Description({ text, maxLength = 150 }: DescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { textColor, secondaryColor } = useColorStore();
  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength) + '...';

  return (
    <div className="space-y-2">
      <p className="text-sm whitespace-pre-line" style={{ color: textColor }}>
        {displayText}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm hover:underline transition-colors flex items-center gap-1"
          style={{ color: secondaryColor }}
        >
          {isExpanded ? 'Show less' : 'View more'}
        </button>
      )}
    </div>
  );
}
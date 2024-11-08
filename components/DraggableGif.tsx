import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';

interface DraggableGifProps {
  id: string;
  url: string;
  onRemove: (id: string) => void;
}

export function DraggableGif({ id, url, onRemove }: DraggableGifProps) {
  const nodeRef = useRef(null);
  const [size, setSize] = useState({ width: 200, height: 200 });

  // Generate random position within visible area
  const randomPosition = {
    x: Math.random() * (window.innerWidth - 300),
    y: Math.random() * (window.innerHeight - 300)
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={randomPosition}
      bounds="parent"
      handle=".drag-handle"
    >
      <div ref={nodeRef} className="absolute cursor-move group pointer-events-auto">
        <Resizable
          size={size}
          onResizeStop={(e, direction, ref, d) => {
            setSize({
              width: size.width + d.width,
              height: size.height + d.height,
            });
          }}
          minWidth={100}
          minHeight={100}
          maxWidth={500}
          maxHeight={500}
          handleStyles={{
            bottomRight: {
              bottom: 0,
              right: 0,
              cursor: 'se-resize',
              height: '20px',
              width: '20px',
              background: 'transparent'
            }
          }}
        >
          <div className="relative group h-full">
            <div className="absolute inset-0 drag-handle">
              <img 
                src={url} 
                alt="Sticker"
                className="w-full h-full object-cover rounded-lg"
                draggable={false}
              />
            </div>
            <button
              onClick={() => onRemove(id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-50"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity">
              <svg 
                viewBox="0 0 24 24" 
                className="w-full h-full text-white/80"
                fill="currentColor"
              >
                <path d="M22 22H20V20H22V22ZM22 18H20V16H22V18ZM18 22H16V20H18V22ZM18 18H16V16H18V18ZM14 22H12V20H14V22Z" />
              </svg>
            </div>
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
}
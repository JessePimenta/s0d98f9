"use client";

import { useState, useEffect, useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  const [localColor, setLocalColor] = useState(color);
  const [hexInput, setHexInput] = useState(color);

  // Debounced color change handler
  const debouncedOnChange = useCallback((newColor: string) => {
    setLocalColor(newColor);
    setHexInput(newColor);
    onChange(newColor);
  }, [onChange]);

  // Update local state when prop changes
  useEffect(() => {
    setLocalColor(color);
    setHexInput(color);
  }, [color]);

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInput(value);
    
    // Only update if it's a valid hex color
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      debouncedOnChange(value);
    }
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <div className="w-full flex items-center justify-between px-4 py-2 bg-zinc-800/50 rounded-xl text-[13px] text-white hover:bg-zinc-700/50 transition-colors cursor-pointer">
            <span>{label}</span>
            <div
              className="w-6 h-6 rounded-full border border-white/20"
              style={{ backgroundColor: localColor }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent 
          side="right" 
          align="start" 
          sideOffset={10}
          className="w-auto border-none p-3 bg-zinc-900/95 backdrop-blur-md rounded-lg shadow-xl"
        >
          <div className="space-y-3">
            <div className="w-[200px]">
              <HexColorPicker 
                color={localColor}
                onChange={debouncedOnChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={hexInput}
                onChange={handleHexInput}
                spellCheck={false}
                className="w-full px-2 py-1 bg-zinc-800/50 rounded-md text-[13px] text-white font-mono focus:outline-none focus:ring-1 focus:ring-white/20"
                placeholder="#000000"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
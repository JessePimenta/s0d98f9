"use client";

import { useState, useRef } from 'react';
import { X, ChevronDown, ChevronUp, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { useColorStore } from '@/lib/store';
import { ColorPicker } from './ColorPicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { shaderPresets } from '@/lib/shaders';
import { GifPicker } from './GifPicker';

interface CustomizeSidebarProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddGif: (url: string) => void;
  layout: 'default' | 'vertical' | 'reversed' | 'minimal' | 'classic';
  onLayoutChange: (layout: 'default' | 'vertical' | 'reversed' | 'minimal' | 'classic') => void;
}

const DEFAULT_COLORS = {
  text: '#FFFFFF',
  secondary: '#A1A1A1',
  button: '#262626',
  buttonText: '#FFFFFF',
  container: '#121212',
};

export function CustomizeSidebar({ isOpen, onOpenChange, onAddGif, layout, onLayoutChange }: CustomizeSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [youtubeInputValue, setYoutubeInputValue] = useState('');
  const [pickerType, setPickerType] = useState<'background' | 'sticker' | null>(null);
  const [isColorsExpanded, setIsColorsExpanded] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    backgroundUrl,
    youtubeUrl,
    currentShader,
    isBackgroundBlurred,
    setBackgroundUrl,
    setYoutubeUrl,
    setCurrentShader,
    toggleBackgroundBlur,
    textColor,
    secondaryColor,
    buttonColor,
    buttonTextColor,
    containerColor,
    setTextColor,
    setSecondaryColor,
    setButtonColor,
    setButtonTextColor,
    setContainerColor,
    setGradientColor
  } = useColorStore();

  const handleContainerColorChange = (color: string) => {
    // Convert hex to RGB for both container and gradient
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    // Set container color with 0.95 opacity
    setContainerColor(`rgba(${r}, ${g}, ${b}, 0.95)`);
    // Set gradient color with 0.6 opacity
    setGradientColor(`rgba(${r}, ${g}, ${b}, 0.6)`);
  };

  // Convert RGBA to HEX for the color picker
  const getHexFromRgba = (rgba: string) => {
    const rgbaValues = rgba.match(/\d+/g);
    if (!rgbaValues || rgbaValues.length < 3) return '#121212';
    const [r, g, b] = rgbaValues;
    return `#${Number(r).toString(16).padStart(2, '0')}${Number(g).toString(16).padStart(2, '0')}${Number(b).toString(16).padStart(2, '0')}`;
  };

  const resetColors = () => {
    setTextColor(DEFAULT_COLORS.text);
    setSecondaryColor(DEFAULT_COLORS.secondary);
    setButtonColor(DEFAULT_COLORS.button);
    setButtonTextColor(DEFAULT_COLORS.buttonText);
    handleContainerColorChange(DEFAULT_COLORS.container);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('video/')) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Video size must be under 10MB');
        return;
      }
    }

    sessionStorage.removeItem('albumArtwork');
    setYoutubeUrl(null);
    setYoutubeInputValue('');
    const url = URL.createObjectURL(file);
    setBackgroundUrl(url, file.type === 'image/gif');
  };

  const handleRemoveBackground = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setBackgroundUrl('');
    setYoutubeUrl(null);
    setYoutubeInputValue('');
  };

  const handleYoutubeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    setYoutubeInputValue(url);
    
    if (!url) {
      setYoutubeUrl(null);
      return;
    }
    setBackgroundUrl('');
    setYoutubeUrl(url);
  };

  const handleGifSelect = (url: string) => {
    sessionStorage.setItem('albumArtwork', url);
    setBackgroundUrl(url, true);
    setPickerType(null);
  };

  if (!isOpen) return null;

  return (
    <>
      <div ref={sidebarRef} className="fixed left-5 top-1/2 -translate-y-1/2 w-[270px] max-h-[90vh] overflow-y-auto bg-zinc-900/90 backdrop-blur-xl p-6 rounded-2xl scrollbar-none z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-white">Customize</h2>
          <button 
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-zinc-400 text-xs font-medium">Colors</h3>
              <button
                onClick={resetColors}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {isColorsExpanded && (
              <div className="space-y-2">
                <ColorPicker
                  label="Text Color"
                  color={textColor}
                  onChange={setTextColor}
                />
                <ColorPicker
                  label="Secondary Text"
                  color={secondaryColor}
                  onChange={setSecondaryColor}
                />
                <ColorPicker
                  label="Button Color"
                  color={buttonColor}
                  onChange={setButtonColor}
                />
                <ColorPicker
                  label="Button Text"
                  color={buttonTextColor}
                  onChange={setButtonTextColor}
                />
                <ColorPicker
                  label="Container Background"
                  color={getHexFromRgba(containerColor)}
                  onChange={handleContainerColorChange}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-zinc-400 text-xs font-medium mb-2">Background</h3>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/mp4,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />
            <button 
              onClick={() => backgroundUrl || youtubeUrl ? handleRemoveBackground() : fileInputRef.current?.click()}
              className="w-full text-left px-4 py-2 bg-zinc-800/50 rounded-xl text-[13px] text-white hover:bg-zinc-700/50 transition-colors"
            >
              {backgroundUrl || youtubeUrl ? 'Remove background' : 'Upload photo/video/gif'}
            </button>

            <button
              onClick={() => setPickerType('background')}
              className="w-full text-left px-4 py-2 bg-zinc-800/50 rounded-xl text-[13px] text-white hover:bg-zinc-700/50 transition-colors"
            >
              Choose GIF background
            </button>

            <input
              type="text"
              placeholder="Paste YouTube URL"
              value={youtubeInputValue}
              onChange={handleYoutubeInput}
              className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl text-[13px] text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />

            <Select
              value={currentShader || "None"}
              onValueChange={(value) => {
                setCurrentShader(value === "None" ? null : value);
              }}
            >
              <SelectTrigger className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl text-[13px] text-white hover:bg-zinc-700/50 transition-colors border-0">
                <SelectValue placeholder="Select animation" className="text-zinc-400" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900/95 backdrop-blur-xl border-zinc-800 rounded-xl">
                <SelectItem value="None">Select animation</SelectItem>
                <SelectItem value="neonPulse">Neon Pulse</SelectItem>
                <SelectItem value="waveform">Waveform</SelectItem>
                <SelectItem value="fractalnoise">Fractal Noise</SelectItem>
                <SelectItem value="waterDrops">Water Drops</SelectItem>
                <SelectItem value="glitchRiver">Glitch River</SelectItem>
                <SelectItem value="kaleidoscope">Kaleidoscope</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="oilSlick">Oil Slick</SelectItem>
              </SelectContent>
            </Select>

            <button
              onClick={toggleBackgroundBlur}
              className="w-full flex items-center justify-between px-4 py-2 bg-zinc-800/50 rounded-xl text-[13px] text-white hover:bg-zinc-700/50 transition-colors"
            >
              <span>Background blur</span>
              {isBackgroundBlurred ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {pickerType && (
        <div 
          className="fixed z-50"
          style={{ 
            left: sidebarRef.current ? `${sidebarRef.current.getBoundingClientRect().right + 20}px` : '290px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <GifPicker onSelect={handleGifSelect} onClose={() => setPickerType(null)} />
        </div>
      )}
    </>
  );
}
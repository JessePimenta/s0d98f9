"use client";

import { useEffect, useState } from 'react';
import { useColorStore } from '@/lib/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WebFont from 'webfontloader';

const FONTS = [
  'Helvetica',
  'Arial',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Inter',
  'Abril Fatface',
  'Righteous',
  'Pacifico',
  'Permanent Marker',
  'Comfortaa',
  'Fredoka One',
  'Press Start 2P',
  'Monoton',
  'Rubik Mono One',
  'Bungee',
  'Bungee Shade',
  'Creepster',
  'Faster One',
  'Megrim'
];

export function FontPicker() {
  const { fontFamily, setFontFamily } = useColorStore();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    WebFont.load({
      google: {
        families: FONTS.filter(font => font !== 'Helvetica' && font !== 'Arial')
      },
      active: () => setFontsLoaded(true)
    });
  }, []);

  const handleFontChange = (font: string) => {
    setFontFamily(font);
    if (!['Helvetica', 'Arial'].includes(font)) {
      WebFont.load({
        google: {
          families: [font]
        }
      });
    }
  };

  if (!fontsLoaded) {
    return (
      <div className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl text-[13px] text-white">
        Loading fonts...
      </div>
    );
  }

  return (
    <Select
      value={fontFamily}
      onValueChange={handleFontChange}
    >
      <SelectTrigger className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl text-[13px] text-white hover:bg-zinc-700/50 transition-colors border-0">
        <SelectValue placeholder="Select Font" className="text-white" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-900/95 backdrop-blur-xl border-zinc-800 rounded-xl">
        {FONTS.map(font => (
          <SelectItem 
            key={font} 
            value={font}
            style={{ fontFamily: font }}
          >
            {font} {['Helvetica', 'Arial'].includes(font) ? '' : ''}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
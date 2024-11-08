"use client";

import { create } from 'zustand';

interface ColorState {
  backgroundUrl: string;
  youtubeUrl: string | null;
  currentShader: string | null;
  isBackgroundBlurred: boolean;
  textColor: string;
  secondaryColor: string;
  buttonColor: string;
  buttonTextColor: string;
  containerColor: string;
  gradientColor: string;
  setBackgroundUrl: (url: string, isGif?: boolean) => void;
  setYoutubeUrl: (url: string | null) => void;
  setCurrentShader: (shader: string | null) => void;
  toggleBackgroundBlur: () => void;
  setTextColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setButtonColor: (color: string) => void;
  setButtonTextColor: (color: string) => void;
  setContainerColor: (color: string) => void;
  setGradientColor: (color: string) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  backgroundUrl: '',
  youtubeUrl: null,
  currentShader: null,
  isBackgroundBlurred: true,
  textColor: '#FFFFFF',
  secondaryColor: '#A1A1A1',
  buttonColor: '#262626',
  buttonTextColor: '#FFFFFF',
  containerColor: 'rgba(18, 18, 18, 0.95)',
  gradientColor: 'rgba(0, 0, 0, 0.6)',
  setBackgroundUrl: (url, isGif = false) => set({ backgroundUrl: url }),
  setYoutubeUrl: (url) => set({ youtubeUrl: url }),
  setCurrentShader: (shader) => set({ currentShader: shader }),
  toggleBackgroundBlur: () => set((state) => ({ isBackgroundBlurred: !state.isBackgroundBlurred })),
  setTextColor: (color) => set({ textColor: color }),
  setSecondaryColor: (color) => set({ secondaryColor: color }),
  setButtonColor: (color) => set({ buttonColor: color }),
  setButtonTextColor: (color) => set({ buttonTextColor: color }),
  setContainerColor: (color) => set({ containerColor: color }),
  setGradientColor: (color) => set({ gradientColor: color }),
}));
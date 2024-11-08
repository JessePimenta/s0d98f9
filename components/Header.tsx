"use client";

import { Logo } from './Logo';

export function Header() {
  return (
    <header className="flex items-center justify-between max-w-7xl mx-auto relative z-10">
      <div className="h-14 w-14 bg-zinc-900/50 backdrop-blur-md rounded-3xl flex items-center justify-center">
        <Logo />
      </div>

      <div className="h-14 w-14 bg-zinc-900/50 backdrop-blur-md rounded-3xl flex items-center justify-center overflow-hidden">
        <img 
          src="https://i.imgur.com/w6j5yFr.png" 
          alt="Avatar" 
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </header>
  );
}
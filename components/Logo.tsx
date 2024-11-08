"use client";

interface LogoProps {
  className?: string;
  size?: "small" | "large";
}

export function Logo({ className = "", size = "small" }: LogoProps) {
  const dimensions = {
    small: "h-6",
    large: "h-12"
  };

  return (
    <img 
      src="https://i.imgur.com/VfQ8HKz.png" 
      alt="Logo" 
      className={`w-auto object-contain ${dimensions[size]} ${className}`}
    />
  );
}
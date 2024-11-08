// Zorb gradient presets for supporter avatars
export const generateGradient = (seed: number) => {
  const hue = Math.floor((seed * 137.508) % 360);
  const saturation = Math.floor((seed * 57.508) % 20) + 80; // 80-100%
  const lightness = Math.floor((seed * 27.508) % 20) + 45; // 45-65%

  const color1 = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const color2 = `hsl(${(hue + 60) % 360}, ${saturation - 20}%, ${lightness - 20}%)`;
  const color3 = `hsl(${(hue + 180) % 360}, ${saturation - 10}%, ${lightness - 10}%)`;

  return `radial-gradient(circle at 30% 30%,
    ${color1} 0%,
    ${color2} 60%,
    ${color3} 100%
  )`;
};

export const ZORB_GRADIENTS = {
  green: generateGradient(123),
  purple: generateGradient(456),
  blue: generateGradient(789)
} as const;
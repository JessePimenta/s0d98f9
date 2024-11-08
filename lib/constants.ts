export const ZORB_GRADIENTS = {
  green: 'radial-gradient(circle at center, #EAFFCE 0%, #6CB587 100%)',
  purple: 'radial-gradient(circle at center, #474578 0%, #8380DE 100%)',
  blue: 'radial-gradient(circle at center, #5B81AD 0%, #3D638F 100%)',
} as const;

// Use a stable ID generator to prevent hydration mismatches
let supporterId = 1;

export const MOCK_SUPPORTERS = Array.from({ length: 30 }, () => ({
  id: supporterId++,
  username: `@soundscape${supporterId}`,
  purchasesInCommon: Math.floor(Math.random() * 10) + 1,
  gradient: Object.values(ZORB_GRADIENTS)[supporterId % 3]
}));

export const MOCK_SPLITS = [
  { id: 1, username: '@lechuga', gradient: ZORB_GRADIENTS.green },
  { id: 2, username: '@tratratrax', gradient: ZORB_GRADIENTS.purple }
];
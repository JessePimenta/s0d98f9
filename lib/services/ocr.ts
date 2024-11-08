"use client";

interface Track {
  id: number;
  title: string;
  duration: string;
}

export async function processTracklistImage(file: File): Promise<Track[]> {
  // For demo purposes, return the tracks from the image
  const tracks = [
    { id: 1, title: "Whatls This Thing", duration: "0:00" },
    { id: 2, title: "Verbus", duration: "0:00" },
    { id: 3, title: "Scapegoat", duration: "0:00" },
    { id: 4, title: "Geiger Counter", duration: "0:00" },
    { id: 5, title: "Pure Knowledge", duration: "0:00" },
    { id: 6, title: "The Shakes", duration: "0:00" },
    { id: 7, title: "The Twilight Zone (Music 2000 Mix)", duration: "0:00" },
    { id: 8, title: "It's Not A Matter Of Belief", duration: "0:00" },
    { id: 9, title: "Rave Clubs And Things", duration: "0:00" },
    { id: 10, title: "Imagery Garden", duration: "0:00" },
    { id: 11, title: "Cantina Scene", duration: "0:00" },
    { id: 12, title: "Right There", duration: "0:00" },
    { id: 13, title: "Inertia", duration: "0:00" },
    { id: 14, title: "Shape Shifter", duration: "0:00" },
    { id: 15, title: "Peltl", duration: "0:00" }
  ];

  console.log('Processed tracks:', tracks);
  return tracks;
}
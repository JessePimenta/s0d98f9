"use client";

import { useEffect, useRef, useState } from "react";

interface AudioState {
  scale: number;
  tiltX: number;
  tiltY: number;
  error: string | null;
  isInitialized: boolean;
}

export function useAudioAnalyzer() {
  const [state, setState] = useState<AudioState>({
    scale: 1,
    tiltX: 0,
    tiltY: 0,
    error: null,
    isInitialized: false
  });
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const initAudio = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Media devices not supported");
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const analyze = () => {
          if (!analyserRef.current) return;
          
          analyserRef.current.getByteFrequencyData(dataArray);
          
          // Calculate average volume
          const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
          const normalizedAverage = Math.min(average, 255) / 255;
          
          // Calculate scale (1.0 to 1.5)
          const newScale = 1 + (normalizedAverage * 0.5);
          
          // Calculate random tilt based on audio intensity
          const maxTilt = 25 * normalizedAverage;
          const newTiltX = (Math.random() - 0.5) * maxTilt;
          const newTiltY = (Math.random() - 0.5) * maxTilt;
          
          setState(prev => ({
            ...prev,
            scale: newScale,
            tiltX: newTiltX,
            tiltY: newTiltY
          }));
          
          animationFrameRef.current = requestAnimationFrame(analyze);
        };

        analyze();
        setState(prev => ({ ...prev, isInitialized: true, error: null }));
      } catch (err) {
        setState(prev => ({
          ...prev,
          error: err instanceof Error ? err.message : "Failed to initialize audio"
        }));
        console.error("Error accessing microphone:", err);
      }
    };

    initAudio();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return state;
}
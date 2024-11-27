"use client";

import { useCallback } from 'react';

export function useTTS() {
  const speak = useCallback(async (text: string) => {
    if (!window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Get available voices and select an English one if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => 
      voice.lang.startsWith('en-')
    );
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);

    return new Promise<void>((resolve) => {
      utterance.onend = () => resolve();
    });
  }, []);

  const stop = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
  }, []);

  const speaking = window.speechSynthesis?.speaking ?? false;

  return { speak, stop, speaking };
}
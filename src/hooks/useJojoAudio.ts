'use client';

import { useEffect, useCallback, useState } from 'react';
import {
  initializeAudio,
  playProductClickSound as audioPlayProductClick,
  playCartAddSound,
  playErrorSound,
  playSuccessSound,
  playAchievementSound,
  playCheckoutSound,
  playRandomCatchphrase as audioPlayRandomCatchphrase,
  playRandomBackgroundMusic,
  playItWasMeDio,
  playTimeStop,
  playToBeContinued,
  playMenacing,
  playGiornoTheme,
  playDioWryyy,
  playYareYareDaze,
  playMudaMudaMuda,
  triggerAudioBrainrot,
  enableAudioChaos,
  disableAudioChaos,
  setMasterVolume,
  setBackgroundVolume,
  setSfxVolume,
  stopAllAudio,
  getCurrentlyPlaying,
  triggerPillarmenEvent,
  triggerGiornoEvent,
  triggerKiraEvent,
  triggerTortureDanceEvent,
  triggerDioEvent,
  triggerBitesTheDustEvent
} from '@/lib/audio';

export function useJojoAudio() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [backgroundVolume, setBgVolume] = useState(0.3);
  const [sfxVolume, setSfxVol] = useState(0.7);

  // Initialize audio system with smart management
  useEffect(() => {
    const init = async () => {
      try {
        await initializeAudio();
        setIsInitialized(true);

        // Start with ambient background music
        setTimeout(() => {
          playRandomBackgroundMusic();
        }, 2000);

        console.log('🎵 Smart JoJo Audio System Ready!');
      } catch (error) {
        console.warn('Failed to initialize audio:', error);
      }
    };

    // Initialize on user interaction
    const handleUserInteraction = () => {
      init();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  // Smart audio functions that respect the layered system
  const playProductClickSound = useCallback(() => {
    if (!isInitialized) return;
    audioPlayProductClick();
  }, [isInitialized]);

  const playPopupSound = useCallback(() => {
    if (!isInitialized) return;
    playErrorSound(); // "OH NO!" for popups
  }, [isInitialized]);

  const playTimeStopSound = useCallback(() => {
    if (!isInitialized) return;
    playTimeStop(); // High priority event sound
  }, [isInitialized]);

  const playMenacingSound = useCallback(() => {
    if (!isInitialized) return;
    playMenacing(); // Background music
  }, [isInitialized]);

  const playToBeContinuedSound = useCallback(() => {
    if (!isInitialized) return;
    playToBeContinued(); // High priority event
  }, [isInitialized]);

  const triggerRandomMemeSound = useCallback(() => {
    if (!isInitialized) return;
    playRandomCatchphrase(); // Respects cooldowns
  }, [isInitialized]);

  const triggerBrainrotMode = useCallback(() => {
    if (!isInitialized) return;
    triggerAudioBrainrot(); // Smart chaos mode
  }, [isInitialized]);

  const toggleChaosMode = useCallback(() => {
    const newChaosMode = !chaosMode;
    setChaosMode(newChaosMode);
    
    if (newChaosMode) {
      enableAudioChaos();
      playDioWryyy(); // Catchphrase to announce chaos
    } else {
      disableAudioChaos();
      playYareYareDaze(); // "Good grief" to end chaos
    }
  }, [chaosMode]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    setMasterVolume(newVolume);
  }, []);

  const changeBackgroundVolume = useCallback((newVolume: number) => {
    setBgVolume(newVolume);
    setBackgroundVolume(newVolume);
  }, []);

  const changeSfxVolume = useCallback((newVolume: number) => {
    setSfxVol(newVolume);
    setSfxVolume(newVolume);
  }, []);

  const playRandomCatchphrase = useCallback(() => {
    if (!isInitialized) return;
    audioPlayRandomCatchphrase();
  }, [isInitialized]);

  const playEnhancedCartSound = useCallback(() => {
    if (!isInitialized) return;
    playCartAddSound(); // "OH MY GOD!" for cart adds
  }, [isInitialized]);

  const playCheckoutSequence = useCallback(() => {
    if (!isInitialized) return;
    playCheckoutSound(); // "Za Warudo Heaven" for checkout
  }, [isInitialized]);

  const triggerJojoThemeExperience = useCallback(() => {
    if (!isInitialized) return;
    playGiornoTheme(); // Background music
  }, [isInitialized]);

  const triggerMemeFrenzy = useCallback(() => {
    if (!isInitialized) return;
    // Play multiple catchphrases with smart cooldowns
    playMudaMudaMuda();
    setTimeout(() => playDioWryyy(), 2000);
    setTimeout(() => playYareYareDaze(), 4000);
  }, [isInitialized]);

  const playHoverEffect = useCallback(() => {
    if (!isInitialized) return;
    // Subtle SFX for hovers (respects cooldowns)
    if (Math.random() < 0.2) { // 20% chance to avoid spam
      audioPlayProductClick();
    }
  }, [isInitialized]);

  const playEntranceEffect = useCallback(() => {
    if (!isInitialized) return;
    playItWasMeDio(); // Classic entrance
  }, [isInitialized]);

  // Event-specific functions for achievements and notifications
  const playAchievementUnlocked = useCallback(() => {
    if (!isInitialized) return;
    playAchievementSound(); // "To Be Continued" for achievements
  }, [isInitialized]);

  const playSuccessEffect = useCallback(() => {
    if (!isInitialized) return;
    playSuccessSound(); // "I have a dream" for success
  }, [isInitialized]);

  const playErrorEffect = useCallback(() => {
    if (!isInitialized) return;
    playErrorSound(); // "OH NO!" for errors
  }, [isInitialized]);

  // Simplified phrase functions
  const playSpecificPhrases = {
    itWasMe: () => isInitialized && playItWasMeDio(),
    yourNextLine: () => isInitialized && audioPlayRandomCatchphrase()
  };

  // New meme functions using smart system
  const playNewJojoMemes = {
    wryyyScream: () => isInitialized && playDioWryyy(),
    tickTockTimeStop: () => isInitialized && playTimeStop(),
    mudaRapidFire: () => isInitialized && playMudaMudaMuda(),
    forgiveFatherDramatic: () => isInitialized && audioPlayRandomCatchphrase()
  };

  // Audio debugging
  const getAudioStatus = useCallback(() => {
    if (!isInitialized) return 'Not initialized';
    return getCurrentlyPlaying();
  }, [isInitialized]);

  return {
    isInitialized,
    chaosMode,
    volume,
    backgroundVolume,
    sfxVolume,
    
    // Core audio functions (smart management)
    playProductClickSound,
    playPopupSound,
    playTimeStopSound,
    playMenacingSound,
    playToBeContinuedSound,
    triggerRandomMemeSound,
    triggerBrainrotMode,
    toggleChaosMode,
    changeVolume,
    changeBackgroundVolume,
    changeSfxVolume,
    playRandomCatchphrase,
    playEnhancedCartSound,
    playCheckoutSequence,
    triggerJojoThemeExperience,
    triggerMemeFrenzy,
    playHoverEffect,
    playEntranceEffect,
    
    // Event-specific audio
    playAchievementUnlocked,
    playSuccessEffect,
    playErrorEffect,
    
    // Character/theme event triggers
    triggerPillarmenEvent,
    triggerGiornoEvent,
    triggerKiraEvent,
    triggerTortureDanceEvent,
    triggerDioEvent,
    triggerBitesTheDustEvent,
    
    // Legacy compatibility
    playSpecificPhrases,
    playNewJojoMemes,
    
    // Control functions
    stopAllAudio: () => stopAllAudio(),
    getAudioStatus
  };
}
'use client';

import { useEffect, useCallback, useState } from 'react';
import { 
  initializeAudio,
  startJoJoMemeAudioTimer,
  playJojoSoundWithChaos,
  playRandomJojoCatchphrase,
  playDramaticStinger,
  playPopupEffect,
  playClickEffect,
  triggerAudioBrainrot,
  enableAudioChaos,
  disableAudioChaos,
  setMasterVolume,
  playToBeContinuedFull,
  playGiornoPiano,
  playEntranceSwell,
  playHoverMystery,
  playCartFanfare,
  playCheckoutFinale,
  playPianoSuspense,
  playYourNextLineIs,
  playItWasMeDio,
  playForgiveMe,
  playTasteOfLiar,
  triggerJojoMemeFrenzy,
  triggerGiornoThemeExperience,
  playForgiveFatherDramatic,
  playFlyInTheSky,
  playJojoMemeCompilation,
  playSonoChiNoKioku,
  playTraitorsRequiem,
  playHeavenAscension,
  playWryyyScream,
  playTickTockTimeStop,
  playMudaRapidFire
} from '@/lib/audio';

export function useJojoAudio() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [audioCleanup, setAudioCleanup] = useState<(() => void) | null>(null);
  const [chaosMode, setChaosMode] = useState(false);
  const [volume, setVolume] = useState(0.7);

  // Initialize audio system
  useEffect(() => {
    const init = async () => {
      try {
        await initializeAudio();
        setIsInitialized(true);
        
        // Start the enhanced unpredictable meme timer
        const cleanup = startJoJoMemeAudioTimer();
        setAudioCleanup(() => cleanup);
        
        // Play enhanced dramatic entrance sequence
        setTimeout(() => {
          playEntranceSwell();
          setTimeout(() => {
            playItWasMeDio();
          }, 2500);
          setTimeout(() => {
            playRandomJojoCatchphrase();
          }, 4000);
        }, 1000);
        
        console.log('🎵 JoJo Audio System Initialized! ZA WARUDO!');
      } catch (error) {
        console.warn('Failed to initialize JoJo audio system:', error);
      }
    };

    // Initialize on user interaction to comply with browser autoplay policies
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
      if (audioCleanup) {
        audioCleanup();
      }
    };
  }, []);

  // Audio effect functions
  const playProductClickSound = useCallback(() => {
    if (!isInitialized) return;
    
    const effects = ['ora', 'muda', 'menacing', 'click-effect', 'hover-mystery'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    
    playJojoSoundWithChaos(randomEffect);
    
    // Enhanced random chance for specific catchphrases
    const catchphraseType = Math.random();
    if (catchphraseType < 0.15) {
      setTimeout(() => {
        playYourNextLineIs();
      }, 500);
    } else if (catchphraseType < 0.25) {
      setTimeout(() => {
        playRandomJojoCatchphrase();
      }, 500);
    }
  }, [isInitialized]);

  const playPopupSound = useCallback(() => {
    if (!isInitialized) return;
    
    playPopupEffect();
    playDramaticStinger();
    
    setTimeout(() => {
      const eventType = Math.random();
      if (eventType < 0.3) {
        playItWasMeDio();
      } else if (eventType < 0.5) {
        playTasteOfLiar();
      } else {
        playRandomJojoCatchphrase();
      }
    }, 800);
  }, [isInitialized]);

  const playTimeStopSound = useCallback(() => {
    if (!isInitialized) return;
    
    playJojoSoundWithChaos('timestop');
    setTimeout(() => {
      playRandomJojoCatchphrase();
    }, 2000);
  }, [isInitialized]);

  const playMenacingSound = useCallback(() => {
    if (!isInitialized) return;
    
    playJojoSoundWithChaos('menacing');
    
    // Build tension with multiple sounds
    setTimeout(() => playJojoSoundWithChaos('dramatic-stinger'), 1000);
    setTimeout(() => playRandomJojoCatchphrase(), 2000);
  }, [isInitialized]);

  const playToBeContinuedSound = useCallback(() => {
    if (!isInitialized) return;
    
    // Use the enhanced full version with proper freeze timing
    playToBeContinuedFull();
    setTimeout(() => {
      const toBeContinuedPhrases = ['KONO DIO DA!', 'It was me, DIO!', 'WRYYY!'];
      const phrase = toBeContinuedPhrases[Math.floor(Math.random() * toBeContinuedPhrases.length)];
      playRandomJojoCatchphrase();
    }, 5000); // Timed with the freeze moment
  }, [isInitialized]);

  const toggleChaosMode = useCallback(() => {
    if (!isInitialized) return;
    
    if (chaosMode) {
      disableAudioChaos();
      setChaosMode(false);
      setMasterVolume(0.7);
      console.log('🎵 Chaos mode disabled');
    } else {
      enableAudioChaos();
      setChaosMode(true);
      triggerAudioBrainrot();
      console.log('🎵 CHAOS MODE ACTIVATED! MUDA MUDA MUDA!');
    }
  }, [isInitialized, chaosMode]);

  const changeVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    setMasterVolume(clampedVolume);
  }, []);

  const triggerRandomMemeSound = useCallback(() => {
    if (!isInitialized) return;
    
    const memeSounds = ['ora', 'muda', 'wryyy', 'konodioda', 'yare', 'menacing', 'to-be-continued', 'forgive-father-dramatic', 'fly-in-the-sky', 'jojo-meme-compilation'];
    const randomSound = memeSounds[Math.floor(Math.random() * memeSounds.length)];
    
    playJojoSoundWithChaos(randomSound);
    
    // Enhanced TTS overlay with "Forgive them father" phrases
    if (Math.random() < 0.6) {
      setTimeout(() => {
        if (Math.random() < 0.3) {
          playForgiveFatherDramatic();
        } else {
          playRandomJojoCatchphrase();
        }
      }, Math.random() * 2000);
    }
  }, [isInitialized]);

  const triggerBrainrotMode = useCallback(() => {
    if (!isInitialized) return;
    
    console.log('🧠💀 ENHANCED BRAINROT MODE ACTIVATED! 💀🧠');
    triggerAudioBrainrot();
    
    // Trigger MUDA rapid-fire for maximum chaos
    setTimeout(() => {
      playMudaRapidFire();
    }, 2000);
    
    // Extended chaos effects with enhanced variety
    let chaosCount = 0;
    const chaosInterval = setInterval(() => {
      const chaosType = Math.random();
      if (chaosType < 0.25) {
        triggerRandomMemeSound();
      } else if (chaosType < 0.5) {
        playPianoSuspense();
        setTimeout(() => playYourNextLineIs(), 1500);
      } else if (chaosType < 0.75) {
        playJojoSoundWithChaos('giorno-piano');
      } else {
        // 25% chance to trigger MUDA rapid-fire during chaos
        playMudaRapidFire();
      }
      
      chaosCount++;
      if (chaosCount > 8) {
        clearInterval(chaosInterval);
      }
    }, 1800);
    
    setTimeout(() => {
      clearInterval(chaosInterval);
      console.log('🧠💀 Brainrot mode ending... for now 💀🧠');
    }, 20000); // Extended duration
  }, [isInitialized, triggerRandomMemeSound]);

  // New enhanced audio functions
  const playEnhancedCartSound = useCallback(() => {
    if (!isInitialized) return;
    
    playCartFanfare();
    setTimeout(() => {
      const cartPhrases = ['GOLDEN EXPERIENCE!', 'This is the power of my Stand!', 'I have a dream!'];
      const phrase = cartPhrases[Math.floor(Math.random() * cartPhrases.length)];
      playRandomJojoCatchphrase();
    }, 1500);
  }, [isInitialized]);

  const playCheckoutSequence = useCallback(() => {
    if (!isInitialized) return;
    
    playCheckoutFinale();
    setTimeout(() => {
      playItWasMeDio();
    }, 3000);
  }, [isInitialized]);

  const triggerJojoThemeExperience = useCallback(() => {
    if (!isInitialized) return;
    
    triggerGiornoThemeExperience();
  }, [isInitialized]);

  const triggerMemeFrenzy = useCallback(() => {
    if (!isInitialized) return;
    
    triggerJojoMemeFrenzy();
  }, [isInitialized]);

  const playHoverEffect = useCallback(() => {
    if (!isInitialized) return;
    
    playHoverMystery();
    
    // Enhanced random chance for mysterious phrase with new "forgive" variants
    if (Math.random() < 0.3) {
      setTimeout(() => {
        if (Math.random() < 0.5) {
          playForgiveFatherDramatic();
        } else {
          playForgiveMe();
        }
      }, 800);
    }
  }, [isInitialized]);

  return {
    isInitialized,
    chaosMode,
    volume,
    playProductClickSound,
    playPopupSound,
    playTimeStopSound,
    playMenacingSound,
    playToBeContinuedSound,
    triggerRandomMemeSound,
    triggerBrainrotMode,
    toggleChaosMode,
    changeVolume,
    playRandomCatchphrase: playRandomJojoCatchphrase,
    // Enhanced new functions
    playEnhancedCartSound,
    playCheckoutSequence,
    triggerJojoThemeExperience,
    triggerMemeFrenzy,
    playHoverEffect,
    playEntranceEffect: () => playEntranceSwell(),
    playSpecificPhrases: {
      yourNextLine: playYourNextLineIs,
      itWasMe: playItWasMeDio,
      forgiveMe: playForgiveMe,
      tasteOfLiar: playTasteOfLiar,
      forgiveFatherDramatic: playForgiveFatherDramatic
    },
    // New enhanced meme functions
    playNewJojoMemes: {
      flyInTheSky: playFlyInTheSky,
      jojoMemeCompilation: playJojoMemeCompilation,
      sonoChiNoKioku: playSonoChiNoKioku,
      traitorsRequiem: playTraitorsRequiem,
      heavenAscension: playHeavenAscension,
      forgiveFatherDramatic: playForgiveFatherDramatic,
      wryyyScream: playWryyyScream,
      tickTockTimeStop: playTickTockTimeStop,
      mudaRapidFire: playMudaRapidFire
    }
  };
}
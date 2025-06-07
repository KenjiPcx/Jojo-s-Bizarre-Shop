'use client';

import { useState, useEffect } from 'react';
import { playKonoDioDa, playWryyy, playMenacing, playJojoSoundWithChaos, playRandomJojoCatchphrase, triggerAudioBrainrot } from '@/lib/audio';
import { dioQuotes, standEncounters } from '@/data/products';

export function useBrainrotEffects() {
  const [dioMode, setDioMode] = useState(false);
  const [priceRejectMode, setPriceRejectMode] = useState(false);
  const [currentDioQuote, setCurrentDioQuote] = useState('');
  const [standBattle, setStandBattle] = useState(false);
  const [standBattleEnemy, setStandBattleEnemy] = useState('');

  // Enhanced Random DIO takeover with audio chaos
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.05) {
        setDioMode(true);
        setCurrentDioQuote(dioQuotes[Math.floor(Math.random() * dioQuotes.length)]);
        
        // Enhanced audio sequence
        playKonoDioDa();
        setTimeout(() => {
          playJojoSoundWithChaos('timestop');
        }, 1000);
        setTimeout(() => {
          playRandomJojoCatchphrase();
        }, 2500);
        
        // Random chance for full brainrot mode
        if (Math.random() < 0.3) {
          setTimeout(() => {
            triggerAudioBrainrot();
          }, 3000);
        }
        
        setTimeout(() => {
          setDioMode(false);
          setCurrentDioQuote('');
        }, 8000); // Extended duration for more chaos
      }
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced Price rejection mode with audio madness
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.03) {
        setPriceRejectMode(true);
        
        // Audio sequence for price rejection
        playWryyy();
        setTimeout(() => {
          playJojoSoundWithChaos('dramatic-stinger');
        }, 1000);
        setTimeout(() => {
          playRandomJojoCatchphrase();
        }, 2000);
        
        // Chaos mode for price changes
        setTimeout(() => {
          playJojoSoundWithChaos('chaos-layer');
        }, 3000);
        
        setTimeout(() => {
          setPriceRejectMode(false);
        }, 10000); // Extended for more audio chaos
      }
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced Random Stand battles with epic audio
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.08) {
        const enemy = standEncounters[Math.floor(Math.random() * standEncounters.length)];
        setStandBattleEnemy(enemy);
        setStandBattle(true);
        
        // Epic stand battle audio sequence
        playMenacing();
        setTimeout(() => {
          playJojoSoundWithChaos('dramatic-stinger');
        }, 1500);
        setTimeout(() => {
          playJojoSoundWithChaos('ora');
        }, 3000);
        setTimeout(() => {
          playJojoSoundWithChaos('muda');
        }, 4000);
        setTimeout(() => {
          playRandomJojoCatchphrase();
        }, 5000);
        
        // Full brainrot mode for intense battles
        if (Math.random() < 0.4) {
          setTimeout(() => {
            triggerAudioBrainrot();
          }, 6000);
        }
        
        setTimeout(() => {
          setStandBattle(false);
          setStandBattleEnemy('');
          // Victory sound
          playJojoSoundWithChaos('to-be-continued');
        }, 12000); // Extended for epic battle audio
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const dismissStandBattle = () => {
    setStandBattle(false);
    setStandBattleEnemy('');
  };

  const getPriceMultiplier = () => {
    if (dioMode) return 1.5; // DIO inflates prices
    if (priceRejectMode) return 0.5; // Products reject high prices
    return 1;
  };

  const getPriceEffectText = () => {
    if (dioMode) return 'DIO PRICING ACTIVE!';
    if (priceRejectMode) return 'REJECTING HUMANITY PRICES!';
    return '';
  };

  return {
    dioMode,
    priceRejectMode,
    currentDioQuote,
    standBattle,
    standBattleEnemy,
    dismissStandBattle,
    getPriceMultiplier,
    getPriceEffectText
  };
}
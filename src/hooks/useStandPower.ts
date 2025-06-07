'use client';

import { useState, useCallback, useEffect } from 'react';
import { playJojoSound, playDramaticStinger } from '@/lib/audio';

interface StandPower {
  level: number;
  name: string;
  description: string;
  color: string;
  experience: number;
  experienceToNext: number;
}

const STAND_POWERS: StandPower[] = [
  { level: 1, name: "Hermit Purple", description: "The weakest Stand...", color: "text-purple-400", experience: 0, experienceToNext: 10 },
  { level: 2, name: "Hierophant Green", description: "Emerald Splash!", color: "text-green-400", experience: 10, experienceToNext: 25 },
  { level: 3, name: "Silver Chariot", description: "Sword mastery!", color: "text-gray-300", experience: 25, experienceToNext: 45 },
  { level: 4, name: "Magician's Red", description: "Crossfire Hurricane!", color: "text-red-400", experience: 45, experienceToNext: 70 },
  { level: 5, name: "Crazy Diamond", description: "Dora-ra-ra-ra!", color: "text-pink-400", experience: 70, experienceToNext: 100 },
  { level: 6, name: "Star Platinum", description: "Ora-ora-ora-ora!", color: "text-blue-400", experience: 100, experienceToNext: 135 },
  { level: 7, name: "The World", description: "Za Warudo!", color: "text-yellow-400", experience: 135, experienceToNext: 175 },
  { level: 8, name: "Gold Experience", description: "Muda-muda-muda!", color: "text-gold-400", experience: 175, experienceToNext: 220 },
  { level: 9, name: "King Crimson", description: "Time erasure!", color: "text-red-500", experience: 220, experienceToNext: 270 },
  { level: 10, name: "Gold Experience Requiem", description: "This is... Requiem!", color: "text-gold-300", experience: 270, experienceToNext: Infinity }
];

export function useStandPower() {
  const [currentStand, setCurrentStand] = useState<StandPower>(STAND_POWERS[0]);
  const [experience, setExperience] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showPowerGain, setShowPowerGain] = useState(false);
  const [powerGainAmount, setPowerGainAmount] = useState(0);

  // Calculate current stand based on experience
  useEffect(() => {
    const newStand = STAND_POWERS.find(stand => 
      experience >= stand.experience && experience < stand.experienceToNext
    ) || STAND_POWERS[STAND_POWERS.length - 1];

    if (newStand.level > currentStand.level) {
      // Level up!
      setCurrentStand(newStand);
      setShowLevelUp(true);
      
      // Play level up sound
      playDramaticStinger();
      setTimeout(() => {
        playJojoSound('giorno');
      }, 500);
      
      // Hide level up notification after 3 seconds
      setTimeout(() => {
        setShowLevelUp(false);
      }, 3000);
    } else if (newStand.level !== currentStand.level) {
      setCurrentStand(newStand);
    }
  }, [experience, currentStand.level]);

  const gainPower = useCallback((amount: number = 1, reason?: string) => {
    const newExperience = experience + amount;
    setExperience(newExperience);
    
    // Show power gain effect
    setPowerGainAmount(amount);
    setShowPowerGain(true);
    setTimeout(() => setShowPowerGain(false), 800);

    // Play sound based on amount gained
    if (amount >= 5) {
      playJojoSound('ora');
    } else if (amount >= 3) {
      playJojoSound('muda');
    } else {
      playJojoSound('click-effect');
    }
  }, [experience]);

  const getProgressPercent = useCallback(() => {
    if (currentStand.level === 10) return 100;
    
    const currentLevelExp = currentStand.experience;
    const nextLevelExp = currentStand.experienceToNext;
    const progressInLevel = experience - currentLevelExp;
    const levelRange = nextLevelExp - currentLevelExp;
    
    return Math.min(100, (progressInLevel / levelRange) * 100);
  }, [experience, currentStand]);

  const getStandRank = useCallback(() => {
    if (currentStand.level <= 2) return "E";
    if (currentStand.level <= 4) return "D";
    if (currentStand.level <= 6) return "C";
    if (currentStand.level <= 7) return "B";
    if (currentStand.level <= 9) return "A";
    return "S";
  }, [currentStand.level]);

  const getExperienceToNext = useCallback(() => {
    if (currentStand.level === 10) return 0;
    return currentStand.experienceToNext - experience;
  }, [experience, currentStand]);

  return {
    currentStand,
    experience,
    showLevelUp,
    showPowerGain,
    powerGainAmount,
    gainPower,
    getProgressPercent,
    getStandRank,
    getExperienceToNext,
    isMaxLevel: currentStand.level === 10
  };
}
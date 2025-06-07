'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'audio' | 'interaction' | 'shopping' | 'discovery' | 'chaos' | 'secret';
  unlocked: boolean;
  unlockedAt?: number;
  progress: number;
  maxProgress: number;
  isHidden: boolean;
  jojoReference: string;
}

interface AchievementProgress {
  [key: string]: number;
}

const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  // Audio Achievements
  {
    id: 'first_jojo_sound',
    title: 'First Stand Cry',
    description: 'Hear your first JoJo sound effect',
    icon: '🔊',
    category: 'audio',
    maxProgress: 1,
    isHidden: false,
    jojoReference: '"Your first Stand has awakened!"'
  },
  {
    id: 'dio_wryyy_master',
    title: 'WRYYY Master',
    description: 'Hear DIO\'s WRYYY 5 times',
    icon: '👑',
    category: 'audio',
    maxProgress: 5,
    isHidden: false,
    jojoReference: '"WRYYYYYY! You understand my power!"'
  },
  {
    id: 'muda_muda_addict',
    title: 'MUDA MUDA Addict',
    description: 'Listen to MUDA MUDA MUDA 10 times',
    icon: '👊',
    category: 'audio',
    maxProgress: 10,
    isHidden: false,
    jojoReference: '"MUDA MUDA MUDA! You\'re addicted to my Stand!"'
  },
  {
    id: 'giorno_theme_appreciator',
    title: 'Piano Pianist',
    description: 'Let Giorno\'s theme play in full',
    icon: '🎹',
    category: 'audio',
    maxProgress: 1,
    isHidden: false,
    jojoReference: '"I, Giorno Giovanna, approve of your taste!"'
  },
  {
    id: 'audio_chaos_survivor',
    title: 'Chaos Survivor',
    description: 'Survive 3 audio chaos modes',
    icon: '💀',
    category: 'chaos',
    maxProgress: 3,
    isHidden: false,
    jojoReference: '"You survived the chaos... impressive!"'
  },

  // Interaction Achievements
  {
    id: 'menacing_clicker',
    title: 'Menacing Clicker',
    description: 'Click on floating ゴ symbols 20 times',
    icon: 'ゴ',
    category: 'interaction',
    maxProgress: 20,
    isHidden: false,
    jojoReference: '"ゴゴゴゴ You understand the menacing atmosphere!"'
  },
  {
    id: 'to_be_continued_witness',
    title: 'To Be Continued Witness',
    description: 'Experience the "To Be Continued" effect 3 times',
    icon: '⏸️',
    category: 'interaction',
    maxProgress: 3,
    isHidden: false,
    jojoReference: '"Your adventure continues..."'
  },
  {
    id: 'time_stop_master',
    title: 'Za Warudo Master',
    description: 'Trigger time stop effects 5 times',
    icon: '⏰',
    category: 'interaction',
    maxProgress: 5,
    isHidden: false,
    jojoReference: '"ZA WARUDO! You\'ve mastered time itself!"'
  },
  {
    id: 'click_master',
    title: 'Stand Rush Master',
    description: 'Click on products 50 times',
    icon: '👆',
    category: 'interaction',
    maxProgress: 50,
    isHidden: false,
    jojoReference: '"Your clicking speed rivals Star Platinum!"'
  },

  // Shopping Achievements
  {
    id: 'first_purchase',
    title: 'First Stand User',
    description: 'Add your first item to cart',
    icon: '🛒',
    category: 'shopping',
    maxProgress: 1,
    isHidden: false,
    jojoReference: '"Welcome to the bizarre world of shopping!"'
  },
  {
    id: 'cart_filler',
    title: 'Bizarre Collector',
    description: 'Add 5 different items to your cart',
    icon: '📦',
    category: 'shopping',
    maxProgress: 5,
    isHidden: false,
    jojoReference: '"Your collection grows more bizarre!"'
  },
  {
    id: 'checkout_master',
    title: 'Transaction Complete',
    description: 'Complete the checkout process',
    icon: '💳',
    category: 'shopping',
    maxProgress: 1,
    isHidden: false,
    jojoReference: '"Your bizarre adventure in commerce is complete!"'
  },
  {
    id: 'big_spender',
    title: 'Golden Experience',
    description: 'Reach $500 in cart value',
    icon: '💰',
    category: 'shopping',
    maxProgress: 500,
    isHidden: false,
    jojoReference: '"This is the power of Golden Experience!"'
  },

  // Discovery Achievements
  {
    id: 'desperation_level_4',
    title: 'Maximum Desperation',
    description: 'Reach desperation level 4',
    icon: '🔥',
    category: 'discovery',
    maxProgress: 1,
    isHidden: false,
    jojoReference: '"Even DIO is impressed by your dedication!"'
  },
  {
    id: 'dio_modal_encounter',
    title: 'DIO Encounter',
    description: 'Encounter the DIO modal and survive',
    icon: '😈',
    category: 'discovery',
    maxProgress: 1,
    isHidden: false,
    jojoReference: '"You thought you could escape, but it was me, DIO!"'
  },
  {
    id: 'long_session',
    title: 'Dedication of a Joestar',
    description: 'Spend 5 minutes on the site',
    icon: '⌚',
    category: 'discovery',
    maxProgress: 300, // 5 minutes in seconds
    isHidden: false,
    jojoReference: '"Your dedication rivals that of the Joestar bloodline!"'
  },

  // Secret/Hidden Achievements
  {
    id: 'konami_code',
    title: 'Secret Technique',
    description: 'Enter the Konami code',
    icon: '🎮',
    category: 'secret',
    maxProgress: 1,
    isHidden: true,
    jojoReference: '"You discovered the secret technique! ↑↑↓↓←→←→BA"'
  },
  {
    id: 'easter_egg_hunter',
    title: 'Easter Egg Hunter',
    description: 'Find 5 hidden easter eggs',
    icon: '🥚',
    category: 'discovery',
    maxProgress: 5,
    isHidden: true,
    jojoReference: '"You have the investigative skills of Jotaro!"'
  },
  {
    id: 'dio_clicked_100',
    title: 'DIO\'s Chosen One',
    description: 'Click the DIO quote in footer 100 times',
    icon: '🌟',
    category: 'secret',
    maxProgress: 100,
    isHidden: true,
    jojoReference: '"DIO has chosen you as his successor!"'
  },
  {
    id: 'speed_clicker',
    title: 'Star Platinum Speed',
    description: 'Click 10 times in 2 seconds',
    icon: '⚡',
    category: 'secret',
    maxProgress: 1,
    isHidden: true,
    jojoReference: '"Your clicking speed transcends time itself!"'
  },
  {
    id: 'all_sounds_heard',
    title: 'JoJo Audio Master',
    description: 'Hear all unique JoJo sound effects',
    icon: '🎵',
    category: 'audio',
    maxProgress: 24, // Total number of real JoJo sounds
    isHidden: false,
    jojoReference: '"You have experienced the full symphony of JoJo!"'
  },
  {
    id: 'completionist',
    title: 'Bizarre Completionist',
    description: 'Unlock all other achievements',
    icon: '🏆',
    category: 'secret',
    maxProgress: 20, // Total number of other achievements
    isHidden: true,
    jojoReference: '"You are the ultimate JoJo fan! Even Araki would be proud!"'
  },
  // Easter Egg Discovery Achievements
  {
    id: 'dio-brando',
    title: 'KONO DIO DA!',
    description: 'You thought it was a normal logo, but it was me, DIO!',
    icon: '🧛',
    category: 'discovery',
    maxProgress: 1,
    isHidden: true,
    jojoReference: 'The classic DIO reveal meme from Phantom Blood'
  },
  {
    id: 'joestar-secret-technique',
    title: 'Joestar Secret Technique',
    description: 'Master the legendary technique',
    icon: '🏃',
    category: 'secret',
    maxProgress: 1,
    isHidden: true,
    jojoReference: 'The Joestar family\'s secret technique: running away!'
  },
  {
    id: 'menacing-aura',
    title: 'Menacing Aura',
    description: 'Feel the menacing presence',
    icon: 'ゴ',
    category: 'discovery',
    maxProgress: 1,
    isHidden: true,
    jojoReference: 'The iconic menacing symbols from JoJo'
  },
  {
    id: 'time-stop-master',
    title: 'Time Stop Master',
    description: 'ZA WARUDO! Stop time itself',
    icon: '⏱️',
    category: 'secret',
    maxProgress: 1,
    isHidden: true,
    jojoReference: 'DIO and Jotaro\'s time stop ability'
  },
  {
    id: 'first-discovery',
    title: 'First Discovery',
    description: 'Found your first easter egg',
    icon: '🔍',
    category: 'discovery',
    maxProgress: 1,
    isHidden: false,
    jojoReference: 'Every adventure begins somewhere'
  },
  {
    id: 'persistent-explorer',
    title: 'Persistent Explorer',
    description: 'You keep clicking that button...',
    icon: '🔄',
    category: 'discovery',
    maxProgress: 1,
    isHidden: true,
    jojoReference: 'Like Koichi\'s persistence in finding the truth'
  },
  {
    id: 'heaven-ascended',
    title: 'Heaven Ascended',
    description: 'Achieved heaven through persistence',
    icon: '👼',
    category: 'secret',
    maxProgress: 1,
    isHidden: true,
    jojoReference: 'Pucci\'s Made in Heaven - achieving heaven through persistence'
  },
  {
    id: 'menacing-discoverer',
    title: 'Menacing Discoverer',
    description: 'Uncovered the hidden menacing text',
    icon: 'ゴゴ',
    category: 'discovery',
    maxProgress: 1,
    isHidden: true,
    jojoReference: 'The menacing aura reveals itself to those who seek'
  },
  {
    id: 'scroll-master',
    title: 'Scroll Master',
    description: 'Scrolled to the very end',
    icon: '📜',
    category: 'discovery',
    maxProgress: 1,
    isHidden: true,
    jojoReference: 'To Be Continued... the classic JoJo ending'
  }
];

const STORAGE_KEY = 'jojo-bizarre-achievements';

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [progress, setProgress] = useState<AchievementProgress>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [newUnlocks, setNewUnlocks] = useState<Achievement[]>([]);

  // Initialize achievements from localStorage or defaults
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const savedAchievements = parsed.achievements || [];
        const savedProgress = parsed.progress || {};
        
        // Merge with new achievement definitions
        const mergedAchievements = ACHIEVEMENT_DEFINITIONS.map(def => {
          const saved = savedAchievements.find((a: Achievement) => a.id === def.id);
          return {
            ...def,
            unlocked: saved?.unlocked || false,
            unlockedAt: saved?.unlockedAt,
            progress: savedProgress[def.id] || 0
          };
        });
        
        setAchievements(mergedAchievements);
        setProgress(savedProgress);
      } catch (error) {
        console.warn('Failed to load achievements:', error);
        initializeDefaultAchievements();
      }
    } else {
      initializeDefaultAchievements();
    }
    
    setIsLoaded(true);
  }, []);

  const initializeDefaultAchievements = () => {
    const defaultAchievements = ACHIEVEMENT_DEFINITIONS.map(def => ({
      ...def,
      unlocked: false,
      progress: 0
    }));
    setAchievements(defaultAchievements);
    setProgress({});
  };

  // Save to localStorage whenever achievements change
  useEffect(() => {
    if (isLoaded) {
      const dataToSave = {
        achievements,
        progress,
        lastUpdated: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [achievements, progress, isLoaded]);

  const incrementProgress = useCallback((achievementId: string, amount: number = 1) => {
    setProgress(prev => {
      const currentProgress = prev[achievementId] || 0;
      const newProgress = Math.min(currentProgress + amount, 
        achievements.find(a => a.id === achievementId)?.maxProgress || 1);
      
      return {
        ...prev,
        [achievementId]: newProgress
      };
    });

    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === achievementId) {
        const currentProgress = progress[achievementId] || 0;
        const newProgress = Math.min(currentProgress + amount, achievement.maxProgress);
        
        // Check if achievement should be unlocked
        if (!achievement.unlocked && newProgress >= achievement.maxProgress) {
          const unlockedAchievement = {
            ...achievement,
            unlocked: true,
            unlockedAt: Date.now(),
            progress: newProgress
          };
          
          // Add to new unlocks for notification
          setNewUnlocks(prev => [...prev, unlockedAchievement]);
          
          // Auto-remove notification after 5 seconds
          setTimeout(() => {
            setNewUnlocks(prev => prev.filter(a => a.id !== achievementId));
          }, 5000);
          
          return unlockedAchievement;
        }
        
        return {
          ...achievement,
          progress: newProgress
        };
      }
      return achievement;
    }));
  }, [achievements, progress]);

  const unlockAchievement = useCallback((achievementId: string) => {
    incrementProgress(achievementId, 1);
  }, [incrementProgress]);

  // Event tracking functions
  const trackAudioPlayed = useCallback((soundId: string) => {
    incrementProgress('first_jojo_sound');
    incrementProgress('all_sounds_heard');
    
    switch (soundId) {
      case 'dio-wryyy':
        incrementProgress('dio_wryyy_master');
        break;
      case 'muda-muda-muda':
        incrementProgress('muda_muda_addict');
        break;
      case 'giorno-theme':
        incrementProgress('giorno_theme_appreciator');
        break;
    }
  }, [incrementProgress]);

  const trackInteraction = useCallback((type: string, data?: any) => {
    switch (type) {
      case 'menacing_click':
        incrementProgress('menacing_clicker');
        break;
      case 'product_click':
        incrementProgress('click_master');
        break;
      case 'to_be_continued':
        incrementProgress('to_be_continued_witness');
        break;
      case 'time_stop':
        incrementProgress('time_stop_master');
        break;
      case 'chaos_mode':
        incrementProgress('audio_chaos_survivor');
        break;
      case 'dio_footer_click':
        incrementProgress('dio_clicked_100');
        break;
      case 'fast_clicks':
        if (data?.clickCount >= 10 && data?.timespan <= 2000) {
          unlockAchievement('speed_clicker');
        }
        break;
    }
  }, [incrementProgress, unlockAchievement]);

  const trackShopping = useCallback((type: string, data?: any) => {
    switch (type) {
      case 'item_added':
        incrementProgress('first_purchase');
        if (data?.uniqueItems) {
          setProgress(prev => ({
            ...prev,
            cart_filler: data.uniqueItems
          }));
        }
        break;
      case 'cart_value':
        if (data?.value) {
          setProgress(prev => ({
            ...prev,
            big_spender: Math.min(data.value, 500)
          }));
        }
        break;
      case 'checkout_complete':
        unlockAchievement('checkout_master');
        break;
    }
  }, [incrementProgress, unlockAchievement]);

  const trackDiscovery = useCallback((type: string, data?: any) => {
    switch (type) {
      case 'desperation_level':
        if (data?.level >= 4) {
          unlockAchievement('desperation_level_4');
        }
        break;
      case 'dio_modal':
        unlockAchievement('dio_modal_encounter');
        break;
      case 'time_spent':
        if (data?.seconds) {
          setProgress(prev => ({
            ...prev,
            long_session: Math.min(data.seconds, 300)
          }));
        }
        break;
      case 'easter_egg':
        incrementProgress('easter_egg_hunter');
        break;
      case 'konami_code':
        unlockAchievement('konami_code');
        break;
    }
  }, [incrementProgress, unlockAchievement]);

  const clearNewUnlocks = useCallback(() => {
    setNewUnlocks([]);
  }, []);

  const getUnlockedCount = useCallback(() => {
    return achievements.filter(a => a.unlocked).length;
  }, [achievements]);

  const getTotalCount = useCallback(() => {
    return achievements.length;
  }, [achievements]);

  const getCompletionPercentage = useCallback(() => {
    if (achievements.length === 0) return 0;
    return Math.round((getUnlockedCount() / getTotalCount()) * 100);
  }, [achievements, getUnlockedCount, getTotalCount]);

  const getAchievementsByCategory = useCallback((category: Achievement['category']) => {
    return achievements.filter(a => a.category === category);
  }, [achievements]);

  const getVisibleAchievements = useCallback(() => {
    return achievements.filter(a => !a.isHidden || a.unlocked);
  }, [achievements]);

  return {
    achievements,
    progress,
    newUnlocks,
    isLoaded,
    
    // Tracking functions
    trackAudioPlayed,
    trackInteraction,
    trackShopping,
    trackDiscovery,
    
    // Utility functions
    clearNewUnlocks,
    getUnlockedCount,
    getTotalCount,
    getCompletionPercentage,
    getAchievementsByCategory,
    getVisibleAchievements,
    
    // Direct access
    incrementProgress,
    unlockAchievement
  };
}
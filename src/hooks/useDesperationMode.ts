'use client';

import { useState, useEffect, useCallback } from 'react';
import { setMasterVolume, triggerAudioBrainrot, playSpecificJojoCatchphrase } from '@/lib/audio';

export interface DesperationState {
  level: number;
  timeOnSite: number;
  isScreenPulsing: boolean;
  showLastChanceBanner: boolean;
  isButtonGlowing: boolean;
  showCursorFollower: boolean;
  isScreenShaking: boolean;
  showDioModal: boolean;
  priceMultiplier: number;
  stockWarnings: { [key: string]: number };
  countdownTimers: { [key: string]: number };
  urgencyMessages: string[];
  viewerCounts: { [key: string]: number };
}

const DESPERATION_MESSAGES = [
  "DIO is getting impatient...",
  "Your wallet... it's calling to you!",
  "SPEEDWAGON would buy this!",
  "Don't let DIO down!",
  "The world is ending... BUY NOW!",
  "Your next purchase is... THIS ONE!",
  "Even Jotaro would cave to these prices!",
  "MUDA MUDA your savings away!",
  "The Golden Experience... of shopping!",
  "This deal won't last 7 seconds in stopped time!"
];

const STOCK_WARNINGS = [
  "Only 2 left in stock!",
  "3 other Stand users are viewing this!",
  "Last chance before DIO buys them all!",
  "Speedwagon just bought 5 of these!",
  "Someone from Italy just purchased this!"
];

export function useDesperationMode() {
  const [timeOnSite, setTimeOnSite] = useState(0);
  const [level, setLevel] = useState(1);
  const [isScreenPulsing, setIsScreenPulsing] = useState(false);
  const [showLastChanceBanner, setShowLastChanceBanner] = useState(false);
  const [isButtonGlowing, setIsButtonGlowing] = useState(false);
  const [showCursorFollower, setShowCursorFollower] = useState(false);
  const [isScreenShaking, setIsScreenShaking] = useState(false);
  const [showDioModal, setShowDioModal] = useState(false);
  const [priceMultiplier, setPriceMultiplier] = useState(1.0);
  const [stockWarnings, setStockWarnings] = useState<{ [key: string]: number }>({});
  const [countdownTimers, setCountdownTimers] = useState<{ [key: string]: number }>({});
  const [urgencyMessages, setUrgencyMessages] = useState<string[]>([]);
  const [viewerCounts, setViewerCounts] = useState<{ [key: string]: number }>({});
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [dismissedModal, setDismissedModal] = useState(false);

  // Track time on site
  useEffect(() => {
    const startTime = Date.now();
    
    const timeInterval = setInterval(() => {
      const currentTime = Math.floor((Date.now() - startTime) / 1000);
      setTimeOnSite(currentTime);
      
      // Determine desperation level
      if (currentTime >= 90) {
        setLevel(4);
      } else if (currentTime >= 60) {
        setLevel(3);
      } else if (currentTime >= 30) {
        setLevel(2);
      } else {
        setLevel(1);
      }
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Level 2: Screen pulsing and price changes (30-60 seconds)
  useEffect(() => {
    if (level >= 2) {
      setIsScreenPulsing(true);
      
      // Start price chaos
      const priceInterval = setInterval(() => {
        const newMultiplier = 0.5 + Math.random() * 0.4; // 50-90% of original price
        setPriceMultiplier(newMultiplier);
      }, 5000);
      
      // Add urgency messages
      const messageInterval = setInterval(() => {
        const message = DESPERATION_MESSAGES[Math.floor(Math.random() * DESPERATION_MESSAGES.length)];
        setUrgencyMessages(prev => {
          const newMessages = [...prev, message].slice(-3); // Keep only last 3
          return newMessages;
        });
        
        setTimeout(() => {
          setUrgencyMessages(prev => prev.slice(1));
        }, 4000);
      }, 8000);

      return () => {
        clearInterval(priceInterval);
        clearInterval(messageInterval);
      };
    }
  }, [level]);

  // Level 3: Last chance banners, glowing buttons, cursor follower (60-90 seconds)
  useEffect(() => {
    if (level >= 3) {
      setShowLastChanceBanner(true);
      setIsButtonGlowing(true);
      setShowCursorFollower(true);
      
      // Increase audio volume by 25%
      setMasterVolume(0.875); // 0.7 * 1.25
      
      // Add beforeunload warning for desperate retention
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        const message = level >= 4 
          ? 'WAIT! DIO COMMANDS YOU TO STAY! Everything is 99% OFF!'
          : 'Are you sure? You\'re missing out on incredible deals!';
        e.preventDefault();
        e.returnValue = message;
        return message;
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      // Track cursor position for follower
      const handleMouseMove = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      
      // Generate fake viewer counts
      const viewerInterval = setInterval(() => {
        const productIds = ['1', '2', '3', '4', '5', '6'];
        const newViewers: { [key: string]: number } = {};
        productIds.forEach(id => {
          newViewers[id] = Math.floor(Math.random() * 12) + 3; // 3-15 viewers
        });
        setViewerCounts(newViewers);
      }, 7000);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        clearInterval(viewerInterval);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [level]);

  // Level 4: Maximum desperation (90+ seconds)
  useEffect(() => {
    if (level >= 4) {
      setIsScreenShaking(true);
      
      // Add scroll-triggered screen shake
      const handleScroll = () => {
        document.body.style.animation = 'none';
        setTimeout(() => {
          document.body.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
      };
      
      document.addEventListener('scroll', handleScroll);
      
      // Add shake animation CSS if not already present
      if (!document.getElementById('shake-styles')) {
        const style = document.createElement('style');
        style.id = 'shake-styles';
        style.textContent = `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px) translateY(-2px); }
            50% { transform: translateX(5px) translateY(2px); }
            75% { transform: translateX(-3px) translateY(-1px); }
          }
        `;
        document.head.appendChild(style);
      }
      
      // Show DIO modal after a delay
      const modalTimeout = setTimeout(() => {
        if (!dismissedModal) {
          setShowDioModal(true);
        }
      }, 3000);
      
      // Set all prices to 99% off
      setPriceMultiplier(0.01);
      
      // Generate fake countdown timers
      const productIds = ['1', '2', '3', '4', '5', '6'];
      const newCountdowns: { [key: string]: number } = {};
      productIds.forEach(id => {
        newCountdowns[id] = Math.floor(Math.random() * 300) + 60; // 1-5 minutes
      });
      setCountdownTimers(newCountdowns);
      
      // Generate fake stock warnings
      const newStockWarnings: { [key: string]: number } = {};
      productIds.forEach(id => {
        newStockWarnings[id] = Math.floor(Math.random() * 3) + 1; // 1-3 left
      });
      setStockWarnings(newStockWarnings);
      
      // Countdown timer updates
      const countdownInterval = setInterval(() => {
        setCountdownTimers(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(id => {
            if (updated[id] > 0) {
              updated[id] -= 1;
            } else {
              // Reset when reaches 0
              updated[id] = Math.floor(Math.random() * 300) + 60;
            }
          });
          return updated;
        });
      }, 1000);
      
      // Maximum audio chaos
      const chaosInterval = setInterval(() => {
        triggerAudioBrainrot();
      }, 15000);
      
      // Aggressive TTS
      const ttsInterval = setInterval(() => {
        const phrases = ['BUY NOW OR DIO WILL BE ANGRY!', 'YOUR WALLET IS CALLING!', 'JUST DO IT!'];
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        playSpecificJojoCatchphrase(phrase);
      }, 12000);

      return () => {
        clearTimeout(modalTimeout);
        clearInterval(countdownInterval);
        clearInterval(chaosInterval);
        clearInterval(ttsInterval);
        document.removeEventListener('scroll', handleScroll);
        document.body.style.animation = 'none';
      };
    }
  }, [level, dismissedModal]);

  const dismissDioModal = useCallback(() => {
    // Make it hard to close
    const dismissAttempts = (window as any).dioModalDismissAttempts || 0;
    (window as any).dioModalDismissAttempts = dismissAttempts + 1;
    
    if (dismissAttempts < 2) {
      // First two attempts fail
      playSpecificJojoCatchphrase('You cannot escape DIO!');
      return false;
    } else {
      // Allow close on third attempt
      setShowDioModal(false);
      setDismissedModal(true);
      playSpecificJojoCatchphrase('Fine... but DIO is still watching...');
      return true;
    }
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const formatCountdown = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  }, []);

  const getRandomStockWarning = useCallback(() => {
    return STOCK_WARNINGS[Math.floor(Math.random() * STOCK_WARNINGS.length)];
  }, []);

  const desperationState: DesperationState = {
    level,
    timeOnSite,
    isScreenPulsing,
    showLastChanceBanner,
    isButtonGlowing,
    showCursorFollower,
    isScreenShaking,
    showDioModal,
    priceMultiplier,
    stockWarnings,
    countdownTimers,
    urgencyMessages,
    viewerCounts
  };

  return {
    ...desperationState,
    cursorPosition,
    dismissDioModal,
    formatTime,
    formatCountdown,
    getRandomStockWarning
  };
}
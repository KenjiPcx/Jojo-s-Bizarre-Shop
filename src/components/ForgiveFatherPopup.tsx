'use client';

import { useState, useEffect, useRef } from 'react';
import { playMadeInHeaven } from '@/lib/audio';

interface ForgiveFatherPopupProps {
  triggerCount?: number;
}

export function ForgiveFatherPopup({ triggerCount = 0 }: ForgiveFatherPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [lastTriggerTime, setLastTriggerTime] = useState(0);
  const userActivityRef = useRef(0);

  const forgivePhrases = [
    'Forgive them father, for I have sinned',
    'Forgive me father',
    'Forgive them father, for they know not what they do',
    'Father, forgive me for what I must do',
    'Forgive us father, for we have been consumed by the JoJo',
    'Father, I must confess... I cannot stop watching JoJo'
  ];

  // Track user activity for better timing
  useEffect(() => {
    const updateActivity = () => {
      userActivityRef.current = Date.now();
    };

    const events = ['mousemove', 'scroll', 'click', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };
  }, []);

  // Random timer trigger (every 45-90 seconds when user is active)
  useEffect(() => {
    const checkForRandomTrigger = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - userActivityRef.current;
      const timeSinceLastTrigger = now - lastTriggerTime;
      
      // Only trigger if user has been active recently and enough time has passed
      if (timeSinceLastActivity < 10000 && timeSinceLastTrigger > 45000) {
        const randomDelay = Math.random() * 45000 + 45000; // 45-90 seconds
        
        setTimeout(() => {
          triggerForgiveMeme('Random confession time!');
        }, randomDelay);
      }
    };

    const interval = setInterval(checkForRandomTrigger, 10000);
    return () => clearInterval(interval);
  }, [lastTriggerTime]);

  // Trigger on external events (like when triggerCount changes)
  useEffect(() => {
    if (triggerCount > 0) {
      triggerForgiveMeme('External trigger confession');
    }
  }, [triggerCount]);

  // Add to cart trigger (enhanced chance)
  useEffect(() => {
    const handleAddToCart = () => {
      if (Math.random() < 0.4) { // 40% chance
        triggerForgiveMeme('Shopping cart confession');
      }
    };

    // Listen for add to cart events (could be custom events)
    document.addEventListener('jojo-add-to-cart', handleAddToCart);
    return () => document.removeEventListener('jojo-add-to-cart', handleAddToCart);
  }, []);

  const triggerForgiveMeme = (reason: string = '') => {
    const now = Date.now();
    // Prevent rapid successive triggers
    if (now - lastTriggerTime < 15000) return;
    
    setLastTriggerTime(now);
    
    // Select random phrase
    const phrase = forgivePhrases[Math.floor(Math.random() * forgivePhrases.length)];
    setCurrentPhrase(phrase);
    setIsVisible(true);
    
    // Play dramatic audio
    playMadeInHeaven();
    
    // Auto-hide after 5-6 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5500);
    
    console.log(`🙏 Forgive Father meme triggered: ${reason}`);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[150] overflow-hidden pointer-events-none">
      {/* Dark confession overlay */}
      <div 
        className="absolute inset-0 transition-all duration-1000 animate-in fade-in-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(139,69,19,0.6) 30%, rgba(101,67,33,0.8) 70%, rgba(0,0,0,0.9) 100%)',
          filter: 'sepia(20%) saturate(120%) brightness(0.8) contrast(1.4)'
        }}
      >
        {/* Stained glass window effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className={`absolute rounded-full opacity-20 ${i % 3 === 0 ? 'bg-yellow-500' : i % 3 === 1 ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `confessionGlow 3s ease-in-out infinite ${i * 0.2}s`
              }}
            />
          ))}
        </div>
        
        {/* Gothic church rays */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-b from-yellow-300/20 via-white/10 to-transparent"
              style={{
                width: '4px',
                height: '100%',
                left: `${10 + i * 11}%`,
                transform: 'skewX(-5deg)',
                animation: `holyLight 4s ease-in-out infinite ${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main confession content */}
      <div className="absolute inset-0 flex items-center justify-center animate-in fade-in-0 zoom-in-95 duration-1000">
        <div className="text-center text-white relative max-w-2xl px-8 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
          {/* Background religious symbol */}
          <div className="absolute -z-10 text-9xl opacity-10 font-bold transform -rotate-12 animate-pulse">
            ✝
          </div>
          
          {/* Confession booth effect */}
          <div className="bg-black/40 rounded-lg p-8 border-4 border-yellow-600/50 backdrop-blur-sm shadow-2xl">
            {/* Top religious decoration */}
            <div className="text-4xl mb-4 animate-pulse text-yellow-400">
              🙏
            </div>
            
            {/* Main confession text */}
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 tracking-wide animate-in slide-in-from-left-8 duration-1000 delay-500">
              <div className="text-yellow-400 mb-2">CONFESSION</div>
              <div className="text-white leading-tight">
                {currentPhrase}
              </div>
            </div>
            
            {/* Dramatic JoJo cross */}
            <div className="flex items-center justify-center mb-6 animate-in slide-in-from-right-8 duration-1000 delay-700">
              <div className="relative">
                {/* Cross with JoJo styling */}
                <div className="relative">
                  <div className="w-16 h-2 bg-yellow-400 absolute top-4 left-1/2 transform -translate-x-1/2"></div>
                  <div className="w-2 h-16 bg-yellow-400 absolute left-1/2 transform -translate-x-1/2"></div>
                  {/* Cross glow */}
                  <div className="absolute inset-0 bg-yellow-300/50 blur-sm animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Dramatic flavor text */}
            <div className="mt-6 text-lg md:text-xl italic font-semibold animate-in fade-in-0 duration-1000 delay-1000 text-yellow-200">
              "For I have been consumed by the bizarre..."
            </div>
            
            {/* Menacing symbols with religious twist */}
            <div className="mt-4 text-xl font-bold text-red-400 animate-bounce animate-in zoom-in-0 duration-1000 delay-1200">
              ✝ゴゴゴゴゴゴゴ✝
            </div>
            
            {/* Bottom religious element */}
            <div className="text-2xl mt-4 text-yellow-500 animate-pulse">
              ⛪
            </div>
          </div>
          
          {/* Floating confession elements */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="absolute text-xl text-yellow-400 font-bold opacity-60 animate-bounce select-none"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + Math.random()}s`
                }}
              >
                {i % 3 === 0 ? '🙏' : i % 3 === 1 ? '✝' : '⛪'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes confessionGlow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.2); }
        }
        
        @keyframes holyLight {
          0%, 100% { opacity: 0.1; transform: skewX(-5deg) scaleY(1); }
          50% { opacity: 0.4; transform: skewX(-5deg) scaleY(1.3); }
        }
        
        @keyframes confessionalShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
}

// Hook for easy integration
export function useForgiveFatherPopup() {
  const [triggerCount, setTriggerCount] = useState(0);
  
  const triggerConfession = () => {
    setTriggerCount(prev => prev + 1);
  };
  
  return {
    triggerConfession,
    ForgiveFatherPopupComponent: () => (
      <ForgiveFatherPopup triggerCount={triggerCount} />
    )
  };
}
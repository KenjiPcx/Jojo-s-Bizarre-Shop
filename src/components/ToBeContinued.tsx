'use client';

import { useState, useEffect, useRef } from 'react';
import { playJojoSound } from '@/lib/audio';

interface ToBeContinuedProps {
  onProductHover?: () => void;
  onAddToCart?: () => void;
}

export function ToBeContinued({ onProductHover, onAddToCart }: ToBeContinuedProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [lastTriggerTime, setLastTriggerTime] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userActivityRef = useRef(0);

  // Track user activity
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

  // Enhanced timer trigger (20-45 seconds for more frequent dramatic effects)
  useEffect(() => {
    const checkForRandomTrigger = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - userActivityRef.current;
      const timeSinceLastTrigger = now - lastTriggerTime;
      
      // More frequent triggers with user activity
      if (timeSinceLastActivity < 8000 && timeSinceLastTrigger > 20000) {
        const randomDelay = Math.random() * 25000 + 20000; // 20-45 seconds (reduced from 30-60)
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          triggerEffect('Enhanced dramatic encounter!');
        }, randomDelay);
      }
    };

    const interval = setInterval(checkForRandomTrigger, 3000); // Check more frequently
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [lastTriggerTime]);

  // Enhanced product hover trigger (35% chance - increased)
  useEffect(() => {
    if (onProductHover && Math.random() < 0.35) {
      triggerEffect('A product has caught your attention...');
    }
  }, [onProductHover]);

  // Enhanced add to cart trigger (40% chance - increased)
  useEffect(() => {
    if (onAddToCart && Math.random() < 0.4) {
      triggerEffect('Your shopping destiny awaits...');
    }
  }, [onAddToCart]);

  const triggerEffect = (reason: string = '') => {
    const now = Date.now();
    // Reduced cooldown for more frequent dramatic effects
    if (now - lastTriggerTime < 8000) return;
    
    setLastTriggerTime(now);
    setIsVisible(true);
    
    // Enhanced fake "Roundabout" sound effect simulation
    playEnhancedRoundabout();
    
    // Extended display time for more dramatic effect
    setTimeout(() => {
      setIsVisible(false);
    }, 4500); // Increased from 3500 to 4500
    
    console.log(`🎭 Enhanced To Be Continued triggered: ${reason}`);
  };

  const playEnhancedRoundabout = () => {
    // Enhanced simulation with new audio tracks
    playJojoSound('to-be-continued-full');
    
    // Add more layered menacing sounds for extra dramatic effect
    setTimeout(() => playJojoSound('menacing'), 300);
    setTimeout(() => playJojoSound('dramatic-stinger'), 800);
    setTimeout(() => playJojoSound('menacing'), 1200);
    setTimeout(() => playJojoSound('piano-suspense'), 2000);
    
    // Random chance to add new meme sounds
    if (Math.random() < 0.3) {
      setTimeout(() => playJojoSound('forgive-father-dramatic'), 2500);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden pointer-events-none">
      {/* Sepia/freeze frame effect */}
      <div 
        className="absolute inset-0 transition-all duration-1000 animate-in fade-in-0"
        style={{
          filter: 'sepia(100%) saturate(60%) hue-rotate(25deg) brightness(0.9) contrast(1.3)',
          background: 'linear-gradient(45deg, rgba(139,69,19,0.2) 0%, rgba(160,82,45,0.4) 50%, rgba(101,67,33,0.6) 100%)'
        }}
      >
        {/* Black and white striped background effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className={`absolute w-full h-4 ${i % 2 === 0 ? 'bg-black/30' : 'bg-white/10'}`}
              style={{
                top: `${i * 2.5}%`,
                transform: 'skewY(-5deg)',
                animation: `stripeSlide 2s linear infinite ${i * 0.02}s`
              }}
            />
          ))}
        </div>
        
        {/* Vintage film grain effect */}
        <div className="absolute inset-0 opacity-40">
          {Array.from({ length: 100 }, (_, i) => (
            <div
              key={i}
              className="absolute bg-black/20 rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 1 + 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main content overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-400/95 via-orange-500/90 to-red-500/85 animate-in fade-in-0 zoom-in-95 duration-1000">
        <div className="text-center text-black relative animate-in slide-in-from-bottom-8 duration-1000 delay-300">
          {/* Background Japanese text */}
          <div className="absolute -z-10 text-8xl md:text-9xl opacity-15 font-bold transform -rotate-12 animate-pulse">
            つづく
          </div>
          
          {/* Enhanced main text with more dramatic entrance */}
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-wider animate-in slide-in-from-left-8 duration-1000 delay-500">
            <div className="animate-pulse" style={{textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,0,0.5)'}}>TO BE</div>
            <div className="animate-pulse delay-300" style={{textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,0,0.5)'}}>CONTINUED</div>
          </div>
          
          {/* Classic JoJo arrow */}
          <div className="flex items-center justify-center mb-8 animate-in slide-in-from-right-8 duration-1000 delay-700">
            <div className="relative">
              {/* Arrow shaft with striped pattern */}
              <div className="relative w-32 md:w-40 h-4 bg-black transform skew-x-12 overflow-hidden">
                {/* Diagonal stripes */}
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className={`absolute h-full w-3 ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}
                    style={{
                      left: `${i * 12.5}%`,
                      transform: 'skewX(-20deg)',
                      animation: `arrowStripe 1s ease-in-out infinite ${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
              
              {/* Arrow head */}
              <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-l-12 border-l-black border-t-6 border-t-transparent border-b-6 border-b-transparent"></div>
                {/* Arrow head highlight */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-yellow-300 border-t-4 border-t-transparent border-b-4 border-b-transparent opacity-70"></div>
              </div>
              
              {/* Arrow glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/50 to-orange-300/50 transform skew-x-12 animate-pulse"></div>
            </div>
          </div>
          
          {/* Enhanced flavor text with more variety */}
          <div className="mt-8 text-xl md:text-2xl lg:text-3xl italic font-semibold animate-in fade-in-0 duration-1000 delay-1000">
            {(() => {
              const flavorTexts = [
                '"Your bizarre adventure continues..."',
                '"The saga will return..."',
                '"What happens next will shock you!"',
                '"Your shopping journey isn\'t over yet..."',
                '"This is only the beginning..."',
                '"Forgive us, for the adventure continues..."'
              ];
              return flavorTexts[Math.floor(Math.random() * flavorTexts.length)];
            })()}
          </div>
          
          {/* Menacing symbols */}
          <div className="mt-6 text-2xl md:text-3xl font-bold text-purple-900 animate-bounce animate-in zoom-in-0 duration-1000 delay-1200">
            ゴゴゴゴゴゴゴゴ
          </div>
          
          {/* Additional floating menacing symbols */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="absolute text-2xl md:text-3xl text-red-600 font-bold opacity-70 animate-bounce select-none"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              >
                ゴ
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Dramatic lighting rays */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent"
            style={{
              width: '200%',
              height: '2px',
              top: `${i * 8.33}%`,
              left: '-50%',
              transform: `rotate(${-30 + i * 5}deg)`,
              transformOrigin: 'center',
              animation: `lightRay 3s ease-in-out infinite ${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes stripeSlide {
          0% { transform: translateX(-100%) skewY(-5deg); }
          100% { transform: translateX(100%) skewY(-5deg); }
        }
        
        @keyframes arrowStripe {
          0%, 100% { opacity: 1; transform: skewX(-20deg) scaleY(1); }
          50% { opacity: 0.7; transform: skewX(-20deg) scaleY(1.1); }
        }
        
        @keyframes lightRay {
          0%, 100% { opacity: 0; transform: rotate(${-30}deg) scaleY(1); }
          50% { opacity: 1; transform: rotate(${-25}deg) scaleY(1.5); }
        }
        
        @keyframes menacingFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          75% { transform: translateY(-5px) rotate(-5deg); }
        }
      `}</style>
    </div>
  );
}

// Hook for easy integration
export function useToBeContinued() {
  const [triggerCount, setTriggerCount] = useState(0);
  
  const triggerOnProductHover = () => {
    setTriggerCount(prev => prev + 1);
  };
  
  const triggerOnAddToCart = () => {
    setTriggerCount(prev => prev + 1);
  };
  
  return {
    triggerOnProductHover,
    triggerOnAddToCart,
    ToBeContinuedComponent: () => (
      <ToBeContinued 
        key={triggerCount}
        onProductHover={triggerCount > 0 ? () => {} : undefined}
        onAddToCart={triggerCount > 0 ? () => {} : undefined}
      />
    )
  };
}
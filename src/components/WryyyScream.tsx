'use client';

import { useState, useEffect, useRef } from 'react';
import { playWryyy } from '@/lib/audio';

export function WryyyScream() {
  const [isActive, setIsActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimes = useRef<number[]>([]);
  const lastTriggerTime = useRef(0);

  // Track rapid clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      const target = e.target as HTMLElement;
      
      // Only count clicks on product-related elements
      if (target.closest('[data-product]') || 
          target.closest('.product-card') || 
          target.closest('button') ||
          target.closest('[role="button"]')) {
        
        // Add click time
        clickTimes.current.push(now);
        
        // Keep only clicks from last 2 seconds
        clickTimes.current = clickTimes.current.filter(time => now - time < 2000);
        
        setClickCount(clickTimes.current.length);
        
        // Trigger WRYYY if 5+ rapid clicks and enough time since last trigger
        if (clickTimes.current.length >= 5 && now - lastTriggerTime.current > 10000) {
          triggerWryyy();
          lastTriggerTime.current = now;
          clickTimes.current = []; // Reset
          setClickCount(0);
        }
      }
    };

    document.addEventListener('click', handleClick, { passive: true });
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const triggerWryyy = () => {
    setIsActive(true);
    
    // Play WRYYY sound
    playWryyy();
    
    // Add screen shake to body
    document.body.style.animation = 'screenShake 0.5s ease-in-out';
    
    console.log('😈 WRYYYYYYYYY! Rapid clicking detected!');
    
    // Effect lasts for 3 seconds
    setTimeout(() => {
      setIsActive(false);
      document.body.style.animation = '';
    }, 3000);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[250] pointer-events-none overflow-hidden">
      {/* Blood-red chaotic overlay */}
      <div 
        className="absolute inset-0 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(200,0,0,0.4) 0%, rgba(150,0,0,0.6) 50%, rgba(100,0,0,0.8) 100%)',
          filter: 'contrast(150%) saturate(200%)',
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Chaotic visual distortions */}
      <div className="absolute inset-0">
        {/* Glitch lines */}
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-red-500 opacity-60 animate-pulse"
            style={{
              width: '100%',
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              transform: `skewX(${Math.random() * 60 - 30}deg)`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${0.1 + Math.random() * 0.2}s`
            }}
          />
        ))}
        
        {/* Chaotic symbols */}
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            className="absolute text-red-600 font-bold animate-spin select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 40}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDuration: `${0.2 + Math.random() * 0.3}s`,
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            {['💀', '🔥', '⚡', '💥', '🩸', '😈', '👹'][Math.floor(Math.random() * 7)]}
          </div>
        ))}
      </div>
      
      {/* Main WRYYY text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center relative animate-bounce">
          {/* Background chaos */}
          <div className="absolute inset-0 bg-red-600/30 blur-3xl animate-pulse"></div>
          
          {/* Main text */}
          <div className="relative z-10">
            <div className="text-7xl md:text-9xl font-bold text-red-200 mb-4 tracking-widest drop-shadow-2xl animate-pulse">
              WRYYYYY!
            </div>
            
            {/* Additional chaos text */}
            <div className="text-2xl md:text-3xl text-red-300 font-bold animate-bounce">
              RAPID CLICKING DETECTED!
            </div>
            
            {/* Evil symbols */}
            <div className="mt-4 text-4xl animate-spin">
              😈💀😈
            </div>
          </div>
        </div>
      </div>
      
      {/* Lightning effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-red-400/60 to-transparent animate-pulse"
            style={{
              width: '200%',
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: '-50%',
              transform: `rotate(${Math.random() * 60 - 30}deg) skew(${Math.random() * 30}deg)`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${0.2 + Math.random() * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* CSS for screen shake */}
      <style jsx global>{`
        @keyframes screenShake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-5px) translateY(2px); }
          20% { transform: translateX(5px) translateY(-2px); }
          30% { transform: translateX(-3px) translateY(3px); }
          40% { transform: translateX(3px) translateY(-1px); }
          50% { transform: translateX(-2px) translateY(2px); }
          60% { transform: translateX(2px) translateY(-3px); }
          70% { transform: translateX(-1px) translateY(1px); }
          80% { transform: translateX(1px) translateY(-1px); }
          90% { transform: translateX(-1px) translateY(2px); }
        }
      `}</style>
    </div>
  );
}
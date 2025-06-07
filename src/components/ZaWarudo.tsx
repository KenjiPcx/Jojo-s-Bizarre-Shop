'use client';

import { useState, useEffect, useRef } from 'react';
import { playTimeStop, playDioWryyy } from '@/lib/audio';

export function ZaWarudo() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState(0); // 0: inactive, 1: time stop, 2: dio mode
  const [scrollCount, setScrollCount] = useState(0);
  const lastScrollTime = useRef(0);
  const scrollVelocity = useRef(0);
  const lastTriggerTime = useRef(0);

  // Track scroll events and trigger ZA WARUDO
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const now = Date.now();
      const timeDelta = now - lastScrollTime.current;
      const scrollDelta = Math.abs(window.scrollY - (window.scrollY || 0));

      // Calculate scroll velocity
      scrollVelocity.current = scrollDelta / timeDelta;
      lastScrollTime.current = now;

      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Count continuous scrolling
      scrollTimeout = setTimeout(() => {
        setScrollCount(0); // Reset count if user stops scrolling
      }, 200);

      setScrollCount(prev => {
        const newCount = prev + 1;

        // Trigger ZA WARUDO every 25-40 scrolls (less frequent)
        const triggerThreshold = 25 + Math.random() * 15;
        const timeSinceLastTrigger = now - lastTriggerTime.current;

        if (newCount >= triggerThreshold && timeSinceLastTrigger > 15000 && !isActive) {
          triggerZaWarudo();
          lastTriggerTime.current = now;
          return 0; // Reset count
        }

        return newCount;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isActive]);

  const triggerZaWarudo = () => {
    setIsActive(true);
    setPhase(1);

    // Phase 1: Time stop sound and visual effect
    playTimeStop();
    console.log('🕰️ ZA WARUDO! Time has stopped!');

    // Phase 2: DIO mode after 3 seconds
    const dioTimeout = setTimeout(() => {
      setPhase(2);
      playDioWryyy(); // DIO's WRYYY scream
      console.log('🧛 WRYYY! DIO mode activated!');
    }, 3000);

    // Complete effect after 6 seconds total
    const completeTimeout = setTimeout(() => {
      setIsActive(false);
      setPhase(0);
      console.log('⏰ Time resumes...');
    }, 6000);

    // Store timeouts for cleanup
    return () => {
      clearTimeout(dioTimeout);
      clearTimeout(completeTimeout);
    };
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[300] pointer-events-none overflow-hidden">
      {/* Blue time-stop overlay */}
      <div
        className="absolute inset-0 transition-all duration-1000 animate-in fade-in-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,100,255,0.4) 0%, rgba(0,50,150,0.6) 50%, rgba(0,25,100,0.8) 100%)',
          filter: 'blur(0.5px)',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Frozen screen effect with blue tint */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          filter: 'hue-rotate(200deg) saturate(150%) contrast(120%) brightness(0.8)',
          background: 'linear-gradient(45deg, rgba(0,100,255,0.2) 0%, rgba(100,150,255,0.3) 50%, rgba(0,50,200,0.4) 100%)'
        }}
      />

      {/* Time-stop visual effects */}
      <div className="absolute inset-0">
        {/* Clock/time distortion rings */}
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute border-2 border-blue-300/40 rounded-full animate-ping"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.2}s`,
              animationDuration: '2s'
            }}
          />
        ))}

        {/* Crystalline time fragments */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-blue-200/30 to-cyan-300/30 animate-pulse"
            style={{
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg) skew(${Math.random() * 30}deg)`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
            }}
          />
        ))}
      </div>

      {/* Phase 1: ZA WARUDO Time Stop */}
      {phase === 1 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl animate-pulse"></div>

            {/* Main text with dramatic entrance */}
            <div className="relative z-10 animate-in zoom-in-50 slide-in-from-bottom-8 duration-1000">
              <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-blue-100 mb-4 animate-pulse tracking-widest drop-shadow-2xl">
                ZA WARUDO!
              </div>

              {/* Japanese text */}
              <div className="text-3xl md:text-4xl text-blue-200 font-bold mb-6 animate-bounce">
                ザ・ワールド！
              </div>

              {/* Time stop message */}
              <div className="text-xl md:text-2xl text-cyan-200 italic animate-pulse">
                "Time has stopped..."
              </div>

              {/* ZA WARUDO symbol */}
              <div className="mt-6 text-5xl animate-pulse">
                ⚡
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 2: DIO Mode */}
      {phase === 2 && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/30">
          <div className="text-center animate-zoom-in">
            {/* Background glow effect for DIO */}
            <div className="absolute inset-0 bg-red-500/20 blur-3xl animate-pulse"></div>
            
            <div className="relative z-10">
              {/* DIO vampire emoji */}
              <div className="text-9xl mb-6 animate-bounce">🧛</div>
              
              {/* WRYYY text */}
              <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-red-400 mb-4 animate-pulse tracking-widest drop-shadow-2xl">
                WRYYY!
              </div>
              
              {/* Japanese DIO text */}
              <div className="text-3xl md:text-4xl text-red-200 font-bold mb-6 animate-bounce">
                ディオ！
              </div>
              
              {/* DIO message */}
              <div className="text-xl md:text-2xl text-yellow-300 italic animate-pulse">
                "Time will resume..."
              </div>
              
              {/* DIO symbols */}
              <div className="mt-6 flex justify-center gap-4">
                <div className="text-4xl animate-bounce">💀</div>
                <div className="text-4xl animate-pulse">⚡</div>
                <div className="text-4xl animate-bounce">💀</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dramatic lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-blue-300/20 to-transparent"
            style={{
              width: '200%',
              height: '3px',
              top: `${i * 6.25}%`,
              left: '-50%',
              transform: `rotate(${-45 + i * 6}deg)`,
              transformOrigin: 'center',
              animation: `timeStopRay 4s ease-in-out infinite ${i * 0.15}s`
            }}
          />
        ))}
      </div>

      {/* Floating time symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute text-3xl text-blue-200/60 font-bold animate-bounce select-none"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          >
            {['⚡', '✨', '💫', '🔵', '❄️', '💎'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes timeStopRay {
          0%, 100% { 
            opacity: 0; 
            transform: rotate(${-45}deg) scaleY(1) translateX(-100%); 
          }
          50% { 
            opacity: 1; 
            transform: rotate(${-40}deg) scaleY(1.5) translateX(0%); 
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        @keyframes timeFreeze {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(200deg) saturate(150%) brightness(0.8); }
        }
        
        @keyframes zoom-in {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-zoom-in {
          animation: zoom-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
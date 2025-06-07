'use client';

import { useState, useEffect, useRef } from 'react';
import { playJojoSound } from '@/lib/audio';

export function useDioFaceSwap() {
  const [isDioSwapped, setIsDioSwapped] = useState(false);
  const lastSwapTime = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastSwapTime.current > 15000) { // At least 15 seconds between swaps
        if (Math.random() < 0.3) { // 30% chance every check
          triggerDioSwap();
          lastSwapTime.current = now;
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const triggerDioSwap = () => {
    setIsDioSwapped(true);
    playJojoSound('konodioda');
    
    console.log('😈 KONO DIO DA! Product images hijacked!');
    
    // Revert after 2-3 seconds
    setTimeout(() => {
      setIsDioSwapped(false);
    }, 2000 + Math.random() * 1000);
  };

  return { isDioSwapped, triggerDioSwap };
}

interface DioFaceSwapProps {
  isActive: boolean;
  children: React.ReactNode;
}

export function DioFaceSwap({ isActive, children }: DioFaceSwapProps) {
  if (!isActive) return <>{children}</>;

  return (
    <div className="relative overflow-hidden">
      {/* Original content (hidden when Dio is active) */}
      <div className={`transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
      
      {/* Dio face overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}>
        {/* Dio face (using emoji since we don't have actual image) */}
        <div className="w-full h-full bg-gradient-to-br from-yellow-600 to-orange-700 flex items-center justify-center relative overflow-hidden">
          {/* Dramatic background effect */}
          <div className="absolute inset-0 bg-gradient-radial from-yellow-400/30 to-transparent animate-pulse"></div>
          
          {/* Dio face */}
          <div className="text-8xl animate-bounce">😈</div>
          
          {/* KONO DIO DA text overlay */}
          <div className="absolute bottom-2 left-2 right-2 text-center">
            <div className="text-xs font-bold text-yellow-200 animate-pulse">
              KONO DIO DA!
            </div>
          </div>
          
          {/* Lightning effects */}
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="absolute bg-yellow-300 opacity-70 animate-pulse"
              style={{
                width: '2px',
                height: '100%',
                left: `${20 + i * 20}%`,
                transform: `rotate(${Math.random() * 20 - 10}deg)`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '0.5s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect, useRef } from 'react';
import { playJojoSound } from '@/lib/audio';

interface ChaoticMenacingProps {
  isActive?: boolean;
  intensity?: number;
}

export function ChaoticMenacing({ isActive = false, intensity = 1 }: ChaoticMenacingProps) {
  const [symbols, setSymbols] = useState<Array<{
    id: number;
    x: number;
    y: number;
    rotation: number;
    size: number;
    color: string;
    symbol: string;
    velocity: { x: number; y: number };
    life: number;
    opacity: number;
  }>>([]);
  
  const animationFrame = useRef<number | undefined>(undefined);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    if (!isActive) {
      setSymbols([]);
      return;
    }

    const animate = (timestamp: number) => {
      // Spawn new symbols aggressively
      if (timestamp - lastSpawnTime.current > 50 / intensity) {
        spawnSymbol();
        lastSpawnTime.current = timestamp;
      }

      // Update existing symbols
      setSymbols(prevSymbols => 
        prevSymbols
          .map(symbol => ({
            ...symbol,
            x: symbol.x + symbol.velocity.x,
            y: symbol.y + symbol.velocity.y,
            rotation: symbol.rotation + 2,
            life: symbol.life - 1,
            opacity: Math.max(0, symbol.opacity - 0.02)
          }))
          .filter(symbol => symbol.life > 0 && symbol.opacity > 0)
      );

      if (isActive) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isActive, intensity]);

  const spawnSymbol = () => {
    const menacingSymbols = ['ゴ', 'ド', 'ォ', 'ン', 'ゴゴ', 'ドド', 'ゴゴゴ'];
    const colors = [
      'text-red-500', 'text-purple-500', 'text-yellow-500', 
      'text-pink-500', 'text-orange-500', 'text-cyan-500',
      'text-green-500', 'text-blue-500'
    ];
    
    const newSymbol = {
      id: Date.now() + Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 360,
      size: 20 + Math.random() * 60 * intensity,
      color: colors[Math.floor(Math.random() * colors.length)],
      symbol: menacingSymbols[Math.floor(Math.random() * menacingSymbols.length)],
      velocity: {
        x: (Math.random() - 0.5) * 4 * intensity,
        y: (Math.random() - 0.5) * 4 * intensity
      },
      life: 100 + Math.random() * 100,
      opacity: 0.8 + Math.random() * 0.2
    };

    setSymbols(prev => [...prev.slice(-50), newSymbol]); // Keep max 50 symbols
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {symbols.map((symbol) => (
        <div
          key={symbol.id}
          className={`absolute ${symbol.color} font-bold select-none drop-shadow-lg`}
          style={{
            left: `${symbol.x}px`,
            top: `${symbol.y}px`,
            fontSize: `${symbol.size}px`,
            transform: `rotate(${symbol.rotation}deg)`,
            opacity: symbol.opacity,
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            filter: 'blur(0.5px)'
          }}
        >
          {symbol.symbol}
        </div>
      ))}
    </div>
  );
}

// Global hover tracker for chaotic menacing
export function useChaoticMenacing() {
  const [isHovering, setIsHovering] = useState(false);
  const [intensity, setIntensity] = useState(1);
  const hoverCount = useRef(0);
  const lastHoverTime = useRef(0);

  useEffect(() => {
    const handleMouseMove = () => {
      const now = Date.now();
      if (now - lastHoverTime.current < 100) {
        hoverCount.current++;
      } else {
        hoverCount.current = 1;
      }
      lastHoverTime.current = now;

      // Increase intensity based on rapid hovering
      const newIntensity = Math.min(3, 1 + hoverCount.current / 10);
      setIntensity(newIntensity);
      setIsHovering(true);

      // Auto-stop after no movement
      setTimeout(() => {
        if (Date.now() - lastHoverTime.current > 500) {
          setIsHovering(false);
          hoverCount.current = 0;
        }
      }, 500);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { isHovering, intensity };
}
'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart } from './ShoppingCart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { playYareYare, playGiornoTheme } from '@/lib/audio';

export function Navigation() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [jojoMode, setJojoMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Random chance to enter JoJo mode
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        setJojoMode(true);
        playGiornoTheme();
        
        setTimeout(() => {
          setJojoMode(false);
        }, 5000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLogoClick = () => {
    playYareYare();
  };

  return (
    <nav className={`sticky top-0 z-50 border-b transition-all duration-300 header-enhanced ${
      jojoMode 
        ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 border-yellow-400' 
        : 'border-purple-600'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-4 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className={`text-4xl transition-transform duration-200 group-hover:scale-110 ${
              jojoMode ? 'animate-bounce' : ''
            }`}>
              ⭐
            </div>
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-200 jojo-logo ${
                jojoMode 
                  ? 'text-black animate-pulse' 
                  : 'bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent'
              }`}>
                JOJO'S BIZARRE SHOP
              </h1>
              <p className={`text-sm ${
                jojoMode ? 'text-gray-800' : 'text-purple-300'
              }`}>
                {jojoMode ? 'GOLDEN EXPERIENCE MODE!' : 'Menacing Merchandise'}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className={`nav-button-enhanced ${
                jojoMode 
                  ? 'text-black hover:bg-black/10' 
                  : 'text-yellow-400 hover:bg-yellow-400/10'
              }`}
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              className={`nav-button-enhanced ${
                jojoMode 
                  ? 'text-black hover:bg-black/10' 
                  : 'text-yellow-400 hover:bg-yellow-400/10'
              }`}
            >
              Stands
            </Button>
            <Button 
              variant="ghost" 
              className={`nav-button-enhanced ${
                jojoMode 
                  ? 'text-black hover:bg-black/10' 
                  : 'text-yellow-400 hover:bg-yellow-400/10'
              }`}
            >
              Manga
            </Button>
            <Button 
              variant="ghost" 
              className={`nav-button-enhanced ${
                jojoMode 
                  ? 'text-black hover:bg-black/10' 
                  : 'text-yellow-400 hover:bg-yellow-400/10'
              }`}
            >
              Figures
            </Button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Time Display with JoJo flavor */}
            <div className={`hidden lg:flex flex-col text-center text-xs stand-stat-display ${
              jojoMode ? 'text-black' : 'text-purple-300'
            }`}>
              <div className="font-bold text-purple-400">STAND STATS</div>
              <div className="font-mono text-yellow-400 font-bold">
                {currentTime.toLocaleTimeString()}
              </div>
              <Badge variant="outline" className="text-xs mt-1 bg-purple-900 text-yellow-400 border-yellow-400">
                {jojoMode ? 'Golden Wind Time' : 'Za Warudo Time'}
              </Badge>
            </div>

            {/* Shopping Cart */}
            <ShoppingCart />

            {/* Random JoJo Badge */}
            {Math.random() < 0.3 && (
              <Badge 
                className={`animate-pulse ${
                  jojoMode 
                    ? 'bg-red-600 text-white' 
                    : 'bg-purple-600 text-white'
                }`}
              >
                {jojoMode ? 'MUDA!' : 'ゴゴゴゴ'}
              </Badge>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex justify-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            className={`nav-button-enhanced ${
              jojoMode 
                ? 'text-black hover:bg-black/10' 
                : 'text-yellow-400 hover:bg-yellow-400/10'
            }`}
          >
            Home
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className={`nav-button-enhanced ${
              jojoMode 
                ? 'text-black hover:bg-black/10' 
                : 'text-yellow-400 hover:bg-yellow-400/10'
            }`}
          >
            Shop
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className={`nav-button-enhanced ${
              jojoMode 
                ? 'text-black hover:bg-black/10' 
                : 'text-yellow-400 hover:bg-yellow-400/10'
            }`}
          >
            About
          </Button>
        </div>

        {/* JoJo Mode Banner */}
        {jojoMode && (
          <div className="mt-4 text-center bg-black/20 p-2 rounded">
            <div className="text-black font-bold animate-pulse">
              🌟 GOLDEN EXPERIENCE MODE ACTIVATED! 🌟
            </div>
            <div className="text-sm text-gray-800">
              "I, Giorno Giovanna, have taken over this website!"
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useJojoAudio } from '@/hooks/useJojoAudio';
import { useAchievements } from '@/hooks/useAchievements';
import { Button } from '@/components/ui/button';
import { playGiornoTheme, playItWasMeDio, playKonoDioDa } from '@/lib/audio';

export function JojoIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const {  triggerRandomMemeSound } = useJojoAudio();
  const { trackDiscovery } = useAchievements();

  const introPhases = [
    {
      id: 'opening',
      title: "JoJo's Bizarre Shop",
      subtitle: 'An Adventure in Commerce',
      duration: 3000,
      background: 'from-black via-purple-900 to-black',
      sound: () => playGiornoTheme()
    },
    {
      id: 'dio-reveal',
      title: 'You thought this was a normal shop...',
      subtitle: 'But it was me, DIO!',
      duration: 3000,
      background: 'from-red-900 via-black to-yellow-900',
      sound: () => playItWasMeDio()
    },
    {
      id: 'invitation',
      title: 'Welcome, Stand User',
      subtitle: 'Prepare for the most bizarre shopping experience!',
      duration: 2500,
      background: 'from-purple-900 via-gold-900 to-purple-900',
      sound: () => playKonoDioDa()
    }
  ];

  useEffect(() => {
    // Check if user has seen intro before
    const hasSeenIntro = localStorage.getItem('jojo-intro-seen');
    if (hasSeenIntro) {
      setIsVisible(false);
      return;
    }

    // Start intro sequence
    const runIntroSequence = async () => {
      for (let i = 0; i < introPhases.length; i++) {
        setCurrentPhase(i);
        
        // Play phase sound
        setTimeout(() => {
          introPhases[i].sound();
        }, 500);

        // Wait for phase duration
        await new Promise(resolve => setTimeout(resolve, introPhases[i].duration));
        
        // Check if skipped
        if (isSkipped) break;
      }

      // Final dramatic pause
      if (!isSkipped) {
        setTimeout(() => {
          triggerRandomMemeSound();
        }, 500);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // End intro
      handleSkip();
    };

    runIntroSequence();
  }, [isSkipped]);

  const handleSkip = () => {
    setIsVisible(false);
    localStorage.setItem('jojo-intro-seen', 'true');
    trackDiscovery('intro_completed');
  };

  const handleSkipClick = () => {
    setIsSkipped(true);
  };

  if (!isVisible) return null;

  const currentPhaseData = introPhases[currentPhase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background with dynamic gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${currentPhaseData.background} transition-all duration-1000`}
      />
      
      {/* Animated menacing symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl text-purple-400/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            ゴ
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-gold-400 to-purple-600 bg-clip-text text-transparent mb-8 animate-pulse">
          {currentPhaseData.title}
        </h1>
        
        {/* Subtitle */}
        <p className="text-3xl md:text-4xl text-gold-300 italic mb-12 animate-bounce">
          {currentPhaseData.subtitle}
        </p>

        {/* Animated quote marks */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <span className="text-6xl text-purple-400 animate-pulse">"</span>
          <span className="text-2xl text-purple-300 max-w-md">
            Your next line is... "This is the most bizarre shop I've ever seen!"
          </span>
          <span className="text-6xl text-purple-400 animate-pulse">"</span>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {introPhases.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentPhase 
                  ? 'bg-gold-400 scale-125' 
                  : index < currentPhase 
                  ? 'bg-green-400' 
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Loading effect */}
        <div className="mb-8">
          <div className="w-64 h-2 bg-purple-900 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-gold-500 rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${((currentPhase + 1) / introPhases.length) * 100}%`,
                transform: `translateX(${currentPhase * 10}px)`
              }}
            />
          </div>
        </div>

        {/* Skip button */}
        <Button
          onClick={handleSkipClick}
          variant="outline"
          className="border-gold-400 text-gold-300 hover:bg-gold-400 hover:text-black transition-all duration-300 animate-pulse"
        >
          Skip Intro →
        </Button>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.7;
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Hook to manage intro state
export function useJojoIntro() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if intro should be shown
    const hasSeenIntro = localStorage.getItem('jojo-intro-seen');
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const resetIntro = () => {
    localStorage.removeItem('jojo-intro-seen');
    setShowIntro(true);
  };

  return {
    showIntro,
    resetIntro
  };
}
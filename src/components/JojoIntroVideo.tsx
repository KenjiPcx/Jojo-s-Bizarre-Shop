'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { stopAllAudio } from '@/lib/audio';

interface JojoIntroVideoProps {
  onComplete: () => void;
}

export function JojoIntroVideo({ onComplete }: JojoIntroVideoProps) {
  const [showSkip, setShowSkip] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show skip button after 3 seconds
    const skipTimeout = setTimeout(() => setShowSkip(true), 3000);

    // Auto-complete after video ends or 2 minutes max
    const maxTimeout = setTimeout(() => {
      console.log('🎬 Video timeout - completing intro');
      handleComplete();
    }, 120000); // 2 minutes max

    return () => {
      clearTimeout(skipTimeout);
      clearTimeout(maxTimeout);
    };
  }, []);

  const handleSkip = () => {
    console.log('🎬 User skipped intro');
    if (videoRef.current) {
      videoRef.current.pause();
    }
    stopAllAudio();
    handleComplete();
  };

  const handleComplete = () => {
    // Mark intro as seen with timestamp
    localStorage.setItem('jojo-intro-seen', 'true');
    localStorage.setItem('jojo-intro-last-seen', Date.now().toString());
    console.log('🎬 Intro video completed');
    onComplete();
  };

  const handleVideoEnd = () => {
    console.log('🎬 Video ended naturally');
    handleComplete();
  };

  const handleVideoError = () => {
    console.error('🎬 Video failed to load');
    setVideoError(true);
    setIsLoading(false);
    // Show error for 3 seconds then auto-complete
    setTimeout(handleComplete, 3000);
  };

  const handleVideoLoad = () => {
    console.log('🎬 Video loaded successfully');
    setIsLoading(false);
    // Force play the video once it's loaded
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        // Successfully started playing, now unmute
        if (videoRef.current) {
          videoRef.current.muted = false;
        }
      }).catch((error) => {
        console.log('🎬 Autoplay failed, user interaction required:', error);
        // Show a play button if autoplay fails
        setNeedsUserInteraction(true);
      });
    }
  };

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Unmute when user clicks
      videoRef.current.play();
      setNeedsUserInteraction(false);
    }
  };

  if (videoError) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl mb-4">Video failed to load</h2>
          <p className="text-lg mb-6">Entering the bizarre shop...</p>
          <div className="animate-spin text-4xl">⏳</div>
        </div>
      </div>
    );
  }

  if (needsUserInteraction) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-3xl mb-4 text-gold-300">JoJo's Bizarre Shop</h2>
          <p className="text-lg mb-6">Ready to experience the bizarre intro?</p>
          <Button
            onClick={handlePlayClick}
            className="bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-500 hover:to-gold-500 text-white font-bold text-xl px-8 py-4 animate-pulse"
          >
            ▶️ PLAY INTRO
          </Button>
          <Button
            onClick={handleSkip}
            className="ml-4 bg-gray-600 hover:bg-gray-500 text-white font-bold px-6 py-4"
          >
            Skip →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Skip Button */}
      {showSkip && (
        <Button
          onClick={handleSkip}
          className="absolute top-4 right-4 bg-purple-700 hover:bg-purple-600 text-white z-10 text-lg px-6 py-3"
        >
          Skip Intro →
        </Button>
      )}

      {/* Loading indicator while video loads */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-5">
          <div className="text-center text-white">
            <div className="animate-spin text-6xl mb-4">⏳</div>
            <p className="text-xl">Loading JoJo intro...</p>
          </div>
        </div>
      )}

      {/* Video Player */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted // Must be muted for autoplay to work in browsers
        playsInline
        onEnded={handleVideoEnd}
        onError={handleVideoError}
        onLoadStart={() => console.log('🎬 Video started loading')}
        onCanPlay={handleVideoLoad}
        onPlay={() => console.log('🎬 Video started playing')}
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        <source src="/fly in the sky jojo edit.mp4" type="video/mp4" />
        <p className="text-white text-center">
          Your browser does not support video playback.
        </p>
      </video>
    </div>
  );
}

// Hook to manage intro state
export function useJojoIntro() {
  const [showIntro, setShowIntro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage and also check if it's been more than 1 day since last seen
    const hasSeenIntro = localStorage.getItem('jojo-intro-seen') === 'true';
    const lastSeenTime = localStorage.getItem('jojo-intro-last-seen');
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    
    // Show intro if never seen OR if it's been more than a day
    const shouldShowIntro = !hasSeenIntro || (lastSeenTime && parseInt(lastSeenTime) < oneDayAgo);
    
    setShowIntro(shouldShowIntro);
    setIsLoading(false);
    
    console.log('🎬 Intro check:', { hasSeenIntro, lastSeenTime, shouldShowIntro });
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const resetIntro = () => {
    localStorage.removeItem('jojo-intro-seen');
    localStorage.removeItem('jojo-intro-last-seen');
    setShowIntro(true);
    console.log('🎬 Intro reset - will show on next check');
  };

  return {
    showIntro: showIntro && !isLoading,
    isLoading,
    handleIntroComplete,
    resetIntro
  };
}
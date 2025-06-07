'use client';

import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useJojoAudio } from '@/hooks/useJojoAudio';
import { useDesperationMode } from '@/hooks/useDesperationMode';
import { DesperationUI } from '@/components/DesperationUI';
import { ForgiveFatherPopup, useForgiveFatherPopup } from '@/components/ForgiveFatherPopup';
import { useState, useEffect } from 'react';

export default function Home() {
  // Select first 6 products for the basic homepage
  const featuredProducts = products.slice(0, 6);
  const [menacingIntensity, setMenacingIntensity] = useState(0);
  const [showAudioControls, setShowAudioControls] = useState(false);
  
  // Desperation Mode
  const desperationMode = useDesperationMode();
  
  // Forgive Father Popup
  const { triggerConfession, ForgiveFatherPopupComponent } = useForgiveFatherPopup();
  
  const {
    isInitialized,
    chaosMode,
    volume,
    playProductClickSound,
    playPopupSound,
    playTimeStopSound,
    playMenacingSound,
    playToBeContinuedSound,
    triggerRandomMemeSound,
    triggerBrainrotMode,
    toggleChaosMode,
    changeVolume,
    playRandomCatchphrase,
    playEnhancedCartSound,
    playCheckoutSequence,
    triggerJojoThemeExperience,
    triggerMemeFrenzy,
    playHoverEffect,
    playEntranceEffect,
    playSpecificPhrases,
    playNewJojoMemes
  } = useJojoAudio();

  // Menacing intensity effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMenacingIntensity(prev => {
        const newIntensity = Math.sin(Date.now() / 1000) * 0.5 + 0.5;
        if (Math.random() < 0.1) {
          playMenacingSound();
        }
        return newIntensity;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, [playMenacingSound]);

  const addToCart = (productName: string) => {
    playEnhancedCartSound(); // Use enhanced cart sound with fanfare
    alert(`Added ${productName} to cart! MUDA MUDA MUDA!`);
    
    // Enhanced chance for special effects with forgive father meme
    const specialEffect = Math.random();
    if (specialEffect < 0.12) {
      setTimeout(() => {
        playToBeContinuedSound();
      }, 1000);
    } else if (specialEffect < 0.22) {
      setTimeout(() => {
        playSpecificPhrases.itWasMe();
      }, 800);
    } else if (specialEffect < 0.32) {
      setTimeout(() => {
        triggerConfession();
      }, 600);
    }
  };

  const handleProductClick = () => {
    playProductClickSound();
    if (Math.random() < 0.3) {
      playRandomCatchphrase();
    }
  };

  const handleMenacingClick = () => {
    playMenacingSound();
    triggerRandomMemeSound();
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-black via-purple-900 to-black relative overflow-hidden ${
      desperationMode.isScreenPulsing ? 'animate-pulse' : ''
    } ${
      desperationMode.isScreenShaking ? 'animate-bounce' : ''
    }`}>
      
      {/* Desperation Mode UI */}
      <DesperationUI
        level={desperationMode.level}
        timeOnSite={desperationMode.timeOnSite}
        formatTime={desperationMode.formatTime}
        urgencyMessages={desperationMode.urgencyMessages}
        showLastChanceBanner={desperationMode.showLastChanceBanner}
        cursorPosition={desperationMode.cursorPosition}
        showCursorFollower={desperationMode.showCursorFollower}
        showDioModal={desperationMode.showDioModal}
        dismissDioModal={desperationMode.dismissDioModal}
      />
      {/* Enhanced Floating Menacing Symbols with Audio */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className={`absolute top-10 left-10 text-6xl text-purple-400 animate-bounce cursor-pointer pointer-events-auto transition-all duration-300 ${
            chaosMode ? 'animate-spin text-red-500' : ''
          }`}
          style={{ opacity: 0.2 + menacingIntensity * 0.3 }}
          onClick={handleMenacingClick}
        >ゴ</div>
        <div 
          className={`absolute top-32 right-20 text-4xl text-gold-400 animate-pulse cursor-pointer pointer-events-auto transition-all duration-300 ${
            chaosMode ? 'animate-bounce text-yellow-300' : ''
          }`}
          style={{ opacity: 0.15 + menacingIntensity * 0.25 }}
          onClick={handleMenacingClick}
        >ゴ</div>
        <div 
          className={`absolute bottom-40 left-32 text-5xl text-purple-300 animate-bounce delay-1000 cursor-pointer pointer-events-auto transition-all duration-300 ${
            chaosMode ? 'animate-pulse text-pink-400' : ''
          }`}
          style={{ opacity: 0.1 + menacingIntensity * 0.4 }}
          onClick={handleMenacingClick}
        >ゴ</div>
        <div 
          className={`absolute bottom-20 right-10 text-7xl text-gold-300 animate-pulse delay-500 cursor-pointer pointer-events-auto transition-all duration-300 ${
            chaosMode ? 'animate-spin text-orange-400' : ''
          }`}
          style={{ opacity: 0.2 + menacingIntensity * 0.3 }}
          onClick={handleMenacingClick}
        >ゴ</div>
        <div 
          className={`absolute top-1/2 left-1/4 text-3xl text-purple-500 animate-bounce delay-700 cursor-pointer pointer-events-auto transition-all duration-300 ${
            chaosMode ? 'animate-ping text-violet-400' : ''
          }`}
          style={{ opacity: 0.15 + menacingIntensity * 0.35 }}
          onClick={handleMenacingClick}
        >ゴ</div>
        <div 
          className={`absolute top-1/3 right-1/3 text-5xl text-gold-500 animate-pulse delay-300 cursor-pointer pointer-events-auto transition-all duration-300 ${
            chaosMode ? 'animate-bounce text-amber-300' : ''
          }`}
          style={{ opacity: 0.1 + menacingIntensity * 0.4 }}
          onClick={handleMenacingClick}
        >ゴ</div>
        
        {/* Enhanced Audio Status Indicator with Desperation Level */}
        {isInitialized && (
          <div className="fixed top-4 right-4 pointer-events-auto">
            <div className={`px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
              desperationMode.level >= 4
                ? 'bg-red-700 text-yellow-300 animate-bounce border-2 border-gold-400'
                : desperationMode.level >= 3
                ? 'bg-red-600 text-white animate-pulse'
                : chaosMode 
                ? 'bg-red-600 text-white animate-pulse' 
                : 'bg-purple-800 text-gold-300'
            }`}>
              🎵 {desperationMode.level >= 4 ? 'MAXIMUM CHAOS!' :
                   desperationMode.level >= 3 ? 'DESPERATION MODE!' :
                   chaosMode ? 'CHAOS MODE!' : 'Audio Active'}
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Audio Controls */}
        <header className="text-center mb-12">
          <h1 
            className={`text-7xl font-bold bg-gradient-to-r from-purple-400 via-gold-400 to-purple-600 bg-clip-text text-transparent mb-4 drop-shadow-2xl cursor-pointer transition-all duration-300 ${
              chaosMode ? 'animate-pulse scale-110' : 'hover:scale-105'
            }`}
            onClick={() => {
              playTimeStopSound();
              setTimeout(() => playRandomCatchphrase(), 1500);
            }}
          >
            JoJo's Bizarre Shop
          </h1>
          <p className="text-xl text-gold-300 italic">
            "Your next line is... 'I need to buy everything here!'"
          </p>
          <div 
            className={`text-lg text-purple-300 mt-4 animate-pulse cursor-pointer transition-all duration-300 ${
              chaosMode ? 'text-red-400 animate-bounce' : ''
            }`}
            onClick={triggerBrainrotMode}
          >
            ゴゴゴゴ MENACING DEALS AHEAD ゴゴゴゴ
          </div>
          
          {/* Audio Control Panel */}
          <div className="mt-6 flex justify-center items-center gap-4">
            <Button
              onClick={() => setShowAudioControls(!showAudioControls)}
              className="bg-purple-700 hover:bg-purple-600 text-xs"
            >
              🎵 Audio Controls
            </Button>
            <Button
              onClick={toggleChaosMode}
              className={`text-xs ${
                chaosMode 
                  ? 'bg-red-600 hover:bg-red-500 animate-pulse' 
                  : 'bg-orange-600 hover:bg-orange-500'
              }`}
            >
              {chaosMode ? '🔥 DISABLE CHAOS' : '💀 CHAOS MODE'}
            </Button>
            <Button
              onClick={triggerBrainrotMode}
              className="bg-pink-700 hover:bg-pink-600 text-xs animate-pulse"
            >
              🧠💀 BRAINROT
            </Button>
            <Button
              onClick={() => {
                if (playNewJojoMemes?.mudaRapidFire) {
                  playNewJojoMemes.mudaRapidFire();
                }
              }}
              className="bg-red-600 hover:bg-red-500 text-xs animate-pulse"
            >
              💥 MUDA MUDA
            </Button>
            <Button
              onClick={triggerJojoThemeExperience}
              className="bg-blue-700 hover:bg-blue-600 text-xs"
            >
              🎹 GIORNO THEME
            </Button>
            <Button
              onClick={() => {
                triggerConfession();
                // Also play dramatic TTS for immediate feedback
                setTimeout(() => {
                  if (playNewJojoMemes?.forgiveFatherDramatic) {
                    playNewJojoMemes.forgiveFatherDramatic();
                  }
                }, 500);
              }}
              className="bg-red-800 hover:bg-red-700 text-xs animate-pulse"
            >
              🙏 CONFESSION
            </Button>
            {desperationMode.level >= 2 && (
              <div 
              className={`text-xs px-2 py-1 rounded cursor-pointer ${
                desperationMode.level >= 4 ? 'bg-red-700 text-yellow-300 animate-bounce' :
                desperationMode.level >= 3 ? 'bg-red-600 text-white animate-pulse' :
                'bg-orange-600 text-white'
              }`}
              onClick={() => {
                if (desperationMode.level >= 4 && playNewJojoMemes?.mudaRapidFire) {
                  playNewJojoMemes.mudaRapidFire();
                }
              }}
            >
              ⚠️ DESPERATION LV.{desperationMode.level}
              {desperationMode.level >= 4 && ' 💥'}
            </div>
            )}
          </div>
          
          {/* Expandable Audio Controls */}
          {showAudioControls && (
            <div className="mt-4 p-4 bg-purple-900/50 rounded-lg border border-gold-400">
              <div className="text-sm text-gold-300 mb-3">Master Volume: {Math.round(volume * 100)}%</div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                className="w-full mb-4"
              />
              <div className="flex gap-2 flex-wrap justify-center">
                <Button onClick={playRandomCatchphrase} className="text-xs bg-blue-600 hover:bg-blue-500">
                  Random Quote
                </Button>
                <Button onClick={triggerRandomMemeSound} className="text-xs bg-green-600 hover:bg-green-500">
                  Meme Sound
                </Button>
                <Button onClick={playToBeContinuedSound} className="text-xs bg-yellow-600 hover:bg-yellow-500">
                  To Be Continued
                </Button>
                <Button onClick={triggerMemeFrenzy} className="text-xs bg-red-600 hover:bg-red-500">
                  Meme Frenzy
                </Button>
                <Button onClick={playSpecificPhrases.yourNextLine} className="text-xs bg-purple-600 hover:bg-purple-500">
                  "Your next line..."
                </Button>
                <Button onClick={playCheckoutSequence} className="text-xs bg-orange-600 hover:bg-orange-500">
                  Checkout Finale
                </Button>
                <Button onClick={triggerConfession} className="text-xs bg-red-700 hover:bg-red-600">
                  🙏 Forgive Father
                </Button>
                <Button 
                  onClick={() => playNewJojoMemes?.wryyyScream && playNewJojoMemes.wryyyScream()} 
                  className="text-xs bg-purple-700 hover:bg-purple-600"
                >
                  😈 WRYYY!
                </Button>
                <Button 
                  onClick={() => playNewJojoMemes?.tickTockTimeStop && playNewJojoMemes.tickTockTimeStop()} 
                  className="text-xs bg-blue-700 hover:bg-blue-600"
                >
                  🕐 Tick-Tock
                </Button>
                <Button 
                  onClick={() => playNewJojoMemes?.mudaRapidFire && playNewJojoMemes.mudaRapidFire()} 
                  className="text-xs bg-red-700 hover:bg-red-600 animate-pulse"
                >
                  💥 MUDA MUDA!
                </Button>
              </div>
            </div>
          )}
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-gradient-to-b from-purple-900/80 to-black/90 rounded-lg p-6 border-2 border-gold-400 hover:border-gold-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 cursor-pointer ${
                chaosMode ? 'animate-pulse border-red-400' : ''
              }`}
              onClick={handleProductClick}
              onMouseEnter={playHoverEffect} // Add hover audio effect
            >
              {/* Product Image Placeholder with Audio Reaction */}
              <div 
                className={`w-full h-48 bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg mb-4 flex items-center justify-center border-2 border-gold-500 transition-all duration-300 ${
                  chaosMode ? 'animate-spin border-red-500' : 'hover:rotate-2'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  playProductClickSound();
                  if (Math.random() < 0.4) {
                    playRandomCatchphrase();
                  }
                }}
              >
                <div className={`text-6xl transition-transform duration-300 ${
                  chaosMode ? 'animate-bounce' : 'hover:scale-110'
                }`}>🗿</div>
              </div>

              {/* Product Name */}
              <h3 className="text-xl font-bold text-gold-300 mb-2 line-clamp-2">
                {product.name}
              </h3>

              {/* Enhanced Price with Desperation Effects */}
              <div className="text-2xl font-bold text-purple-300 mb-2">
                {desperationMode.level >= 4 ? (
                  <div className="space-y-1">
                    <div className="line-through text-gray-500 text-sm">
                      ${product.price.toLocaleString()}
                    </div>
                    <div className="text-green-400 font-bold animate-pulse">
                      ${Math.round(product.price * desperationMode.priceMultiplier).toLocaleString()}
                      <span className="text-red-400 ml-2 text-lg">99% OFF!</span>
                    </div>
                  </div>
                ) : desperationMode.level >= 2 ? (
                  <div className={`${desperationMode.level >= 3 ? 'animate-pulse text-green-400' : ''}`}>
                    ${Math.round(product.price * desperationMode.priceMultiplier).toLocaleString()}
                    {desperationMode.priceMultiplier < 0.9 && (
                      <span className="text-green-400 ml-2 text-sm">DISCOUNTED!</span>
                    )}
                  </div>
                ) : (
                  <div>${product.price.toLocaleString()}</div>
                )}
              </div>
              
              {/* Desperation Mode Stock Warnings */}
              {desperationMode.level >= 2 && (
                <div className="mb-3 space-y-1">
                  {desperationMode.level >= 4 && desperationMode.stockWarnings[product.id] && (
                    <div className="text-red-400 text-sm font-bold animate-pulse">
                      ⚠️ Only {desperationMode.stockWarnings[product.id]} left in stock!
                    </div>
                  )}
                  {desperationMode.level >= 3 && desperationMode.viewerCounts[product.id] && (
                    <div className="text-orange-400 text-xs">
                      👥 {desperationMode.viewerCounts[product.id]} other Stand users viewing this
                    </div>
                  )}
                  {desperationMode.level >= 4 && desperationMode.countdownTimers[product.id] && (
                    <div className="text-red-500 text-sm font-bold animate-bounce">
                      ⏰ Sale ends in: {desperationMode.formatCountdown(desperationMode.countdownTimers[product.id])}
                    </div>
                  )}
                </div>
              )}

              {/* Enhanced Add to Cart Button with Desperation Effects */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product.name);
                }}
                className={`w-full font-bold py-3 text-lg transition-all duration-300 transform hover:scale-105 ${
                  desperationMode.isButtonGlowing || desperationMode.level >= 3
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse shadow-lg shadow-red-500/50 border-2 border-yellow-400'
                    : 'bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-500 hover:to-gold-500'
                } ${
                  chaosMode ? 'animate-pulse bg-gradient-to-r from-red-600 to-orange-600' : ''
                } ${
                  desperationMode.level >= 4 ? 'animate-bounce text-yellow-300 text-xl' : 'text-white'
                }`}
              >
                {desperationMode.level >= 4 ? '🔥 BUY NOW OR DIE! 🔥' :
                 desperationMode.level >= 3 ? '⚡ LAST CHANCE! ⚡' :
                 desperationMode.level >= 2 ? '🎯 LIMITED TIME! 🎯' :
                 chaosMode ? '💀 CHAOS CART 💀' : 'Add to Cart'}
              </Button>

              {/* Menacing Level Indicator with Audio */}
              <div className="mt-3 text-center">
                <span className="text-sm text-purple-400">Menacing Level: </span>
                <span 
                  className={`text-gold-400 cursor-pointer transition-all duration-300 ${
                    chaosMode ? 'text-red-400 animate-pulse' : 'hover:text-gold-300'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    playMenacingSound();
                    for (let i = 0; i < product.menacingLevel; i++) {
                      setTimeout(() => {
                        triggerRandomMemeSound();
                      }, i * 300);
                    }
                  }}
                >
                  {'ゴ'.repeat(product.menacingLevel)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with Audio */}
        <footer className={`text-center mt-20 p-8 rounded-xl jojo-footer ${
          chaosMode ? 'animate-pulse' : ''
        }`}>
          {/* Menacing Symbols Around Footer */}
          <div className="footer-menacing footer-menacing-1">ゴ</div>
          <div className="footer-menacing footer-menacing-2">ゴ</div>
          <div className="footer-menacing footer-menacing-3">ゴ</div>
          <div className="footer-menacing footer-menacing-4">ゴ</div>
          <div className="footer-menacing footer-menacing-5">ゴ</div>
          <div className="footer-menacing footer-menacing-6">ゴ</div>
          
          {/* Enhanced DIO Quote */}
          <div className="footer-enhanced-text">
            <p 
              className={`dio-quote text-gold-300 cursor-pointer transition-all duration-300 ${
                chaosMode ? 'text-red-300 animate-bounce' : 'hover:text-gold-200'
              }`}
              onClick={() => {
                playTimeStopSound();
                setTimeout(() => {
                  playRandomCatchphrase();
                }, 2000);
              }}
            >
              You thought this was a normal shop, but it was me, DIO!
            </p>
          </div>
          
          {/* Enhanced Audio Hint */}
          <div className="footer-audio-hint">
            <div className="flex items-center justify-center gap-2">
              <span className="text-purple-300">🎵</span>
              <span className="text-purple-200 font-semibold">Click anywhere for JoJo audio experience</span>
              <span className="text-purple-300">🎵</span>
            </div>
            <div className="text-xs text-purple-400 mt-1 opacity-75">
              Experience the full bizarre adventure with sound!
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <span className="text-2xl animate-pulse">⭐</span>
            <span className="text-lg text-gold-400 font-bold tracking-wider">BIZARRE BAZAAR</span>
            <span className="text-2xl animate-pulse">⭐</span>
          </div>
        </footer>
      </div>
      
      {/* Forgive Father Popup */}
      <ForgiveFatherPopupComponent />
    </div>
  );
}

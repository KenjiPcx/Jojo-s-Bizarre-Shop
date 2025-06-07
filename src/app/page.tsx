'use client';

import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useJojoAudio } from '@/hooks/useJojoAudio';
import { useDesperationMode } from '@/hooks/useDesperationMode';
import { useAchievements } from '@/hooks/useAchievements';
import { useCart } from '@/hooks/useCart';
import { DesperationUI } from '@/components/DesperationUI';
import { ForgiveFatherPopup, useForgiveFatherPopup } from '@/components/ForgiveFatherPopup';
import { AchievementTracker } from '@/components/AchievementTracker';
import { AchievementNotifications } from '@/components/AchievementNotification';
import { JojoIntro } from '@/components/JojoIntro';
import { JojoIntroVideo, useJojoIntro } from '@/components/JojoIntroVideo';
import { ZaWarudo } from '@/components/ZaWarudo';
import { AudioControlPanel } from '@/components/AudioControlPanel';
import { EasterEggs, SecretJojoButton, HiddenMenacingText, KonoMemeReference } from '@/components/EasterEggs';
import { useState, useEffect } from 'react';

export default function Home() {
  // Select first 6 products for the basic homepage
  const featuredProducts = products.slice(0, 6);
  const [menacingIntensity, setMenacingIntensity] = useState(0);
  const [showAudioControls, setShowAudioControls] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimes, setClickTimes] = useState<number[]>([]);
  
  // Intro Video Management
  const { showIntro, isLoading, handleIntroComplete, resetIntro } = useJojoIntro();
  
  // Za Warudo trigger function
  const triggerZaWarudoEffect = () => {
    // The ZaWarudo component handles its own triggering based on scroll
    // But we can trigger time stop sound manually
    playTimeStopSound();
  };
  
  // Cart System
  const { addToCart: addProductToCart } = useCart();
  
  // Desperation Mode
  const desperationMode = useDesperationMode();
  
  // Forgive Father Popup
  const { triggerConfession, ForgiveFatherPopupComponent } = useForgiveFatherPopup();
  
  // Achievement System
  const { 
    trackAudioPlayed, 
    trackInteraction, 
    trackShopping, 
    trackDiscovery,
    newUnlocks,
    clearNewUnlocks 
  } = useAchievements();
  
  const {
    isInitialized,
    chaosMode,
    volume,
    backgroundVolume,
    sfxVolume,
    playProductClickSound,
    playPopupSound,
    playTimeStopSound,
    playMenacingSound,
    playToBeContinuedSound,
    triggerRandomMemeSound,
    triggerBrainrotMode,
    toggleChaosMode,
    changeVolume,
    changeBackgroundVolume,
    changeSfxVolume,
    playRandomCatchphrase,
    playEnhancedCartSound,
    playCheckoutSequence,
    triggerJojoThemeExperience,
    triggerMemeFrenzy,
    playHoverEffect,
    playEntranceEffect,
    playSpecificPhrases,
    playNewJojoMemes,
    getAudioStatus,
    triggerPillarmenEvent,
    triggerGiornoEvent,
    triggerKiraEvent,
    triggerTortureDanceEvent,
    triggerDioEvent,
    triggerBitesTheDustEvent
  } = useJojoAudio();

  // Menacing intensity effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMenacingIntensity(prev => {
        const newIntensity = Math.sin(Date.now() / 1000) * 0.5 + 0.5;
        if (Math.random() < 0.1) {
          playMenacingSound();
          trackAudioPlayed('menacing');
        }
        return newIntensity;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, [playMenacingSound, trackAudioPlayed]);

  // Track time on site for achievements
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackDiscovery('time_spent', { seconds: timeSpent });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [trackDiscovery]);

  // Track desperation level
  useEffect(() => {
    if (desperationMode.level >= 4) {
      trackDiscovery('desperation_level', { level: desperationMode.level });
    }
  }, [desperationMode.level, trackDiscovery]);

  // Track DIO modal encounter
  useEffect(() => {
    if (desperationMode.showDioModal) {
      trackDiscovery('dio_modal');
    }
  }, [desperationMode.showDioModal, trackDiscovery]);

  const addToCart = (product: any) => {
    // Actually add to cart
    addProductToCart(product);
    
    playEnhancedCartSound(); // Use enhanced cart sound with fanfare
    trackAudioPlayed('cart');
    trackShopping('item_added', { productName: product.name });
    
    // Enhanced chance for special effects with forgive father meme
    const specialEffect = Math.random();
    if (specialEffect < 0.12) {
      setTimeout(() => {
        playToBeContinuedSound();
        trackInteraction('to_be_continued');
        trackAudioPlayed('to-be-continued');
      }, 1000);
    } else if (specialEffect < 0.22) {
      setTimeout(() => {
        playSpecificPhrases.itWasMe();
        trackAudioPlayed('it-was-me-dio');
      }, 800);
    } else if (specialEffect < 0.27) {
      setTimeout(() => {
        triggerConfession();
      }, 600);
    }
  };

  const handleProductClick = (product?: any) => {
    // Track fast clicking for achievement
    const now = Date.now();
    setClickTimes(prev => {
      const recent = [...prev, now].filter(time => now - time < 2000);
      if (recent.length >= 10) {
        trackInteraction('fast_clicks', { clickCount: recent.length, timespan: now - recent[0] });
      }
      return recent;
    });
    
    playProductClickSound();
    trackInteraction('product_click');
    trackAudioPlayed('product-click');
    
    // Trigger character-specific events based on product
    if (product?.character && Math.random() < 0.2) { // 20% chance for character events
      switch (product.character) {
        case 'dio':
          triggerDioEvent();
          break;
        case 'giorno':
          triggerGiornoEvent();
          break;
        case 'jotaro':
          // Jotaro events can use time stop
          setTimeout(() => playTimeStopSound(), 1000);
          break;
        case 'kira':
          // Random chance between regular Kira event and Bites the Dust
          if (Math.random() < 0.5) {
            triggerKiraEvent();
          } else {
            triggerBitesTheDustEvent();
          }
          break;
        case 'pillarmen':
          triggerPillarmenEvent();
          break;
        case 'requiem':
          triggerTortureDanceEvent();
          break;
        default:
          if (Math.random() < 0.3) {
            playRandomCatchphrase();
          }
      }
    } else if (Math.random() < 0.3) {
      playRandomCatchphrase();
    }
  };

  const handleMenacingClick = () => {
    playMenacingSound();
    triggerRandomMemeSound();
    trackInteraction('menacing_click');
    trackAudioPlayed('menacing');
  };

  // Show loading screen while checking intro
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-4xl text-gold-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  // Show intro video if user hasn't seen it
  if (showIntro) {
    return <JojoIntroVideo onComplete={handleIntroComplete} />;
  }

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
            className={`text-7xl font-bold bg-gradient-to-r from-purple-400 via-gold-400 to-purple-600 bg-clip-text text-transparent mb-4 drop-shadow-2xl cursor-pointer transition-all duration-300 logo ${
              chaosMode ? 'animate-pulse scale-110' : 'hover:scale-105'
            }`}
            onClick={() => {
              triggerZaWarudoEffect(); // Trigger the Za Warudo effect!
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
          <div className="mt-6 flex justify-center items-center gap-4 flex-wrap">
            <AchievementTracker />
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
              onClick={triggerGiornoEvent}
              className="bg-blue-700 hover:bg-blue-600 text-xs"
            >
              🎹 GIORNO EVENT
            </Button>
            <Button
              onClick={triggerDioEvent}
              className="bg-red-700 hover:bg-red-600 text-xs animate-pulse"
            >
              🧛 DIO EVENT
            </Button>
            <Button
              onClick={triggerPillarmenEvent}
              className="bg-stone-700 hover:bg-stone-600 text-xs"
            >
              🗿 PILLARMEN
            </Button>
            <Button
              onClick={triggerKiraEvent}
              className="bg-pink-700 hover:bg-pink-600 text-xs"
            >
              💀 KIRA EVENT
            </Button>
            <Button
              onClick={triggerTortureDanceEvent}
              className="bg-yellow-700 hover:bg-yellow-600 text-xs animate-bounce"
            >
              💃 TORTURE DANCE
            </Button>
            <Button
              onClick={triggerBitesTheDustEvent}
              className="bg-gray-800 hover:bg-gray-700 text-xs border-2 border-red-500 animate-pulse"
            >
              💣 BITES THE DUST
            </Button>
            <Button
              onClick={triggerZaWarudoEffect}
              className="bg-yellow-600 hover:bg-yellow-500 text-xs animate-pulse"
            >
              ⏰ ZA WARUDO!
            </Button>
            <Button
              onClick={resetIntro}
              className="bg-green-600 hover:bg-green-500 text-xs"
            >
              🎬 REPLAY INTRO
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
          
          {/* Enhanced Audio Control Panel */}
          {showAudioControls && (
            <div className="mt-4">
              <AudioControlPanel
                volume={volume}
                backgroundVolume={backgroundVolume || 0.3}
                sfxVolume={sfxVolume || 0.7}
                chaosMode={chaosMode}
                onVolumeChange={changeVolume}
                onBackgroundVolumeChange={changeBackgroundVolume || (() => {})}
                onSfxVolumeChange={changeSfxVolume || (() => {})}
                onChaosToggle={toggleChaosMode}
              />
            </div>
          )}
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-gradient-to-b from-purple-900/80 to-black/90 rounded-lg p-6 border-2 border-gold-400 hover:border-gold-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 cursor-pointer product-card ${
                chaosMode ? 'animate-pulse border-red-400' : ''
              }`}
              onClick={() => handleProductClick(product)}
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
                  addToCart(product);
                  
                  // Reduced chance for Za Warudo effect on cart add
                  if (Math.random() < 0.25) { // 15% chance (was 25%)
                    setTimeout(() => triggerZaWarudoEffect(), 1000);
                  }
                }}
                className={`w-full font-bold py-3 text-lg transition-all duration-300 transform hover:scale-105 cart-button ${
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
                trackInteraction('dio_footer_click');
                trackAudioPlayed('za-warudo-stop');
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
      
      {/* Achievement Notifications */}
      <AchievementNotifications 
        achievements={newUnlocks}
        onClearAll={clearNewUnlocks}
      />
      
      {/* JoJo Intro Experience */}
      <JojoIntro />
      
      {/* Za Warudo Time Stop Effect (Original) */}
      <ZaWarudo />
      
      {/* Easter Egg Discovery System */}
      <EasterEggs />
      <SecretJojoButton />
      <HiddenMenacingText />
      <KonoMemeReference />
    </div>
  );
}

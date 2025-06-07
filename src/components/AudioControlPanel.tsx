'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  // Background Music
  playPillarmenTheme,
  playGiornoTheme,
  playKiraTheme,
  playTortureDance,
  playMadeInHeaven,
  stopBackgroundMusic,
  
  // Event Sounds
  playToBeContinued,
  playTimeStop,
  playZaWarudoHeaven,
  playStarPlatinumZaWarudo,
  
  // Catchphrases
  playItWasMeDio,
  playKonoDioDa,
  playDioWryyy,
  playMudaMudaMuda,
  playYareYareDaze,
  playGiornoDream,
  playJosephOhMyGod,
  playOhNoJoseph,
  playShiza,
  playArrivederci,
  playJoestarRun,
  
  // SFX
  playDoYouUnderstand,
  playReroRero,
  playKillerQueen,
  
  // Smart Functions
  playRandomCatchphrase,
  playRandomBackgroundMusic,
  triggerAudioBrainrot,
  
  // Control Functions
  enableAudioChaos,
  disableAudioChaos,
  setMasterVolume,
  setBackgroundVolume,
  setSfxVolume,
  stopAllAudio,
  getCurrentlyPlaying
} from '@/lib/audio';

interface AudioControlPanelProps {
  volume: number;
  backgroundVolume: number;
  sfxVolume: number;
  chaosMode: boolean;
  onVolumeChange: (volume: number) => void;
  onBackgroundVolumeChange: (volume: number) => void;
  onSfxVolumeChange: (volume: number) => void;
  onChaosToggle: () => void;
}

export function AudioControlPanel({
  volume,
  backgroundVolume,
  sfxVolume,
  chaosMode,
  onVolumeChange,
  onBackgroundVolumeChange,
  onSfxVolumeChange,
  onChaosToggle
}: AudioControlPanelProps) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string[]>([]);

  const updateCurrentlyPlaying = () => {
    setCurrentlyPlaying(getCurrentlyPlaying());
  };

  const playAndUpdate = (playFunction: () => void) => {
    playFunction();
    setTimeout(updateCurrentlyPlaying, 100);
  };

  return (
    <Card className="w-full max-w-4xl bg-purple-900/80 border-gold-400">
      <CardHeader>
        <CardTitle className="text-gold-300 text-center">🎵 JoJo Audio Control Center 🎵</CardTitle>
        <div className="text-sm text-purple-300 text-center">
          Currently Playing: {currentlyPlaying.length > 0 ? currentlyPlaying.join(', ') : 'Silence...'}
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Volume Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-gold-300 text-sm">Master Volume: {Math.round(volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-gold-300 text-sm">Background Music: {Math.round(backgroundVolume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={backgroundVolume}
              onChange={(e) => onBackgroundVolumeChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-gold-300 text-sm">SFX & Voices: {Math.round(sfxVolume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={sfxVolume}
              onChange={(e) => onSfxVolumeChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          <Button
            onClick={onChaosToggle}
            className={`${chaosMode ? 'bg-red-600 animate-pulse' : 'bg-orange-600'} hover:bg-red-500`}
          >
            {chaosMode ? '🔥 DISABLE CHAOS' : '💀 CHAOS MODE'}
          </Button>
          
          <Button onClick={() => playAndUpdate(triggerAudioBrainrot)} className="bg-pink-700 hover:bg-pink-600 animate-pulse">
            🧠💀 BRAINROT
          </Button>
          
          <Button onClick={() => playAndUpdate(stopAllAudio)} className="bg-red-600 hover:bg-red-500">
            🔇 STOP ALL
          </Button>
          
          <Button onClick={updateCurrentlyPlaying} className="bg-blue-600 hover:bg-blue-500">
            🔄 Refresh Status
          </Button>
        </div>

        {/* Categorized Audio Controls */}
        <Tabs defaultValue="background" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-purple-800">
            <TabsTrigger value="background" className="text-gold-300">🎼 Background</TabsTrigger>
            <TabsTrigger value="events" className="text-gold-300">⚡ Events</TabsTrigger>
            <TabsTrigger value="voices" className="text-gold-300">💬 Voices</TabsTrigger>
            <TabsTrigger value="sfx" className="text-gold-300">🔊 SFX</TabsTrigger>
          </TabsList>

          {/* Background Music */}
          <TabsContent value="background" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-gold-300 text-lg">Atmospheric Background Music</h3>
              <p className="text-purple-300 text-sm">Long themes that set the mood (only one plays at a time)</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Button onClick={() => playAndUpdate(playPillarmenTheme)} className="bg-purple-600 hover:bg-purple-500">
                ゴ Pillarmen Theme
              </Button>
              <Button onClick={() => playAndUpdate(playGiornoTheme)} className="bg-blue-600 hover:bg-blue-500">
                🎹 Giorno Theme
              </Button>
              <Button onClick={() => playAndUpdate(playKiraTheme)} className="bg-pink-600 hover:bg-pink-500">
                💀 Kira Theme
              </Button>
              <Button onClick={() => playAndUpdate(playTortureDance)} className="bg-green-600 hover:bg-green-500">
                💃 Torture Dance
              </Button>
              <Button onClick={() => playAndUpdate(playMadeInHeaven)} className="bg-indigo-600 hover:bg-indigo-500">
                ⚡ Made in Heaven
              </Button>
              <Button onClick={() => playAndUpdate(stopBackgroundMusic)} className="bg-red-600 hover:bg-red-500">
                🔇 Stop Background
              </Button>
            </div>
            
            <div className="text-center">
              <Button onClick={() => playAndUpdate(playRandomBackgroundMusic)} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                🎲 Random Background
              </Button>
            </div>
          </TabsContent>

          {/* Event Sounds */}
          <TabsContent value="events" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-gold-300 text-lg">Epic Event Sounds</h3>
              <p className="text-purple-300 text-sm">High priority dramatic moments that interrupt other audio</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button onClick={() => playAndUpdate(playToBeContinued)} className="bg-yellow-600 hover:bg-yellow-500">
                ⏸️ To Be Continued
              </Button>
              <Button onClick={() => playAndUpdate(playTimeStop)} className="bg-blue-600 hover:bg-blue-500">
                ⏰ Za Warudo
              </Button>
              <Button onClick={() => playAndUpdate(playZaWarudoHeaven)} className="bg-purple-600 hover:bg-purple-500">
                👼 Heaven DIO
              </Button>
              <Button onClick={() => playAndUpdate(playStarPlatinumZaWarudo)} className="bg-orange-600 hover:bg-orange-500">
                ⭐ Star Platinum
              </Button>
            </div>
          </TabsContent>

          {/* Character Voices */}
          <TabsContent value="voices" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-gold-300 text-lg">Character Catchphrases</h3>
              <p className="text-purple-300 text-sm">Iconic JoJo character voices (respects 3-second cooldowns)</p>
            </div>
            
            <div className="space-y-4">
              {/* DIO Section */}
              <div>
                <h4 className="text-red-400 font-bold mb-2">🧛 DIO</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button onClick={() => playAndUpdate(playItWasMeDio)} className="bg-red-600 hover:bg-red-500">
                    😈 It was me, DIO!
                  </Button>
                  <Button onClick={() => playAndUpdate(playKonoDioDa)} className="bg-red-700 hover:bg-red-600">
                    👑 KONO DIO DA!
                  </Button>
                  <Button onClick={() => playAndUpdate(playDioWryyy)} className="bg-red-800 hover:bg-red-700">
                    💀 WRYYY!
                  </Button>
                  <Button onClick={() => playAndUpdate(playMudaMudaMuda)} className="bg-red-500 hover:bg-red-400">
                    👊 MUDA MUDA MUDA
                  </Button>
                </div>
              </div>

              {/* Jotaro Section */}
              <div>
                <h4 className="text-blue-400 font-bold mb-2">🌟 Jotaro</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button onClick={() => playAndUpdate(playYareYareDaze)} className="bg-blue-600 hover:bg-blue-500">
                    😤 Yare Yare Daze
                  </Button>
                </div>
              </div>

              {/* Other Characters */}
              <div>
                <h4 className="text-green-400 font-bold mb-2">👥 Other Characters</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  <Button onClick={() => playAndUpdate(playGiornoDream)} className="bg-blue-500 hover:bg-blue-400">
                    💫 I have a dream
                  </Button>
                  <Button onClick={() => playAndUpdate(playJosephOhMyGod)} className="bg-orange-600 hover:bg-orange-500">
                    😱 OH MY GOD!
                  </Button>
                  <Button onClick={() => playAndUpdate(playOhNoJoseph)} className="bg-orange-500 hover:bg-orange-400">
                    😰 OH NO!
                  </Button>
                  <Button onClick={() => playAndUpdate(playShiza)} className="bg-green-600 hover:bg-green-500">
                    💔 SHIZAAAAA
                  </Button>
                  <Button onClick={() => playAndUpdate(playArrivederci)} className="bg-purple-500 hover:bg-purple-400">
                    👋 Arrivederci
                  </Button>
                  <Button onClick={() => playAndUpdate(playJoestarRun)} className="bg-yellow-600 hover:bg-yellow-500">
                    🏃 Joestar Run
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button onClick={() => playAndUpdate(playRandomCatchphrase)} className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500">
                🎲 Random Catchphrase
              </Button>
            </div>
          </TabsContent>

          {/* SFX */}
          <TabsContent value="sfx" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-gold-300 text-lg">Sound Effects</h3>
              <p className="text-purple-300 text-sm">Short interaction sounds (respects 1-second cooldowns)</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Button onClick={() => playAndUpdate(playDoYouUnderstand)} className="bg-gray-600 hover:bg-gray-500">
                🤔 Do you understand?
              </Button>
              <Button onClick={() => playAndUpdate(playReroRero)} className="bg-pink-600 hover:bg-pink-500">
                👅 Rero Rero Rero
              </Button>
              <Button onClick={() => playAndUpdate(playKillerQueen)} className="bg-purple-600 hover:bg-purple-500">
                💥 Killer Queen
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
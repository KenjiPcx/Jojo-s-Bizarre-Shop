'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBrainrotEffects } from '@/hooks/useBrainrotEffects';
import { playOra, playMuda, playTimeStop } from '@/lib/audio';

export function StandBattle() {
  const { standBattle, standBattleEnemy, dismissStandBattle } = useBrainrotEffects();
  const [battlePhase, setBattlePhase] = useState<'encounter' | 'attack' | 'victory'>('encounter');
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [battleText, setBattleText] = useState('');

  useEffect(() => {
    if (standBattle) {
      setBattlePhase('encounter');
      setPlayerHP(100);
      setEnemyHP(100);
      setBattleText('A Stand battle has begun!');
    }
  }, [standBattle]);

  const handleAttack = (attackType: 'ora' | 'muda' | 'timestop') => {
    if (battlePhase !== 'attack' && battlePhase !== 'encounter') return;

    setBattlePhase('attack');
    
    let damage = 0;
    let soundEffect = playOra;
    let attackText = '';

    switch (attackType) {
      case 'ora':
        damage = 20 + Math.random() * 30;
        soundEffect = playOra;
        attackText = 'ORA ORA ORA! You unleash a barrage of punches!';
        break;
      case 'muda':
        damage = 15 + Math.random() * 25;
        soundEffect = playMuda;
        attackText = 'MUDA MUDA MUDA! You counter with incredible speed!';
        break;
      case 'timestop':
        damage = 40 + Math.random() * 20;
        soundEffect = playTimeStop;
        attackText = 'ZA WARUDO! Time stops as you land a devastating blow!';
        break;
    }

    soundEffect();
    setBattleText(attackText);
    
    setTimeout(() => {
      const newEnemyHP = Math.max(0, enemyHP - damage);
      setEnemyHP(newEnemyHP);
      
      if (newEnemyHP <= 0) {
        setBattlePhase('victory');
        setBattleText('Victory! You defeated the enemy Stand user!');
        setTimeout(() => {
          dismissStandBattle();
        }, 3000);
      } else {
        // Enemy counter-attack
        const enemyDamage = 10 + Math.random() * 20;
        const newPlayerHP = Math.max(0, playerHP - enemyDamage);
        setPlayerHP(newPlayerHP);
        setBattleText(`The enemy attacks back! You take ${Math.round(enemyDamage)} damage!`);
        
        if (newPlayerHP <= 0) {
          setBattlePhase('victory');
          setBattleText('Defeat! But you can try shopping again...');
          setTimeout(() => {
            dismissStandBattle();
          }, 3000);
        }
      }
    }, 2000);
  };

  if (!standBattle) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-purple-900 to-black border-4 border-yellow-400 animate-pulse">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">⚡</div>
          <CardTitle className="text-2xl text-yellow-400">STAND BATTLE!</CardTitle>
          <Badge className="mx-auto bg-red-600 text-white">
            ゴゴゴゴ MENACING ゴゴゴゴ
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center text-white">
            <p className="mb-4 italic">{standBattleEnemy}</p>
          </div>

          {/* Health Bars */}
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-400">Your Stand</span>
                <span className="text-green-400">{playerHP}/100</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${playerHP}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-400">Enemy Stand</span>
                <span className="text-red-400">{enemyHP}/100</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-red-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${enemyHP}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Battle Text */}
          <div className="bg-black/50 p-3 rounded-lg border border-purple-500">
            <p className="text-yellow-300 text-center text-sm">{battleText}</p>
          </div>

          {/* Attack Buttons */}
          {battlePhase !== 'victory' && (
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => handleAttack('ora')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs p-2"
                disabled={battlePhase === 'attack'}
              >
                ORA ORA
              </Button>
              <Button
                onClick={() => handleAttack('muda')}
                className="bg-yellow-600 hover:bg-yellow-700 text-black text-xs p-2"
                disabled={battlePhase === 'attack'}
              >
                MUDA MUDA
              </Button>
              <Button
                onClick={() => handleAttack('timestop')}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs p-2"
                disabled={battlePhase === 'attack'}
              >
                TIME STOP
              </Button>
            </div>
          )}

          {/* Escape Button */}
          <Button
            onClick={dismissStandBattle}
            variant="outline"
            className="w-full border-gray-500 text-gray-400 hover:bg-gray-700"
          >
            {battlePhase === 'victory' ? 'Continue Shopping' : 'Retreat from Battle'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useAchievements, Achievement } from '@/hooks/useAchievements';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Trophy, ChevronDown, Lock, Star, Volume2, MousePointer, ShoppingCart, Search, Zap, Eye } from 'lucide-react';

export function AchievementTracker() {
  const { 
    achievements, 
    getUnlockedCount, 
    getTotalCount, 
    getCompletionPercentage,
    getAchievementsByCategory,
    getVisibleAchievements
  } = useAchievements();
  
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    audio: true,
    interaction: false,
    shopping: false,
    discovery: false,
    chaos: false,
    secret: false
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'audio': return <Volume2 className="w-4 h-4" />;
      case 'interaction': return <MousePointer className="w-4 h-4" />;
      case 'shopping': return <ShoppingCart className="w-4 h-4" />;
      case 'discovery': return <Search className="w-4 h-4" />;
      case 'chaos': return <Zap className="w-4 h-4" />;
      case 'secret': return <Eye className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getCategoryName = (category: Achievement['category']) => {
    switch (category) {
      case 'audio': return 'Audio Master';
      case 'interaction': return 'Interaction Expert';
      case 'shopping': return 'Shopping Pro';
      case 'discovery': return 'Explorer';
      case 'chaos': return 'Chaos Survivor';
      case 'secret': return 'Secret Hunter';
      default: return 'Miscellaneous';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const categories: Achievement['category'][] = ['audio', 'interaction', 'shopping', 'discovery', 'chaos', 'secret'];
  const visibleAchievements = getVisibleAchievements();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="relative bg-gradient-to-r from-purple-900/80 to-gold-900/80 border-gold-400 text-gold-300 hover:bg-purple-800/80 transition-all duration-300"
        >
          <Trophy className="w-4 h-4 mr-2" />
          Achievements ({getUnlockedCount()}/{getTotalCount()})
          {getUnlockedCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 min-w-[20px] h-5">
              {getCompletionPercentage()}%
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black via-purple-900 to-black border-gold-400">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-gold-400 to-purple-600 bg-clip-text text-transparent mb-2">
              Stand User Achievements
            </h2>
            <p className="text-purple-300 italic mb-4">
              "Your next line is... 'I need to unlock them all!'"
            </p>
            
            {/* Overall Progress */}
            <div className="bg-purple-900/50 p-4 rounded-lg border border-gold-400/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gold-300 font-bold">Overall Progress</span>
                <span className="text-purple-300">{getUnlockedCount()}/{getTotalCount()}</span>
              </div>
              <Progress 
                value={getCompletionPercentage()} 
                className="h-3 bg-purple-900"
              />
              <div className="text-center mt-2">
                <span className={`text-lg font-bold ${
                  getCompletionPercentage() === 100 ? 'text-gold-300' :
                  getCompletionPercentage() >= 75 ? 'text-green-400' :
                  getCompletionPercentage() >= 50 ? 'text-yellow-400' :
                  getCompletionPercentage() >= 25 ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {getCompletionPercentage()}% Complete
                </span>
              </div>
            </div>
          </div>

          {/* Tabs for different views */}
          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-purple-900/50">
              <TabsTrigger value="categories" className="text-gold-300">By Category</TabsTrigger>
              <TabsTrigger value="recent" className="text-gold-300">Recent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="space-y-4">
              {categories.map(category => {
                const categoryAchievements = getAchievementsByCategory(category)
                  .filter(a => !a.isHidden || a.unlocked);
                const unlockedCount = categoryAchievements.filter(a => a.unlocked).length;
                
                if (categoryAchievements.length === 0) return null;
                
                return (
                  <Collapsible 
                    key={category}
                    open={expandedCategories[category]}
                    onOpenChange={() => toggleCategory(category)}
                  >
                    <CollapsibleTrigger asChild>
                      <Card className="bg-gradient-to-r from-purple-900/80 to-black/90 border-gold-400/50 hover:border-gold-400 transition-all duration-300 cursor-pointer">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-purple-700 rounded-full">
                                {getCategoryIcon(category)}
                              </div>
                              <div>
                                <CardTitle className="text-gold-300">{getCategoryName(category)}</CardTitle>
                                <CardDescription className="text-purple-300">
                                  {unlockedCount}/{categoryAchievements.length} unlocked
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={(unlockedCount / categoryAchievements.length) * 100}
                                className="w-24 h-2"
                              />
                              <ChevronDown className={`w-5 h-5 text-gold-300 transition-transform ${
                                expandedCategories[category] ? 'rotate-180' : ''
                              }`} />
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="space-y-2 mt-2">
                      {categoryAchievements.map(achievement => (
                        <Card 
                          key={achievement.id}
                          className={`transition-all duration-300 ${
                            achievement.unlocked 
                              ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-400/50'
                              : 'bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-gray-600/50'
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className={`text-2xl p-2 rounded-full ${
                                achievement.unlocked ? 'bg-green-600' : 'bg-gray-600'
                              }`}>
                                {achievement.unlocked ? achievement.icon : <Lock className="w-4 h-4" />}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className={`font-bold text-sm ${
                                    achievement.unlocked ? 'text-green-300' : 'text-gray-400'
                                  }`}>
                                    {achievement.unlocked ? achievement.title : '???'}
                                  </h4>
                                  {achievement.unlocked && achievement.unlockedAt && (
                                    <Badge className="text-xs bg-purple-700 text-gold-300">
                                      {formatTimeAgo(achievement.unlockedAt)}
                                    </Badge>
                                  )}
                                  {achievement.isHidden && achievement.unlocked && (
                                    <Badge className="text-xs bg-gold-600 text-black">
                                      SECRET
                                    </Badge>
                                  )}
                                </div>
                                
                                <p className={`text-xs mb-2 ${
                                  achievement.unlocked ? 'text-white' : 'text-gray-500'
                                }`}>
                                  {achievement.unlocked ? achievement.description : 'Hidden achievement'}
                                </p>
                                
                                {achievement.maxProgress > 1 && (
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-purple-300">Progress</span>
                                      <span className="text-purple-300">
                                        {achievement.progress}/{achievement.maxProgress}
                                      </span>
                                    </div>
                                    <Progress 
                                      value={(achievement.progress / achievement.maxProgress) * 100}
                                      className="h-2"
                                    />
                                  </div>
                                )}
                                
                                {achievement.unlocked && (
                                  <p className="text-purple-300 text-xs italic mt-2">
                                    {achievement.jojoReference}
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-4">
              {visibleAchievements
                .filter(a => a.unlocked)
                .sort((a, b) => (b.unlockedAt || 0) - (a.unlockedAt || 0))
                .slice(0, 10)
                .map(achievement => (
                  <Card 
                    key={achievement.id}
                    className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-400/50"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl p-2 rounded-full bg-green-600">
                          {achievement.icon}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-green-300 text-sm">
                              {achievement.title}
                            </h4>
                            <Badge className="text-xs bg-purple-700 text-gold-300">
                              {getCategoryName(achievement.category)}
                            </Badge>
                            {achievement.unlockedAt && (
                              <Badge className="text-xs bg-gray-700 text-gray-300">
                                {formatTimeAgo(achievement.unlockedAt)}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-white text-xs mb-2">
                            {achievement.description}
                          </p>
                          
                          <p className="text-purple-300 text-xs italic">
                            {achievement.jojoReference}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
              {visibleAchievements.filter(a => a.unlocked).length === 0 && (
                <Card className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-gray-600/50">
                  <CardContent className="p-8 text-center">
                    <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-gray-400 text-lg font-bold mb-2">No Achievements Yet</h3>
                    <p className="text-gray-500 text-sm">
                      Start exploring the bizarre shop to unlock achievements!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Fun Stats */}
          <Card className="bg-gradient-to-r from-purple-900/50 to-gold-900/50 border-gold-400/30">
            <CardHeader>
              <CardTitle className="text-gold-300 text-center">Bizarre Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-300">{getUnlockedCount()}</div>
                  <div className="text-xs text-gray-400">Achievements</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold-300">{getCompletionPercentage()}%</div>
                  <div className="text-xs text-gray-400">Complete</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-300">
                    {visibleAchievements.filter(a => a.category === 'secret' && a.unlocked).length}
                  </div>
                  <div className="text-xs text-gray-400">Secrets Found</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-300">
                    {visibleAchievements.filter(a => a.category === 'chaos' && a.unlocked).length}
                  </div>
                  <div className="text-xs text-gray-400">Chaos Survived</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
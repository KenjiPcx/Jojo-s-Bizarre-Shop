'use client';

import { useState, useEffect, useRef } from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { useBrainrotEffects } from '@/hooks/useBrainrotEffects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToBeContinued } from '@/components/ToBeContinued';
import { useDioFaceSwap, DioFaceSwap } from '@/components/DioFaceSwap';
import { playOra } from '@/lib/audio';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [menacingFloat, setMenacingFloat] = useState(0);
  const [priceGlitch, setPriceGlitch] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(product.price);
  const [isInView, setIsInView] = useState(false);
  const [dramaticZoom, setDramaticZoom] = useState(false);
  const { dioMode, priceRejectMode, getPriceMultiplier, getPriceEffectText } = useBrainrotEffects();
  const { triggerOnProductHover, triggerOnAddToCart, ToBeContinuedComponent } = useToBeContinued();
  const { isDioSwapped } = useDioFaceSwap();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMenacingFloat(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll-triggered dramatic zoom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            
            // Random chance for dramatic zoom when card comes into view
            if (Math.random() < 0.3) {
              setDramaticZoom(true);
              playOra();
              setTimeout(() => setDramaticZoom(false), 1000);
            }
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '-50px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const multiplier = getPriceMultiplier();
    const newPrice = product.price * multiplier;
    
    if (multiplier !== 1) {
      setPriceGlitch(true);
      setCurrentPrice(newPrice);
      
      setTimeout(() => {
        if (getPriceMultiplier() === 1) {
          setPriceGlitch(false);
          setCurrentPrice(product.price);
        }
      }, 2000);
    } else {
      setPriceGlitch(false);
      setCurrentPrice(product.price);
    }
  }, [product.price, dioMode, priceRejectMode]);

  const handleAddToCart = () => {
    playOra();
    addToCart(product);
    triggerOnAddToCart(); // 20% chance to trigger "To Be Continued"
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'legendary': return 'bg-purple-500';
      case 'godly': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getMenacingSymbols = () => {
    return Array.from({ length: product.menacingLevel }, (_, i) => (
      <span
        key={i}
        className="absolute text-red-600 font-bold animate-pulse select-none"
        style={{
          transform: `translate(${Math.sin(menacingFloat * 0.1 + i) * 20}px, ${Math.cos(menacingFloat * 0.1 + i) * 20}px)`,
          fontSize: `${12 + product.menacingLevel * 2}px`,
          left: `${10 + i * 15}%`,
          top: `${10 + (i % 2) * 20}%`,
          zIndex: 1
        }}
      >
        ゴ
      </span>
    ));
  };

  return (
    <Card 
      ref={cardRef}
      data-product={product.id}
      className={`relative group transition-all duration-500 overflow-hidden border-2 product-card ${
        isHovered 
          ? 'border-yellow-400 shadow-[0_0_30px_rgba(255,215,0,0.5)] scale-105' 
          : 'border-purple-600'
      } ${product.rarity === 'godly' ? 'animate-pulse' : ''} ${
        dramaticZoom 
          ? 'scale-125 z-50 shadow-[0_0_50px_rgba(255,215,0,0.8)] border-yellow-300' 
          : ''
      } ${isInView ? 'animate-slideIn' : 'opacity-0 translate-y-8'}`}
      onMouseEnter={() => {
        setIsHovered(true);
        triggerOnProductHover(); // 20% chance to trigger "To Be Continued"
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Menacing Symbols */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {getMenacingSymbols()}
        </div>
      )}

      {/* Speed Lines Background */}
      {(isHovered || dramaticZoom) && (
        <div className="absolute inset-0 pointer-events-none z-5">
          {/* Regular hover speed lines */}
          {isHovered && !dramaticZoom && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse"></div>
          )}
          
          {/* Dramatic zoom speed lines */}
          {dramaticZoom && (
            <>
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="absolute bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-70"
                  style={{
                    width: '100%',
                    height: '2px',
                    top: `${10 + i * 12}%`,
                    transform: 'skewX(-25deg)',
                    animation: `speedLineCard 0.5s ease-out ${i * 0.05}s`
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-radial from-yellow-300/20 to-transparent animate-ping"></div>
            </>
          )}
        </div>
      )}

      <CardHeader className="relative">
        <div className="flex justify-between items-start">
          <Badge className={`${getRarityColor(product.rarity)} text-white text-xs font-bold uppercase tracking-wider`}>
            {product.rarity}
          </Badge>
          {product.category === 'limited' && (
            <Badge className="bg-red-600 text-white animate-bounce">
              LIMITED!
            </Badge>
          )}
        </div>
        
        <DioFaceSwap isActive={isDioSwapped}>
          <div className="w-full h-48 bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
            {/* Placeholder for product image */}
            <div className="text-6xl product-image">
              {product.category === 'stand' && '👻'}
              {product.category === 'figure' && '🗿'}
              {product.category === 'manga' && '📖'}
              {product.category === 'cosplay' && '👔'}
              {product.category === 'artifact' && '💎'}
              {product.category === 'limited' && '⭐'}
            </div>
            
            {/* Dramatic lighting effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent animate-pulse"></div>
          </div>
        </DioFaceSwap>

        <CardTitle className={`text-lg font-bold ${priceGlitch ? 'animate-pulse text-red-500' : 'text-yellow-400'}`}>
          {product.name}
        </CardTitle>
        
        {product.standPower && (
          <Badge variant="outline" className="text-xs text-green-400 border-green-400">
            Stand Power: {product.standPower}
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        <CardDescription className="text-sm text-gray-300 mb-3">
          {product.description}
        </CardDescription>
        
        <div className="text-xs text-blue-400 italic mb-3">
          JoJo Reference: {product.jojoReference}
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-400">Menacing Level:</span>
          <span className="menacing-text">
            {'ゴ'.repeat(product.menacingLevel)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-right">
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </div>
            )}
            <div className={`text-xl font-bold price-tag ${priceGlitch ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
              ${currentPrice.toFixed(2)}
              {priceGlitch && getPriceEffectText() && (
                <span className="text-xs ml-2 text-red-400">({getPriceEffectText()})</span>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            Stock: {product.inStock}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        {isInCart(product.id) && (
          <div className="text-sm text-green-400 font-bold">
            In Cart: {getItemQuantity(product.id)}
          </div>
        )}
        
        <Button 
          onClick={handleAddToCart}
          disabled={product.inStock === 0}
          className={`w-full font-bold text-lg transition-all duration-200 ${
            product.inStock === 0 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'add-to-cart-button'
          }`}
        >
          {product.inStock === 0 ? 'SOLD OUT' : 'ADD TO CART'}
        </Button>
        
        {Math.random() < 0.3 && (
          <div className="text-xs text-center text-purple-400 animate-pulse">
            "You thought it was a normal product, but it was me, DIO!"
          </div>
        )}
      </CardFooter>
      
      {/* To Be Continued Effect */}
      <ToBeContinuedComponent />
    </Card>
  );
}
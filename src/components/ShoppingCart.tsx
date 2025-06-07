'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { useJojoAudio } from '@/hooks/useJojoAudio';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart as CartIcon, Plus, Minus, Trash2 } from 'lucide-react';
import { CheckoutFlow } from './CheckoutFlow';
import { playMudaMudaMuda } from '@/lib/audio';
import { playKonoDioDa } from '@/lib/audio';

export function ShoppingCart() {
  const { cart, updateQuantity, removeFromCart, clearCart, getItemCount } = useCart();
  const { triggerRandomMemeSound } = useJojoAudio();
  const [isOpen, setIsOpen] = useState(false);
  const [dioMode, setDioMode] = useState(false);
  const [currentDioQuote, setCurrentDioQuote] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const dioQuotes = [
    "You thought you could modify your cart, but it was me, DIO!",
    "MUDA MUDA MUDA! Your cart changes are useless!",
    "ZA WARUDO! Time has stopped for your shopping!",
    "This must be the work of an enemy Stand user!",
    "You fell for it, fool! Thunder Cross Split Attack!",
    "Even Speedwagon is afraid of these prices!"
  ];

  useEffect(() => {
    // Random chance for DIO to take over the cart
    const interval = setInterval(() => {
      if (Math.random() < 0.05 && cart.items.length > 0) {
        setDioMode(true);
        setCurrentDioQuote(dioQuotes[Math.floor(Math.random() * dioQuotes.length)]);
        playKonoDioDa();
        
        setTimeout(() => {
          setDioMode(false);
          setCurrentDioQuote('');
        }, 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [cart.items.length]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (dioMode) {
      playMudaMudaMuda();
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    if (dioMode) {
      playMudaMudaMuda();
      return;
    }
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    if (dioMode) {
      playMudaMudaMuda();
      return;
    }
    clearCart();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative cart-button-menacing text-white">
          <CartIcon className="w-5 h-5 mr-2" />
          Cart
          {getItemCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
              {getItemCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="bg-gradient-to-b from-purple-900 to-black border-l-yellow-400 text-white w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className={`text-2xl font-bold ${dioMode ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>
            {dioMode ? "DIO'S CART!" : "Shopping Cart"}
          </SheetTitle>
          <SheetDescription className="text-purple-300">
            {dioMode ? currentDioQuote : `${getItemCount()} items in your bizarre collection`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cart.items.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-400">Your cart is as empty as Giorno's pockets before becoming a Gang-Star!</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="bg-black/50 p-4 rounded-lg border border-purple-500">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-yellow-400 text-sm">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          ${item.product.price.toFixed(2)} each
                        </p>
                        <Badge className="mt-2 text-xs" variant="outline">
                          {item.product.rarity}
                        </Badge>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.product.id)}
                        className={`text-red-400 hover:text-red-300 ${dioMode ? 'animate-pulse cursor-not-allowed' : ''}`}
                        disabled={dioMode}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || dioMode}
                          className={`w-8 h-8 p-0 ${dioMode ? 'cursor-not-allowed' : ''}`}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        
                        <span className="font-bold text-white min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.inStock || dioMode}
                          className={`w-8 h-8 p-0 ${dioMode ? 'cursor-not-allowed' : ''}`}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-green-400">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-yellow-400" />

              {/* Total */}
              <div className="space-y-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className={`${dioMode ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                    ${cart.total.toFixed(2)}
                  </span>
                </div>
                
                {dioMode && (
                  <div className="text-xs text-red-400 text-center animate-pulse">
                    DIO has frozen your cart in time! Wait for the effect to wear off...
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 text-lg"
                      disabled={dioMode}
                      onClick={() => {
                        if (!dioMode) {
                          triggerRandomMemeSound();
                          setIsOpen(false); // Close cart when opening checkout
                        }
                      }}
                    >
                      {dioMode ? 'MUDA MUDA MUDA!' : '🔥 CHECKOUT NOW! 🔥'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black via-purple-900 to-black">
                    <CheckoutFlow />
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="outline" 
                  className="w-full border-red-400 text-red-400 hover:bg-red-400 hover:text-black"
                  onClick={handleClearCart}
                  disabled={dioMode}
                >
                  {dioMode ? 'ZA WARUDO!' : 'Clear Cart'}
                </Button>
              </div>

              {/* Random JoJo Quote */}
              {Math.random() < 0.3 && !dioMode && (
                <div className="text-xs text-center text-purple-400 italic p-2 bg-purple-900/30 rounded">
                  "I, Giorno Giovanna, have a dream... to buy all this merchandise!"
                </div>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { useJojoAudio } from '@/hooks/useJojoAudio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, CreditCard, Truck, User, MapPin, Phone, Mail } from 'lucide-react';

interface CheckoutStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export function CheckoutFlow() {
  const { cart, clearCart } = useCart();
  const { playCheckoutSequence, playEnhancedCartSound, triggerRandomMemeSound } = useJojoAudio();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [jojoQuotes] = useState([
    "Your order has the power of Gold Experience!",
    "This purchase... it's the taste of victory!",
    "Even Speedwagon would approve of this transaction!",
    "Your next line is... 'When will this arrive?'",
    "Dio himself couldn't stop this order!",
    "This is the power of my Stand... [CHECKOUT COMPLETE]!"
  ]);

  const steps: CheckoutStep[] = [
    { id: 'info', title: 'Customer Information', icon: <User className="w-5 h-5" />, completed: currentStep > 1 },
    { id: 'payment', title: 'Payment Details', icon: <CreditCard className="w-5 h-5" />, completed: currentStep > 2 },
    { id: 'review', title: 'Review Order', icon: <CheckCircle className="w-5 h-5" />, completed: currentStep > 3 },
    { id: 'confirmation', title: 'Order Confirmation', icon: <Truck className="w-5 h-5" />, completed: orderPlaced }
  ];

  useEffect(() => {
    // Play entrance sound when checkout opens
    setTimeout(() => {
      playEnhancedCartSound();
    }, 500);
  }, [playEnhancedCartSound]);

  const validateStep1 = () => {
    return customerInfo.firstName && customerInfo.lastName && customerInfo.email && 
           customerInfo.address && customerInfo.city && customerInfo.zipCode;
  };

  const validateStep2 = () => {
    return paymentInfo.cardNumber.length >= 16 && paymentInfo.expiryDate && 
           paymentInfo.cvv.length >= 3 && paymentInfo.cardholderName;
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) {
      triggerRandomMemeSound();
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      triggerRandomMemeSound();
      return;
    }
    
    setCurrentStep(currentStep + 1);
    playEnhancedCartSound();
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Dramatic JoJo checkout sequence
    playCheckoutSequence();
    
    // Simulate processing with JoJo flair
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate order number with JoJo reference
    const orderNum = `JOJO-${Date.now()}-${Math.floor(Math.random() * 999)}`;
    setOrderNumber(orderNum);
    setOrderPlaced(true);
    setCurrentStep(4);
    setIsProcessing(false);
    
    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-green-900/80 to-emerald-900/80 border-gold-400 text-white">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl text-gold-300">Order Confirmed!</CardTitle>
            <CardDescription className="text-green-200 text-lg">
              {jojoQuotes[Math.floor(Math.random() * jojoQuotes.length)]}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-xl font-bold text-gold-300 mb-2">Order Number:</p>
              <Badge className="text-lg px-4 py-2 bg-purple-700 text-gold-300">
                {orderNumber}
              </Badge>
            </div>
            
            <Separator className="bg-gold-400/30" />
            
            <div className="space-y-2">
              <p className="text-green-200">📧 Confirmation email sent to: {customerInfo.email}</p>
              <p className="text-green-200">🚚 Estimated delivery: 3-5 business days</p>
              <p className="text-green-200">💰 Total paid: ${cart.total.toFixed(2)}</p>
            </div>
            
            <div className="bg-purple-900/50 p-4 rounded-lg border border-gold-400/30">
              <p className="text-gold-300 text-center font-bold">
                "Your bizarre adventure in shopping has concluded successfully!"
              </p>
              <p className="text-purple-200 text-center text-sm mt-2">
                - Dio Brando, CEO of JoJo's Bizarre Shop
              </p>
            </div>
            
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-500 hover:to-gold-500 text-white font-bold py-3"
            >
              Continue Shopping Adventure 🌟
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                ${currentStep > index + 1 || step.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : currentStep === index + 1
                  ? 'bg-purple-600 border-purple-600 text-white animate-pulse'
                  : 'bg-gray-600 border-gray-400 text-gray-400'
                }
              `}>
                {step.completed ? <CheckCircle className="w-5 h-5" /> : step.icon}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep === index + 1 ? 'text-gold-300' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 ml-4 ${
                  step.completed ? 'bg-green-500' : 'bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Customer Information */}
          {currentStep === 1 && (
            <Card className="bg-gradient-to-br from-purple-900/80 to-black/90 border-gold-400 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-300">
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
                <CardDescription className="text-purple-300">
                  "Tell us about yourself, Stand user!"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gold-300">First Name</Label>
                    <Input
                      id="firstName"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                      className="bg-black/50 border-purple-500 text-white"
                      placeholder="Jonathan"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gold-300">Last Name</Label>
                    <Input
                      id="lastName"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                      className="bg-black/50 border-purple-500 text-white"
                      placeholder="Joestar"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gold-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="bg-black/50 border-purple-500 text-white"
                    placeholder="jojo@bizarre.adventure"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-gold-300 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="bg-black/50 border-purple-500 text-white"
                    placeholder="(555) MUDA-MUDA"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address" className="text-gold-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="bg-black/50 border-purple-500 text-white"
                    placeholder="123 Bizarre Street"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gold-300">City</Label>
                    <Input
                      id="city"
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                      className="bg-black/50 border-purple-500 text-white"
                      placeholder="Morioh"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-gold-300">State</Label>
                    <Input
                      id="state"
                      value={customerInfo.state}
                      onChange={(e) => setCustomerInfo({...customerInfo, state: e.target.value})}
                      className="bg-black/50 border-purple-500 text-white"
                      placeholder="JA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-gold-300">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={customerInfo.zipCode}
                      onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                      className="bg-black/50 border-purple-500 text-white"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <Card className="bg-gradient-to-br from-purple-900/80 to-black/90 border-gold-400 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-300">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
                <CardDescription className="text-purple-300">
                  "Your wallet's power will be tested here!"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardholderName" className="text-gold-300">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    value={paymentInfo.cardholderName}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardholderName: e.target.value})}
                    className="bg-black/50 border-purple-500 text-white"
                    placeholder="Dio Brando"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cardNumber" className="text-gold-300">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={formatCardNumber(paymentInfo.cardNumber)}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value.replace(/\s/g, '')})}
                    className="bg-black/50 border-purple-500 text-white"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-gold-300">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                      className="bg-black/50 border-purple-500 text-white"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-gold-300">CVV</Label>
                    <Input
                      id="cvv"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      className="bg-black/50 border-purple-500 text-white"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
                
                <Alert className="border-gold-400 bg-purple-900/50">
                  <AlertDescription className="text-gold-300">
                    🔒 Your payment information is secured by the power of Gold Experience Requiem!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <Card className="bg-gradient-to-br from-purple-900/80 to-black/90 border-gold-400 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gold-300">
                  <CheckCircle className="w-5 h-5" />
                  Review Your Order
                </CardTitle>
                <CardDescription className="text-purple-300">
                  "This is your final Stand battle with indecision!"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Info Summary */}
                <div className="bg-black/30 p-4 rounded-lg border border-purple-500">
                  <h4 className="text-gold-300 font-bold mb-2">Shipping Information</h4>
                  <p className="text-white">{customerInfo.firstName} {customerInfo.lastName}</p>
                  <p className="text-gray-300">{customerInfo.address}</p>
                  <p className="text-gray-300">{customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}</p>
                  <p className="text-gray-300">{customerInfo.email}</p>
                </div>
                
                {/* Payment Info Summary */}
                <div className="bg-black/30 p-4 rounded-lg border border-purple-500">
                  <h4 className="text-gold-300 font-bold mb-2">Payment Method</h4>
                  <p className="text-white">Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                  <p className="text-gray-300">{paymentInfo.cardholderName}</p>
                </div>
                
                {/* Order Items */}
                <div className="bg-black/30 p-4 rounded-lg border border-purple-500">
                  <h4 className="text-gold-300 font-bold mb-2">Order Items</h4>
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center py-2">
                      <div>
                        <p className="text-white">{item.product.name}</p>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-gold-300 font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <Button
                onClick={handlePreviousStep}
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white"
              >
                ← Previous
              </Button>
            )}
            
            {currentStep < 3 ? (
              <Button
                onClick={handleNextStep}
                className="ml-auto bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-500 hover:to-gold-500 text-white font-bold"
              >
                Next →
              </Button>
            ) : (
              <Button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="ml-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold px-8 py-3"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </div>
                ) : (
                  '🔥 Place Order 🔥'
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-purple-900/80 to-black/90 border-gold-400 text-white sticky top-6">
            <CardHeader>
              <CardTitle className="text-gold-300">Order Summary</CardTitle>
              <CardDescription className="text-purple-300">
                Your bizarre shopping cart
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-white text-sm">{item.product.name}</p>
                    <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                    <Badge className="mt-1 text-xs bg-purple-700 text-gold-300">
                      {item.product.rarity}
                    </Badge>
                  </div>
                  <p className="text-gold-300 font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              
              <Separator className="bg-gold-400/30" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping:</span>
                  <span className="text-green-400">FREE!</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Stand Tax:</span>
                  <span>$0.00</span>
                </div>
                <Separator className="bg-gold-400/30" />
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gold-300">Total:</span>
                  <span className="text-gold-300">${cart.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-purple-900/50 p-3 rounded-lg border border-gold-400/30 mt-4">
                <p className="text-gold-300 text-sm text-center">
                  💎 "This deal has no weaknesses!" 💎
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
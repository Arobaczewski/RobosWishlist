'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  ArrowLeft, 
  CreditCard, 
  MapPin, 
  Package, 
  Check,
  ShoppingBag,
  AlertCircle,
  User,
  Shield,
  Info
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/store/hooks/useCart';
import AuthModal from '@/app/components/auth/AuthModal';

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface ShippingFormData {
  fullName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface PaymentFormData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  cardType: string;
}

export default function GuestCheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shipping, total, emptyCart } = useCart();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingData, setShippingData] = useState<ShippingFormData>({
    fullName: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  });
  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    cardType: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      router.push('/cart');
    }
  }, [items.length, router, isProcessing]);

  // Detect card type from number
  const detectCardType = (number: string): string => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (cleaned.startsWith('5')) return 'mastercard';
    if (cleaned.startsWith('3')) return 'amex';
    return 'unknown';
  };

  // Format card number with spaces
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substr(0, 19);
  };

  // Format expiry date
  const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substr(0, 2) + '/' + cleaned.substr(2, 2);
    }
    return cleaned;
  };

  // Validate shipping form
  const validateShipping = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!shippingData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!shippingData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!shippingData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!shippingData.city.trim()) newErrors.city = 'City is required';
    if (!shippingData.state.trim()) newErrors.state = 'State is required';
    if (!shippingData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!/^\d{5}(-\d{4})?$/.test(shippingData.zipCode)) newErrors.zipCode = 'Invalid ZIP code format';
    if (!shippingData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\+?[\d\s\-()]+$/.test(shippingData.phone)) newErrors.phone = 'Invalid phone number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate payment form
  const validatePayment = (): boolean => {
    const newErrors: Record<string, string> = {};

    const cleanedCard = paymentData.cardNumber.replace(/\s/g, '');
    if (!cleanedCard) newErrors.cardNumber = 'Card number is required';
    else if (cleanedCard.length < 13 || cleanedCard.length > 16) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!paymentData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
    
    if (!paymentData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    else {
      const [month, year] = paymentData.expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      if (!month || !year || parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Invalid expiry date';
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    if (!paymentData.cvv) newErrors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(paymentData.cvv)) newErrors.cvv = 'Invalid CVV';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (currentStep === 'shipping') {
      if (validateShipping()) {
        setCurrentStep('payment');
      }
    } else if (currentStep === 'payment') {
      if (validatePayment()) {
        setCurrentStep('review');
      }
    }
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      // Create guest order
      const guestOrder = {
        id: `guest-${Date.now()}`,
        orderNumber: `ORD-${Date.now().toString().slice(-8)}`,
        items: items.map(item => ({
          id: item.id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          selectedVariants: item.selectedVariants,
        })),
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress: shippingData,
        paymentInfo: {
          cardType: paymentData.cardType || detectCardType(paymentData.cardNumber),
          lastFourDigits: paymentData.cardNumber.replace(/\s/g, '').slice(-4),
          cardholderName: paymentData.cardholderName,
        },
        createdAt: new Date().toISOString(),
        status: 'processing',
        isGuest: true,
      };

      // Store in sessionStorage instead of localStorage for guest orders
      sessionStorage.setItem('lastGuestOrder', JSON.stringify(guestOrder));

      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Empty cart
      emptyCart();

      // Navigate to success page with order number
      router.push(`/checkout/success?order=${guestOrder.orderNumber}&guest=true`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while processing your order. Please try again.');
      setIsProcessing(false);
    }
  };

  const steps = [
    { id: 'shipping', name: 'Shipping', icon: MapPin },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'review', name: 'Review', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Demo Badge and Guest Indicator */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Guest Checkout
                </h1>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-semibold rounded-full">
                  <Shield className="w-4 h-4" />
                  Anonymous
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Complete your purchase without creating an account
              </p>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
            >
              <User className="w-5 h-5" />
              Sign In Instead
            </button>
          </div>

          {/* Prominent Demo Notice */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-400 dark:bg-yellow-600 rounded-full flex items-center justify-center">
                  <Info className="w-7 h-7 text-yellow-900 dark:text-yellow-100" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                  🎨 PORTFOLIO DEMONSTRATION
                </h3>
                <div className="space-y-1 text-yellow-800 dark:text-yellow-300">
                  <p className="font-semibold">
                    This is a demonstration of an e-commerce checkout flow.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                    <li>No actual payment will be processed</li>
                    <li>No products will be shipped</li>
                    <li>Your information is only stored in your browser session</li>
                    <li>Guest orders are cleared when you close the browser</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCurrent = currentStep === step.id;
              const isCompleted = 
                (step.id === 'shipping' && (currentStep === 'payment' || currentStep === 'review')) ||
                (step.id === 'payment' && currentStep === 'review');

              return (
                <div key={step.id} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isCurrent ? 1.1 : 1,
                        backgroundColor: isCompleted 
                          ? 'rgb(34, 197, 94)' 
                          : isCurrent 
                          ? 'rgb(147, 51, 234)' 
                          : 'rgb(209, 213, 219)'
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                        isCompleted 
                          ? 'bg-green-500' 
                          : isCurrent 
                          ? 'bg-purple-600' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <StepIcon className={`w-6 h-6 ${isCurrent ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                      )}
                    </motion.div>
                    <span className={`mt-2 text-sm font-medium ${
                      isCurrent 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : isCompleted 
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gray-300 dark:bg-gray-600 -z-10">
                      <motion.div
                        initial={false}
                        animate={{
                          width: isCompleted ? '100%' : '0%'
                        }}
                        className="h-full bg-green-500"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Shipping Information
                      </h2>
                    </div>

                    {/* Guest Info Notice */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800 dark:text-blue-300">
                          <p className="font-semibold mb-1">Checking out as guest</p>
                          <p>Your information will only be stored temporarily in your browser session and will not be saved to any server.</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={shippingData.fullName}
                          onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                          className={`w-full px-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                          placeholder="John Doe"
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={shippingData.email}
                          onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                          className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Address Line 1 *
                        </label>
                        <input
                          type="text"
                          value={shippingData.addressLine1}
                          onChange={(e) => setShippingData({ ...shippingData, addressLine1: e.target.value })}
                          className={`w-full px-4 py-3 border ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                          placeholder="123 Main St"
                        />
                        {errors.addressLine1 && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.addressLine1}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          value={shippingData.addressLine2}
                          onChange={(e) => setShippingData({ ...shippingData, addressLine2: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                          placeholder="Apt, Suite, etc. (optional)"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            value={shippingData.city}
                            onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                            className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                            placeholder="New York"
                          />
                          {errors.city && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            value={shippingData.state}
                            onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                            className={`w-full px-4 py-3 border ${errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                            placeholder="NY"
                          />
                          {errors.state && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.state}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            value={shippingData.zipCode}
                            onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                            className={`w-full px-4 py-3 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                            placeholder="10001"
                          />
                          {errors.zipCode && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.zipCode}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Country *
                          </label>
                          <select
                            value={shippingData.country}
                            onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                          >
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={shippingData.phone}
                          onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                          className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                          placeholder="+1 (555) 123-4567"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Link
                        href="/cart"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Cart
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                      >
                        Continue to Payment
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Payment Information
                      </h2>
                    </div>

                    {/* Demo Payment Notice */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-yellow-800 dark:text-yellow-300">
                          <p className="font-semibold mb-1">Demo Payment Form</p>
                          <p>Enter any card information - no actual payment will be processed. This is for demonstration purposes only.</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          value={paymentData.cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            setPaymentData({ 
                              ...paymentData, 
                              cardNumber: formatted,
                              cardType: detectCardType(formatted)
                            });
                          }}
                          className={`w-full px-4 py-3 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          value={paymentData.cardholderName}
                          onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
                          className={`w-full px-4 py-3 border ${errors.cardholderName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                          placeholder="John Doe"
                        />
                        {errors.cardholderName && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cardholderName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            value={paymentData.expiryDate}
                            onChange={(e) => setPaymentData({ ...paymentData, expiryDate: formatExpiryDate(e.target.value) })}
                            className={`w-full px-4 py-3 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.expiryDate && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.expiryDate}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={paymentData.cvv}
                            onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value.replace(/\D/g, '') })}
                            className={`w-full px-4 py-3 border ${errors.cvv ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
                            placeholder="123"
                            maxLength={4}
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        onClick={() => setCurrentStep('shipping')}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                      >
                        Review Order
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Review Step */}
              {currentStep === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Review Your Order
                    </h2>

                    {/* Shipping & Payment Info Review */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Shipping To:</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {shippingData.fullName}<br />
                          {shippingData.addressLine1}<br />
                          {shippingData.addressLine2 && <>{shippingData.addressLine2}<br /></>}
                          {shippingData.city}, {shippingData.state} {shippingData.zipCode}<br />
                          {shippingData.country}<br />
                          {shippingData.phone}<br />
                          {shippingData.email}
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Demo Warning */}
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-6 mb-6 shadow-md">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-yellow-400 dark:bg-yellow-600 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-7 h-7 text-yellow-900 dark:text-yellow-100" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-200 mb-3">
                            ⚠️ DEMO CHECKOUT - ANONYMOUS SESSION
                          </h3>
                          <div className="space-y-2 text-yellow-800 dark:text-yellow-300">
                            <p className="font-semibold text-base">
                              This is a portfolio demonstration:
                            </p>
                            <ul className="space-y-1.5 text-sm ml-4">
                              <li className="flex items-start gap-2">
                                <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">✓</span>
                                <span><strong>No payment</strong> will be charged to any card</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">✓</span>
                                <span><strong>No products</strong> will be shipped or delivered</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">✓</span>
                                <span><strong>Guest checkout</strong> - data stored only in your browser session</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">✓</span>
                                <span><strong>Your information</strong> will be cleared when you close your browser</span>
                              </li>
                            </ul>
                            <p className="text-xs mt-3 italic">
                              This demonstrates the checkout flow and user interface design only.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentStep('payment')}
                        disabled={isProcessing}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors disabled:opacity-50"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                      </button>
                      <motion.button
                        whileHover={!isProcessing ? { scale: 1.02 } : {}}
                        whileTap={!isProcessing ? { scale: 0.98 } : {}}
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Processing Demo...
                          </>
                        ) : (
                          <>
                            Place Demo Order
                            <Check className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>

              {/* Demo Badge in Sidebar */}
              <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3 mb-4">
                <p className="text-xs font-semibold text-yellow-800 dark:text-yellow-300 text-center">
                  🎨 DEMO PRICES
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Items Preview */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Items ({items.length})
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
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
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/store/hooks/useCart';
import { useOrders } from '@/app/store/hooks/useOrders';
import { useAppSelector } from '@/app/store/hooks/hooks';

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface ShippingFormData {
  fullName: string;
  email: string;  // For guest checkout
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

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shipping, total, emptyCart } = useCart();
  const { createOrder, loading } = useOrders();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [useSavedAddress, setUseSavedAddress] = useState(false);
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

  // Don't redirect unauthenticated users - allow guest checkout

  // Handle saved address checkbox
  useEffect(() => {
    if (useSavedAddress && user?.address) {
      // TypeScript guard: ensure address exists
      const address = user.address;
      
      setShippingData(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        addressLine1: address.street || prev.addressLine1,
        addressLine2: address.addressLine2 || '',
        city: address.city || prev.city,
        state: address.state || prev.state,
        zipCode: address.zipCode || prev.zipCode,
        country: address.country || prev.country,
        phone: user.phone || prev.phone,
      }));
    } else if (!useSavedAddress && user?.address) {
      // Clear the form when unchecked (except email)
      setShippingData(prev => ({
        fullName: '',
        email: prev.email,
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        phone: '',
      }));
    }
  }, [useSavedAddress, user]);

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
    return chunks.join(' ').substr(0, 19); // Max 16 digits + 3 spaces
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
    
    // Email is required for guest checkout
    if (!isAuthenticated) {
      if (!shippingData.email.trim()) {
        newErrors.email = 'Email is required for guest checkout';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingData.email)) {
        newErrors.email = 'Invalid email address';
      }
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
  if (isProcessing || loading) return;

  setIsProcessing(true);

  try {
    const orderData = {
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
    };

    const order = await createOrder({
      ...orderData,
      isGuest: !isAuthenticated,
      totalAmount: total, // 👈 satisfies CreateOrderData
    });


    if (order) {
      // Clear cart
      await emptyCart();
      
      // For guest orders, store the orderToken in sessionStorage (if it exists in your type)
      if (order.orderToken) {
        sessionStorage.setItem(`guestOrder_${order.id}`, order.orderToken);
      }
      
      // Redirect to confirmation
      router.push(`/checkout/confirmation?orderId=${order.id}&guest=${!isAuthenticated}`);
    } else {
      alert('Failed to create order. Please try again.');
      setIsProcessing(false);
    }
  } catch (error) {
    console.error('Error placing order:', error);
    alert('An error occurred. Please try again.');
    setIsProcessing(false);
  }
};


  const steps = [
    { id: 'shipping', label: 'Shipping', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: Package },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  if (items.length === 0 && !isProcessing) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your purchase
          </p>
          {!isAuthenticated && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                💡 Checking out as a guest. <Link href="/auth/login" className="underline font-semibold">Sign in</Link> to save your order history and checkout faster next time.
              </p>
            </div>
          )}
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index < currentStepIndex
                        ? 'bg-green-500 text-white'
                        : index === currentStepIndex
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      index <= currentStepIndex
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-4 transition-all duration-300 ${
                      index < currentStepIndex
                        ? 'bg-green-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Shipping Information
                  </h2>

                  {/* Use Saved Address Checkbox */}
                  {isAuthenticated && user?.address && user.address.street && (
                    <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useSavedAddress}
                          onChange={(e) => setUseSavedAddress(e.target.checked)}
                          className="mt-1 w-4 h-4 text-purple-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-gray-900 dark:text-white">
                            Use my saved address
                          </span>
                          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            <p>{user.name}</p>
                            <p>{user.address.street}</p>
                            <p>{user.address.city}, {user.address.state} {user.address.zipCode}</p>
                            <p>{user.address.country}</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={shippingData.fullName}
                        onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                        disabled={useSavedAddress}
                        className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } ${useSavedAddress ? 'opacity-60 cursor-not-allowed' : ''}`}
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email (for guest checkout) */}
                    {!isAuthenticated && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={shippingData.email}
                          onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                          className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          We'll send your order confirmation to this email
                        </p>
                      </div>
                    )}

                    {/* Address Line 1 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        value={shippingData.addressLine1}
                        onChange={(e) => setShippingData({ ...shippingData, addressLine1: e.target.value })}
                        disabled={useSavedAddress}
                        className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.addressLine1 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } ${useSavedAddress ? 'opacity-60 cursor-not-allowed' : ''}`}
                        placeholder="123 Main St"
                      />
                      {errors.addressLine1 && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.addressLine1}</p>
                      )}
                    </div>

                    {/* Address Line 2 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        value={shippingData.addressLine2}
                        onChange={(e) => setShippingData({ ...shippingData, addressLine2: e.target.value })}
                        disabled={useSavedAddress}
                        className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${useSavedAddress ? 'opacity-60 cursor-not-allowed' : ''}`}
                        placeholder="Apt, suite, etc."
                      />
                    </div>

                    {/* City, State, ZIP */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={shippingData.city}
                          onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                          disabled={useSavedAddress}
                          className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } ${useSavedAddress ? 'opacity-60 cursor-not-allowed' : ''}`}
                          placeholder="City"
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
                          disabled={useSavedAddress}
                          className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } ${useSavedAddress ? 'opacity-60 cursor-not-allowed' : ''}`}
                          placeholder="State"
                        />
                        {errors.state && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.state}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={shippingData.zipCode}
                          onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                          disabled={useSavedAddress}
                          className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          } ${useSavedAddress ? 'opacity-60 cursor-not-allowed' : ''}`}
                          placeholder="12345"
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.zipCode}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        disabled={useSavedAddress && !!user?.phone}
                        className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } ${useSavedAddress && user?.phone ? 'opacity-60 cursor-not-allowed' : ''}`}
                        placeholder="(123) 456-7890"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                      )}
                      {useSavedAddress && !user?.phone && (
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Phone number is not saved in your profile. Please enter it.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mt-8">
                    <Link href="/cart">
                      <button className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Cart
                      </button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                    >
                      Continue to Payment
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Payment Information
                  </h2>
                  <div className="flex items-center gap-2 mb-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>DEMO ONLY:</strong> This is a portfolio project. No real payment will be processed. Use test card: 4242 4242 4242 4242
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Card Number */}
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
                        className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.cardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cardNumber}</p>
                      )}
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardholderName}
                        onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.cardholderName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="JOHN DOE"
                      />
                      {errors.cardholderName && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cardholderName}</p>
                      )}
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({ ...paymentData, expiryDate: formatExpiryDate(e.target.value) })}
                          className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.expiryDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
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
                          onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value.replace(/\D/g, '').substr(0, 4) })}
                          className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setCurrentStep('shipping')}
                      className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back to Shipping
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                    >
                      Review Order
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Review Step */}
              {currentStep === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Shipping Info Review */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Shipping Address
                      </h3>
                      <button
                        onClick={() => setCurrentStep('shipping')}
                        className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      <p className="font-medium text-gray-900 dark:text-white">{shippingData.fullName}</p>
                      <p>{shippingData.addressLine1}</p>
                      {shippingData.addressLine2 && <p>{shippingData.addressLine2}</p>}
                      <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                      <p>{shippingData.country}</p>
                      <p className="mt-2">{shippingData.phone}</p>
                    </div>
                  </div>

                  {/* Payment Info Review */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Payment Method
                      </h3>
                      <button
                        onClick={() => setCurrentStep('payment')}
                        className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                      <div className="text-gray-600 dark:text-gray-400">
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                          {paymentData.cardType || 'Card'} ending in {paymentData.cardNumber.slice(-4)}
                        </p>
                        <p className="text-sm">{paymentData.cardholderName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Review */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Order Items ({items.length})
                    </h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                              className="object-contain p-2"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Demo Warning */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                          ⚠️ PORTFOLIO DEMONSTRATION
                        </h3>
                        <p className="text-yellow-800 dark:text-yellow-300 mb-2">
                          This is a demo order for portfolio purposes only. By clicking "Place Order":
                        </p>
                        <ul className="list-disc list-inside text-sm text-yellow-800 dark:text-yellow-300 space-y-1">
                          <li>NO real payment will be processed</li>
                          <li>NO actual products will be shipped</li>
                          <li>Your information is stored locally for demo purposes only</li>
                          <li>This demonstrates e-commerce checkout flow design</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep('payment')}
                      disabled={isProcessing || loading}
                      className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors disabled:opacity-50"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back to Payment
                    </button>
                    <motion.button
                      whileHover={!isProcessing && !loading ? { scale: 1.02 } : {}}
                      whileTap={!isProcessing && !loading ? { scale: 0.98 } : {}}
                      onClick={handlePlaceOrder}
                      disabled={isProcessing || loading}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing || loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Place Demo Order
                          <Check className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
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

              {/* Price Breakdown */}
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

              {/* Total */}
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
                  Items in order ({items.length})
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
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
    </div>
  );
}
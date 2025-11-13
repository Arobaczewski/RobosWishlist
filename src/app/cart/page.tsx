'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/store/hooks/useCart';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/app/store/hooks/hooks';
import CheckoutAuthModal from '../components/auth/CheckoutAuthModal';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { 
    items, 
    itemCount, 
    subtotal, 
    tax, 
    shipping, 
    total,
    removeItem,
    updateItemQuantity,
    emptyCart
  } = useCart();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;

    // If user is authenticated, go straight to checkout
    if (isAuthenticated) {
      router.push('/checkout');
    } else {
      // If not authenticated, show the modal
      setShowAuthModal(true);
    }
  };

  const handleGuestCheckout = () => {
    setShowAuthModal(false);
    router.push('/checkout/guest');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-600" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors inline-flex items-center gap-2"
              >
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg overflow-hidden"
              >
                {/* Clear Cart Button */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Cart Items
                  </h2>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear your cart?')) {
                        emptyCart();
                      }
                    }}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Items List */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link 
                          href={`/product/${item.productId}`}
                          className="relative w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 group"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            className="object-contain p-2 group-hover:scale-110 transition-transform"
                          />
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <Link 
                            href={`/product/${item.productId}`}
                            className="block group"
                          >
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">
                              {item.name}
                            </h3>
                          </Link>
                          {item.brand && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {item.brand}
                            </p>
                          )}
                          
                          {/* Variants */}
                          {Object.keys(item.selectedVariants).length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {Object.entries(item.selectedVariants).map(([key, value]) => (
                                <span
                                  key={key}
                                  className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300"
                                >
                                  {value}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Quantity Controls & Price */}
                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                                <button
                                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </button>
                                <span className="px-4 py-2 font-medium text-gray-900 dark:text-white min-w-[3rem] text-center border-x border-gray-300 dark:border-gray-600">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                  <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </button>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900 dark:text-white">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  ${item.price.toFixed(2)} each
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Stock Warning */}
                          {!item.inStock && (
                            <div className="mt-3 text-sm text-red-600 dark:text-red-400 font-medium">
                              ⚠ This item is currently out of stock
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Continue Shopping Button (Mobile) */}
              <Link href="/shop" className="block lg:hidden mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-lg p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Estimated Tax</span>
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

                  {/* Free Shipping Progress */}
                  {subtotal > 0 && subtotal < 50 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">
                        Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(subtotal / 50) * 100}%` }}
                          className="h-full bg-purple-600 dark:bg-purple-400 rounded-full"
                        />
                      </div>
                    </div>
                  )}

                  {subtotal >= 50 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                        ✓ You've qualified for free shipping!
                      </p>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 mb-4"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Continue Shopping Button (Desktop) */}
                <Link href="/shop" className="hidden lg:block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    🔒 Secure checkout powered by demo encryption
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Auth Modal */}
      <CheckoutAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onGuestCheckout={handleGuestCheckout}
      />
    </>
  );
}
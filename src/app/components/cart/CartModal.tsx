'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Package, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/app/store/hooks/useCart';

export default function CartModal() {
  const { 
    isOpen, 
    closeCart, 
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

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearCart = () => {
    emptyCart();
    setShowClearConfirm(false);
  };

  const FREE_SHIPPING_THRESHOLD = 500;
  const amountUntilFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sliding Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-gray-700 via-purple-300 to-purple-600 px-6 py-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Shopping Cart</h2>
                  <p className="text-purple-100 text-sm">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Clear All Button */}
              {items.length > 0 && (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="mt-2 text-sm text-purple-100 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear all items
                </button>
              )}
            </div>

            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Add some products to get started!
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 relative group"
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>

                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link
                          href={`/product/${item.productId}`}
                          onClick={closeCart}
                          className="relative w-20 h-20 bg-white dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 group"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            className="object-contain p-2 group-hover:scale-110 transition-transform"
                          />
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/product/${item.productId}`}
                            onClick={closeCart}
                            className="block"
                          >
                            <h3 className="font-semibold text-gray-900 dark:text-white hover:text-purple-500 dark:hover:text-purple-400 transition-colors line-clamp-1 mb-1">
                              {item.name}
                            </h3>
                          </Link>

                          {item.brand && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                              {item.brand}
                            </p>
                          )}

                          {/* Variants - FIXED: Added unique key by combining item.id with key */}
                          {Object.keys(item.selectedVariants).length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {Object.entries(item.selectedVariants).map(([key, value]) => (
                                <span
                                  key={`${item.id}-${key}`}
                                  className="text-xs bg-white dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                                >
                                  {value}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg p-1">
                              <button
                                onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                              </button>
                              <span className="w-8 text-center font-semibold text-gray-900 dark:text-white text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="font-bold text-gray-900 dark:text-white">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  ${item.price.toFixed(2)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Price Breakdown & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                {/* Free Shipping Progress */}
                {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? (
                  <div className="px-6 py-3 bg-purple-50 dark:bg-purple-900/20 border-b border-purple-100 dark:border-purple-800">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm text-purple-900 dark:text-purple-200 mb-1">
                          <strong>${amountUntilFreeShipping.toFixed(2)}</strong> away from free shipping
                        </p>
                        <p className="text-xs text-purple-700 dark:text-purple-300">
                          Add more items to qualify for free delivery
                        </p>
                      </div>
                      <p className="text-xs font-semibold text-purple-500 dark:text-purple-400 whitespace-nowrap ml-2">
                        ${subtotal.toFixed(2)} / ${FREE_SHIPPING_THRESHOLD}
                      </p>
                    </div>
                    <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${freeShippingProgress}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-purple-500 dark:bg-purple-400 rounded-full"
                      />
                    </div>
                  </div>
                ) : subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <div className="px-6 py-3 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800">
                    <div className="flex items-center justify-center gap-2">
                      <Package className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <p className="text-sm font-medium text-green-900 dark:text-green-200">
                        You've qualified for free shipping! 🎉
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* Price Breakdown */}
                <div className="px-6 py-4 space-y-3">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax (8%)</span>
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
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-baseline">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-purple-500 dark:text-purple-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6 space-y-3">
                  <Link href="/cart" onClick={closeCart}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
                    >
                      Proceed to Cart
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <button
                    onClick={closeCart}
                    className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium py-2 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Clear Cart Confirmation Modal */}
          <AnimatePresence>
            {showClearConfirm && (
              <>
                {/* Dark backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
                  onClick={() => setShowClearConfirm(false)}
                />

                {/* Centering wrapper */}
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full sm:w-[400px] max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl 
                              p-6 max-h-[90vh] overflow-y-auto"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3 flex-shrink-0">
                        <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          Clear Cart?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Are you sure you want to remove all {itemCount}{" "}
                          {itemCount === 1 ? "item" : "items"} from your cart? This action
                          cannot be undone.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowClearConfirm(false)}
                        className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
                                  text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleClearCart}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 
                                  rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Clear All
                      </button>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>

        </>
      )}
    </AnimatePresence>
  );
}
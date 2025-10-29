'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/app/store/hooks/useCart';

export default function FloatingCartButton() {
  const { itemCount, toggleCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration mismatch - wait for client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Optional: Don't show if cart is empty (uncomment if you want this behavior)
  // if (itemCount === 0) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleCart}
      className="fixed bottom-6 right-6 z-40 bg-purple-500 hover:bg-purple-700 text-white rounded-full p-4 shadow-2xl shadow-purple-500/50 transition-colors"
      aria-label="Open cart"
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6" />
        
        {/* Item Count Badge */}
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
            >
              {itemCount > 9 ? '9+' : itemCount}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Ripple effect on add to cart */}
      <motion.div
        key={itemCount}
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-purple-400 rounded-full pointer-events-none"
      />
    </motion.button>
  );
}
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, User, LogIn, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import AuthModal from './AuthModal';

interface CheckoutAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGuestCheckout: () => void;
}

export default function CheckoutAuthModal({ isOpen, onClose, onGuestCheckout }: CheckoutAuthModalProps) {
  const [isAuthModalOpenSignup, setIsAuthModalOpenSignup] = useState(false);
  const [isAuthModalOpenLogin, setIsAuthModalOpenLogin] = useState(false);
  
  const handleOpenSignup = () => {
    onClose(); // Close checkout modal first
    setIsAuthModalOpenSignup(true); // Then open auth modal
  };

  const handleLogin = () => {
    onClose();
    setIsAuthModalOpenLogin(true);
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="bg-gradient-to-br from-gray-700 via-purple-300 to-purple-600 px-6 py-8 text-white relative">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h2 className="text-2xl font-bold mb-2">Ready to Checkout?</h2>
                  <p className="text-white/90 text-sm">
                    Choose how you'd like to proceed with your order
                  </p>
                </div>

                {/* Options */}
                <div className="p-6 space-y-4">
                  {/* Create Account Option */}
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOpenSignup}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-4 transition-all shadow-lg hover:shadow-xl group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 rounded-lg p-3 group-hover:bg-white/30 transition-colors">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-lg mb-1">Create Account</p>
                        <p className="text-sm text-white/90">
                          Save your info and track orders
                        </p>
                      </div>
                    </div>
                  </motion.button>

                  {/* Sign In Option */}
                    <motion.button
                      onClick={handleLogin}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white hover:bg-gray-100 text-gray-900 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white rounded-xl p-4 transition-all shadow-lg hover:shadow-xl group border-2 border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                          <LogIn className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-semibold text-lg mb-1">Sign In</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account? Log in
                          </p>
                        </div>
                      </div>
                    </motion.button>

                  {/* Guest Checkout Option */}
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onGuestCheckout}
                    className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl p-4 transition-all border-2 border-gray-300 dark:border-gray-600 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-200 dark:bg-gray-600 rounded-lg p-3 group-hover:bg-gray-300 dark:group-hover:bg-gray-500 transition-colors">
                        <ShoppingBag className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-lg mb-1">Continue as Guest</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quick checkout without an account
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </div>

                {/* Footer Note */}
                <div className="px-6 pb-6">
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                    <p className="text-xs text-purple-900 dark:text-purple-200 text-center leading-relaxed">
                      💡 <strong>Tip:</strong> Creating an account lets you track orders, save favorites, and checkout faster next time!
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal - Rendered outside AnimatePresence for proper z-index stacking */}
      <AuthModal 
        isOpen={isAuthModalOpenSignup} 
        onClose={() => setIsAuthModalOpenSignup(false)}
        initialMode="signup"
      />
      <AuthModal 
        isOpen={isAuthModalOpenLogin}
        onClose={() => setIsAuthModalOpenLogin(false)}
        initialMode='login'
      />
    </>
  );
}
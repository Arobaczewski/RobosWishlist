'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, ArrowLeft, Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-purple-300 to-purple-600 dark:from-gray-900 dark:via-purple-300 dark:to-purple-600 leading-none">
            404
          </h1>
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-md text-gray-500 dark:text-gray-500">
            Don't worry, even the best explorers get lost sometimes! 🧭
          </p>
        </motion.div>

        {/* Illustration/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="mb-12 flex justify-center"
        >
          <div className="relative">
            <div className="w-32 h-32 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <Package className="w-16 h-16 text-purple-600 dark:text-purple-400" />
            </div>
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center text-2xl"
            >
              ❓
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid sm:grid-cols-2 gap-4 mb-8"
        >
          {/* Go Home Button */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-br from-gray-900 via-purple-300 to-purple-600 hover:from-purple-600 hover:to-gray-900 hover:via-purple-300 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </motion.button>
          </Link>

          {/* Browse Shop Button */}
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center gap-3 group"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Browse Shop
            </motion.button>
          </Link>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Or try one of these helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/favorites" 
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
            >
              My Favorites
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link 
              href="/account/orders" 
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
            >
              My Orders
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link 
              href="/about" 
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
            >
              About
            </Link>
          </div>
        </motion.div>

        {/* Fun Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12"
        >
          <p className="text-xs text-gray-400 dark:text-gray-500 italic">
            "Not all who wander are lost... but this page definitely is." 🗺️
          </p>
        </motion.div>
      </div>
    </div>
  );
}
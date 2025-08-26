"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) {
    // Skeleton with your site colors
    return (
      <div className="w-12 h-10 rounded-xl bg-purple-200/50 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";
  
  return (
    <motion.button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-12 h-10 rounded-xl
                 bg-white/20 dark:bg-black/30
                 backdrop-blur-sm
                 border border-white/30 dark:border-white/10
                 shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Background gradient that matches your site */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-400/30 via-purple-500/20 to-purple-600/30"
        animate={{ 
          opacity: isDark ? 0.8 : 0.6,
          scale: isDark ? 1.1 : 1 
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-white/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            >
              <Sun className="h-5 w-5 text-white drop-shadow-sm" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            >
              <Moon className="h-5 w-5 text-white drop-shadow-sm" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Subtle glow effect using your purple colors */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 
                   rounded-xl blur-sm opacity-0 -z-10"
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-white/30 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.1 }}
      />
    </motion.button>
  );
}
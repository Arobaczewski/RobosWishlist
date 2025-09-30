// components/FeaturedCarousel.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/types/product';

interface FeaturedCarouselProps {
  products: Product[];
}

export default function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    if (products.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, [products.length]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (products.length === 0) return null;

  const currentProduct = products[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl overflow-hidden shadow-lg">
      <div className="relative h-[400px] lg:h-[500px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { 
                type: "tween",
                ease: "easeInOut",
                duration: 0.5
              },
              opacity: { duration: 0.3 }
            }}
            className="absolute inset-0"
          >
            <Link href={`/product/${currentProduct.id}`} className="block h-full">
              <div className="grid lg:grid-cols-2 gap-8 h-full p-8 lg:p-12">
                {/* Left Side - Product Info */}
                <div className="flex flex-col justify-center space-y-6">
                  {/* Featured Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <span className="inline-flex items-center px-4 py-2 bg-purple-500 text-white text-sm font-semibold rounded-full">
                      ✨ Featured Product
                    </span>
                  </motion.div>

                  {/* Brand */}
                  {currentProduct.brand && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider"
                    >
                      {currentProduct.brand}
                    </motion.p>
                  )}

                  {/* Product Name */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight"
                  >
                    {currentProduct.name}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="text-base lg:text-lg text-gray-600 dark:text-gray-300 line-clamp-3"
                  >
                    {currentProduct.description}
                  </motion.p>

                  {/* Price & CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="flex items-center gap-6"
                  >
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Starting at</p>
                      <p className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        ${currentProduct.basePrice.toLocaleString()}
                      </p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 lg:px-8 lg:py-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
                    >
                      Shop Now
                    </motion.button>
                  </motion.div>
                </div>

                {/* Right Side - Product Image */}
                <div className="relative flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentProduct.images[0]}
                      alt={currentProduct.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized={currentProduct.images[0].endsWith('.png')}
                    />
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {products.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {products.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  goToSlide(index);
                }}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-purple-500'
                    : 'w-2 h-2 bg-gray-400 dark:bg-gray-600 hover:bg-purple-300'
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
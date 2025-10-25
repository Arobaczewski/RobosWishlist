'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

const categories: Category[] = [
  {
    id: 'technology',
    name: 'Technology',
    description: 'Cutting-edge gadgets and devices to power your digital life and boost productivity.',
    image: '/images/Carousel/Technology.png',
    productCount: 10
  },
  {
    id: 'home',
    name: 'Home',
    description: 'Transform your living space with furniture and essentials for comfort and style.',
    image: '/images/Carousel/Home.png',
    productCount: 7
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Premium appliances and tools for culinary excellence and gourmet cooking.',
    image: '/images/Carousel/Kitchen.png',
    productCount: 5
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Express yourself with jerseys, apparel, and accessories that show your passion.',
    image: '/images/Carousel/Clothing.png',
    productCount: 6
  },
  {
    id: 'dream',
    name: 'Dream Items',
    description: 'Aspirational luxury items and big-ticket dreams that fuel ambition and motivation.',
    image: '/images/Carousel/Dream.png',
    productCount: 4
  }
];

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentCategory = categories[currentIndex];

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
    <div className="relative w-full bg-gradient-to-br from-purple-200 via-purple-400 to-purple-600 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/30 dark:shadow-purple-500/40">
      <div className="relative h-[450px] lg:h-[550px]">
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
                type: 'tween',
                ease: 'easeInOut',
                duration: 0.6
              },
              opacity: { duration: 0.4 }
            }}
            className="absolute inset-0"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <Image
                src={currentCategory.image}
                alt={currentCategory.name}
                fill
                className="object-cover"
                priority={currentIndex === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full">
                <div className="max-w-2xl">
                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="mb-6"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                      <ShoppingBag className="w-4 h-4" />
                      Category Spotlight
                    </span>
                  </motion.div>

                  {/* Category Name */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                  >
                    {currentCategory.name}
                  </motion.h2>

                  {/* Product Count */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="text-purple-300 text-lg font-medium mb-6"
                  >
                    {currentCategory.productCount} {currentCategory.productCount === 1 ? 'Product' : 'Products'} Available
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="text-xl text-gray-200 mb-8 leading-relaxed"
                  >
                    {currentCategory.description}
                  </motion.p>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <Link
                      href={`/shop/${currentCategory.id}`}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-900 font-bold text-lg rounded-xl hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300"
                    >
                      Explore {currentCategory.name}
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 z-10 group"
          aria-label="Previous category"
        >
          <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:text-purple-300 transition-colors" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 z-10 group"
          aria-label="Next category"
        >
          <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:text-purple-300 transition-colors" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-12 h-3 bg-white'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60'
              } rounded-full backdrop-blur-sm`}
              aria-label={`Go to ${categories[index].name}`}
            />
          ))}
        </div>

        {/* Category Labels (bottom) */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden lg:flex gap-6 z-10">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => goToSlide(index)}
              className={`px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white text-purple-900 border-white font-bold scale-110'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
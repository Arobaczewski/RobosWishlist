// components/layout/ShopDropdown.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  name: string;
  value: string;
}

const categories: Category[] = [
  { name: 'All Products', value: '' },
  { name: 'Technology', value: 'technology' },
  { name: 'Home', value: 'home' },
  { name: 'Kitchen', value: 'kitchen' },
  { name: 'Clothing', value: 'clothing' },
  { name: 'Dream Items', value: 'dream' },
];

export default function ShopDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Shop Link with Dropdown Trigger */}
      <Link 
        href='/shop'
        className="flex items-center gap-1 hover:text-purple-100 transition-colors font-medium"
      >
        Shop
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </Link>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 w-56 bg-white dark:bg-gray-800 
                       rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 
                       overflow-hidden z-50"
          >
            <div className="py-2">
              {categories.map((category) => (
                <Link
                  key={category.value}
                  href={category.value ? `/shop/${category.value}` : '/shop'}
                  className="block px-4 py-3 text-gray-700 dark:text-gray-200 
                           hover:bg-purple-50 dark:hover:bg-purple-900/20 
                           transition-colors capitalize font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
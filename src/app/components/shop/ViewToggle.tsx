// components/ViewToggle.tsx
'use client';

import { motion } from 'framer-motion';
import { Grid3X3, List } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/app/types/product';
import ProductCard from './ProductCard';
import ProductListItem from './ProductList';

interface ViewToggleProps {
  currentView: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  className?: string;
}

export default function ViewToggle({ 
  currentView, 
  onViewChange, 
  className = '' 
}: ViewToggleProps) {
  return (
    <div className={`flex items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      <motion.button
        onClick={() => onViewChange('grid')}
        className={`flex items-center justify-center p-2 rounded-l-lg transition-all duration-200 ${
          currentView === 'grid'
            ? 'bg-purple-500 text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20'
        }`}
        whileHover={{ scale: currentView !== 'grid' ? 1.05 : 1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Grid view"
        title="Grid view"
      >
        <Grid3X3 className="w-5 h-5" />
      </motion.button>
      
      <motion.button
        onClick={() => onViewChange('list')}
        className={`flex items-center justify-center p-2 rounded-r-lg border-l border-gray-200 dark:border-gray-700 transition-all duration-200 ${
          currentView === 'list'
            ? 'bg-purple-500 text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20'
        }`}
        whileHover={{ scale: currentView !== 'list' ? 1.05 : 1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="List view"
        title="List view"
      >
        <List className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

// Example usage in a shop page component
const ShopPageWithToggle = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with View Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Showing {products.length} products
          </p>
        </div>
        
        <ViewToggle 
          currentView={viewMode}
          onViewChange={setViewMode}
        />
      </div>

      {/* Products Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              size="medium"
              showQuickAdd={true}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {products.map((product, index) => (
            <ProductListItem
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};
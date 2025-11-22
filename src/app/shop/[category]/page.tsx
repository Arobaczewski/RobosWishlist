// app/shop/[category]/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/app/components/shop/ProductCard';
import ProductListItem from '@/app/components/shop/ProductList';
import ViewToggle from '@/app/components/shop/ViewToggle';
import { Product } from '@/app/types/product';

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface Filters {
  brand: string;
  minPrice: string;
  maxPrice: string;
  search: string;
  featured: boolean;
  onSale: boolean;
  inStock: boolean;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const categoryNames: { [key: string]: string } = {
  'technology': 'Technology',
  'home': 'Home',
  'kitchen': 'Kitchen',
  'clothing': 'Clothing',
  'dream': 'Dream Items'
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const categoryName = categoryNames[category] || category;

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    brand: '',
    minPrice: '',
    maxPrice: '',
    search: '',
    featured: false,
    onSale: false,
    inStock: true,
    sortBy: 'id',
    sortOrder: 'asc'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();

      // Always include category
      queryParams.set('category', category);

      if (filters.brand) queryParams.set('brand', filters.brand);
      if (filters.minPrice) queryParams.set('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice);
      if (filters.search) queryParams.set('search', filters.search);
      if (filters.featured) queryParams.set('featured', 'true');
      if (filters.onSale) queryParams.set('onSale', 'true');
      if (filters.inStock) queryParams.set('inStock', 'true');
      if (filters.sortBy) queryParams.set('sortBy', filters.sortBy);
      if (filters.sortOrder) queryParams.set('sortOrder', filters.sortOrder);

      queryParams.set('page', currentPage.toString());
      queryParams.set('limit', viewMode === 'list' ? '10' : '12');

      const response = await fetch(`/api/products?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ProductsResponse = await response.json();
      setData(result);

      // Extract unique brands for filters
      if (result.products && result.products.length > 0) {
        const brands = Array.from(
          new Set(
            result.products
              .map((p: Product) => p.brand)
              .filter((brand): brand is string => Boolean(brand))
          )
        );
        setAvailableBrands(brands);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [category, filters, currentPage, viewMode]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter handlers
  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      minPrice: '',
      maxPrice: '',
      search: '',
      featured: false,
      onSale: false,
      inStock: true,
      sortBy: 'id',
      sortOrder: 'asc'
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = filters.brand || filters.minPrice || 
                          filters.maxPrice || filters.search || filters.featured || 
                          filters.onSale;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          {/* Title Section */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white capitalize">
              {categoryName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Browse our collection of {categoryName.toLowerCase()} products
            </p>
          </div>

          {/* View Toggle and Filters Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              {/* Filter Toggle */}
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                         text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                         transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                )}
              </motion.button>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <motion.button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 text-purple-600 dark:text-purple-400 
                           hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <X className="w-4 h-4" />
                  <span>Clear Filters</span>
                </motion.button>
              )}
            </div>

            {/* View Toggle */}
            <ViewToggle 
              currentView={viewMode}
              onViewChange={setViewMode}
            />
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Brand Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Brand
                    </label>
                    <select
                      value={filters.brand}
                      onChange={(e) => updateFilter('brand', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Brands</option>
                      {availableBrands.map(brand => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price Range
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => updateFilter('minPrice', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => updateFilter('maxPrice', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort By
                    </label>
                    <select
                      value={`${filters.sortBy}-${filters.sortOrder}`}
                      onChange={(e) => {
                        const [sortBy, sortOrder] = e.target.value.split('-');
                        updateFilter('sortBy', sortBy);
                        updateFilter('sortOrder', sortOrder);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="id-asc">Default</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="name-desc">Name: Z to A</option>
                    </select>
                  </div>
                </div>

                {/* Toggle Filters */}
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.featured}
                      onChange={(e) => updateFilter('featured', e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Featured only</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.onSale}
                      onChange={(e) => updateFilter('onSale', e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">On sale</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => updateFilter('inStock', e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">In stock only</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Info */}
          {data && (
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                Showing {data.products.length} of {data.total} products
              </span>
              <span>
                Page {data.page} of {data.totalPages}
              </span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg font-medium mb-2">Error loading products</div>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Display */}
        {!loading && !error && data && (
          <>
            {data.products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found in this category
                </div>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.products.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        size="medium"
                        index={index}
                        priority={index < 4}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {data.products.map((product, index) => (
                      <ProductListItem
                        key={product.id}
                        product={product}
                        index={index}
                        priority={index < 3}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {data.totalPages > 1 && (
                  <div className="flex items-center justify-center mt-12 space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                               disabled:opacity-50 disabled:cursor-not-allowed
                               hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Previous
                    </button>
                    
                    {[...Array(Math.min(5, data.totalPages))].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-purple-500 text-white'
                              : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(data.totalPages, currentPage + 1))}
                      disabled={currentPage === data.totalPages}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                               disabled:opacity-50 disabled:cursor-not-allowed
                               hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
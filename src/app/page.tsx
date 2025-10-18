'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/app/components/shop/ProductCard';
import HomeCarousel from './components/Layout/Home/HomeCarousel';
import { Product } from '@/app/types/product';

interface CategorySection {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

export default function HomePage() {
  const [categorySections, setCategorySections] = useState<CategorySection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        
        // Define your categories
        const categories = [
          { id: 'technology', name: 'Technology', description: 'Latest gadgets and devices' },
          { id: 'home', name: 'Home', description: 'Comfort and style for your space' },
          { id: 'kitchen', name: 'Kitchen', description: 'Tools for culinary excellence' },
          { id: 'clothing', name: 'Clothing', description: 'Express your passion' },
          { id: 'dream', name: 'Dream Items', description: 'Aspirational luxury' }
        ];

        // Fetch products for each category
        const categoryData = await Promise.all(
          categories.map(async (category) => {
            const response = await fetch(`/api/products?category=${category.id}&limit=4`);
            if (response.ok) {
              const data = await response.json();
              return {
                id: category.id,
                name: category.name,
                description: category.description,
                products: data.products || []
              };
            }
            return {
              id: category.id,
              name: category.name,
              description: category.description,
              products: []
            };
          })
        );

        setCategorySections(categoryData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Carousel Section */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HomeCarousel />
      </div>

      {/* Category Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          // Loading State
          <div className="space-y-16">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="bg-white dark:bg-gray-800 rounded-xl p-4 h-96"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Category Sections
          <div className="space-y-16">
            {categorySections.map((category, sectionIndex) => (
              <motion.section
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1, duration: 0.5 }}
                className="space-y-6"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                  <Link
                    href={`/shop/${category.id}`}
                    className="hidden sm:flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors group"
                  >
                    View All
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Products Grid */}
                {category.products.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {category.products.map((product, index) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          index={index}
                          priority={sectionIndex === 0 && index < 4}
                        />
                      ))}
                    </div>
                    
                    {/* Mobile "View All" Button */}
                    <div className="sm:hidden">
                      <Link
                        href={`/shop/${category.id}`}
                        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors"
                      >
                        View All {category.name}
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </>
                ) : (
                  // Empty State
                  <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <p className="text-gray-500 dark:text-gray-400">
                      No products available in this category yet
                    </p>
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        )}
      </div>

      {/* Optional: Call to Action Section */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Browse our complete collection of curated products
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-xl hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300"
          >
            Shop All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
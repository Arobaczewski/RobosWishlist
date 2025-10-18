// components/ProductListItem.tsx
'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingCart, ExternalLink, Star, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Product } from '@/app/types/product';
import { useFavorites } from '@/app/store/hooks/useFavorites';

interface ProductListItemProps {
  product: Product;
  priority?: boolean;
  onAddToCart?: (product: Product, selectedVariants: { [key: string]: string }, quantity: number) => void;
  onToggleFavorite?: (product: Product) => void;
  index?: number;
}

export default function ProductListItem({
  product,
  priority = false,
  onAddToCart,
  onToggleFavorite,
  index = 0
}: ProductListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { toggleFavorite, isFavorited} = useFavorites();
  const isProductFavorited = isFavorited(product.id);


  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(product.id)
  }

  // Initialize default variants
  useEffect(() => {
    if (product.hasVariants && product.defaultVariants) {
      setSelectedVariants(product.defaultVariants);
    }
  }, [product]);

  // Calculate total price based on selected variants
  const calculateTotalPrice = (): number => {
    let total = product.basePrice;
    
    if (product.hasVariants && product.variantOptions) {
      product.variantOptions.forEach(option => {
        const selectedValue = selectedVariants[option.type];
        if (selectedValue) {
          const variant = option.variants.find(v => v.value === selectedValue);
          if (variant && variant.price) {
            total += variant.price;
          }
        }
      });
    }
    
    return total;
  };

  const totalPrice = calculateTotalPrice();

  const handleVariantChange = (type: string, value: string, variantImages?: string[]) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: value
    }));

    // Update image if variant has specific images
    if (variantImages && variantImages.length > 0) {
      setCurrentImage(variantImages[0]);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) return;

    if (product.hasVariants && product.variantOptions) {
      const allRequiredSelected = product.variantOptions.every(option => {
        if (option.required) {
          return selectedVariants[option.type] !== undefined;
        }
        return true;
      });

      if (!allRequiredSelected) {
        alert('Please select all required options');
        return;
      }
    }

    if (onAddToCart) {
      onAddToCart(product, selectedVariants, quantity);
    }

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      setQuantity(1);
    }, 2000);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.basePrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.basePrice) / product.originalPrice!) * 100)
    : 0;


  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.4, 0.0, 0.2, 1]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
        
        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Image Section */}
          <Link href={`/product/${product.id}`} className="lg:w-64 flex-shrink-0">
            <div className="relative aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
              <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-contain p-6 transition-transform duration-300"
                  priority={priority}
                  sizes="(max-width: 1024px) 100vw, 256px"
                />
              </motion.div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.featured && (
                  <span className="px-2 py-1 bg-purple-500 text-white text-xs font-medium rounded-full">
                    Featured
                  </span>
                )}
                
                {hasDiscount && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                    -{discountPercentage}%
                  </span>
                )}
                
                {!product.inStock && (
                  <span className="px-2 py-1 bg-gray-500 text-white text-xs font-medium rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Favorite Button */}
              <div className="absolute top-3 right-3">
                <motion.button
                  onClick={handleToggleFavorite}
                  className={`w-8 h-8 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-200 ${
                      isProductFavorited 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 hover:text-red-500'
                    }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={isProductFavorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`w-4 h-4 ${isProductFavorited ? 'fill-current' : ''}`} />
                </motion.button>
              </div>
            </div>
          </Link>

          {/* Content Section - Prevents navigation */}
          <div className="flex-1 flex flex-col" onClick={(e) => e.preventDefault()}>
            <Link href={`/product/${product.id}`} className="block mb-4">
              {/* Brand */}
              <p className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                {product.brand}
              </p>

              {/* Product Name */}
              <h3 className="font-semibold text-xl text-gray-900 dark:text-white mt-1 transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                {product.name}
              </h3>
            </Link>

            {/* Variant Selection - Inline */}
            {product.hasVariants && product.variantOptions && (
              <div className="space-y-4 mb-6">
                {product.variantOptions.map(option => (
                  <div key={option.type}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {option.name}
                    </label>
                    
                    {option.type === 'color' ? (
                      // Color variant buttons
                      <div className="flex flex-wrap gap-2">
                        {option.variants.map((variant: any) => (
                          <motion.button
                            key={variant.value}
                            onClick={() => handleVariantChange(option.type, variant.value, variant.images)}
                            disabled={!variant.inStock}
                            className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                              selectedVariants[option.type] === variant.value
                                ? 'border-purple-500 dark:border-purple-400 ring-2 ring-purple-200 dark:ring-purple-800'
                                : variant.inStock
                                ? 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                                : 'border-gray-200 dark:border-gray-700 opacity-40 cursor-not-allowed'
                            }`}
                            whileHover={variant.inStock ? { scale: 1.1 } : {}}
                            whileTap={variant.inStock ? { scale: 0.95 } : {}}
                            title={variant.name}
                            style={{
                              backgroundColor: variant.value === 'space-black' ? '#1f2937' :
                                           variant.value === 'silver' ? '#e5e7eb' :
                                           variant.value === 'blue' ? '#3b82f6' :
                                           variant.value === 'red' ? '#FF0000' :
                                           variant.value === 'midnight' ? '#1f2937' :
                                           variant.value === 'orange' ? '#f97316' :
                                           variant.value === 'purple' ? '#CBC3E3' :
                                           variant.value === 'starlight' ? '#fef3c7' :
                                           variant.value === 'natural' ? '#d2b48c' :
                                           variant.value === 'white' ? '#ffffff' : 
                                           variant.value === 'black' ? '#1f2937' : 
                                           variant.value === 'brown' ? '#964800' : 
                                           variant.value === 'galaxy' ? '#1f2937' :
                                           variant.value === 'wheat' ? '#F5DEB3' : 
                                           variant.value === 'coral' ? '#FF7F50' :
                                           variant.value === 'lunar' ? '#A9A9A9' :
                                           variant.value === 'mint' ? '#B6FFBB' :
                                           variant.value === 'cobalt' ? '#0047AB' :
                                           variant.value === 'mist' ? '#B0E0E6' : '#9ca3af'
                            }}
                          >
                            {selectedVariants[option.type] === variant.value && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <Check className="w-5 h-5 text-white drop-shadow-lg" style={{
                                  filter: variant.value === 'white' || variant.value === 'starlight' ? 'invert(1)' : 'none'
                                }} />
                              </motion.div>
                            )}
                            {!variant.inStock && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-0.5 bg-red-500 rotate-45"></div>
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      // Dropdown for other variants
                      <select
                        value={selectedVariants[option.type] || ''}
                        onChange={(e) => handleVariantChange(option.type, e.target.value)}
                        className="w-full max-w-xs px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {option.variants.map((variant: any) => (
                          <option
                            key={variant.value}
                            value={variant.value}
                            disabled={!variant.inStock}
                          >
                            {variant.name}
                            {variant.price > 0 && ` (+$${variant.price})`}
                            {!variant.inStock && ' (Out of Stock)'}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Spacer to push bottom content down */}
            <div className="flex-1"></div>

            {/* Bottom Section */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              {/* Price */}
              <div className="flex flex-col gap-1">
                {totalPrice !== product.basePrice ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                        ${totalPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        (Base: ${product.basePrice.toLocaleString()})
                      </span>
                    </div>
                    {hasDiscount && (
                      <span className="text-base text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice!.toLocaleString()}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                      ${product.basePrice.toLocaleString()}
                    </span>
                    {hasDiscount && (
                      <span className="text-base text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice!.toLocaleString()}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  product.inStock ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className={`font-medium ${
                  product.inStock 
                    ? 'text-green-700 dark:text-green-400' 
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-400">-</span>
                  </button>
                  <span className="px-4 py-2 font-medium text-gray-900 dark:text-white min-w-[3rem] text-center border-x border-gray-300 dark:border-gray-600">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-400">+</span>
                  </button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addedToCart}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : product.inStock
                      ? 'bg-purple-500 hover:bg-purple-600 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                  whileHover={product.inStock && !addedToCart ? { scale: 1.02 } : {}}
                  whileTap={product.inStock && !addedToCart ? { scale: 0.98 } : {}}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </motion.button>

                {/* External Link */}
                {product.externalLink && (
                  <motion.a
                    href={product.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 border border-purple-300 dark:border-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Details</span>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Product } from '@/app/types/product';
import { useFavorites } from '@/app/store/hooks/useFavorites';
import { useCart } from '@/app/store/hooks/useCart';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  size?: 'small' | 'medium' | 'large';
  index?: number;
}

// Color mapping for variant display
const colorMap: { [key: string]: string } = {
  'space-black': '#000000',
  'silver': '#c0c0c0',
  'midnight': '#000000',
  'starlight': '#f5f5dc',
  'blue': '#90d5ff',
  'brown': '#6f4d38',
  'natural': '#cbb799',
  'galaxy': '#000000',
  'wheat': '#cbb799',
  'coral': '#ff6600',
  'lunar': '#808080',
  'mint': '#3EB489',
  'cobalt': '#1D2545',
  'mist': '#CDD8D9',
  'purple': '#b892ff',
  'orange': '#ff6600',
  'green': '#00ff00',
  'pink': '#ff69b4',
  'white': '#ffffff',
  'black': '#000000',
  'red': '#ff0000',
  'yellow': '#ffff00',
  'gray': '#808080',
  'gold': '#ffd700',
};

export default function ProductCard({
  product,
  priority = false,
  size = 'medium',
  index = 0
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showFlyingImage, setShowFlyingImage] = useState(false);
  const [flyingImagePosition, setFlyingImagePosition] = useState({ x: 0, y: 0 });
  const [flyingImageSize, setFlyingImageSize] = useState({ width: 0, height: 0 });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: boolean }>({});
  
  const { toggleFavorite, isFavorited } = useFavorites();
  const { addToCart, closeCart } = useCart();
  const isProductFavorited = isFavorited(product.id);
  const imageRef = useRef<HTMLDivElement>(null);

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

  const sizeClasses = {
    small: 'w-full max-w-sm',
    medium: 'w-full max-w-sm md:max-w-md',
    large: 'w-full max-w-md md:max-w-lg'
  };

  // Initialize default variants
  useEffect(() => {
    if (product.hasVariants && product.defaultVariants) {
      setSelectedVariants(product.defaultVariants);
    }
  }, [product]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleVariantChange = (type: string, value: string, variantImages?: string[]) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: value
    }));

    // Clear validation error for this variant type
    setValidationErrors(prev => ({
      ...prev,
      [type]: false
    }));

    // Update image if variant has specific images
    if (variantImages && variantImages.length > 0) {
      setCurrentImage(variantImages[0]);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) return;

    // Validate required variants
    if (product.hasVariants && product.variantOptions) {
      const errors: { [key: string]: boolean } = {};
      let hasErrors = false;

      product.variantOptions.forEach(option => {
        if (option.required && !selectedVariants[option.type]) {
          errors[option.type] = true;
          hasErrors = true;
        }
      });

      if (hasErrors) {
        setValidationErrors(errors);
        return;
      }
    }

    // Get position and size of product image for flying animation
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setFlyingImagePosition({ 
        x: rect.left + (rect.width / 2), // Center of image
        y: rect.top + (rect.height / 2)  // Center of image
      });
      setFlyingImageSize({
        width: rect.width * 0.8,  // Start at 80% of original size
        height: rect.height * 0.8
      });
      setShowFlyingImage(true);
    }

    // Close cart modal if it's open (we don't want it to auto-open)
    closeCart();

    // Add to cart
    await addToCart({
      productId: product.id,
      name: product.name,
      price: totalPrice,
      quantity: quantity,
      image: currentImage,
      selectedVariants: selectedVariants,
      inStock: product.inStock,
      brand: product.brand
    });

    // Show success feedback
    setAddedToCart(true);
    
    // Reset after animation
    setTimeout(() => {
      setShowFlyingImage(false);
      setAddedToCart(false);
      setQuantity(1);
    }, 1200);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.basePrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.basePrice) / product.originalPrice!) * 100)
    : 0;

  return (
    <>
      <motion.div
        className={`${sizeClasses[size]} group h-full`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.4, 0.0, 0.2, 1]
        }}
        whileHover={{ y: -4 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col">
          
          {/* Image Section - Fixed Height */}
          <Link href={`/product/${product.id}`} className="block">
            <div ref={imageRef} className="relative aspect-square bg-gray-50 dark:bg-gray-700 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-300"
                    priority={priority}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              </AnimatePresence>

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
              </div>

              {/* Favorite Button */}
              <motion.button
                onClick={handleToggleFavorite}
                className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isProductFavorited
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                />
              </motion.button>
            </div>
          </Link>

          {/* Content Section - Flexible Height */}
          <div className="p-4 flex flex-col flex-1">
            {/* Brand & Title */}
            <div className="mb-2">
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">
                {product.brand}
              </p>
              <Link href={`/product/${product.id}`}>
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  {product.name}
                </h3>
              </Link>
            </div>

            {/* Variants Section */}
            {product.hasVariants && product.variantOptions && (
              <div className="space-y-3 mb-3">
                {product.variantOptions.map((option: any) => (
                  <div key={option.type}>
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1.5">
                      {option.name}
                      {validationErrors[option.type] && (
                        <span className="text-red-500 ml-1">
                          - Required
                        </span>
                      )}
                    </label>
                    {option.type === 'color' ? (
                      // Color swatches
                      <div className="flex flex-wrap gap-2">
                        {option.variants.map((variant: any) => {
                          const isSelected = selectedVariants[option.type] === variant.value;
                          const colorValue = colorMap[variant.value] || '#cccccc';
                          
                          return (
                            <motion.button
                              key={variant.value}
                              onClick={(e) => {
                                e.preventDefault();
                                if (variant.inStock) {
                                  handleVariantChange(option.type, variant.value, variant.images);
                                }
                              }}
                              disabled={!variant.inStock}
                              className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                                isSelected
                                  ? 'border-purple-500 scale-110 shadow-lg'
                                  : validationErrors[option.type]
                                  ? 'border-red-500'
                                  : 'border-gray-300 dark:border-gray-600'
                              } ${
                                !variant.inStock 
                                  ? 'cursor-not-allowed opacity-40' 
                                  : 'hover:scale-110 hover:shadow-md cursor-pointer'
                              }`}
                              whileHover={variant.inStock ? { scale: 1.15 } : {}}
                              whileTap={variant.inStock ? { scale: 0.95 } : {}}
                              title={`${variant.name}${variant.price > 0 ? ` (+$${variant.price})` : ''}${!variant.inStock ? ' (Out of Stock)' : ''}`}
                            >
                              <div 
                                className="w-full h-full rounded-full"
                                style={{ 
                                  backgroundColor: colorValue,
                                  boxShadow: colorValue === '#ffffff' ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : 'none'
                                }}
                              />
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute inset-0 flex items-center justify-center"
                                >
                                  <Check className={`w-4 h-4 ${
                                    colorValue === '#ffffff' || colorValue === '#f5f5dc' 
                                      ? 'text-gray-800' 
                                      : 'text-white'
                                  }`} style={{ 
                                    filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))'
                                  }} />
                                </motion.div>
                              )}
                              {!variant.inStock && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-full h-0.5 bg-red-500 rotate-45"></div>
                                </div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    ) : (
                      // Dropdown for other variants
                      <select
                        value={selectedVariants[option.type] || ''}
                        onChange={(e) => {
                          e.preventDefault();
                          handleVariantChange(option.type, e.target.value);
                        }}
                        onClick={(e) => e.preventDefault()}
                        className={`w-full px-2 py-1.5 text-xs border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                          validationErrors[option.type]
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500'
                        }`}
                      >
                        <option value="" disabled>Select {option.name}</option>
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

            {/* Bottom Section - Fixed at bottom */}
            <div className="space-y-3 mt-auto">
              {/* Price */}
              <div className="flex flex-col gap-1">
                {totalPrice !== product.basePrice ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">
                        ${totalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        (Base: ${product.basePrice.toLocaleString()})
                      </span>
                    </div>
                    {hasDiscount && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice!.toLocaleString()}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">
                      ${product.basePrice.toLocaleString()}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice!.toLocaleString()}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-xs">
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

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-2">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setQuantity(Math.max(1, quantity - 1));
                    }}
                    className="px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-400 text-sm">-</span>
                  </button>
                  <span className="px-3 py-1 text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center border-x border-gray-300 dark:border-gray-600">
                    {quantity}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setQuantity(quantity + 1);
                    }}
                    className="px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-gray-600 dark:text-gray-400 text-sm">+</span>
                  </button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addedToCart}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center gap-1.5 transition-all ${
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
                      <Check className="w-4 h-4" />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Flying Image Animation - Starts BIGGER and shrinks to cart icon */}
      <AnimatePresence>
        {showFlyingImage && (
          <motion.div
            initial={{ 
              position: 'fixed',
              left: flyingImagePosition.x - (flyingImageSize.width / 2), // Center on starting position
              top: flyingImagePosition.y - (flyingImageSize.height / 2),
              width: flyingImageSize.width,
              height: flyingImageSize.height,
              opacity: 1,
              scale: 1,
              zIndex: 9999,
              rotate: 0
            }}
            animate={{ 
              left: typeof window !== 'undefined' ? window.innerWidth - 100 : 0,
              top: typeof window !== 'undefined' ? window.innerHeight - 100 : 0,
              width: 60,
              height: 60,
              scale: 0.4,
              opacity: 0.7,
              rotate: 360 // Add a spin for extra flair!
            }}
            exit={{ 
              opacity: 0,
              scale: 0.1
            }}
            transition={{ 
              duration: 1.0,
              ease: [0.25, 0.1, 0.25, 1.0], // Smooth easing
              rotate: {
                duration: 0.8,
                ease: "easeOut"
              }
            }}
            className="pointer-events-none"
          >
            <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-purple-500 overflow-hidden">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-contain p-2"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-purple-500/20 animate-pulse"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
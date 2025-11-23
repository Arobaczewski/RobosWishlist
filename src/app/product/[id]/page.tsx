'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/types/product';
import { useFavorites } from '@/app/store/hooks/useFavorites';
import { useCart } from '@/app/store/hooks/useCart';
import ProductCard from '@/app/components/shop/ProductCard';

interface ProductWithVariants {
  product: Product;
  selectedVariants: { [key: string]: string };
  finalPrice: number;
  availableVariants: any[];
  inStock: boolean;
  stockQuantity: number;
  images: string[];
  similarProducts: Product[];
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const [data, setData] = useState<ProductWithVariants | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFlyingImage, setShowFlyingImage] = useState(false);
  const [flyingImagePosition, setFlyingImagePosition] = useState({ x: 0, y: 0 });
  const [flyingImageSize, setFlyingImageSize] = useState({ width: 0, height: 0 });
  const [addedToCart, setAddedToCart] = useState(false);

  // Use the favorites hook
  const { toggleFavorite, isFavorited } = useFavorites();
  
  // Use the cart hook
  const { addToCart, closeCart } = useCart();
  
  // Ref for image container
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = new URLSearchParams(selectedVariants);
        const response = await fetch(`/api/products/${productId}?${queryParams.toString()}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();
        setData(results);
        setSelectedVariants(results.selectedVariants);
        setCurrentImageIndex(0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
        console.error('Error fetching product', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, JSON.stringify(selectedVariants)]);

  const updateVariant = (variantType: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantType]: value
    }));
  };

  // Navigation functions for image arrows
  const nextImage = () => {
    if (!data) return;
    setCurrentImageIndex(prev => (prev + 1) % data.images.length);
  };

  const prevImage = () => {
    if (!data) return;
    setCurrentImageIndex(prev => prev === 0 ? data.images.length - 1 : prev - 1);
  };

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!data || data.images.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [data]);

  // Handle add to cart with flying animation
  const handleAddToCart = async () => {
    if (!data || !data.inStock) return;
    
    // Get position and size of product image for flying animation
    if (imageContainerRef.current) {
      const rect = imageContainerRef.current.getBoundingClientRect();
      setFlyingImagePosition({ 
        x: rect.left + (rect.width / 2),
        y: rect.top + (rect.height / 2)
      });
      setFlyingImageSize({
        width: rect.width * 0.6,  // Start at 60% for product page
        height: rect.height * 0.6
      });
      setShowFlyingImage(true);
    }

    // Close cart modal
    closeCart();

    // Add to cart
    await addToCart({
      productId,
      name: data.product.name,
      price: data.finalPrice,
      quantity: 1,
      image: data.images[currentImageIndex],
      selectedVariants: selectedVariants,
      inStock: data.inStock,
      brand: data.product.brand
    });

    // Show success feedback
    setAddedToCart(true);
    
    // Reset after animation
    setTimeout(() => {
      setShowFlyingImage(false);
      setAddedToCart(false);
    }, 1200);
  };

  if (loading) {
    return (
      <motion.div
        className='min-h-screen flex items-center justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className='text-center'>
          <motion.div
            className='animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4'
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className='text-gray-500'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Loading product...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-red-600 mb-4'>
            Error
          </h1>
          <p className='text-gray-500 mb-4'>
            {error}
          </p>
          <Link href='/shop' className='bg-gradient-to-br from-gray-900 via-purple-300 to-purple-600 text-white px-6 py-2 rounded hover:bg-white/10 transition-colors'>
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-500 mb-4'>
            Product Not Found
          </h1>
          <Link href='/shop' className='bg-gradient-to-br from-gray-900 via-purple-300 to-purple-600 text-white px-6 py-2 rounded hover:bg-white/10 transition-colors'>
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const { product, finalPrice, inStock, stockQuantity, images, availableVariants, similarProducts } = data;
  const isCurrentlyFavorited = isFavorited(productId);

  return (
    <>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <nav className='mb-8'>
            <ol className='flex items-center space-x-2 text-sm'>
              <li><Link href='/' className='text-purple-400 dark:text-purple-300 hover:text-purple-600 dark:hover:text-purple-100 transition-colors'>
                Home
              </Link></li>
              <li className='text-purple-500 dark:text-purple-400'>/</li>
              <li><Link href='/shop' className='text-purple-400 dark:text-purple-300 hover:text-purple-600 dark:hover:text-purple-100 transition-colors'>
                Shop
              </Link></li>
              <li className='text-purple-500 dark:text-purple-400'>/</li>
              <li><Link href={`/shop/${product.category}`} className='text-purple-400 dark:text-purple-300 hover:text-purple-600 dark:hover:text-purple-100 transition-colors capitalize'>
                {product.category}
              </Link></li>
              <li className='text-purple-500 dark:text-purple-400'>/</li>
              <li className='text-purple-900 dark:text-purple-100 font-medium truncate'>{product.name}</li>
            </ol>
          </nav>

          {/* Main Product Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12'>
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image with Navigation */}
              <div className='relative bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl overflow-hidden mb-4 transition-colors duration-300'>
                <motion.div 
                  ref={imageContainerRef}
                  className='aspect-square relative group'
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className='relative w-full h-full'
                    >
                      <Image
                        src={images[currentImageIndex]}
                        alt={`${product.name} - Image ${currentImageIndex + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        className='object-contain p-8'
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Favorite Button - positioned on the image */}
                  <motion.button
                    onClick={() => toggleFavorite(productId)}
                    className={`
                      absolute top-4 right-4 z-10 p-3 rounded-full shadow-lg
                      backdrop-blur-sm transition-all duration-300
                      ${isCurrentlyFavorited 
                        ? 'bg-red-500/90 text-white hover:bg-red-600' 
                        : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                      }
                    `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isCurrentlyFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart 
                      className={`w-6 h-6 transition-all duration-300 ${
                        isCurrentlyFavorited ? 'fill-current' : ''
                      }`}
                    />
                  </motion.button>

                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <motion.button
                        onClick={prevImage}
                        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-700'
                        whileHover={{ scale: 1.1, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className='w-6 h-6 text-gray-800 dark:text-gray-200' />
                      </motion.button>
                      
                      <motion.button
                        onClick={nextImage}
                        className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-700'
                        whileHover={{ scale: 1.1, x: 2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Next image"
                      >
                        <ChevronRight className='w-6 h-6 text-gray-800 dark:text-gray-200' />
                      </motion.button>
                    </>
                  )}

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm'>
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <motion.div 
                  className='grid grid-cols-5 gap-2'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`
                        aspect-square relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition-all duration-300
                        ${currentImageIndex === index 
                          ? 'border-purple-500 dark:border-purple-400 shadow-md' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        width={100}
                        height={100}
                        className='w-full h-full object-contain p-2'
                      />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Product Details */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Brand & Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <p className='text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-2 transition-colors duration-300'>{product.brand}</p>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300'>{product.name}</h1>
                <p className='text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300'>Category: <span className='capitalize'>{product.category}</span></p>
              </motion.div>

              {/* Price & Stock */}
              <motion.div 
                className="flex items-baseline gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className='text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300'>${finalPrice.toLocaleString()}</span>
                {finalPrice !== product.basePrice && (
                  <span className='text-xl text-gray-500 dark:text-gray-400 line-through transition-colors duration-300'>${product.basePrice.toLocaleString()}</span>
                )}
              </motion.div>

              {/* Stock Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                {inStock ? (
                  <p className='text-green-600 dark:text-green-400 font-medium transition-colors duration-300'>
                    ✓ In Stock {stockQuantity > 0 && `(${stockQuantity} available)`}
                  </p>
                ) : (
                  <p className='text-red-600 dark:text-red-400 font-medium transition-colors duration-300'>✗ Out of Stock</p>
                )}
              </motion.div>

              {/* Variants */}
              {availableVariants.map((option: any, index) => (
                <motion.div
                  key={option.type} 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                >
                  <h3 className='text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300'>
                    {option.name}
                  </h3>
                  {option.type === 'color' ? (
                    <div className='flex flex-wrap gap-3'>
                      {option.variants.map((variant: any) => (
                        <motion.button
                          key={variant.value}
                          onClick={() => variant.inStock && updateVariant(option.type, variant.value)}
                          disabled={!variant.inStock}
                          className={`
                            px-4 py-2 rounded-md border-2 text-sm font-medium transition-all duration-300
                            ${selectedVariants[option.type] === variant.value
                              ? 'border-purple-400 dark:border-purple-300 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-200'
                              : variant.inStock
                              ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
                              : 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                            }
                          `}
                          whileHover={variant.inStock ? { scale: 1.05 } : {}}
                          whileTap={variant.inStock ? { scale: 0.95 } : {}}
                          animate={{
                            borderColor: selectedVariants[option.type] === variant.value ? '#9115c2' : '#d1d5db'
                          }}
                          title={`${variant.name} ${variant.price ? `(+$${variant.price})` : ''} ${!variant.inStock ? '(Out of Stock)' : ''}`}
                        >
                          {variant.name}
                          {variant.price > 0 && <span className="ml-1 text-xs">(+${variant.price})</span>}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    // Dropdown for other variants
                    <motion.select 
                      value={selectedVariants[option.type] || ''}
                      onChange={e => updateVariant(option.type, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:border-purple-400 transition-colors duration-300"
                      whileFocus={{ scale: 1.02 }}
                    >
                      {option.variants.map((variant: any) => (
                        <option 
                          key={variant.value} 
                          value={variant.value}
                          disabled={!variant.inStock}
                        >
                          {variant.name} 
                          {variant.price > 0 ? ` (+$${variant.price})` : ''}
                          {!variant.inStock ? ' (Out of Stock)' : ''}
                        </option>
                      ))}
                    </motion.select>
                  )}
                </motion.div>
              ))}

              {/* Add to Cart */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.button 
                  disabled={!inStock || addedToCart}
                  onClick={handleAddToCart}
                  className={`
                    w-full py-3 px-6 rounded-md text-white font-medium text-lg transition-all flex items-center justify-center gap-2
                    ${addedToCart
                      ? 'bg-green-500 cursor-default'
                      : inStock 
                      ? 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2' 
                      : 'bg-gray-400 cursor-not-allowed'
                    }
                  `}
                  whileHover={inStock && !addedToCart ? { scale: 1.02, boxShadow: "0 10px 20px rgba(139, 92, 246, 0.3)" } : {}}
                  whileTap={inStock && !addedToCart ? { scale: 0.98 } : {}}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : inStock ? (
                    `Add to Cart - $${finalPrice.toLocaleString()}`
                  ) : (
                    'Out of Stock'
                  )}
                </motion.button>
                
                {/* External Link */}
                {product.externalLink && (
                  <a 
                    href={product.externalLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full text-center py-3 px-6 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    View ACTUAL Product on Retailer Website →
                  </a>
                )}
              </motion.div>

              {/* Description */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 transition-colors duration-300">Description</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">{product.description}</p>
              </div>

              {/* Key Features */}
              {product.keyFeatures && product.keyFeatures.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 transition-colors duration-300">Key Features</h3>
                  <ul className="space-y-2">
                    {product.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-purple-500 dark:bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0 transition-colors duration-300"></div>
                        <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <motion.div 
              className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12 transition-colors duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300">Similar Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((similarProduct, index) => (
                  <ProductCard
                    key={similarProduct.id}
                    product={similarProduct}
                    size="medium"
                    index={index}
                    priority={false}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Enhanced Flying Image Animation */}
      <AnimatePresence>
        {showFlyingImage && (
          <motion.div
            initial={{ 
              position: 'fixed',
              left: flyingImagePosition.x - (flyingImageSize.width / 2),
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
              rotate: 360
            }}
            exit={{ 
              opacity: 0,
              scale: 0.1
            }}
            transition={{ 
              duration: 1.0,
              ease: [0.25, 0.1, 0.25, 1.0],
              rotate: {
                duration: 0.8,
                ease: "easeOut"
              }
            }}
            className="pointer-events-none"
          >
            <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-purple-500 overflow-hidden">
              <Image
                src={images[currentImageIndex]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-contain p-2"
              />
              <div className="absolute inset-0 bg-purple-500/20 animate-pulse"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 
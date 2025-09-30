'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/types/product';

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = new URLSearchParams(selectedVariants);
        // Fixed: Removed /app from API path
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

  return (
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
            <li className='text-purple-500 dark:text-purple-400 capitalize'>
              {product.category}
            </li>
            <li className='text-purple-500 dark:text-purple-400'>/</li>
            <li className='text-purple-900 dark:text-purple-100 font-medium truncate'>{product.name}</li>
          </ol>
        </nav>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          <motion.div
            className='space-y-4'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className='relative aspect-square bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-2xl overflow-hidden transition-colors duration-300'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`${images[currentImageIndex]}-${JSON.stringify(selectedVariants)}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    width={600}
                    height={600}
                    className='w-full h-full object-contain p-4'
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows - Only show if multiple images */}
              {images.length > 1 && (
                <>
                  {/* Previous Image Button */}
                  <motion.button
                    onClick={prevImage}
                    className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg dark:shadow-xl border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 z-10'
                    whileHover={{ scale: 1.1, x: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className='w-5 h-5' />
                  </motion.button>

                  {/* Next Image Button */}
                  <motion.button
                    onClick={nextImage}
                    className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg dark:shadow-xl border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 z-10'
                    whileHover={{ scale: 1.1, x: 2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    aria-label="Next image"
                  >
                    <ChevronRight className='w-5 h-5' />
                  </motion.button>

                  {/* Image Counter */}
                  <motion.div
                    className='absolute bottom-4 right-4 px-3 py-1 bg-black/60 dark:bg-black/80 backdrop-blur-sm rounded-full text-white text-sm font-medium'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {currentImageIndex + 1} / {images.length}
                  </motion.div>
                </>
              )}
            </div>
            
            {images.length > 1 && (
              <motion.div
                className='flex space-x-2 overflow-x-auto pb-2'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }} // Fixed: Changed from opacity: 0 to opacity: 1
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 bg-white rounded-md shadow-sm overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? 'border-purple-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      borderColor: currentImageIndex === index ? '#9115c2' : '#e5e7eb'
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className='w-full h-full object-contain p-1'
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }} // Fixed: Changed from opacity: 0 to opacity: 1
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className='text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide'>
                {product.brand}
              </p>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white mt-1 transition-colors duration-300'>
                {product.name}
              </h1>
            </motion.div>

            {/* Price */}
            <motion.div 
              className='flex items-baseline space-x-3'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <AnimatePresence mode='wait'>
                <motion.span
                  key={finalPrice}
                  className='text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  ${finalPrice.toLocaleString()}
                </motion.span>
              </AnimatePresence>
              {finalPrice !== product.basePrice && (
                <span className='text-lg text-gray-500 dark:text-gray-400 transition-colors duration-300'>
                  Base: ${product.basePrice.toLocaleString()}
                </span>
              )}
            </motion.div>
            
            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">
                    In Stock ({stockQuantity} available)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-700 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Variant Selectors */}
            {availableVariants.map((option, index) => (
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
                disabled={!inStock}
                className={`
                  w-full py-3 px-6 rounded-md text-white font-medium text-lg transition-colors
                  ${inStock 
                    ? 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2' 
                    : 'bg-gray-400 cursor-not-allowed'
                  }
                `}
                whileHover={inStock ? { scale: 1.02, boxShadow: "0 10px 20px rgba(139, 92, 246, 0.3)" } : {}}
                whileTap={inStock ? { scale: 0.98 } : {}}
                onClick={() => {
                  // Add to cart logic here
                  console.log('Adding to cart:', {
                    productId,
                    name: product.name,
                    price: finalPrice,
                    selectedVariants,
                    quantity: 1,
                    image: images[0]
                  });
                }}
              >
                {inStock ? `Add to Cart - $${finalPrice.toLocaleString()}` : 'Out of Stock'}
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
                <motion.div
                  key={similarProduct.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + (index * 0.1), duration: 0.5 }}
                >
                  <Link 
                    href={`/product/${similarProduct.id}`}
                    className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl transition-all duration-300 overflow-hidden block"
                  >
                    <motion.div 
                      className="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={similarProduct.images[0]}
                        alt={similarProduct.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                      />
                    </motion.div>
                    <div className="p-4">
                      <p className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide transition-colors duration-300">{similarProduct.brand}</p>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mt-1 line-clamp-2 transition-colors duration-300">{similarProduct.name}</h3>
                      <p className="text-lg font-bold text-gray-900 dark:text-white mt-2 transition-colors duration-300">${similarProduct.basePrice.toLocaleString()}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
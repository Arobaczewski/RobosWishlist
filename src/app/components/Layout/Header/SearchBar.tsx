'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Changed from 'next/router'
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/app/types/product';

interface SearchBarProps {
    isMobile?: boolean;
}

export default function SearchBar({ isMobile = false }: SearchBarProps){
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (!query.trim()){
            setResults([]);
            setShowResults(false);
            return;
        }

        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=5`)
                if(response.ok){
                    const data = await response.json();
                    setResults(data.products);
                    setShowResults(true);
                }
            } catch (error) {
                console.error('Search error', error);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)){
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(query.trim()) { // Fixed: was trimEnd(), should be trim()
            router.push(`/shop?search=${encodeURIComponent(query)}`);
            setShowResults(false);
            setQuery('');
        }
    };

    const handleResultClick = () => {
        setShowResults(false);
        setQuery('');
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setShowResults(false);
    }

    return (
        <div className='relative w-full' ref={searchRef}>
            <form onSubmit={handleSubmit} className='relative'>
                <input 
                 type="text"
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 onFocus={() => query && setShowResults(true)}
                 placeholder={isMobile ? 'Search products...' : 'What are you looking for?'}
                 className={`pl-10 pr-10 py-2 rounded-lg
                             bg-white/90 text-gray-800 placeholder-gray-500
                             border border-white/50
                             focus:outline-none focus:ring-2 focus:ring-purple-400
                             dark:bg-black/30 dark:text-gray-100 dark:placeholder-gray-300
                             dark:border-white/10 ${isMobile ? 'w-full' : 'w-64'}`}
                 />
                 <button
                  type='submit'
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-500 transition-colors'
                 >
                    {isLoading ? (
                        <Loader2 className='h-4 w-4 animate-spin' />
                    ) : ( 
                        <Search className='h-4 w-4' />
                    )}
                 </button>

                 {query && (
                    <button
                     type='button'
                     onClick={clearSearch}
                     className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors' // Fixed: was right03
                    >
                        <X className='h-4 w-4'/>
                    </button>
                 )}
            </form>
            <AnimatePresence>
                 {showResults && results.length > 0 && (
                    <motion.div
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{  opacity: 0, y: -10 }}
                     transition={{ duration: 0.2 }}
                     className='absolute top-full mt-2 w-full md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50'
                    >
                        <div className='p-2 max-h-96 overflow-y-auto'>
                            {results.map((product) => (
                                <Link
                                 key={product.id}
                                 href={`/product/${product.id}`}
                                 onClick={handleResultClick}
                                 className='flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors'
                                >
                                    <div className='relative w-16 h-16 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden'>
                                        <Image 
                                         src={product.images[0]}
                                         alt={product.name}
                                         fill
                                         className='object-contain p-1'
                                         sizes='64px'
                                        />
                                    </div>

                                    <div className='flex-1 min-w-0'>
                                        <p className='text-xs text-purple-600 dark:text-purple-400 font-medium uppercase'>
                                            {product.brand}
                                        </p>
                                        <h4 className='text-sm font-bold text-gray-900 dark:text-white mt-1'>
                                            {product.name}
                                        </h4>
                                        <p className='text-sm font-bold text-gray-900 dark:text-white mt-1'>
                                            ${product.basePrice.toLocaleString()}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className='border-t border-gray-200 dark:border-gray-700 p-3'>
                            <Link
                             href={`/shop?search=${encodeURIComponent(query)}`}
                             onClick={handleResultClick}
                             className='block text-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors'
                            >
                                View all results for '{query}'
                            </Link>
                        </div>
                    </motion.div>
                 )}
            </AnimatePresence>
            <AnimatePresence>
                 {showResults && query && !isLoading && results.length === 0 && (
                    <motion.div
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.2 }}
                     className='absolute top-full mt-2 w-full md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50'
                     >
                        <p className='text-sm text-gray-500 dark:text-gray-400 text-center'>
                            No products found for '{query}'
                        </p>
                    </motion.div>
                 )} 
            </AnimatePresence>
        </div>
    )
}
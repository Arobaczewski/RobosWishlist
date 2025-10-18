'use client';

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import ProductCard from "../components/shop/ProductCard";
import { useFavorites } from "../store/hooks/useFavorites";
import { useAppSelector } from "../store/hooks/hooks";
import { Product } from "../types/product";

export default function FavoritesPage(){
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true);
    const { favorites } = useFavorites();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const previousFavoritesRef = useRef<string>('');

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            // Don't fetch if not authenticated
            if(!isAuthenticated){
                setLoading(false);
                setProducts([]);
                return;
            }

            // Don't fetch if favorites haven't changed
            // Create a copy and sort it to compare
            const favoritesString = JSON.stringify([...favorites].sort());
            
            if (favoritesString === previousFavoritesRef.current && products.length > 0) {
                return;
            }

            previousFavoritesRef.current = favoritesString;

            // If no favorites, show empty state
            if(favorites.length === 0){
                setProducts([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch('/api/products');
                if(response.ok){
                    const data = await response.json();
                    const favoriteProducts = data.products.filter((product: Product) => 
                        favorites.includes(product.id)
                    );
                    setProducts(favoriteProducts);
                }
            } catch (error){
                console.error('Error fetching favorite products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteProducts();
    }, [favorites, isAuthenticated]);

    if(!isAuthenticated){
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Save Your Favorites
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Log in to start saving products you love and access them anytime.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        )
    }

    if(loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 h-96"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if(products.length === 0){
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        No Favorites Yet
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Start exploring and click the heart icon on products you love to save them here.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Heart className="w-8 h-8 text-red-500 fill-current"/>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            My Favorites
                        </h1>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        {products.length} {products.length === 1 ? 'item' : 'items'} saved
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                            priority={index < 4}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
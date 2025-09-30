// components/layout/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from "next/link";
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle";
import ShopDropdown from './Header/ShopDropdown';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { name: 'All Products', value: '' },
  { name: 'Technology', value: 'technology' },
  { name: 'Home', value: 'home' },
  { name: 'Kitchen', value: 'kitchen' },
  { name: 'Clothing', value: 'clothing' },
  { name: 'Dream Items', value: 'dream' },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

    return (
        <>
        <div className="w-full bg-gradient-to-br from-gray-900 via-purple-300 to-purple-600 border-b border-purple-400 shadow-sm sticky top-0 z-40">
            <header className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto text-white">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href='/' className="block hover:opacity-80 hover:text-purple-200 transition-opacity">
                        <img src="/images/logo/logo.svg" alt="Robos Wishlist Logo" className="w-40 h-40"/>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center space-x-8">
                        <li>
                            <Link href='/' className="hover:text-purple-100 transition-colors font-medium">
                                Home
                            </Link>
                        </li>
                        <li>
                            <ShopDropdown />
                        </li>
                        <li>
                            <Link href='/about' className="hover:text-purple-100 transition-colors font-medium">
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center space-x-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <form className="relative">
                            <input 
                                type="text" 
                                placeholder="What are you looking for?"
                                className="pl-10 pr-10 py-2 w-64 rounded-lg
                                        bg-white/90 text-gray-800 placeholder-gray-500
                                        border border-white/50
                                        focus:outline-none focus:ring-2 focus:ring-purple-400
                                        dark:bg-black/30 dark:text-gray-100 dark:placeholder-gray-300
                                        dark:border-white/10"
                            />
                            <button
                                type="submit"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-500 transition-colors"
                            >
                                <Search className="h-4 w-4"/>
                            </button>
                        </form>
                    </div>

                    {/* Icon Actions */}
                    <div className="flex items-center space-x-3">
                        <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <Heart className="h-5 w-5" />
                        </Link>
                        <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <User className="h-5 w-5" />
                        </Link>
                        <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <ShoppingCart className="h-5 w-5" />
                        </Link>
                        <ThemeToggle/>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-white/10 backdrop-blur-md border-t border-white/20 overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-4">
                            {/* Mobile Search */}
                            <div className="relative">
                                <form className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Search products..."
                                        className="pl-10 pr-4 py-2 w-full rounded-lg
                                                bg-white/90 text-gray-800 placeholder-gray-500
                                                border border-white/50
                                                focus:outline-none focus:ring-2 focus:ring-purple-400
                                                dark:bg-black/30 dark:text-gray-100 dark:placeholder-gray-300
                                                dark:border-white/10"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-500 transition-colors"
                                    >
                                        <Search className="h-4 w-4"/>
                                    </button>
                                </form>
                            </div>

                            {/* Mobile Navigation Links */}
                            <nav className="space-y-2">
                                <Link 
                                    href='/' 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors font-medium"
                                >
                                    Home
                                </Link>
                                
                                {/* Mobile Shop with Expandable Categories */}
                                <div>
                                    <button
                                        onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                                        className="w-full flex items-center justify-between py-2 px-4 hover:bg-white/10 rounded-lg transition-colors font-medium"
                                    >
                                        <span>Shop</span>
                                        <motion.div
                                            animate={{ rotate: isMobileCategoriesOpen ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown className="h-4 w-4" />
                                        </motion.div>
                                    </button>
                                    
                                    <AnimatePresence>
                                        {isMobileCategoriesOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pl-4 pt-2 space-y-1">
                                                    {categories.map((category) => (
                                                        <Link
                                                            key={category.value}
                                                            href={category.value ? `/shop/${category.value}` : '/shop'}
                                                            onClick={() => {
                                                                setIsMobileCategoriesOpen(false);
                                                                setIsMobileMenuOpen(false);
                                                            }}
                                                            className="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors text-sm"
                                                        >
                                                            {category.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <Link 
                                    href='/about' 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors font-medium"
                                >
                                    About
                                </Link>
                            </nav>

                            {/* Mobile Action Icons */}
                            <div className="flex items-center justify-around pt-4 border-t border-white/20">
                                <Link 
                                    href="/" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Heart className="h-5 w-5" />
                                    <span className="text-xs">Favorites</span>
                                </Link>
                                <Link 
                                    href="/" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <User className="h-5 w-5" />
                                    <span className="text-xs">Account</span>
                                </Link>
                                <Link 
                                    href="/" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="text-xs">Cart</span>
                                </Link>
                                <div className="flex flex-col items-center gap-1 p-2">
                                    <ThemeToggle/>
                                    <span className="text-xs">Theme</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        </>
    );
}
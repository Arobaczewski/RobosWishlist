'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, User, Menu, X, ChevronDown, LogOut, User2 } from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle";
import ShopDropdown from './Header/ShopDropdown';
import SearchBar from './Header/SearchBar';
import AuthModal from '../auth/AuthModal';
import CartModal from '../cart/CartModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks/hooks';
import { logout } from '@/app/store/slices/authSlice';
import { useFavorites } from '@/app/store/hooks/useFavorites';
import { useCart } from '@/app/store/hooks/useCart';

const categories = [
  { name: 'All Products', value: '' },
  { name: 'Technology', value: 'technology' },
  { name: 'Home', value: 'home' },
  { name: 'Kitchen', value: 'kitchen' },
  { name: 'Clothing', value: 'clothing' },
  { name: 'Dream Items', value: 'dream' },
];

export default function Header() {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const { favorites } = useFavorites();
    const { itemCount, toggleCart } = useCart();
    const dispatch = useAppDispatch();

    // Fix hydration mismatch - wait for client-side mount
    useEffect(() => {
      setIsMounted(true);
    }, []);

    const handleLogout = () => {
      dispatch(logout());
      setShowUserMenu(false);
      router.push('/'); // Redirect to home page after logout
    };

    const favoritesCount = favorites.length;

    // During SSR and initial render, show loading state
    if (!isMounted) {
      return (
        <div className="w-full bg-gradient-to-br from-gray-900 via-purple-300 to-purple-600 border-b border-purple-400 shadow-sm sticky top-0 z-40">
          <header className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto text-white">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href='/' className="block hover:opacity-80 hover:text-purple-200 transition-opacity">
                <Image src="/images/logo/logo.svg" alt="Robos Wishlist Logo" width={200} height={200} priority/>
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

            {/* Desktop Actions - Placeholder during SSR */}
            <div className="hidden lg:flex items-center space-x-4">
              <SearchBar />
              <div className="flex items-center space-x-3">
                <Link href="/favorites" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                  <Heart className="h-5 w-5" />
                </Link>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <User className="h-5 w-5" />
                </button>
                <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                </button>
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </header>
        </div>
      );
    }

    return (
        <>
        <div className="w-full bg-gradient-to-br from-gray-900 via-purple-300 to-purple-600 border-b border-purple-400 shadow-sm sticky top-0 z-40">
            <header className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto text-white">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href='/' className="block hover:opacity-80 hover:text-purple-200 transition-opacity">
                        <Image src="/images/logo/logo.svg" alt="Robos Wishlist Logo" width={200} height={200} priority/>
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
                    <SearchBar />

                    {/* Icon Actions */}
                    <div className="flex items-center space-x-3">
                        {/* Favorites with Badge */}
                        <Link href="/favorites" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
                            <Heart className="h-5 w-5" />
                            {favoritesCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                                >
                                    {favoritesCount > 9 ? '9+' : favoritesCount}
                                </motion.span>
                            )}
                        </Link>
                        
                        {/* User Account/Login */}
                        {isAuthenticated && user ? (
                          <div className="relative">
                            <button
                              onClick={() => setShowUserMenu(!showUserMenu)}
                              className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                              <User className="h-5 w-5" />
                              <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                            </button>
                            
                            {/* User Dropdown Menu */}
                            <AnimatePresence>
                              {showUserMenu && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                                >
                                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                  </div>
                                  <Link
                                    href="/account/profile"
                                    onClick={() => setShowUserMenu(false)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <User2 className="w-4 h-4" />
                                    My Profile
                                  </Link>
                                  <Link
                                    href="/account/orders"
                                    onClick={() => setShowUserMenu(false)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <ShoppingCart className="w-4 h-4" />
                                    My Orders
                                  </Link>
                                  <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                  >
                                    <LogOut className="w-4 h-4" />
                                    Log Out
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <User className="h-5 w-5" />
                          </button>
                        )}
                        
                        {/* Cart with Badge */}
                        <button 
                            onClick={toggleCart}
                            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                                >
                                    {itemCount > 9 ? '9+' : itemCount}
                                </motion.span>
                            )}
                        </button>
                        
                        {/* Theme Toggle */}
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden border-t border-white/20 overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-2">
                            {/* Mobile Search */}
                            <div className="pb-4">
                                <SearchBar />
                            </div>
                            
                            {/* Mobile Navigation */}
                            <nav className="space-y-1">
                                <Link 
                                    href='/' 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors font-medium"
                                >
                                    Home
                                </Link>
                                
                                {/* Mobile Shop with Categories */}
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

                                {/* Mobile Orders Link (if authenticated) */}
                                {isAuthenticated && user && (
                                  <Link 
                                    href='/account/orders' 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors font-medium"
                                  >
                                    My Orders
                                  </Link>
                                )}
                            </nav>

                            {/* Mobile Action Icons */}
                            <div className="flex items-center justify-around pt-4 border-t border-white/20">
                                {/* Mobile Favorites with Badge */}
                                <Link 
                                    href="/favorites" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="relative flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Heart className="h-5 w-5" />
                                    <span className="text-xs">Favorites</span>
                                    {favoritesCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                                        >
                                            {favoritesCount > 9 ? '9+' : favoritesCount}
                                        </motion.span>
                                    )}
                                </Link>
                                
                                {isAuthenticated && user ? (
                                  <button
                                    onClick={handleLogout}
                                    className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
                                  >
                                    <LogOut className="h-5 w-5" />
                                    <span className="text-xs">Logout</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setIsAuthModalOpen(true);
                                    }}
                                    className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
                                  >
                                    <User className="h-5 w-5" />
                                    <span className="text-xs">Login</span>
                                  </button>
                                )}
                                
                                {/* Mobile Cart with Badge */}
                                <button 
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      toggleCart();
                                    }}
                                    className="relative flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="text-xs">Cart</span>
                                    {itemCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                                        >
                                            {itemCount > 9 ? '9+' : itemCount}
                                        </motion.span>
                                    )}
                                </button>
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

        {/* Auth Modal */}
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />

        {/* Cart Modal */}
        <CartModal />
        </>
    );
}
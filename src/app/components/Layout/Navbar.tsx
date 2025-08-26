import Link from "next/link"
import { Search, X, Heart, ShoppingCart, User } from "lucide-react"
import ThemeToggle from "../theme/ThemeToggle"

export default function Header() {
    return (
        <>
        <div className="w-full bg-gradient-to-br from-gray-900 via-purple-300 to-purple-600 border-b border-purple-400 shadow-sm">
            <header className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto text-white">
                <div className="flex-shrink-0">
                    <Link href='/' className="block hover:opacity-80 hover:text-purple-200 transition-opacity">
                        <img src="/logo.svg" alt="Robos Wishlist Logo" className="w-40 h-40"/>
                    </Link>
                </div>
                <nav className="hidden md:block">
                    <ul className="flex space-x-8">
                        <li>
                            <Link href='/' className="hover:text-purple-100 transition-colors font-medium">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href='/' className="hover:text-purple-100 transition-colors font-medium">
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link href='/' className="hover:text-purple-100 transition-colors font-medium">
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="hidden md:flex items-center space-x-4">
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

            </header>

        </div>
        </>
    )
}
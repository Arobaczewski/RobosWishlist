import { ShoppingBag, Code, Heart, Target, Sparkles, TrendingUp, ExternalLink, Lightbulb, Home, Utensils, Gamepad2, Car, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Who We Are Section */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Who We Are
                </h2>
              </div>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <p>
                  Let's be real. This isn't actually an e-commerce store where you can buy things. This is my personal wishlist, built from scratch to showcase what I can do as a developer while sharing the products I genuinely want in my life.
                </p>
                <p>
                  Every product you see here is something I've researched, considered, and added to my real wishlist. From the MacBook Pro I need for development to that Porsche 911 GT3 (yes, I'm aware that's a bit ambitious), these are my actual goals and aspirations.
                </p>
                <p>
                  <strong>Want to actually buy something you see?</strong> Each product has a direct link to where you can purchase it. I've done the research, so you don't have to!
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 dark:shadow-purple-500/40">
              <img 
                src="/images/about/setup.png" 
                alt="Developer workspace setup"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Why I Built This Section */}
        <div className="mb-20 bg-purple-50 dark:bg-gray-800/50 rounded-3xl p-8 md:p-12 shadow-lg shadow-purple-500/10 dark:shadow-purple-500/20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-96 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 dark:shadow-purple-500/40">
              <img 
                src="/images/about/collage.png" 
                alt="Coding and development"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Why I Built This
                </h2>
              </div>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <p>
                  As a developer, I wanted to create a portfolio project that showed off my full-stack skills while being something I'd actually use. Building a wishlist site let me work with modern technologies like Next.js, TypeScript, Zustand, and Redux while keeping it personal and fun.
                </p>
                <p>
                  But beyond the tech stack, I wanted potential employers to see who I am. The products I choose tell a story. My love for technology, my focus on building a comfortable home workspace, my dream of owning that ridiculously expensive mansion someday (can you blame me?).
                </p>
                <p>
                  This project is proof that I can build beautiful, functional applications. But it's also proof that I'm a real person with goals, hobbies, and a healthy sense of humor about my own ambitions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Touch Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Every Detail is Personal
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              This isn't just a portfolio project with dummy data. Every aspect of this site, from the color scheme to each individual product, reflects my personal taste, goals, and identity.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40 transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-900 via-purple-300 to-purple-600 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                The Colors
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                That purple gradient you see everywhere? That's my favorite color scheme. I wanted something vibrant and modern that represents my personality.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40 transition-shadow">
              <ShoppingBag className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                The Products
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every single item is something I've genuinely researched and want. I didn't grab random products from an API. These are my real wishlists.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40 transition-shadow">
              <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                The Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                From the animations to the layout to the way products are organized, I designed every interaction to feel smooth, intuitive, and uniquely mine.
              </p>
            </div>
          </div>
        </div>

        {/* Product Categories Story */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            The Story Behind Each Category
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Technology */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40 transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Technology</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                These are my tools. The MacBook Pro for development, the iPad for design work, AirPods for those deep focus sessions. Every piece of tech here serves a purpose in building better products and improving my craft.
              </p>
              <Link 
                href="/shop/technology" 
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors"
              >
                Browse Technology
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Home */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40 transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Home</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your environment shapes your productivity. The standing desk, the ergonomic chair, the robot vacuum that saves me time. I'm building a space that helps me do my best work while staying comfortable and healthy.
              </p>
              <Link 
                href="/shop/home" 
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                Browse Home
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Kitchen */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40 transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Utensils className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Kitchen</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cooking is my creative outlet outside of coding. That KitchenAid mixer isn't just for show. I genuinely want to level up my baking game and having quality tools makes all the difference.
              </p>
              <Link 
                href="/shop/kitchen" 
                className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors"
              >
                Browse Kitchen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Clothing */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40 transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Sparkles className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Clothing</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Sports jerseys represent the teams and players I grew up watching. That WWE Championship belt? Pure nostalgia from my childhood. Sometimes you just need to own something that makes you smile.
              </p>
              <Link 
                href="/shop/clothing" 
                className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-colors"
              >
                Browse Clothing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Technology & Gaming Combined */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40 transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Gamepad2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Gaming & Tech</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The Switch 2 for downtime, the RTX 5090 for pushing pixels (and maybe some machine learning projects). Gaming keeps me balanced, and the high-end hardware? Well, a developer can dream about the perfect setup.
              </p>
              <Link 
                href="/shop/technology" 
                className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold transition-colors"
              >
                Browse Tech & Gaming
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Dream Items */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40 transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Car className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dream Items</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Okay, so the $288K Porsche 911 GT3 and the $5 million luxury estate are... optimistic. But hey, a guy can dream, right? These are the "when I make it big" items. The realistic goal is the Toyota Camry. The Porsche? That's motivation.
              </p>
              <Link 
                href="/shop/dream" 
                className="inline-flex items-center gap-2 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-semibold transition-colors"
              >
                Browse Dream Items
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* The Real Talk Section */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 dark:shadow-purple-500/40">
              <img 
                src="/images/about/portrait.png" 
                alt="Aspirational goals and dreams"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  The Real Talk
                </h2>
              </div>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <p>
                  Am I going to buy that $5 million house tomorrow? Absolutely not. Do I have $288K sitting around for a Porsche? I wish! But that's not the point.
                </p>
                <p>
                  These items represent goals at different scales. Some are achievable this year (looking at you, standing desk). Some are 5-year goals. And some? Well, some are just there to keep me motivated and dreaming big.
                </p>
                <p>
                  What's important is that I've done my research on each one. I know exactly what I want and why I want it. That same level of attention to detail carries over into my development work.
                </p>
                <p className="font-semibold text-purple-600 dark:text-purple-400">
                  Because whether I'm building a website or building my dream life, I believe in doing it with intention, research, and a clear vision of the end goal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-gray-600 via-purple-300 to-purple-500 rounded-3xl p-12 text-center text-white shadow-2xl shadow-purple-500/30 dark:shadow-purple-500/50">
          <Lightbulb className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Learn More?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Thanks for taking the time to learn about this project and what drives me. If you see something you like, click through to buy it. If you want to connect, reach out!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="/shop" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-50 text-purple-600 rounded-lg font-semibold hover:bg-purple-200 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse My Wishlist
            </a>
            <a 
              href="https://github.com/arobaczewski" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              View My GitHub
            </a>
            <a 
              href="https://alexrobo.dev/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-800 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Visit My Portfolio
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
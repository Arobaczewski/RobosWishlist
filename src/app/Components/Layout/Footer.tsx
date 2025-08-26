// Footer.jsx - Professional e-commerce footer with branding and trust indicators
// Demonstrates asset management, responsive design, and business credibility features

import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

// PAYMENT METHOD LOGOS - Local Asset Management
// Demonstrates proper asset organization and import patterns
// These build trust and credibility for e-commerce applications

export default function Footer() {
    return (
        // STICKY FOOTER IMPLEMENTATION
        // mt-auto pushes footer to bottom when content is short
        // Essential for professional page layouts and user experience
        <div className="mt-auto">
            
            {/* MAIN FOOTER CONTAINER */}
            {/* Brand colors (indigo-700) maintain consistency with site theme */}
            {/* Border-top creates subtle separation from main content */}
            <footer className="bg-gradient-to-br from-gray-900 via-purple-300 to-purple-600 border-b border-purple-400 shadow-sm text-white">
                
                {/* CONTENT WRAPPER with max-width for readability */}
                {/* max-w-7xl prevents footer from becoming too wide on large screens */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    
                    {/* MAIN FOOTER CONTENT GRID */}
                    {/* Responsive flex layout: stacked on mobile, horizontal on desktop */}
                    {/* justify-between creates equal spacing between sections */}
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                        
                        {/* SECTION 1: COMPANY NAVIGATION LINKS */}
                        {/* Important pages for customer service and business information */}
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                            <Link 
                                href='/' 
                                className=" hover:text-purple-200 transition-colors font-medium"
                            >
                                About This Collection
                            </Link>
                        </div>
                        
                        {/* SECTION 2: SOCIAL MEDIA PRESENCE */}
                        {/* Professional social media integration for brand building */}
                        {/* Each platform gets proper external link attributes */}
                        <div className="flex items-center space-x-4">
                            <span className="text-sm mr-2">Follow Us:</span>
                            
                            {/* GITHUB LINK - Developer Portfolio Focus */}
                            {/* target="_blank" opens in new tab, rel attributes for security */}
                            <Link 
                                href='https://github.com/Arobaczewski'
                                className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {/* GROUP HOVER PATTERN - Icon color changes with background */}
                                <Github className="h-6 w-6" />
                            </Link>
                            
                            {/* LINKEDIN - Professional Networking */}
                            <Link 
                                href='https://www.linkedin.com/in/alexander-robaczewski/'
                                className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Linkedin className="h-6 w-6" />
                            </Link>
                        </div>
                        
                        {/* SECTION 3: PAYMENT METHODS - TRUST INDICATORS */}
                        {/* Critical for e-commerce: shows accepted payment methods */}
                        {/* Builds customer confidence and reduces checkout abandonment */}
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-sm">We Accept:</span>
                            
                            {/* PAYMENT LOGO GRID */}
                            {/* Each logo in white container for contrast and visibility */}
                            {/* Hover animations add premium feel without being distracting */}
                            <div className="flex items-center space-x-3">
                                
                                {/* VISA CARD LOGO */}
                                <div className="bg-transparent p-2 rounded-md hover:scale-105 transition-transform shadow-sm">
                                    <img src='/visa.jpg' alt="Visa" className="h-6 w-auto" />
                                </div>
                                
                                {/* MASTERCARD LOGO */}
                                <div className="bg-transparent p-2 rounded-md hover:scale-105 transition-transform shadow-sm">
                                    <img src='/mastercard.jpg' alt="Mastercard" className="h-6 w-auto" />
                                </div>
                                
                                {/* AMERICAN EXPRESS LOGO */}
                                <div className="bg-transparent p-2 rounded-md hover:scale-105 transition-transform shadow-sm">
                                    <img src='/amex.jpg' alt="American Express" className="h-6 w-auto" />
                                </div>
                                
                                {/* DISCOVER CARD LOGO */}
                                <div className="bg-transparent p-2 rounded-md hover:scale-105 transition-transform shadow-sm">
                                    <img src='/discover.jpg' alt="Discover" className="h-6 w-auto" />
                                </div>
                                
                                {/* PAYPAL LOGO */}
                                {/* PayPal often increases conversion rates due to customer trust */}
                                <div className="bg-transparent p-2 rounded-md hover:scale-105 transition-transform shadow-sm">
                                    <img src='/paypal.jpg' alt="PayPal" className="h-6 w-auto" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* BOTTOM FOOTER - COPYRIGHT AND LEGAL */}
                    {/* Standard legal footer with border separation */}
                    {/* Centered text creates professional, authoritative appearance */}
                    <div className="border-t border-purple-400 mt-8 pt-6 text-center">
                        <p className="text-sm text-purple-100">
                            © 2025 Robos Wishlist. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// DESIGN PRINCIPLES DEMONSTRATED:
//
// 1. TRUST BUILDING: Payment logos and professional social links establish credibility
// 2. RESPONSIVE DESIGN: Layout adapts gracefully from mobile to desktop
// 3. BRAND CONSISTENCY: Color scheme matches site theme throughout
// 4. ACCESSIBILITY: Proper alt text on images, semantic HTML structure
// 5. SECURITY: noopener noreferrer on external links prevents security issues
// 6. USER EXPERIENCE: Hover effects and transitions create engaging interactions
// 7. BUSINESS FOCUS: Links to important pages (contact, about) for customer service
//
// TECHNICAL SKILLS SHOWN:
// - Asset management and optimization
// - Responsive flexbox layouts
// - CSS transitions and transforms
// - External link best practices
// - Component organization and styling
// - Brand identity implementation
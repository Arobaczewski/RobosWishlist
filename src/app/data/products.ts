import { Product } from "../types/product";

export const products: Product[] = [
    {
        id: '1',
        name: `Apple - MacBook Pro`,
        description: `The 16-inch MacBook Pro redefines professional 
                      performance with the Apple M4 Max chip, engineered 
                      to handle next-generation creative, development, 
                      and AI-driven tasks. With 48GB of unified memory and 
                      a 1TB SSD, you’ll experience lightning-fast 
                      responsiveness, seamless multitasking, and massive 
                      storage for all your projects. Designed in a sleek 
                      Space Black aluminum enclosure, this MacBook Pro 
                      isn’t just powerful—it’s built for Apple 
                      Intelligence, making it your ultimate tool for 
                      editing, coding, designing, or running complex 
                      simulations.`,
        keyFeatures: [
            "Apple M4 Max chip for unmatched performance",
            "16-inch Liquid Retina XDR display with ProMotion",
            "48GB unified memory for demanding workflows",
            "1TB SSD for lightning-fast storage and multitasking",
            "macOS optimized for developers and creatives",
            "All-day battery life with efficient power management",
            "Sleek Space Black finish with advanced cooling system"
        ],
        basePrice: 3099,
        images: [
            '/images/products/technology/spaceblack/macblack1.png',
            '/images/products/technology/spaceblack/macblack2.png',
            '/images/products/technology/spaceblack/macblack3.png',
            '/images/products/technology/spaceblack/macblack4.png',
            '/images/products/technology/spaceblack/macblack5.png',
            '/images/products/technology/spaceblack/macblack6.png',
        ],
        category: 'technology',
        brand: 'Apple',
        hasVariants: true,
        variantOptions: [
            {
                type: 'color',
                name: 'Color',
                required: true,
                variants: [
                    {
                        id: 'apple-macbook-pro-space-black',
                        name: 'Space Black',
                        value: 'space-black',
                        type: 'color',
                        price: 0,
                        images: [
                            '/images/products/technology/spaceblack/macblack1.png',
                            '/images/products/technology/spaceblack/macblack2.png',
                            '/images/products/technology/spaceblack/macblack3.png',
                            '/images/products/technology/spaceblack/macblack4.png',
                            '/images/products/technology/spaceblack/macblack5.png',
                            '/images/products/technology/spaceblack/macblack6.png',
                        ], 
                        inStock: true,
                        stockQuanity: 25
                    },
                    {
                        id: 'apple-macbook-pro-silver',
                        name: 'Silver',
                        value: 'silver',
                        type: 'color',
                        price: 0,
                        images: [
                            '/images/products/technology/silver/macsilver1.png',
                            '/images/products/technology/silver/macsilver2.png',
                            '/images/products/technology/silver/macsilver3.png',
                            '/images/products/technology/silver/macsilver4.png',
                            '/images/products/technology/silver/macsilver5.png',
                            '/images/products/technology/silver/macsilver6.png',
                        ], 
                        inStock: true,
                        stockQuanity: 25
                    }
                ]
            },
            {
                type: 'storage',
                name: 'Storage',
                required: true,
                variants: [
                    {
                        id: 'apple-macbook-pro-36gb',
                        name: '36GB',
                        value: '36gb',
                        type: 'storage',
                        price: 0,
                        inStock: true,
                        stockQuanity: 25,
                    },
                    {
                        id: 'apple-macbook-pro-48gb',
                        name: '48GB',
                        value: '48gb',
                        type: 'storage',
                        price: 500,
                        inStock: true,
                        stockQuanity: 25,
                    }
                ]
            }
        ], 
        defaultVariants: {
            color: 'space-black',
            storage: '36gb'
        },
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "laptop", "apple", "macbook", "macbook-pro",
            "m4-max", "16-inch", "retina-display",
            "ssd", "developer", "creative", "space-black", "performance"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/apple-macbook-pro-16-inch-laptop-apple-m4-max-chip-built-for-apple-intelligence-48gb-memory-1tb-ssd-space-black/JJGCQ8HW6L'
    },
    {
        id: '2',
        name: 'Apple - AirPods Max',
        description: `AirPods Max, the ultimate listening 
                      experience. Now in five new colors. An 
                      Apple-designed driver provides 
                      high-fidelity audio. Every detail, from 
                      canopy to cushions, has been designed 
                      for an exceptional fit. Pro-level Active 
                      Noise Cancellation blocks outside noise, 
                      while Transparency mode keeps you 
                      connected to your environment. Updated 
                      with a USB-C connector for even more 
                      convenient charging.`,
        keyFeatures: [
            "High-fidelity audio with Apple-designed drivers",
            "Active Noise Cancellation and Transparency mode",
            "Spatial Audio with dynamic head tracking",
            "Memory foam ear cushions for all-day comfort",
            "Seamless pairing with Apple devices via H1 chip",
            "20 hours of listening with Active Noise Cancellation enabled",
            "Crafted with premium aluminum and stainless steel materials"
        ],
        basePrice: 549.99,
        images: [
            '/images/products/technology/midnight/maxmidnight1.png',
            '/images/products/technology/midnight/maxmidnight2.png',
            '/images/products/technology/midnight/maxmidnight3.png',
        ],
        category: 'technology',
        brand: 'Apple',
        hasVariants: true,
        variantOptions: [
            {
                type: 'color',
                name: 'Color',
                required: true,
                variants: [
                    {
                        id: 'apple-airpod-max-midnight',
                        name: 'Midnight',
                        value: 'midnight',
                        type: 'color',
                        price: 0,
                        images: [
                            '/images/products/technology/midnight/maxmidnight1.png',
                            '/images/products/technology/midnight/maxmidnight2.png',
                            '/images/products/technology/midnight/maxmidnight3.png',
                        ],
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'apple-airpod-max-blue',
                        name: 'Blue',
                        value: 'blue',
                        type: 'color',
                        price: 0,
                        images: [
                            '/images/products/technology/midnight/maxblue1.png',
                            '/images/products/technology/midnight/maxblue2.png',
                            '/images/products/technology/midnight/maxblue3.png',
                        ],
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'apple-airpod-max-orange',
                        name: 'Orange',
                        value: 'orange',
                        type: 'color',
                        price: 0,
                        images: [
                            '/images/products/technology/midnight/maxorange1.png',
                            '/images/products/technology/midnight/maxorange2.png',
                            '/images/products/technology/midnight/maxorange3.png'
                        ],
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'apple-airpod-max-purple',
                        name: 'Purple',
                        value: 'purple',
                        type: 'color',
                        price: 0,
                        images: [
                            '/images/products/technology/midnight/maxpurple1.png',
                            '/images/products/technology/midnight/maxpurple2.png',
                            '/images/products/technology/midnight/maxpurple3.png',
                        ],
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'apple-airpod-max-starlight',
                        name: 'Starlight',
                        value: 'starlight',
                        type: 'color',
                        price: 0,
                        images: [
                            '/images/products/technology/midnight/maxstarlight1.png',
                            '/images/products/technology/midnight/maxstarlight2.png',
                            '/images/products/technology/midnight/maxstarlight3.png'
                        ],
                        inStock: true,
                        stockQuanity: 20
                    }
                ]
            }
        ],
        defaultVariants: {
            color: 'midnight'
        },
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "headphones", "apple", "airpods", "airpods-max",
            "wireless", "noise-cancelling", "spatial-audio",
            "bluetooth", "premium", "over-ear", "h1-chip", "music"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/apple-airpods-max-usb-c-midnight/JJGCQ3ZZ3Q'
    },
    {
        id: '3',
        name: 'Apple - AirPods Pro 2, Wireless Active Noise Cancelling Earbuds',
        description: `AirPods Pro 2 - featuring pro-level Active Noise 
                      Cancellation, Adaptive Audio, Transparency mode, 
                      Personalized Spatial Audio, and a breakthrough in 
                      hearing health with a scientifically validated 
                      Hearing Test, clinical-grade Hearing Aid capability, 
                      and active Hearing Protection.`,
        keyFeatures: [
            "Advanced Active Noise Cancellation with Adaptive Transparency",
            "Custom high-excursion Apple driver for rich, detailed sound",
            "Personalized Spatial Audio with dynamic head tracking",
            "Sweat and water resistant (IPX4) for workouts and outdoor use",
            "Up to 6 hours of listening time with ANC enabled",
            "Seamless pairing and switching across Apple devices",
            "MagSafe charging case with Precision Finding support"
        ],
        basePrice: 249.99,
        images: [
            '/images/products/technology/airpodpros/pros1.png',
            '/images/products/technology/airpodpros/pros2.png',
            '/images/products/technology/airpodpros/pros3.png',
            '/images/products/technology/airpodpros/pros4.png'
        ],
        category: 'technology',
        brand: 'Apple',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "earbuds", "apple", "airpods", "airpods-pro", "2nd-gen",
            "wireless", "noise-cancelling", "spatial-audio",
            "bluetooth", "magsafe", "portable", "music"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/apple-airpods-pro-2-wireless-active-noise-cancelling-earbuds-with-hearing-aid-feature-white/JJGCQ88C8X'
    },
    {
        id: '4',
        name: `MSI - 18" Gaming Laptop 2560 x 1600 (QHD+) - AMD Ryzen 9 
               9955HX with 32GB Memory - GeForce RTX 5070 Ti - 2 TB SSD - 
               Cosmo Gray`,
        description: `Engineered to meet the demands of STEM professionals, 
                      the Vector A18 HX delivers cutting-edge performance 
                      with uncompromising stability. Powered by the latest 
                      AMD Ryzen 9 9955HX processor and NVIDIA GeForce RTX 
                      50 Series Laptop GPU, it functions as a high-tech 
                      engine, seamlessly processing complex data with 
                      speed and precision. Whether you're developing 
                      software, analyzing data, or running simulations, 
                      the Vector A18 HX provides the performance and 
                      reliability engineers need to tackle any challenge 
                      confidently.`,
        keyFeatures: [
            "18-inch QHD+ (2560 x 1600) display with fast refresh rate",
            "Powered by AMD Ryzen 9 9955HX processor for elite performance",
            "NVIDIA GeForce RTX 5070 Ti graphics for immersive gaming visuals",
            "32GB DDR5 memory for seamless multitasking",
            "2TB SSD for ultra-fast storage and game load times",
            "Advanced cooling system to sustain high performance",
            "Premium Cosmo Gray chassis with RGB backlit keyboard"
        ],
        basePrice: 2699.99,
        images: [
            '/images/products/technology/laptop/laptop1.png',
            '/images/products/technology/laptop/laptop2.png',
            '/images/products/technology/laptop/laptop3.png',
            '/images/products/technology/laptop/laptop4.png',
            '/images/products/technology/laptop/laptop5.png'

        ],
        category: 'technology',
        brand: 'MSI',
        hasVariants: false,
        inStock: true,
        stockQuanity: 50,
        rating: 0,
        reviewCount: 0,
        tags: [
            "laptop", "gaming", "msi", "amd", "ryzen-9", 
            "rtx-5070ti", "qhd+", "18-inch", "geforce", 
            "ssd", "cosmo-gray", "performance", "rgb", "gaming-laptop"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/msi-18-gaming-laptop-2560-x-1600-qhd--amd-ryzen-9-9955hx-with-32gb-memory-geforce-rtx-5070-ti-2-tb-ssd-cosmo-gray-gray/J3P7TXR2CS/sku/6621167?ref=212&loc=GamingLaptops&gclsrc=aw.ds&gad_source=1&gad_campaignid=19976416269&gbraid=0AAAAAD-ORIgVJgV-ngExgbmWP9MKPqrKC&gclid=CjwKCAjwiNXFBhBKEiwAPSaPCYPMELO8ONE-Re3CkUi3E7g-vCfYtNWom--zbst60WXKVdIhWfaIYRoCOwsQAvD_BwE'
    },
    {
        id: '5',
        name: `MSI - NVIDIA GeForce GeForce RTX 5090 32G GAMING TRIO OC 
               32GB GDDR7 PCI Express Gen 5 Graphics Card - Black`,
        description: `Fearless and bold, MSI GeForce RTX 5090 32G GAMING 
                      TRIO OC delivers strong performance to both gaming 
                      and content creation. It blends a fierce look with 
                      advanced cooling technologies, making it an 
                      unwavering ally on the gaming battlefield. GAMING 
                      TRIO is the ideal choice for gamers who strive to 
                      give their all.`,
        keyFeatures: [
            "NVIDIA GeForce RTX 5090 GPU with 32GB GDDR7 memory",
            "Factory overclocked Gaming Trio OC design for boosted performance",
            "PCI Express Gen 5 interface for maximum bandwidth",
            "Ray tracing and DLSS 4.0 for lifelike graphics and higher FPS",
            "Advanced TRI FROZR 3 cooling system with TORX Fan 5.0",
            "Durable black shroud with RGB Mystic Light accents",
            "Perfect for 4K and next-gen gaming, AI, and creative workloads"
        ],
        basePrice: 2499.99,
        images: [
            '/images/products/technology/graphicscard/graphicscard1.png',
            '/images/products/technology/graphicscard/graphicscard2.png',
            '/images/products/technology/graphicscard/graphicscard3.png',
            '/images/products/technology/graphicscard/graphicscard4.png',
            '/images/products/technology/graphicscard/graphicscard5.png',
            '/images/products/technology/graphicscard/graphicscard6.png'
        ],
        category: 'technology',
        brand: 'Nvidia',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "gpu", "graphics-card", "msi", "rtx-5090", "geforce",
            "pci-express-gen5", "gddr7", "ray-tracing", "dlss4",
            "gaming", "overclocked", "rgb", "pc-build", "high-performance"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/msi-nvidia-geforce-geforce-rtx-5090-32g-gaming-trio-oc-32gb-gddr7-pci-express-gen-5-graphics-card-black/J3P7TX6Z3H/sku/6616090?extStoreId=324&utm_source=feed&ref=212&loc=SaleEvent&gclsrc=aw.ds&gad_source=1&gad_campaignid=18221466691&gbraid=0AAAAAD-ORIjJYSJMkI68s9_-1kj1CIGcS&gclid=CjwKCAjwiNXFBhBKEiwAPSaPCYmqLPTXOVkpeW4X_yinQTCLUWO0BjkfkkUWbxTpNdefsodgCjWsvBoCFosQAvD_BwE'
    },
    {
        id: '6',
        name: 'Switch 2 System - Nintendo Switch 2',
        description: `Your games will leap to life on the vivid, 7.9” 1080p 
                      screen that showcases the system’s powerful processing 
                      and graphics performance. The updated dock also 
                      supports up to 4K resolution and frame rates up to 120 
                      fps with compatible games and TVs. The reimagined 
                      Joy-Con 2 controllers snap into place with magnetic 
                      connectors—and each controller can even be used as a 
                      mouse in compatible games. Plus, you can still enjoy 
                      compatible games from your existing Nintendo Switch 
                      library.`,
        keyFeatures: [
            "Hybrid design for both handheld and docked TV play",
            "Upgraded performance for smoother gameplay and faster load times",
            "Enhanced OLED display with higher resolution and vivid colors",
            "Backward compatibility with Nintendo Switch game library",
            "Detachable Joy-Con controllers with improved ergonomics",
            "Expanded battery life for extended portable sessions",
            "Online multiplayer and cloud save support via Nintendo Switch Online"
        ],
        basePrice: 449.99,
        images: [
            '/images/products/technology/switch2/switch1.png',
            '/images/products/technology/switch2/switch2.png',
            '/images/products/technology/switch2/switch3.png',
            '/images/products/technology/switch2/switch4.png',
            '/images/products/technology/switch2/switch5.png',
            '/images/products/technology/switch2/switch6.png',
            '/images/products/technology/switch2/switch7.png'
        ],
        category: 'technology',
        brand: 'Nintendo',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "nintendo", "switch-2", "console", "gaming", "handheld",
            "hybrid", "joy-con", "oled", "multiplayer", 
            "portable", "family", "video-games", "next-gen"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/switch-2-system-nintendo-switch-2/J7GSL57TGH'
    },
    {
        id: '7',
        name: `Apple - 13-inch iPad Pro M4 chip Built for Apple 
               Intelligence Wi-Fi + Cellular with OLED - Unlocked`,
        description: `iPad Pro. Built for Apple Intelligence. It’s 
                      impossibly thin, featuring outrageous performance 
                      with the Apple M4 chip, a breakthrough Ultra Retina 
                      XDR display, and superfast Wi-Fi 6E and 5G. Along 
                      with Apple Pencil Pro and Magic Keyboard, it brings 
                      endless versatility, creativity, and productivity to 
                      your fingertips.`,
        keyFeatures: [
            "Powered by Apple M4 chip optimized for Apple Intelligence features",
            "13-inch Ultra Retina XDR OLED display with stunning brightness and contrast",
            "Wi-Fi + Cellular connectivity for on-the-go productivity",
            "256GB storage capacity for apps, media, and workflows",
            "Support for Apple Pencil Pro and Magic Keyboard accessories",
            "All-day battery life with efficient performance",
            "Lightweight, portable design in a premium aluminum body"
        ],
        basePrice: 1499.99,
        images: [
            '/images/products/technology/ipadpro/black/ipadblack1.png',
            '/images/products/technology/ipadpro/black/ipadblack2.png',
            '/images/products/technology/ipadpro/black/ipadblack3.png',
            '/images/products/technology/ipadpro/ipad/png',
        ],
        category: 'technology',
        brand: 'Apple',
        hasVariants: true,
        variantOptions: [
            {
                type:'color',
                name: 'Color',
                required: true,
                variants: [
                    {
                        id: 'apple-ipad-pro-13-space-black',
                        name: 'Space-black',
                        value: 'space Black',
                        type: 'color',
                        price: 0,
                        images: [
                            '/images/products/technology/ipadpro/black/ipadblack1.png',
                            '/images/products/technology/ipadpro/black/ipadblack2.png',
                            '/images/products/technology/ipadpro/black/ipadblack3.png',
                            '/images/products/technology/ipadpro/ipad/png'
                        ],
                        inStock: true,
                        stockQuanity: 10
                    },
                    {
                        id: 'apple-ipad-pro-13-silver',
                        name: 'Silver',
                        value: 'silver',
                        type: 'color',
                        price: 0,
                        images: [
                            '/images/products/technology/ipadpro/silver/ipadsilver1.png',
                            '/images/products/technology/ipadpro/silver/ipadsilver2.png',
                            '/images/products/technology/ipadpro/silver/ipadsilver3.png',
                            '/images/products/technology/ipadpro/ipad/png'
                        ],
                        inStock: true,
                        stockQuanity: 10,
                    },
                ]
            },
            {
                type: 'storage',
                name: 'Storage',
                required: true,
                variants: [
                    { 
                        id: 'apple-ipad-pro-256gb',
                        name: '256GB',
                        value: '256gb',
                        type: 'storage',
                        price: 0,
                        inStock: true,
                        stockQuanity: 10,
                    },
                    { 
                        id: 'apple-ipad-pro-500gb',
                        name: '500GB',
                        value: '500gb',
                        type: 'storage',
                        price: 200,
                        inStock: true,
                        stockQuanity: 10,
                    },
                    { 
                        id: 'apple-ipad-pro-1000gb',
                        name: '1000GB',
                        value: '1000gb',
                        type: 'storage',
                        price: 600,
                        inStock: true,
                        stockQuanity: 10,
                    },
                    { 
                        id: 'apple-ipad-pro-2000gb',
                        name: '2000GB',
                        value: '2000gb',
                        type: 'storage',
                        price: 1000,
                        inStock: true,
                        stockQuanity: 10,
                    }
                ]
            },
        ],
        defaultVariants: {
            color: 'space-black',
            storage: '256gb'
        },
        inStock: true,
        stockQuanity: 70,
        rating: 0,
        reviewCount: 0,
        tags: [
            "tablet", "apple", "ipad", "ipad-pro", "m4-chip",
            "oled", "13-inch", "cellular", "wifi", 
            "unlocked", "apple-pencil", "magic-keyboard", "portable", "productivity"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/apple-11-inch-ipad-pro-m4-chip-built-for-apple-intelligence-wi-fi-cellular-256gb-with-oled-space-black-unlocked/JJGCQ37HLR'
    },
    {
        id: '8',
        name: `SteelSeries - Apex Pro TKL Gen 3 Wired Mechanical OmniPoint 
               Adjustable HyperMagnetic Gaming Keyboard with Rapid Tap - 
               Black`,
        description: `Apex Pro TKL Gen 3, the world's fastest keyboard, 
                      just got smarter, featuring GG Quickset game presets 
                      and OmniPoint 3.0 adjustable HyperMagnetic switches 
                      with Rapid Trigger, Protection Mode, Rapid Tap and 
                      fully adjustable actuation points, delivering 20x 
                      quicker actuation and 11x faster response time.`,
        keyFeatures: [
            "OmniPoint 3.0 Adjustable HyperMagnetic switches with Rapid Trigger",
            "Tenkeyless (TKL) design for compact, ergonomic gaming setup",
            "Customizable actuation points for precision and speed",
            "Durable aluminum alloy frame for long-lasting performance",
            "Per-key RGB illumination with SteelSeries GG software integration",
            "Detachable magnetic wrist rest for added comfort",
            "USB-C wired connection for reliable, low-latency input"
        ],
        basePrice: 239.99,
        images: [
            '/images/products/technology/laptop/laptop1.png',
            '/images/products/technology/laptop/laptop2.png',
            '/images/products/technology/laptop/laptop3.png',
            '/images/products/technology/laptop/laptop4.png',
            '/images/products/technology/laptop/laptop5.png'
        ],
        category: 'technology',
        brand: 'SteelSeries',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "keyboard", "steelseries", "apex-pro", "tkl", "gen-3",
            "wired", "mechanical", "gaming", "rgb", 
            "omnipoint", "hypermagnetic", "rapid-trigger", "pc-accessory", "black"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/steelseries-apex-pro-tkl-gen-3-wired-mechanical-omnipoint-adjustable-hypermagnetic-gaming-keyboard-with-rapid-tap-black/J3GTVPH8JP/sku/6594154?extStoreId=324&utm_source=feed&ref=212&loc=19638026543&gclsrc=aw.ds&gad_source=1&gad_campaignid=19630546785&gbraid=0AAAAAD-ORIhVxTfMI1F7JmHGT2_YOSn5N&gclid=CjwKCAjwiNXFBhBKEiwAPSaPCfrhmqr1Unt6HrwkrAhOMp3i9aiVFM1GHVX9cMpoSji1bk_tW8N_CBoCwzkQAvD_BwE'
    },
    {
        id: '9',
        name: `Razer - Naga V2 Pro MMO Optical Gaming Mouse with 
               Interchangeable Side Plates in 2, 6, 12 Button 
               Configurations - Wireless - Black`,
        description: `Designed to dominate in MMO, battle royale, FPS, and 
                      more, the multi-genre master returns stronger than 
                      ever. With 3 swappable side plates, 19+1 programmable 
                      buttons, a Razer HyperScroll Pro Wheel, and Razer 
                      HyperSpeed Wireless, the Razer Naga V2 Pro packs the 
                      power to rise above every genre.`,
        keyFeatures: [
            "Interchangeable side plates with 2, 6, and 12-button configurations",
            "Razer HyperSpeed Wireless for ultra-low latency gameplay",
            "Focus Pro 30K Optical Sensor for pixel-precise accuracy",
            "Hot-swappable Razer Optical Mouse Switches rated for 90M clicks",
            "Up to 150 hours of battery life with versatile charging options",
            "Customizable RGB lighting with Razer Chroma support",
            "Ergonomic right-handed design for long MMO sessions"
        ],
        basePrice: 179.99,
        images: [
            '/images/products/technology/mouse/mouse1.png',
            '/images/products/technology/mouse/mouse2.png',
            '/images/products/technology/mouse/mouse3.png',
            '/images/products/technology/mouse/mouse4.png',
            '/images/products/technology/mouse/mouse5.png'
        ],
        category: 'technology',
        brand: 'Razer',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "mouse", "razer", "naga", "gaming-mouse", "wireless", 
            "mmo", "optical-sensor", "30k-dpi", "chroma-rgb", 
            "interchangeable", "multi-button", "black", "pc-accessory"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/razer-naga-v2-pro-mmo-optical-gaming-mouse-with-interchangeable-side-plates-in-2-6-12-button-configurations-wireless-black/J39HWFQQ9G/sku/6521042?extStoreId=311&utm_source=feed&ref=212&loc=19630633677&gclsrc=aw.ds&gad_source=1&gad_campaignid=19638055144&gbraid=0AAAAAD-ORIg-JvnoufNpROvDM3nJy46GK&gclid=CjwKCAjwiNXFBhBKEiwAPSaPCZrnGqkI0tO3n-22PdpSa6Mg47dOSyfHPmdkBRNwWG5BwxmtFenfHRoCDoAQAvD_BwE'
    },
    {
        id: '10',
        name: 'Creality - K2 Plus 3D Printer - Black',
        description: `The K2 Plus is your next-level professional 3D 
                      printer. This desktop 3D printer adopts 
                      industry-grade FOC step-servo motors for the XYZ 
                      axis and extrusion. The five powerful motors work in 
                      unison, each offering 32.768 controllable 
                      microsteps per revolution for ultra precise 
                      positioning. Exceptional build volume, enables 
                      larger objects or larger batches, easily 
                      satisfying your ever-expanding 3D printing 
                      aspirations.`,
        keyFeatures: [
            "Large build volume for creating bigger and more complex models",
            "High-precision printing with advanced motion system",
            "Supports multiple filament types including PLA, ABS, and PETG",
            "Touchscreen interface for intuitive control and setup",
            "Stable, durable frame designed for consistent results",
            "Quiet operation with efficient cooling system",
            "Wireless connectivity for easy file transfer and remote monitoring"
        ],
        basePrice: 1299.99,
        images: [
            '/images/products/technology/3dprinter/printer1.png',
            '/images/products/technology/3dprinter/printer2.png',
            '/images/products/technology/3dprinter/printer3.png',
            '/images/products/technology/3dprinter/printer4.png',
            '/images/products/technology/3dprinter/printer5.png'
        ],
        category: 'technology',
        brand: 'Creality',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "3d-printer", "creality", "k2-plus", "printer", "black",
            "pla", "abs", "petg", "filament", "large-build", 
            "high-precision", "wireless", "maker", "diy"
        ],
        featured: true,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/creality-k2-plus-3d-printer-black/JXQWF4SGG3?irclickid=zTF3WAUFjxycUiqWKUxnLQJZUkpzKGXweWKt1U0&irgwc=1&ref=198&loc=Future%20Dedicated%20Account&acampID=0&mpid=1943169&affgroup=%22Content%22%2C%22Howl%20Migrated%20Partners%22%2C%22Partners%20to%20Keep%22'
    },
    {
        id: '11',
        name: `Bestier - 55in Electric Standing Desk Height Computer Home 
               Office Desk with Hooks and Wire Holes - Black`,
        description: `Elevate your workspace with this electric standing 
                      desk, designed to blend comfort and functionality 
                      for a healthier daily routine. Effortlessly adjust 
                      its height between 28.7in and 48in with a simple 
                      touch, thanks to a quiet motor (under 55dB) that won’t 
                      disturb quiet rooms like bedrooms or studies. Stay 
                      organized with 2 side hooks for bags/headsets and 2 
                      wire management holes to tidy cords, plus the 
                      eco-friendly wooden desktop is sleek, odor-free, and 
                      easy to clean with a damp cloth. Available in multiple 
                      colors and sizes, it works as a computer desk, 
                      writing desk, or home office station, fitting 
                      seamlessly into living rooms, studies, or bedrooms.`,
        keyFeatures: [
            "Electric height adjustment for sitting or standing positions",
            "Spacious 55-inch desktop ideal for home office setups",
            "Sturdy steel frame for stability and durability",
            "Integrated wire management holes to reduce clutter",
            "Side hooks for headphones, bags, or accessories",
            "Smooth motorized lift with customizable height presets",
            "Modern black finish to complement any workspace"
        ],
        basePrice: 179.99,
        images: [
            '/images/products/home/desk/black/blackdesk1.png',
            '/images/products/home/desk/black/blackdesk2.png',
            '/images/products/home/desk/black/blackdesk3.png',
            '/images/products/home/desk/black/blackdesk4.png',
            '/images/products/home/desk/black/blackdesk5.png'
        ],
        category: 'home',
        brand: 'Bestier',
        hasVariants: true,
        variantOptions: [
            {
                type: 'color',
                name: 'Color',
                required: true,
                variants: [
                    {
                        id: 'standing-desk-black',
                        name: 'Black',
                        value: 'black',
                        type: 'color',
                        images: [
                            '/images/products/home/desk/black/deskblack1.png',
                            '/images/products/home/desk/black/deskblack2.png',
                            '/images/products/home/desk/black/deskblack3.png',
                            '/images/products/home/desk/black/deskblack4.png',
                            '/images/products/home/desk/black/deskblack5.png',
                        ],
                        inStock: true,
                        stockQuanity: 25,
                    },
                    {
                        id: 'standing-desk-brown',
                        name: 'Brown',
                        value: 'brown',
                        type: 'color',
                        images: [
                            '/images/products/home/desk/brown/deskbrown1.png',
                            '/images/products/home/desk/brown/deskbrown2.png',
                            '/images/products/home/desk/brown/deskbrown3.png',
                            '/images/products/home/desk/brown/deskbrown4.png',
                            '/images/products/home/desk/brown/deskbrown5.png',
                        ],
                        inStock: true,
                        stockQuanity: 25,
                    },
                    {
                        id: 'standing-desk-natural',
                        name: 'Natural',
                        value: 'natural',
                        type: 'color',
                        images: [
                            '/images/products/home/desk/natural/desknatural1.png',
                            '/images/products/home/desk/natural/desknatural2.png',
                            '/images/products/home/desk/natural/desknatural3.png',
                            '/images/products/home/desk/natural/desknatural4.png',
                            '/images/products/home/desk/natural/desknatural5.png',
                        ],
                        inStock: true,
                        stockQuanity: 25,
                    },
                    {
                        id: 'standing-desk-white',
                        name: 'White',
                        value: 'white',
                        type: 'color',
                        images: [
                            '/images/products/home/desk/white/deskwhite1.png',
                            '/images/products/home/desk/white/deskwhite2.png',
                            '/images/products/home/desk/white/deskwhite3.png',
                            '/images/products/home/desk/white/deskwhite4.png',
                            '/images/products/home/desk/white/deskwhite5.png',
                        ],
                        inStock: true,
                        stockQuanity: 25,
                    }
                ]
            }
        ],
        defaultVariants: {
            color: 'black'
        },
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "desk", "standing-desk", "electric", "height-adjustable",
            "home-office", "computer-desk", "ergonomic", "bestier",
            "workspace", "black", "modern", "furniture"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/bestier-55in-electric-standing-desk-height-computer-home-office-desk-with-hooks-and-wire-holes-black/J39TG422WL'
    },
    {
        id: '12',
        name: `Urevo - SP1 Lite Under Desk Treadmill & Walking Pad - Black`,
        description: `Meet the UREVO SP1 Lite Under Desk Treadmill, your 
                      compact fitness and work-from-home solution designed 
                      for convenience and performance. With its spacious 
                      track and double shock absorption system, enjoy a 
                      smooth and comfortable workout experience. Powered 
                      by a quiet 2.25HP motor, it supports up to 265 pounds 
                      and offers a speed range of 0.6-4mph, suitable for 
                      walking or jogging. Its portable design and included 
                      remote control make it easy to use and store, while 
                      the multi-function LED display keeps you informed of 
                      your progress in real-time. Get ready to keep moving 
                      while working from home or achieve your fitness goals 
                      effortlessly with the UREVO SP1 Lite.`,
        keyFeatures: [
            "Compact under-desk design ideal for home and office use",
            "Quiet motor for distraction-free walking while working",
            "Lightweight and slim profile for easy storage and portability",
            "LED display to track speed, time, distance, and calories burned",
            "Durable frame supports consistent daily use",
            "Speeds adjustable to match walking or light jogging pace",
            "No assembly required—ready to use out of the box"
        ],
        basePrice: 249.99,
        images: [
            '/images/products/home/walkingpad/walkingpad1.png',
            '/images/products/home/walkingpad/walkingpad2.png',
            '/images/products/home/walkingpad/walkingpad3.png',
            '/images/products/home/walkingpad/walkingpad4.png'
        ],
        category: 'home',
        brand: 'Urevo',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "treadmill", "walking-pad", "under-desk", "urevo",
            "fitness", "exercise", "home-office", "portable",
            "compact", "black", "cardio", "work-from-home"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/urevo-sp1-lite-under-desk-treadmill-walking-pad-black/J3Q5QXJCZ2/sku/6578080?ref=212&loc=SaleEvent&gclsrc=aw.ds&gad_source=1&gad_campaignid=18221466691&gbraid=0AAAAAD-ORIjJYSJMkI68s9_-1kj1CIGcS&gclid=CjwKCAjwiNXFBhBKEiwAPSaPCUsEOCMX09XtE9TlqaIIozYmGlc4S4Y7yrC0T9hdK_AlH9iGm_W3CBoCi9AQAvD_BwE'
    },
    {
        id: '13',
        name: `Roborock - Saros 10 Ultra Thin, Self-Lifting Robot Vacuum 
               and Mop , 22,000 Pa Suction Hyper Force and Multi-Fuction 
               Dock`,
        description: `The Roborock Saros 10 is not just a robot vacuum—it’s 
                      designed to redefine home cleaning. Packed with 
                      advanced features and thoughtful design, it delivers 
                      an exceptional balance of power, precision, and 
                      convenience. Whether you're navigating a busy 
                      household, managing pet hair, or maintaining pristine 
                      floors, the Saros 10 is built to handle it all with 
                      ease.  At just 3.14 inches, the Saros 10 boasts the 
                      thinnest profile ever in a Roborock vacuum. Its 
                      ultra-slim design allows it to clean where 
                      other vacuums can’t, effortlessly gliding under low 
                      furniture and hard-to-reach spaces. The magic 
                      continues with the RetractSense Navigation System, 
                      an intelligent guidance system that adapts to your 
                      home’s unique layout. This technology dynamically 
                      adjusts to obstacles and ensures thorough coverage 
                      of every room, no matter how complex the furniture 
                      arrangement. For even more versatility, the 
                      Industry-First AdaptiLift Chassis enables the Saros 
                      10 to cross obstacles up to 1.57 inches (4cm) high, 
                      seamlessly transitioning from hard floors to rugs 
                      and thresholds. It’s more than just obstacle-crossing; 
                      it’s a hassle-free cleaning experience tailored to 
                      your home. Hair tangles are a thing of the past, 
                      thanks to the Certified Dual Anti-Tangle System. 
                      Whether you have pets, long hair, or both, the 
                      Saros 10 ensures 0% tangling, so you can enjoy 
                      uninterrupted cleaning and spend less time on 
                      maintenance. Paired with its powerful 22,000 
                      Pa suction, this vacuum provides deep-cleaning 
                      performance to lift dust, debris, and allergens 
                      from carpets, hard floors, and every surface in 
                      between.`,
        keyFeatures: [
            "Ultra-thin design with self-lifting mop for versatile cleaning",
            "22,000 Pa HyperForce suction power for deep dirt removal",
            "Multi-function dock with auto-empty, wash, dry, and refill",
            "Smart mapping and LiDAR navigation for efficient coverage",
            "Customizable cleaning zones and no-go areas via mobile app",
            "Long-lasting battery supports extended cleaning sessions",
            "Voice assistant compatibility for hands-free control"
        ],
        basePrice: 1599.99,
        images: [
            '/images/products/home/vacuum/vacuum1.png',
            '/images/products/home/vacuum/vacuum2.png',
            '/images/products/home/vacuum/vacuum3.png',
            '/images/products/home/vacuum/vacuum4.png',
            '/images/products/home/vacuum/vacuum5.png',
            '/images/products/home/vacuum/vacuum6.png',
            '/images/products/home/vacuum/vacuum7.png'
        ],
        category: 'home',
        brand: 'Roborock',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "robot-vacuum", "robot-mop", "roborock", "saros-10-ultra",
            "vacuum", "smart-home", "cleaning", "self-emptying-dock",
            "hyperforce", "22000pa", "ultra-thin", "multi-function-dock",
            "floor-care", "automation"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/roborock-saros-10-ultra-thin-self-lifting-robot-vacuum-and-mop--22000-pa-suction-hyper-force-and-multi-fuction-dock-white/JJ8F5PCPP3'
    },
    {
        id: '14',
        name: 'Renegade Gray 125inch Power Reclining 6 Piece Sectional with USB Port',
        description: `The Renegade sectional is designed to provide the 
                      coziest seat in the house with plush accent pillows, padded pillow 
                      top arms, and power recline capabilities. Plus, built-in USB ports 
                      and two consoles with cupholders and hidden storage make this piece 
                      as functional as it is comfortable—sure to be a focal point of 
                      memories to come.`,
        keyFeatures: [
            "Six-piece sectional with spacious 125-inch width for family seating",
            "Power reclining seats for customizable comfort",
            "Built-in USB ports to conveniently charge devices",
            "Soft gray upholstery designed for durability and style",
            "High-resiliency foam cushions for long-lasting support",
            "Modular configuration fits a variety of living room layouts",
            "Sturdy frame construction built for everyday use"
        ],
        basePrice: 1799,
        images: [
            '/images/products/home/couch/couch1.png',
            '/images/products/home/couch/couch2.png',
            '/images/products/home/couch/couch3.png',
            '/images/products/home/couch/couch4.png',
            '/images/products/home/couch/couch5.png'
        ],
        category: 'home',
        brand: 'Bobs',
        hasVariants: false,
        inStock: true,
        stockQuanity: 5,
        rating: 0,
        reviewCount: 0,
        tags: [
            "sectional", "sofa", "couch", "living-room", "bobs-furniture",
            "reclining", "power-recline", "usb-port", "gray", 
            "125-inch", "modular", "home-furniture", "family-seating"
        ],
        featured: true,
        onSale: false,
        externalLink: 'https://www.mybobs.com/furniture/living-room/sectionals/p/20077816'
    },
    {
        id: '15',
        name: 'Branch Verve Chair',
        description: `The Verve Chair offers soft, breathable, 
                      customizable support so you can settle in for a 
                      full day's work. It's made with 3D knit to keep you 
                      cool and comfortable. Six adjustment points create a 
                      perfect fit that you'll feel the moment you sit back. 
                      It's even certified Greenguard Gold for low emissions. 
                      Whether working from home or at a small office, the 
                      high-style, high-performance Verve Chair can be a 
                      breath of fresh air.`,
        keyFeatures: [
            "Ergonomic design with adjustable lumbar support",
            "Breathable mesh back for all-day comfort",
            "Height, tilt, and armrest adjustments for personalized fit",
            "High-density foam seat cushion for long-lasting support",
            "Durable frame and base built for daily office use",
            "Smooth-rolling casters for easy mobility",
            "Modern design that complements any workspace"
        ],
        basePrice: 599,
        images: [
            '/images/products/home/chair/chairblack.png'
        ],
        category: 'home',
        brand: 'Branch',
        hasVariants: true,
        variantOptions: [
            {
                type: 'color',
                name: 'Color',
                required: true,
                variants: [
                    {
                        id: 'branch-verve-chair-galaxy',
                        name: 'Galaxy',
                        value: 'galaxy',
                        type: 'color',
                        images: [
                            '/images/products/home/chair/chairgalaxy.png'
                        ],
                        inStock: true,
                        stockQuanity: 10,
                    },
                    {
                        id: 'branch-verve-chair-wheat',
                        name: 'Wheat',
                        value: 'wheat',
                        type: 'color',
                        images: [
                            '/images/products/home/chair/chairwheat.png'
                        ],
                        inStock: true,
                        stockQuanity: 10,
                    },
                    {
                        id: 'branch-verve-chair-coral',
                        name: 'Coral',
                        value: 'coral',
                        type: 'color',
                        images: [
                            '/images/products/home/chair/chaircoral.png'
                        ],
                        inStock: true,
                        stockQuanity: 10,
                    },
                    {
                        id: 'branch-verve-chair-lunar',
                        name: 'Lunar',
                        value: 'lunar',
                        type: 'color',
                        images: [
                            '/images/products/home/chair/chairlunar.png'
                        ],
                        inStock: true,
                        stockQuanity: 10,
                    }
                    ,{
                        id: 'branch-verve-chair-mint',
                        name: 'Mint',
                        value: 'mint',
                        type: 'color',
                        images: [
                            '/images/products/home/chair/chairmint.png'
                        ],
                        inStock: true,
                        stockQuanity: 10,
                    }
                    ,{
                        id: 'branch-verve-chair-cobalt',
                        name: 'Cobalt',
                        value: 'cobalt',
                        type: 'color',
                        images: [
                            '/images/products/home/chair/chaircobalt.png'
                        ],
                        inStock: true,
                        stockQuanity: 10,
                    }
                    ,{
                        id: 'branch-verve-chair-mist',
                        name: 'Mist',
                        value: 'mist',
                        type: 'color',
                        images: [
                            '/images/products/home/chair/chairmist.png'
                        ],
                        inStock: true,
                        stockQuanity: 10,
                    }
                ]
            }
        ], 
        defaultVariants: {
            color: 'galaxy'
        },
        inStock: true,
        stockQuanity: 70,
        rating: 0,
        reviewCount: 0,
        tags: [
            "chair", "office-chair", "ergonomic", "branch", 
            "verve", "adjustable", "lumbar-support", "mesh-back", 
            "comfortable", "workspace", "furniture", "home-office"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.containerstore.com/s/office/desk-chairs/branch-verve-chair/12d?productId=11024231&skuId=10099411&irgwc=1&ir_partnerid=221109&ir_adid=2029499&ir_campaignid=24840&cid=af%3Agen_impact_Future%20PLC._221109_trdpro-us&irclickid=zgzWD91FYxycR-E2ds1dwUfqUkpzcRVMeWKt1U0'
    },
    {
        id: '16',
        name: 'Solaire Adjustable Firmness Mattress',
        description: `The Solaire Adjustable Firmness Mattress offers 
                      customizable comfort with precise settings that let 
                      you fine-tune firmness for your ideal sleep. Built 
                      with premium materials and advanced support 
                      technology, it’s designed to deliver luxury, 
                      durability, and personalized rest night after 
                      night.`,
        keyFeatures: [
            "Adjustable firmness with 50 precise comfort settings",
            "Dual-sided customization for couples with different sleep needs",
            "Targeted pressure relief for back, side, and stomach sleepers",
            "Breathable organic cotton cover for cooler sleep",
            "Edge-to-edge support for a stable sleeping surface",
            "Quiet, remote-controlled adjustments with memory presets",
            "Premium latex and memory foam layers for durability and comfort"
        ],
        basePrice: 3299,
        images: [
            '/images/products/home/mattress/mattress1.png',
            '/images/products/home/mattress/mattress2.png',
            '/images/products/home/mattress/mattress3.png'

        ],
        category: 'home',
        brand: 'Saatva',
        hasVariants: true,
        variantOptions: [
            {
                type: 'size',
                name: 'Size',
                required: true,
                variants: [
                    {
                        id: 'mattress-twin-xl',
                        name: 'Twin XL',
                        value: 'twin-xl',
                        type: 'size',
                        price: 0,
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'mattress-full',
                        name: 'Full',
                        value: 'full',
                        type: 'size',
                        price: 900,
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'mattress-queen',
                        name: 'Queen',
                        value: 'queen',
                        type: 'size',
                        price: 1300,
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'mattress-king',
                        name: 'King',
                        value: 'king',
                        type: 'size',
                        price: 2100,
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'mattress-cal-king',
                        name: 'Cal King',
                        value: 'cal-king',
                        type: 'size',
                        price: 2100,
                        inStock: true,
                        stockQuanity: 20
                    }
                ]
            }
        ],
        defaultVariants: {
            size: 'twin-xl'
        },
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "mattress", "solaire", "adjustable", "firmness-control",
            "dual-sided", "pressure-relief", "organic-cotton",
            "latex", "memory-foam", "luxury", "bedroom", "sleep"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.saatva.com/mattresses/solaire?utm_source=moderncastle&utm_medium=affiliate&click_id=1110loQ9wxd&coupon=vzxrirblvqdxaxbr'
    },
    {
        id: '17',
        name: `LG - 5.0 Cu. Ft. HE Smart Mega Capacity All-in-One 
               Electric Washer/Dryer WashCombo with Steam and Ventless 
               Inverter Heat Pump - Black Steel`,
        description: `Let LG’s 2-in-1 WashCombo do the heavy lifting. Run 
                      a complete wash and dry cycle in as fast as 2 hours, 
                      without having to transfer clothes from washer to 
                      dryer.¹ One appliance does it all—with a space-saving, 
                      go-anywhere ventless design. Among the largest capacity 
                      combo models available, it can fit your larger loads 
                      including a king-size comforter.² As this machine is 
                      among the industry’s most energy efficient combos, 
                      you’ll use up to 60% less energy with every load.³ 
                      Plus, our built-in intelligence and intuitive LCD dial 
                      make it easy to get laundry day dialed in so you can 
                      load, set and go.`,
        keyFeatures: [
            "5.0 cu. ft. mega capacity for large laundry loads",
            "All-in-one washer and dryer with ventless design",
            "Steam technology to reduce wrinkles, odors, and allergens",
            "Inverter heat pump for energy-efficient drying",
            "SmartThinQ technology with remote control via LG app",
            "TurboWash360° for powerful, quick cleaning cycles",
            "Sleek Black Steel finish with modern touch controls"
        ],
        basePrice: 3299.99,
        images: [
            '/images/products/home/washerdryer/washerdryer1.png',
            '/images/products/home/washerdryer/washerdryer2.png',
            '/images/products/home/washerdryer/washerdryer3.png',
            '/images/products/home/washerdryer/washerdryer4.png',
            '/images/products/home/washerdryer/washerdryer5.png',
            '/images/products/home/washerdryer/washerdryer6.png',
            '/images/products/home/washerdryer/washerdryer7.png',
            '/images/products/home/washerdryer/washerdryer8.png',
        ],
        category: 'home',
        brand: 'LG',
        hasVariants: false,
        inStock: true,
        stockQuanity: 30,
        rating: 0,
        reviewCount: 0,
        tags: [
            "washer", "dryer", "all-in-one", "lg", 
            "steam", "ventless", "heat-pump", "smart-appliance", 
            "laundry", "energy-efficient", "black-steel", "large-capacity"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/lg-5-0-cu-ft-he-smart-mega-capacity-all-in-one-electric-washer-dryer-washcombo-with-steam-and-ventless-inverter-heat-pump-black-steel/JJ8VPZQ98S/sku/6568166?ref=212&loc=19602590364&gclsrc=aw.ds&gad_source=1&gad_campaignid=19602598935&gbraid=0AAAAAD-ORIjXqhRfvVVMph0nK7-OIHKkC&gclid=CjwKCAjwiNXFBhBKEiwAPSaPCU04CB5vvuIP-Q34liH2tIA66MMcCNvPYJbPuZQuYmVF0DE9mq6MvhoCUmUQAvD_BwE'
    },
    {
        id: '18',
        name: 'Chicago White Sox Nike Home Limited Paul Konerko Jersey - White',
        description: `Rep your favorite Chicago White Sox legend with 
                      this Home Limited Konerko Roster Jersey. This Nike 
                      jersey was crafted by using the lightweight comfort 
                      of stretch mesh fabric and features an authentic 
                      look with twill details. The innovative Vapor 
                      Premier chassis allows for more flexible movement 
                      and teams up with Dri-FIT technology to deliver 
                      exceptional sweat-wicking power.`,
        keyFeatures: [
            "Officially licensed Chicago White Sox home jersey",
            "Nike Limited edition design for authentic on-field look",
            "Player name and number: Paul Konerko",
            "Lightweight, breathable fabric for comfort",
            "Tackle-twill graphics for long-lasting durability",
            "Moisture-wicking technology to keep you cool and dry",
            "Classic white colorway with team details"
        ],
        basePrice: 199.99,
        images: [
            '/images/products/clothing/whitesox/whitesox1.png',
            '/images/products/clothing/whitesox/whitesox2.png',
            '/images/products/clothing/whitesox/whitesox3.png',
        ],
        category: 'clothing',
        brand: 'Nike',
        hasVariants: true,
        variantOptions: [
            {
                type: 'size',
                name: 'Size',
                required: true,
                variants: [
                    {
                        id: 'paul-konerko-jersey-extra-small',
                        name: 'XS',
                        value: 'extra-small',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'paul-konerko-jersey-small',
                        name: 'S',
                        value: 'small',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'paul-konerko-jersey-medium',
                        name: 'M',
                        value: 'medium',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'paul-konerko-jersey-large',
                        name: 'L',
                        value: 'large',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'paul-konerko-jersey-extra-large',
                        name: 'XL',
                        value: 'extra-large',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    }
                ]
            }
        ],
        defaultVariants: {
            size: 'small'
        },
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "jersey", "mlb", "white-sox", "nike", "paul-konerko", 
            "limited", "home", "baseball", "fan-gear", "white", 
            "sportswear", "authentic"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.mlbshop.com/chicago-white-sox/jerseys/mens-chicago-white-sox-nike-white-home-limited-pick-a-player-retired-roster-jersey/t-25995323+d-9083443436+f-7921327747+z-9-2434052504?aid=60314&utm_medium=cse&_s=ak1944mlb-pla&sku=209350576&targetid=targetid&utm_campaign=22735929266_182796695738&gad_source=1&gad_campaignid=22735929266&gbraid=0AAAAADwsNmFUUllTWTeWCyz7NoxM0PPK7&gclid=CjwKCAjwiNXFBhBKEiwAPSaPCdx4QLoPtQE8V46-riL-PaYt42p51NNsSNQBSs6htlJiWirgUOGHSxoCjVQQAvD_BwE'
    },
    {
        id: '19',
        name: `Chelsea Cup Nike Dri-FIT ADV Home Match Shirt 2025-26 with 
               World Champions 25 chest badge`,
        description: `Celebrate the storied history of the club and the 
                      ever-evolving, vibrant spirit of London with 
                      Chelsea FC's 2025-26 Home kit. This authentic 
                      jersey features classic Chelsea blue and a subtle 
                      print inspired by the city's architecture. Our 
                      Match collection lets you wear exactly what the 
                      pros wear. We paired authentic design details with 
                      lightweight, quick-drying technology to help keep 
                      you cool and comfortable on the field. Nike Dri-FIT 
                      ADV levels up our sweat-wicking technology with 
                      advanced cooling and zones of breathability to help 
                      you stay dry and comfortable.`,
        keyFeatures: [
            "Official Chelsea FC 2025–26 home match shirt",
            "Nike Dri-FIT ADV technology for advanced moisture-wicking",
            "Lightweight, breathable fabric engineered for performance",
            "World Champions 25 chest badge for exclusive detail",
            "Authentic match fit designed for players on the pitch",
            "High-quality crest, sponsor, and Nike swoosh detailing",
            "Crafted with recycled materials for sustainability"
        ],
        basePrice: 203,
        images: [
            '/images/products/clothing/chelsea/chelsea1.png',
            '/images/products/clothing/chelsea/chelsea2.png',
            '/images/products/clothing/chelsea/chelsea3.png'
        ],
        category: 'clothing',
        brand: 'Nike',
        hasVariants: true,
        variantOptions:[
            {
                type: 'size',
                name: 'Size',
                required: true,
                variants: [
                    {
                        id: 'chelsea-jersey-extra-small',
                        name: 'XS',
                        value: 'extra-small',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'chelsea-jersey-small',
                        name: 'S',
                        value: 'small',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'chelsea-jersey-medium',
                        name: 'M',
                        value: 'medium',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'chelsea-jersey-large',
                        name: 'L',
                        value: 'large',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'chelsea-jersey-extra-large',
                        name: 'XL',
                        value: 'extra-large',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    }
                ]
            }
        ],
        defaultVariants: {
            size: 'small'
        },
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "jersey", "soccer", "football", "chelsea", "nike", 
            "dri-fit-adv", "home", "match-shirt", "world-champions-25", 
            "sportswear", "fan-gear", "2025-26", "authentic"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://store.chelseafc.com/en/chelsea-cup-nike-dri-fit-adv-home-match-shirt-2025-26-with-world-champions-25-chest-badge/p-355525919870071281+z-96-2312743874'
    },
    {
        id: '20',
        name: 'Connor Bedard Chicago Blackhawks Fanatics Breakaway Jersey - White',
        description: `You can experience the same excitement you feel 
                      while watching the Chicago Blackhawks play every 
                      time you put on this Connor Bedard Premier Breakaway 
                      Player jersey from Fanatics. This exclusive piece of 
                      gear features bold colors and graphics, modeled after 
                      the jersey your favorite player wears, that let 
                      everyone know you're a devout fan. The fabric 
                      technologies built into this Chicago Blackhawks 
                      jersey also ensure you stay comfortable through every 
                      game this season.`,
        keyFeatures: [
            "Officially licensed Chicago Blackhawks Breakaway jersey",
            "Fanatics design tailored for game-day comfort and style",
            "Player name and number: Connor Bedard",
            "Lightweight, breathable fabric for everyday wear",
            "Flexible collar and relaxed fit for fan-friendly comfort",
            "Heat-sealed graphics for durability and long-lasting detail",
            "Classic white away colorway with authentic team accents"
        ],
        basePrice: 174.99,
        images: [
            '/images/products/clothing/blackhawks/blackhawks1.png',
            '/images/products/clothing/blackhawks/blackhawks2.png',
            '/images/products/clothing/blackhawks/blackhawks3.png',
        ],
        category: 'clothing',
        brand: 'Fanatics',
        hasVariants: true,
        variantOptions: [
            {
                type: 'size',
                name: 'Size',
                required: true,
                variants: [
                    {
                        id: 'bedard-jersey-extra-small',
                        name: 'XS',
                        value: 'extra-small',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'bedard-jersey-small',
                        name: 'S',
                        value: 'small',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'bedard-jersey-medium',
                        name: 'M',
                        value: 'medium',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'bedard-jersey-large',
                        name: 'L',
                        value: 'large',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'bedard-jersey-extra-large',
                        name: 'XL',
                        value: 'extra-large',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    }
                ]
            }
        ],
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "jersey", "nhl", "blackhawks", "chicago", "connor-bedard",
            "fanatics", "breakaway", "white", "hockey", 
            "fan-gear", "sportswear", "authentic"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.fanatics.com/nhl/chicago-blackhawks/jerseys/connor-bedard-chicago-blackhawks-fanatics-breakaway-jersey-white/o-1306+t-03937345+d-86114567+f-301706005+z-9-3548734347?utm_medium=cse&_s=GPA_CA&sku=206285267&targetid=targetid&utm_campaign=22561237381_180350150300&gad_source=1&gad_campaignid=22561237381&gbraid=0AAAAAD-8WqyjVOV1DFQW87rbUZJVlLZEE&gclid=CjwKCAjwiNXFBhBKEiwAPSaPCZDdPvJeJsUSHvtUQUSWrZsHlYa5nrRtw5Lxzelr4Ez8exnUDkSg3BoCvYkQAvD_BwE'
    },
    {
        id: '21',
        name: '#10 Jordan Love Nike Black Fashion Game Jersey',
        description: `Stay true to your team all day, every day, gameday. 
                      Green Bay Packers Nike black fashion game jersey 
                      is inspired by what the players are wearing on 
                      the field, with a fashionable twist.`,
        keyFeatures: [
            "Officially licensed Nike NFL Fashion Game jersey",
            "Player name and number: Jordan Love (#10)",
            "Lightweight polyester fabric for breathable comfort",
            "Screen-printed graphics for team and player details",
            "Loose fit designed for everyday fan wear",
            "Ribbed V-neck collar and short sleeves for classic style",
            "Stylish black alternate design for a modern look"
        ],
        basePrice: 129.99,
        images: [
            '/images/products/clothing/packers/packers1.png',
            '/images/products/clothing/packers/packers2.png', 
        ],
        category: 'clothing',
        brand: 'Nike',
        hasVariants: true,
        variantOptions: [
            {
                type: 'size',
                name: 'Size',
                required: true,
                variants: [
                    {
                        id: 'jordan-love-jersey-extra-small',
                        name: 'XS',
                        value: 'extra-small',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'jordan-love-jersey-small',
                        name: 'S',
                        value: 'small',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'jordan-love-jersey-medium',
                        name: 'M',
                        value: 'medium',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'jordan-love-jersey-large',
                        name: 'L',
                        value: 'large',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'jordan-love-jersey-extra-large',
                        name: 'XL',
                        value: 'extra-large',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    }
                ]
            }
        ],
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "jersey", "nfl", "packers", "green-bay", "jordan-love",
            "nike", "fashion-game", "black", "fan-gear", 
            "football", "sportswear", "player-jersey"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.packersproshop.com/green-bay-packers-jerseys/10-love-fashion-game-jersey'
    },
    {
        id: '22',
        name: `Men's Chicago Bulls Nike Red Authentic Derrick Rose Jersey - Icon Edition`,
        description: `Grab this Authentic Custom Jersey from Nike to 
                      capture the distinct identity of your Chicago Bulls 
                      in a new and innovative design.`,
        keyFeatures: [
            "Officially licensed Chicago Bulls Icon Edition jersey",
            "Authentic Nike design with on-court player detailing",
            "Player name and number: Derrick Rose",
            "Engineered with Nike Dri-FIT technology for moisture control",
            "Lightweight, breathable fabric built for performance",
            "Tackle-twill stitched graphics for long-lasting durability",
            "Classic red colorway with Bulls team accents"
        ],
        basePrice: 249.99,
        images: [
            '/images/products/clothing/bulls/bulls1.png',
            '/images/products/clothing/bulls/bulls2.png',
            '/images/products/clothing/bulls/bulls3.png',
        ],
        category: 'clothing',
        brand: 'Nike',
        hasVariants: true,
        variantOptions: [
            {
                type: 'size',
                name: 'Size',
                required: true,
                variants: [
                    {
                        id: 'derrick-rose-jersey-extra-small',
                        name: 'XS',
                        value: 'extra-small',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'derrick-rose-jersey-small',
                        name: 'S',
                        value: 'small',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'derrick-rose-jersey-medium',
                        name: 'M',
                        value: 'medium',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'derrick-rose-jersey-large',
                        name: 'L',
                        value: 'large',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    },
                    {
                        id: 'derrick-rose-jersey-extra-large',
                        name: 'XL',
                        value: 'extra-large',
                        type: 'size',
                        inStock: true,
                        stockQuanity: 20
                    }
                ]
            }
        ],
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "jersey", "nba", "chicago-bulls", "derrick-rose", 
            "nike", "authentic", "icon-edition", "red", 
            "basketball", "fan-gear", "sportswear"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://store.nba.com/chicago-bulls/mens-chicago-bulls-nike-red-authentic-custom-jersey-icon-edition/t-47700601+p-02003355808035+z-8-734301508?_ref=p-DLP:m-GRID:i-r0c1:po-1'
    },
    {
        id: '23',
        name: 'WWE Championship Spinner Replica Title Belt',
        description: `Introduced by John Cena in 2005, this replica title 
                      belt perfectly embodies the Word Life aesthetic, 
                      sporting an eye-catching design and bling to the 
                      nines. This isn't just a collectible—it's a piece 
                      of WWE history that defined an era.`,
        keyFeatures: [
            "Authentic replica of the iconic WWE Championship Spinner belt",
            "Full-sized design with detailed WWE logo and spinning centerpiece",
            "Crafted with high-quality metal plates and synthetic leather strap",
            "Adjustable fit with multiple sizing snaps",
            "Officially licensed collectible for WWE fans",
            "Perfect for display, cosplay, or fan events",
            "Durable construction designed for long-lasting authenticity"
        ],
        basePrice: 599.99,
        images: [
            '/images/products/clothing/belt/belt1.png',
            '/images/products/clothing/belt/belt2.png'
        ],
        category: 'clothing',
        brand: 'WWE',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "wwe", "championship-belt", "replica", "spinner-belt",
            "wrestling", "title-belt", "collectible", "fan-gear",
            "authentic", "cosplay", "memorabilia"
        ],
        featured: true,
        onSale: false,
        externalLink: 'https://www.etsy.com/listing/4349794690/wwe-championship-spinner-replica-title?gpla=1&gao=1&&utm_source=google&utm_medium=cpc&utm_campaign=shopping_us_-toys_and_games_a&utm_custom1=_k_CjwKCAjw_fnFBhB0EiwAH_MfZvMPg6XjORj1K6cLfIp6LK4oGKRER0actXOgj1nbwMGAuxnxLtGn6BoCbKoQAvD_BwE_k_&utm_content=go_22435011576_176375887605_746117422318_pla-2397872109027_c__4349794690_12768591&utm_custom2=22435011576&gad_source=1&gad_campaignid=22435011576&gbraid=0AAAAADtcfRINjlBtmjlzEAYHXlb7e0JHW&gclid=CjwKCAjw_fnFBhB0EiwAH_MfZvMPg6XjORj1K6cLfIp6LK4oGKRER0actXOgj1nbwMGAuxnxLtGn6BoCbKoQAvD_BwE'
    },
    {
        id: '24',
        name: 'Ninja - NeverClog Cold Press Juicer - Charcoal',
        description: `Introducing the Ninja NeverClog Cold Press Juicer, 
                      engineered to power through tough ingredients for 
                      non-stop juicing. Customize the amount of pulp in 
                      every glass based on your preference: Less Pulp or 
                      Lots of Pulp. Now with a larger 24 oz. juice jug & 
                      36 oz. pulp container, allowing you to make larger 
                      batches of juice for the whole family. It's easy to 
                      clean, compact in size, and quiet.`,
        keyFeatures: [
            "NeverClog technology for smooth, consistent juicing",
            "Cold press extraction for maximum nutrients and flavor",
            "Powerful motor handles fruits and vegetables with ease",
            "Easy-to-clean parts with dishwasher-safe components",
            "Compact design fits seamlessly on kitchen countertops",
            "Multiple pulp filters for customized juice texture",
            "Durable construction in sleek charcoal finish"
        ],
        basePrice: 149.99,
        images: [
            '/images/products/kitchen/juicer/juicer1.png',
            '/images/products/kitchen/juicer/juicer2.png',
            '/images/products/kitchen/juicer/juicer3.png',
            '/images/products/kitchen/juicer/juicer4.png',
            '/images/products/kitchen/juicer/juicer5.png'
        ],
        category: 'kitchen',
        brand: 'Ninja',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "juicer", "ninja", "cold-press", "neverclog",
            "charcoal", "kitchen-appliance", "health", "smoothies",
            "nutrition", "fruit-juicer", "vegetable-juicer"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/ninja-neverclog-cold-press-juicer-charcoal/JXJVXG5H8S/sku/6535802?extStoreId=311&utm_source=feed&ref=212&loc=20153185852&gclsrc=aw.ds&gad_source=1&gad_campaignid=20149845761&gbraid=0AAAAAD-ORIgLzvQY1vqF1k4V7KAhr_3mf&gclid=CjwKCAjwiNXFBhBKEiwAPSaPCatzn2d3HCF2aiTeuwlN_4HLL8mb7MefkLc40d9FB1rFxW3xWJE_jxoCV88QAvD_BwE'
    },
    {
        id: '25',
        name: 'KitchenAid - 5.5 Quart Bowl-Lift Stand Mixer',
        description: `Up your culinary caliber with 2x the power in the 
                      bowl than our Tilt Head Stand Mixer.* 
                      Professional-style performance paired with a 3-point 
                      locking bowl provides you with stability for mixing 
                      heavy, dense ingredients. Designed with 11 distinct 
                      speeds, including 1/2 speed, you'll have power and 
                      control from high to low, and everything in between. 
                      So no matter if you're folding, kneading, mixing, 
                      shredding, or beating, the KitchenAid 5.5 Quart 
                      Bowl-Lift Stand Mixer is designed to take it all on. 
                      To amplify your creativity, explore 10+ stand mixer 
                      attachments, each with the power to open a world of 
                      untapped cooking techniques, experimentation and 
                      inspiration.** *Compared to KSM150 when measuring 
                      peak HP in the bowl; above speed 2.**Attachments 
                      sold separately.`,
        keyFeatures: [
            "5.5-quart stainless steel bowl ideal for large batches",
            "Bowl-lift design provides stability for heavy mixtures",
            "Powerful motor handles bread dough, batters, and more",
            "10 optimized speeds for precise mixing control",
            "Compatible with over 10 KitchenAid hub attachments",
            "Durable all-metal construction built to last",
            "Includes flat beater, dough hook, and wire whip accessories"
        ],
        basePrice: 499.99,
        images: [
            '/images/products/kitchen/mixer/red/mixerred1.png',
            '/images/products/kitchen/mixer/red/mixerred2.png',
            '/images/products/kitchen/mixer/red/mixerred3.png',
            '/images/products/kitchen/mixer/red/mixerred4.png'
        ],
        category: 'kitchen',
        brand: 'KitchenAid',
        hasVariants: true,
        variantOptions: [
            {
                type: 'color',
                name: 'Color',
                required: true,
                variants: [
                    {
                        id: 'kitchenaid-stand-mixer-red',
                        name: 'Red',
                        value: 'red',
                        type: 'color',
                        images: [
                            '/images/products/kitchen/mixer/red/mixerred1.png',
                            '/images/products/kitchen/mixer/red/mixerred2.png',
                            '/images/products/kitchen/mixer/red/mixerred3.png',
                            '/images/products/kitchen/mixer/red/mixerred4.png'
                        ],
                        inStock: true,
                        stockQuanity: 10
                    },
                    {
                        id: 'kitchenaid-stand-mixer-silver',
                        name: 'Silver',
                        value: 'silver',
                        type: 'color',
                        images: [
                            '/images/products/kitchen/mixer/silver/mixersilver1.png',
                            '/images/products/kitchen/mixer/silver/mixersilver2.png',
                            '/images/products/kitchen/mixer/silver/mixersilver3.png',
                            '/images/products/kitchen/mixer/silver/mixersilver4.png'
                        ],
                        inStock: true,
                        stockQuanity: 10
                    },
                    {
                        id: 'kitchenaid-stand-mixer-blue',
                        name: 'Blue',
                        value: 'blue',
                        type: 'color',
                        images: [
                            '/images/products/kitchen/mixer/blue/mixerblue1.png',
                            '/images/products/kitchen/mixer/blue/mixerblue2.png',
                            '/images/products/kitchen/mixer/blue/mixerblue3.png',
                            '/images/products/kitchen/mixer/blue/mixerblue4.png'
                        ],
                        inStock: true,
                        stockQuanity: 10
                    },
                ]
            }
        ],
        defaultVariants: {
            color: 'red'
        },
        inStock: true,
        stockQuanity: 30,
        rating: 0,
        reviewCount: 0,
        tags: [
            "kitchenaid", "stand-mixer", "bowl-lift", "5.5-quart",
            "kitchen-appliance", "baking", "cooking", "dough",
            "mixer", "accessories", "durable", "multi-purpose"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/kitchenaid-5-5-quart-bowl-lift-stand-mixer-empire-red/J3KHVGJX9H/sku/6531622?extStoreId=311&utm_source=feed&ref=212&loc=19578788097&gclsrc=aw.ds&gad_source=1&gad_campaignid=19586641331&gbraid=0AAAAAD-ORIgdhwfHMBUBnDTLbhIaEwgPR&gclid=CjwKCAjwiNXFBhBKEiwAPSaPCQ29_lfMD04b7084TYHSxt6sNERkcNKCqN3B6I2nr6_Gqzf_QCQ7rRoC2B8QAvD_BwE'
    },
    {
        id: '26',
        name: 'Hexclad Hybrid Pots & Pans Set, 12-pc',
        description: `Our best-selling set includes the pots and pans 
                      you’ll use every single day. These are the three 
                      pans that home cooks reach for the most–whether 
                      scrambling eggs for two, sizzling up dinner for 
                      four, or searing chops. Our pots are perfect for 
                      hot chocolate, mac ‘n cheese, or a big, robust 
                      braise or soup.`,
        keyFeatures: [
            "12-piece hybrid cookware set with pots, pans, and lids",
            "Tri-ply construction combining stainless steel, aluminum, and nonstick",
            "Laser-etched hexagon design for superior searing and easy cleanup",
            "PFOA-free nonstick surface safe for metal utensils",
            "Compatible with all stovetops including induction",
            "Oven-safe up to 500°F for versatile cooking",
            "Dishwasher safe for effortless cleaning"
        ],
        basePrice: 699.99,
        images: [
            '/images/products/kitchen/potsandpans/potsandpans1.png',
            '/images/products/kitchen/potsandpans/potsandpans2.png',
            '/images/products/kitchen/potsandpans/potsandpans3.png',
        ],
        category: 'kitchen',
        brand: 'Hexclad',
        hasVariants: false,
        inStock: true,
        stockQuanity: 25,
        rating: 0,
        reviewCount: 0,
        tags: [
            "hexclad", "cookware", "pots", "pans", "12-piece",
            "nonstick", "stainless-steel", "hybrid", "kitchen",
            "oven-safe", "dishwasher-safe", "cooking-set"
        ],
        featured: true,
        onSale: false,
        externalLink: 'https://hexclad.com/collections/sets/products/pots-and-pans-set'
    },
    {
        id: '27',
        name: `Ninja - SLUSHi 5-in-1 Professional Frozen Drink Maker, 
               88 oz. Frozen Drink & Slushie Machine, 5 Preset Programs - 
               Artic Blue & Gray`,
        description: `The Ninja SLUSHi Professional Frozen Drink Maker is 
                      the easiest way to make frozen drinks at home. No 
                      ice needed, no blending, no hassles. Create tons of 
                      drinks with as few as one ingredient. Premium XL 
                      Capacity unlocks the ultimate party starter so you 
                      can make fun, flavorful drinks for everyone. No more 
                      watered-down, tasteless drinks. SLUSHi works quickly 
                      and keeps drinks frozen for up to 12 hours.`,
        keyFeatures: [
            "5-in-1 functionality for slushies, frozen drinks, milkshakes, and more",
            "88 oz. capacity ideal for parties and gatherings",
            "Five preset programs for one-touch convenience",
            "Professional-grade motor designed to crush ice effortlessly",
            "Easy-to-use controls with sleek Arctic Blue & Gray design",
            "Removable parts are dishwasher safe for quick cleanup",
            "Durable construction built for frequent use"
        ],
        basePrice: 349.99,
        images: [
            '/images/products/kitchen/slushi/slushi1.png',
            '/images/products/kitchen/slushi/slushi2.png',
            '/images/products/kitchen/slushi/slushi3.png',
            '/images/products/kitchen/slushi/slushi4.png',
            '/images/products/kitchen/slushi/slushi5.png',
            '/images/products/kitchen/slushi/slushi6.png',
            '/images/products/kitchen/slushi/slushi7.png',
            '/images/products/kitchen/slushi/slushi8.png'
        ],
        category: 'kitchen',
        brand: 'Ninja',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "ninja", "slushi", "frozen-drink-maker", "slushie-machine",
            "5-in-1", "artic-blue", "gray", "kitchen-appliance",
            "frozen-drinks", "milkshakes", "parties", "entertaining"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.bestbuy.com/product/ninja-slushi-5-in-1-professional-frozen-drink-maker-88-oz-frozen-drink-slushie-machine-5-preset-programs-artic-blue-gray/JXJVXGVRT7/sku/6589081?extStoreId=324&utm_source=feed&ref=212&loc=20153185852&gclsrc=aw.ds&gad_source=1&gad_campaignid=20149845761&gbraid=0AAAAAD-ORIgLzvQY1vqF1k4V7KAhr_3mf&gclid=CjwKCAjwiNXFBhBKEiwAPSaPCVjGabk0DOWQ4drucLXd8p8KiTuXqbi4GfTPu1frTRCwghD4PYc64RoC4_AQAvD_BwE'
    },
    {
        id: '28',
        name: 'Sodastream - ensō',
        description: `Enjoy a fresh and personalized sparkling drink 
                      with enso™, our premium sparkling drink maker. It 
                      is not only beautiful in both form and function, 
                      but also embodies SodaStream's long-standing 
                      expertise in innovation and functionality. Designed 
                      by Naoto Fukasawa, this product combines remarkable 
                      high-end materials and minimalistic style. Crafted 
                      with passion and care for every detail, it offers 
                      an extraordinary sparkling drink experience.`,
        keyFeatures: [
            "Elegant design inspired by Japanese minimalism",
            "Carbonates water in seconds with one-touch operation",
            "Compatible with SodaStream CO₂ cylinders",
            "Reusable bottle system reduces single-use plastic waste",
            "Customizable carbonation levels for personalized drinks",
            "Compact size fits seamlessly on kitchen countertops",
            "Easy to clean and maintain for daily use"
        ],
        basePrice: 199.99,
        images: [
            '/images/products/kitchen/sodastream/sodastream1.png',
            '/images/products/kitchen/sodastream/sodastream2.png',
            '/images/products/kitchen/sodastream/sodastream3.png',
            '/images/products/kitchen/sodastream/sodastream4.png',
            '/images/products/kitchen/sodastream/sodastream5.png',
            '/images/products/kitchen/sodastream/sodastream6.png'
        ],
        category: 'kitchen',
        brand: 'Sodasteam',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [
            "sodastream", "enso", "carbonator", "sparkling-water",
            "beverage-maker", "eco-friendly", "reusable", "kitchen-appliance",
            "minimalist", "compact", "customizable"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://sodastream.com/products/enso?variant=41738909777962'
    },
    {
        id: '29',
        name: '2025 Toyota Camry',
        description: `The 2025 Toyota Camry combines sleek design with 
                      advanced technology, offering a refined driving experience that 
                      balances performance and efficiency. With updated safety features 
                      and a modern interior, it delivers comfort and reliability for 
                      both city commutes and long trips.`,
        keyFeatures: [
            "Efficient hybrid and gas powertrains with smooth performance",
            "Toyota Safety Sense suite with advanced driver-assist features",
            "Spacious, comfortable cabin with premium materials",
            "Large touchscreen infotainment with Apple CarPlay & Android Auto",
            "Available all-wheel drive for enhanced traction",
            "Refined exterior styling with modern aerodynamics",
            "Renowned Toyota reliability and low cost of ownership"
        ],
        basePrice: 28700,
        images: [
            '/images/products/dream/car/car1.png',
            '/images/products/dream/car/car2.png',
            '/images/products/dream/car/car3.png',
            '/images/products/dream/car/car4.png',
            '/images/products/dream/car/car5.png',
            '/images/products/dream/car/car6.png',
            '/images/products/dream/car/car7.png',
            '/images/products/dream/car/car8.png'
        ],
        category: 'dream',
        brand: 'Toyota',
        hasVariants: false,
        inStock: true,
        stockQuanity: 5,
        rating: 0,
        reviewCount: 0,
        tags: [
            "toyota", "camry", "sedan", "2025", 
            "hybrid", "reliable", "fuel-efficient", "family-car",
            "safety", "technology", "comfort", "daily-driver"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.toyota.com/camry/'
    },
    {
        id: '30',
        name: 'Kawasaki - NINJA® ZX™-4RR ABS',
        description: `The Kawasaki NINJA® ZX™-4RR ABS delivers 
                      race-inspired performance in a compact design, featuring 
                      high-revving power and precise handling. Equipped with 
                      advanced rider aids and ABS technology, it offers confidence, 
                      control, and excitement on every ride.`,
        keyFeatures: [
            "High-revving inline-four engine tuned for thrilling performance",
            "Lightweight chassis for precise, agile handling",
            "Integrated ABS for confident braking in all conditions",
            "Selectable ride modes and advanced traction control",
            "Quickshifter and slipper clutch for seamless gear changes",
            "Fully adjustable suspension tailored for track or street riding",
            "Aerodynamic design with aggressive sportbike styling"
        ],
        basePrice: 9699,
        images: [
            '/images/products/dream/motorcycle/motorcycle1.png',
            '/images/products/dream/motorcycle/motorcycle2.png'
        ],
        category: 'dream',
        brand: 'Kawasaki',
        hasVariants: false,
        inStock: true,
        stockQuanity: 10,
        rating: 0,
        reviewCount: 0,
        tags: [],
        featured: false,
        onSale: false,
        externalLink: 'https://www.kawasaki.com/en-us/motorcycle/ninja/supersport/ninja-zx-4r/2025-ninja-zx-4rr-abs#gallery'
    },
    {
        id: '31',
        name: 'Porche - 911 GT3 2026',
        description: `The 2026 Porsche 911 GT3 is a track-ready supercar 
                      built for adrenaline, blending razor-sharp handling 
                      with a naturally aspirated engine that screams at
                       high RPMs. Its iconic design and driver-focused 
                       cockpit deliver an unmatched connection between 
                       road, machine, and driver.`,
        keyFeatures: [
            "kawasaki", "ninja", "zx4rr", "sportbike", "motorcycle",
            "abs", "inline-four", "quickshifter", "slipper-clutch",
            "performance", "track-ready", "racing", "two-wheeler"
        ],
        basePrice: 287760,
        images: [
            '/images/products/dream/sportscar/sportscar1.png',
            '/images/products/dream/sportscar/sportscar2.png',
            '/images/products/dream/sportscar/sportscar3.png',
            '/images/products/dream/sportscar/sportscar4.png',
            '/images/products/dream/sportscar/sportscar5.png',
            '/images/products/dream/sportscar/sportscar6.png',
            '/images/products/dream/sportscar/sportscar7.png',
            '/images/products/dream/sportscar/sportscar8.png',
            '/images/products/dream/sportscar/sportscar9.png'
        ],
        category: 'dream',
        brand: 'Porche',
        hasVariants: false,
        inStock: true,
        stockQuanity: 5,
        rating: 0,
        reviewCount: 0,
        tags: [],
        featured: true,
        onSale: false,
        externalLink: 'https://configurator.porsche.com/en-US/mode/model/992812?options=9P8.QH1.QR9.VL0.GT0.4GF.3J9.1N3.1X2.6EE.3S0.6NA.8T1.3HA.4L6.6A0.M1P.2C5.K8C.VW4.6I0.0I3.9WT.0P9.2V1.6BA.1G8.1P0.4UB.6RC.5KS.9JA.95D.7K3.G1C.KA2.QQ0.4I8.7AL.9VK.7Y0.4D0.1T0.FT0.VR0.QU8.0TC.5XX.6K9.IW3.VC2.E0A.7UG.0NB.2W0.0N5.9AD.4A3.9ZE.KQ3.EM2.GH3.FM7.1BV.VF2.C2Q.J2B.FZ0.QE0.6XA.2D0.9B0.1LS.7G9.8N7.IV2.GV1.8JU.8VH.1NX.Q1J.43.6E5.8LT.04I.89.24931.97R.1MI.0UB.Z1S&variants=24931_JZ#section-summary'
    },
    {
        id: '32',
        name: 'Luxury Country Estate - San Diego',
        description: `Escape to ultimate privacy and luxury in this 
                      sprawling estate, hidden deep within the 
                      breathtaking Cleveland National Forest. Designed 
                      for those who value solitude, adventure, and 
                      complete self-sufficiency, this off-grid retreat 
                      offers unmatched seclusion with no neighbors in 
                      sight. The beautifully crafted main residence blends 
                      rustic charm with modern elegance, featuring spacious 
                      living areas, a dedicated office, and stunning 
                      panoramic views. A private hangar and heliport make 
                      for effortless arrivals. Step outside to a 75-foot 
                      infinity-edge pool with breathtaking views, a gourmet 
                      outdoor kitchen, miles of exclusive scenic hiking 
                      trails, a vineyard, shooting range, pre-excavated 
                      ake, and a half-acre graded pad offering endless 
                      possibilities—build an emergency bunker, guest home, 
                      luxury car showroom, private gym, wellness retreat, 
                      or equestrian center. With two 25GPM wells and 
                      advanced off-grid systems, this estate is a fully 
                      self-sustaining sanctuary, offering both freedom and 
                      comfort in the heart of nature.`,
        keyFeatures: [
            "Secluded 40-acre retreat deep in Cleveland National Forest with complete privacy",
            "4,000 sq ft main home featuring 4 bedrooms, 4 bathrooms, dedicated office, and rustic-modern design",
            "Private hangar and heliport offering a 10-minute flight to San Diego Airport for seamless access",
            "Outdoor oasis with 75-ft infinity-edge pool, gourmet kitchen, vineyard, shooting range, and scenic hiking trails",
            "Self-sustaining infrastructure including two 25 GPM wells, 20 kW solar system, and ten Tesla Powerwalls for off-grid independence",
            "Pre-excavated lake and half-acre graded pad for custom expansion (e.g., guest home, wellness center, or equestrian facility)",
            "Breathtaking panoramic canyon, mountain, and valley views—all no neighbors in sight"
        ],
        basePrice: 4950000,
        images: [
            '/images/products/dream/house/house1.png',
            '/images/products/dream/house/house2.png',
            '/images/products/dream/house/house3.png',
            '/images/products/dream/house/house4.png',
            '/images/products/dream/house/house5.png',
            '/images/products/dream/house/house6.png',
            '/images/products/dream/house/house7.png',
            '/images/products/dream/house/house8.png',
            '/images/products/dream/house/house9.png',
            '/images/products/dream/house/house10.png',
            '/images/products/dream/house/house11.png',
            '/images/products/dream/house/house12.png',
            '/images/products/dream/house/house13.png',
            '/images/products/dream/house/house14.png',
            '/images/products/dream/house/house15.png',
            '/images/products/dream/house/house16.png',
            '/images/products/dream/house/house17.png',
            '/images/products/dream/house/house18.png',
            '/images/products/dream/house/house19.png',
            '/images/products/dream/house/house20.png',
            '/images/products/dream/house/house21.png',
            '/images/products/dream/house/house22.png',
            '/images/products/dream/house/house23.png',
            '/images/products/dream/house/house24.png',
            '/images/products/dream/house/house25.png',
            '/images/products/dream/house/house26.png',
            '/images/products/dream/house/house27.png',
            '/images/products/dream/house/house28.png',
            '/images/products/dream/house/house29.png',
            '/images/products/dream/house/house30.png',
            '/images/products/dream/house/house31.png',
            '/images/products/dream/house/house32.png',
            '/images/products/dream/house/house33.png',
            '/images/products/dream/house/house34.png',
            '/images/products/dream/house/house35.png',     
        ],
        category: 'dream',
        brand: 'JamesEdition',
        hasVariants: false,
        inStock: true,
        stockQuanity: 1,
        rating: 0,
        reviewCount: 0,
        tags: [
            "estate", "luxury-real-estate", "off-grid", "san-diego",
            "country-estate", "helicopter-access", "infinity-pool",
            "vineyard", "private-hangar", "solar-power", "self-sustaining",
            "40-acre", "secluded", "expansion-pad"
        ],
        featured: false,
        onSale: false,
        externalLink: 'https://www.jamesedition.com/real_estate/san-diego-ca-usa/luxury-country-estate-15430868'
    }
];
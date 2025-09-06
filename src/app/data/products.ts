import { Product, ProductVariantOption, ProductVariant } from "../types/product";

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
        rating: 4.9,
        reviewCount: 100,
        tags: [],
        featured: false,
        onSale: false
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
                        stockQuanity: 20,
                        sku:'airpod-max-midnight'
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
                        stockQuanity: 20,
                        sku:'airpod-max-blue'
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
                        stockQuanity: 20,
                        sku:'airpod-max-orange'
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
                        stockQuanity: 20,
                        sku:'airpod-max-purple'
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
                        stockQuanity: 20,
                        sku:'airpod-max-starlight'
                    }
                ]
            }
        ],
        defaultVariants: {
            color: 'midnight'
        },
        inStock: true,
        stockQuanity: 100,
        rating: 4.8,
        reviewCount: 100,
        tags: [],
        featured: false,
        onSale: false
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
        rating: 4.8,
        reviewCount: 100,
        tags: [],
        featured: false,
        onSale: false
    },
    {
        id: '4',
        name: `MSI - 18" Gaming Laptop 2560 x 1600 (QHD+) - AMD Ryzen 9 
               9955HX with 32GB Memory - GeForce RTX 5070 Ti - 2 TB SSD - 
               Cosmo Gray, Gray`,
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
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: false,
        onSale: false
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
        brand: 'MSI',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 4.6,
        reviewCount: 100,
        tags: [],
        featured: false,
        onSale: false
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
        rating: 4.7,
        reviewCount: 100,
        tags: [],
        featured: false,
        onSale: false
    },
    {
        id: '7',
        name: `Apple - 13-inch iPad Pro M4 chip Built for Apple 
               Intelligence Wi-Fi + Cellular 256GB with OLED - Unlocked`,
        description: `iPad Pro. Built for Apple Intelligence. It’s 
                      impossibly thin, featuring outrageous performance 
                      with the Apple M4 chip, a breakthrough Ultra Retina 
                      XDR display, and superfast Wi-Fi 6E and 5G. Along 
                      with Apple Pencil Pro and Magic Keyboard, it brings 
                      endless versatility, creativity, and productivity to 
                      your fingertips.`,
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
                        name: 'space-black',
                        value: 'Space Black',
                        type: 'color',
                        price: 0,
                        images: [
                            '/images/products/technology/ipadpro/black/ipadblack1.png',
                            '/images/products/technology/ipadpro/black/ipadblack2.png',
                            '/images/products/technology/ipadpro/black/ipadblack3.png',
                            '/images/products/technology/ipadpro/ipad/png'
                        ],
                        inStock: true,
                        stockQuanity: 10,
                        sku: ''
                    },
                    {
                        id: 'apple-ipad-pro-13-silver',
                        name: 'silver',
                        value: 'Silver',
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
                        name: '256gb',
                        value: '256GB',
                        type: 'storage',
                        price: 0,
                        inStock: true,
                        stockQuanity: 10,
                    },
                    { 
                        id: 'apple-ipad-pro-500gb',
                        name: '500gb',
                        value: '500GB',
                        type: 'storage',
                        price: 200,
                        inStock: true,
                        stockQuanity: 10,
                    },
                    { 
                        id: 'apple-ipad-pro-1000gb',
                        name: '1000gb',
                        value: '1000GB',
                        type: 'storage',
                        price: 600,
                        inStock: true,
                        stockQuanity: 10,
                    },
                    { 
                        id: 'apple-ipad-pro-2000gb',
                        name: '2000gb',
                        value: '2000GB',
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
        tags: [],
        featured: false,
        onSale: false
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
        tags: [],
        featured: false,
        onSale: false
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
        tags: [],
        featured: false,
        onSale: false
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
        tags: [],
        featured: true,
        onSale: false
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
        basePrice: 179.99,
        images: [
            '/images/products/home/desk/desk1.png',
            '/images/products/home/desk/desk2.png',
            '/images/products/home/desk/desk3.png',
            '/images/products/home/desk/desk4.png',
            '/images/products/home/desk/desk5.png'
        ],
        category: 'home',
        brand: 'Bestier',
        hasVariants: false,
        inStock: true,
        stockQuanity: 100,
        rating: 0,
        reviewCount: 0,
        tags: [],
        featured: false,
        onSale: false
    }
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
        tags: [],
        featured: false,
        onSale: false
    },
    {
        id: '13',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '14',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '15',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '16',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '17',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '18',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '19',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '20',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '21',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '22',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '23',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '24',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '25',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '26',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '27',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '28',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '29',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '30',
        name: '',
        description: ``,
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        hasVariants: ,
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    }
];
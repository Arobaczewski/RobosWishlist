import { color } from "framer-motion";
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
                        stockQuanity: 10,
                        sku: ''
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
        tags: [],
        featured: false,
        onSale: false
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
        tags: [],
        featured: true,
        onSale: false
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
        tags: [],
        featured: false,
        onSale: false
    },
    {
        id: '16',
        name: 'Solaire Adjustable Firmness Mattress',
        description: ``,
        basePrice: 5399,
        images: [
            '/images/products/home/mattress/mattress1.png',
            '/images/products/home/mattress/mattress2.png',
            '/images/products/home/mattress/mattress3.png'

        ],
        category: 'home',
        brand: 'Saatva',
        hasVariants: false,
        inStock: true,
        stockQuanity: 25,
        rating: 0,
        reviewCount: 0,
        tags: [],
        featured: false,
        onSale: false
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
        tags: [],
        featured: false,
        onSale: false
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
        tags: [],
        featured: false,
        onSale: false
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
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: false,
        onSale: false
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
        tags: [],
        featured: false,
        onSale: false
    },
    {
        id: '21',
        name: '#10 Jordan Love Nike Black Fashion Game Jersey',
        description: `Stay true to your team all day, every day, gameday. 
                      Green Bay Packers Nike black fashion game jersey 
                      is inspired by what the players are wearing on 
                      the field, with a fashionable twist.`,
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
        tags: [],
        featured: false,
        onSale: false
    },
    {
        id: '22',
        name: `Men's Chicago Bulls Nike Red Authentic Derrick Rose Jersey - Icon Edition`,
        description: `Grab this Authentic Custom Jersey from Nike to 
                      capture the distinct identity of your Chicago Bulls 
                      in a new and innovative design.`,
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
        tags: [],
        featured: false,
        onSale: false
    },
    {
        id: '23',
        name: 'WWE Championship Spinner Replica Title Belt',
        description: `Introduced by John Cena in 2005, this replica title 
                      belt perfectly embodies the Word Life aesthetic, 
                      sporting an eye-catching design and bling to the 
                      nines. This isn't just a collectible—it's a piece 
                      of WWE history that defined an era.`,
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
        tags: [],
        featured: true,
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
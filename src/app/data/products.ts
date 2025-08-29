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
        originalPrice: 3499,
        images: [

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
                        stockQuanity: 25,
                        sku: 'MACBOOK-PRO-SPACE-BLACK-36'
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
                        stockQuanity: 25,
                        sku: 'MACBOOK-PRO-SPACE-SILVER-36'
                    }
                ]
            },
            {
                type: 'storage',
                name: 'Storage',
                required: true,
                variants: [
                    {
                        id: '',
                        name: '',
                        value: '',
                        type: 'storage',
                        price: 500,
                        images: [
                            '',
                            '',
                            '',
                            '',
                            '',
                            ''
                        ],
                        inStock: true,
                        stockQuanity: 25,
                        sku: ''
                    }
                ]
            }
        ], 
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
        name: '',
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '3',
        name: '',
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '4',
        name: '',
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '5',
        name: '',
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '6',
        name: '',
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '7',
        name: '',
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '8',
        name: '',
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '9',
        name: '',
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '10',
        name: '',
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '11',
        name: '',
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    }
    {
        id: '12',
        name: '',
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    },
    {
        id: '13',
        name: '',
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
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
        description: '',
        basePrice: ,
        originalPrice: ,
        images: [

        ],
        category: '',
        brand: '',
        inStock: true,
        stockQuanity: 100,
        rating: 5,
        reviewCount: 100,
        tags: [],
        featured: ,
        onSale: false
    }
];
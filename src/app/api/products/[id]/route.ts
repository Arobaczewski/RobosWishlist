import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/app/types/product";
import { products } from "@/app/data/products";
import { select } from "framer-motion/client";

interface RouteParams {
    params: {
        id: string,
    };
}

interface ProductResponse {
    product: Product,
    selectedVariants: { [key: string]: string };
    finalPrice: number;
    availableVariants: any[];
    inStock: boolean;
    stockQuantity: number;
    images: string[];
    similarProducts: Product[];
}

export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = params;
        const { searchParams } = new URL(request.url);

        const selectedVariants: { [key: string]: string} = {};

        searchParams.forEach((value, key) => {
            if (['color', 'size', 'storage', 'material', 'style'].includes(key)){
                selectedVariants[key] = value;
            }
        });

        const product = products.find(p => p.id === id);

        if(!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        if (!product.hasVariants) {
            const similarProducts = products
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, 4);

            const response: ProductResponse = {
                product,
                selectedVariants: {},
                finalPrice: product.basePrice,
                availableVariants: [],
                inStock: product.inStock,
                stockQuantity: product.stockQuantity,
                images: product.images,
                similarProducts
            };

            return NextResponse.json(response);
        }
        let finalPrice = product.basePrice;
        let selectedImages = product.images;
        let inStock = true;
        let minStockQuantity = Infinity;
        const resolvedVariants: { [key: string]: string } = {};

        product.variantOptions?.forEach(option => {
            const selectedValue = selectedVariants[option.type] || product.defaultVariants?.[option.type];

            if (selectedValue) {
                resolvedVariants[option.type] = selectedValue;

                const variant = option.variants.find(v => v.value === selectedValue);
                if(variant) {
                    finalPrice += variant.price || 0;

                    if(variant.images && variant.images.length > 0) {
                        selectedImages = variant.images;
                    }

                    if (!variant.inStock || variant.stockQuantity === 0) {
                        inStock = false;
                        minStockQuantity = 0;
                    } else {
                        minStockQuantity = Math.min(minStockQuantity, variant.stockQuantity);
                    }
                }
            } else if (option.required) {
                const firstAvailable = option.variants.find(v => v.inStock && v.stockQuantity > 0);
                if (firstAvailable) {
                    resolvedVariants[option.type] = firstAvailable.value;
                    finalPrice += firstAvailable.price || 0;
                    if (firstAvailable.images && firstAvailable.images.length > 0) {
                        selectedImages = firstAvailable.images;
                    }
                    minStockQuantity = Math.min(minStockQuantity, firstAvailable.stockQuantity);
                } else {
                    inStock = false;
                    minStockQuantity = 0;
                }
            }
        });

        const similarProducts = products
        .filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

        const response: ProductResponse = {
            product,
            selectedVariants: resolvedVariants,
            finalPrice: Math.round(finalPrice * 100) / 100,
            availableVariants: product.variantOptions || [],
            inStock,
            stockQuantity: minStockQuantity === Infinity ? 0 : minStockQuantity,
            images: selectedImages,
            similarProducts
        };
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json (
            {
                error: 'Failed to fetch product',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

export async function POST (
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = params;
        const body = await request.json();
        const { variants } = body;

        const product = products.find(p => p.id === id);

        if(!product) {
            return NextResponse.json (
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        let finalPrice = product.basePrice;
        let isAvailable = true;
        let stockQuantity = Infinity;
        let selectedImages = product.images;

        for (const [variantType, variantValue] of Object.entries(variants)) {
            const option = product.variantOptions?.find(opt => opt.type === variantType);
            if (!option) continue;
            
            const variant = option.variants.find(v => v.value === variantValue);
            if (!variant) {
                isAvailable = false;
                break;
            }
            
            if (!variant.inStock || variant.stockQuantity === 0) {
                isAvailable = false;
                stockQuantity = 0
                break;
            }

            finalPrice += variant.price || 0;
            stockQuantity = Math.min(stockQuantity, variant.stockQuantity);

            if (variant.images && variant.images.length > 0) {
                selectedImages = variant.images;
            }
        } 
        return NextResponse.json ({
            isAvailable,
            finalPrice: Math.round(finalPrice * 100) / 100,
            stockQuantity: stockQuantity === Infinity ? 0 : stockQuantity,
            images: selectedImages
        });
        } catch (error) {
            console.error('Error checking product variant availability', error);
            return NextResponse.json (
            {
                error: 'Failed to check product availability',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
export interface ProductVariant {
    id: string;
    name: string;
    value: string;
    type: 'color' | 'size' | 'storage';
    price?: number;
    images?: string[];
    inStock: boolean,
    stockQuanity: number;
    sku?: string;
}

export interface ProductVariantOption {
    type: 'color' | 'size' | 'storage';
    name: string;
    required: boolean;
    variants: ProductVariant[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    keyFeatures: string[];
    basePrice: number;
    originalPrice?: number;
    images: string[];
    category: string;
    brand?: string;
    hasVariants: boolean,
    variantOptions?: ProductVariantOption[];
    defaultVariants?: { [variantType: string]: string };
    inStock: boolean;
    stockQuanity: number;
    rating?: number;
    reviewCount: number;
    tags?: string[];
    featured?: boolean;
    onSale?: boolean;
    externalLink: string;
}

export interface ProductsResponse{
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    featured?: boolean;
    onSale?: boolean;
    search?: string;
}
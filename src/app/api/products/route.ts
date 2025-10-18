import { NextRequest, NextResponse } from "next/server";
import { products } from "@/app/data/products";
import { Product } from "@/app/types/product";

interface ProductsResponse {
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    filters?: {
        category?: string;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
        featured?: boolean;
        onSale?: boolean;
        inStock?: boolean;
    };
}

export async function GET(request: NextRequest){
    try {
        const { searchParams } = new URL(request.url);

        const category = searchParams.get('category');
        const brand = searchParams.get('brand');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const search = searchParams.get('search');
        const featured = searchParams.get('featured');
        const onSale = searchParams.get('onSale');
        const inStock = searchParams.get('inStock');
        const sortBy = searchParams.get('sortBy') || 'id';
        const sortOrder = searchParams.get('sortOrder') || 'asc';

        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');

        let filteredProducts = [...products];

        if (category) {
            filteredProducts = filteredProducts.filter(
                product => product.category.toLowerCase() === category.toLowerCase()
            );
        }

        if (brand) {
            filteredProducts = filteredProducts.filter(
                product => product.brand?.toLowerCase() === brand.toLowerCase()
            );
        }

        if (minPrice) {
            const min = parseFloat(minPrice);
            filteredProducts = filteredProducts.filter(
                product => product.basePrice >= min  // Changed to >=
            );
        }

        if (maxPrice) {
            const max = parseFloat(maxPrice);
            filteredProducts = filteredProducts.filter(
                product => product.basePrice <= max  // ✅ FIXED: Changed to <=
            );
        }

        if (search && search.trim() !== '') {
            const searchTerm = search.toLowerCase().trim();
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.brand?.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                product.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                product.keyFeatures?.some(feature => feature.toLowerCase().includes(searchTerm))
            );
        }
        
        if (featured === 'true'){
            filteredProducts = filteredProducts.filter(product => product.featured === true);
        }

        if (onSale === 'true'){
            filteredProducts = filteredProducts.filter(product => product.onSale === true);
        }

        if (inStock === 'true'){
            filteredProducts = filteredProducts.filter(product => product.inStock === true);
        } else if (inStock === 'false') {
            filteredProducts = filteredProducts.filter(product => product.inStock === false);
        }

        filteredProducts.sort((a, b) => {
            let aValue: any;
            let bValue: any; 

            switch (sortBy) {
                case 'price':
                    aValue = a.basePrice;
                    bValue = b.basePrice;
                    break;
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'rating':
                    aValue = a.rating || 0;
                    bValue = b.rating || 0;
                    break;
                case 'reviewCount':
                    aValue = a.reviewCount || 0;
                    bValue = b.reviewCount || 0;
                    break;
                case 'createdAt':
                default: 
                    if(sortBy === 'featured'){
                        aValue = a.featured ? 1 : 0;
                        bValue = b.featured ? 1 : 0;
                    } else {
                        aValue = parseInt(a.id);
                        bValue = parseInt(b.id);
                    }
                    break;
            }
            if(sortOrder === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

        const total = filteredProducts.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        const response: ProductsResponse = {
            products: paginatedProducts,
            total,
            page,
            limit,
            totalPages,
            filters: {
                ...(category && { category }),
                ...(minPrice && { minPrice: parseFloat(minPrice) }),
                ...(maxPrice && { maxPrice: parseFloat(maxPrice) }),
                ...(search && { search }),
                ...(featured && { featured: featured === 'true' }),
                ...(onSale && { onSale: onSale === 'true' }),
                ...(inStock && { inStock: inStock === 'true' })
            }
        };

        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        return NextResponse.json(response, { headers });

    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch products',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
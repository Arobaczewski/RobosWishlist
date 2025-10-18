import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { findUserById, updateUser } from "@/app/data/users";

function getUserFromToken(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.substring(7);

    try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
        return findUserById(decoded.userId); 
    } catch (error) {
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const user = getUserFromToken(request);

        if(!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }
        return NextResponse.json({
            favorites: user.favorites || []
        });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return NextResponse.json(
            { error: 'Failed to fetch favorites' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest){
    try {
        const user = getUserFromToken(request);

        if(!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { productId } = await request.json();

        if (!productId) {
            return NextResponse.json(
                { error: 'Product ID is required'},
                { status: 400 }
            );
        }
        
        if(user.favorites.includes(productId)) {
            return NextResponse.json(
                { message: 'Product already in favorites', favorites: user.favorites }
            );
        }

        // Update favorites and save to file
        const updatedFavorites = [...user.favorites, productId];
        updateUser(user.id, { favorites: updatedFavorites });

        return NextResponse.json({
            message: 'Added to favorites',
            favorites: updatedFavorites
        });
    } catch (error) {
        console.error('Error adding to favorites', error);
        return NextResponse.json(
            { error: 'Failed to add to favorites'},
            { status: 500 }
        );
    }
}

export async function DELETE (request: NextRequest) {
    try {
        const user = getUserFromToken(request);

        if(!user) {
            return NextResponse.json(
                { error: 'Unauthorized'},
                { status: 401 }
            );
        }
        
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');

        if(!productId) {
            return NextResponse.json(
                { error: 'Product ID is required'},
                { status: 400 }
            );
        }

        // Update favorites and save to file
        const updatedFavorites = user.favorites.filter(id => id !== productId);
        updateUser(user.id, { favorites: updatedFavorites });

        return NextResponse.json({
            message: 'Removed from favorites', 
            favorites: updatedFavorites
        });
    } catch (error) {
        console.error('Error removing from favorites', error);
        return NextResponse.json(
            { error: 'Failed to remove from favorites'},
            { status: 500 }
        );
    }
}
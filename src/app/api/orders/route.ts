import { NextRequest, NextResponse } from 'next/server';
import { findUserById } from '@/app/data/users';
import { createOrder, getOrdersByUserId, deleteAllOrdersByUserId } from '@/app/data/orders';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Helper function to verify JWT token
function verifyToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

// GET - Retrieve all orders for a user
export async function GET(request: NextRequest) {
  const userId = verifyToken(request);

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const user = findUserById(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get all orders for this user
    const orders = getOrdersByUserId(userId);

    return NextResponse.json(
      { orders },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST - Create a new order
export async function POST(request: NextRequest) {
  const userId = verifyToken(request);

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { items, subtotal, tax, shipping, total, shippingAddress, paymentInfo } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart items are required' },
        { status: 400 }
      );
    }

    if (typeof subtotal !== 'number' || typeof tax !== 'number' || 
        typeof shipping !== 'number' || typeof total !== 'number') {
      return NextResponse.json(
        { error: 'Invalid price data' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.addressLine1 || 
        !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode || 
        !shippingAddress.country || !shippingAddress.phone) {
      return NextResponse.json(
        { error: 'Complete shipping address is required' },
        { status: 400 }
      );
    }

    if (!paymentInfo || !paymentInfo.cardType || !paymentInfo.lastFourDigits || 
        !paymentInfo.cardholderName) {
      return NextResponse.json(
        { error: 'Payment information is required' },
        { status: 400 }
      );
    }

    const user = findUserById(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create the order
    const newOrder = createOrder({
      userId,
      items,
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress,
      paymentInfo,
    });

    return NextResponse.json(
      { 
        message: 'Order created successfully',
        order: newOrder
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// DELETE - Delete all orders for a user (for demo cleanup)
export async function DELETE(request: NextRequest) {
  const userId = verifyToken(request);

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const user = findUserById(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete all orders for this user
    const deletedCount = deleteAllOrdersByUserId(userId);

    return NextResponse.json(
      { 
        message: `Successfully deleted ${deletedCount} order(s)`,
        deletedCount
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting orders:', error);
    return NextResponse.json(
      { error: 'Failed to delete orders' },
      { status: 500 }
    );
  }
}
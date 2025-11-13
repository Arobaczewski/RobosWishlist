import { NextRequest, NextResponse } from 'next/server';
import { findUserById } from '@/app/data/users';
import { getOrderById, deleteOrder, updateOrder } from '@/app/data/orders';
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

// Helper function to verify order token for guest access
function verifyOrderToken(token: string, orderId: string): boolean {
  // Token format: orderId-randomString
  const parts = token.split('-');
  if (parts.length < 2) return false;
  
  const tokenOrderId = parts[0];
  return tokenOrderId === orderId;
}

// GET - Retrieve a specific order by ID (supports both authenticated users and guest token)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Get the order first
    const order = getOrderById(orderId);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check for guest order token in query params
    const { searchParams } = new URL(request.url);
    const orderToken = searchParams.get('token');

    // If there's a valid order token, allow guest access
    if (orderToken && verifyOrderToken(orderToken, orderId)) {
      return NextResponse.json(
        { order },
        { status: 200 }
      );
    }

    // Otherwise, require authentication
    const userId = verifyToken(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - authentication or valid order token required' },
        { status: 401 }
      );
    }

    const user = findUserById(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify the order belongs to the requesting user
    if (order.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized to view this order' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { order },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific order (requires authentication)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = verifyToken(request);

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const orderId = params.id;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
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

    const order = getOrderById(orderId);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Verify the order belongs to the requesting user
    if (order.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this order' },
        { status: 403 }
      );
    }

    const deleted = deleteOrder(orderId);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Failed to delete order' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Order deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    );
  }
}

// PATCH - Update order status (requires authentication)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = verifyToken(request);

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const orderId = params.id;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Validate status values
    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
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

    const order = getOrderById(orderId);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Verify the order belongs to the requesting user
    if (order.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized to update this order' },
        { status: 403 }
      );
    }

    const updatedOrder = updateOrder(orderId, { status });

    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Order updated successfully',
        order: updatedOrder
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
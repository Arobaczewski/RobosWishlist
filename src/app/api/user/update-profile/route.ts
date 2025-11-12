import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { findUserById, updateUser } from '@/app/data/users';

export async function PUT(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; email: string };
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    // Get user data from request
    const { name, email, address } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = findUserById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user data
    const updatedUserData = {
      ...user,
      name,
      email: email.toLowerCase(),
      address: address || user.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      }
    };

    updateUser(decoded.userId, updatedUserData);

    // Don't send password back
    const { password: _, ...userWithoutPassword } = updatedUserData;

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
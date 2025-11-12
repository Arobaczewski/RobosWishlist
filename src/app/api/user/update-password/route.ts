import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
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

    // Get password data from request
    const { currentPassword, newPassword } = await request.json();

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    // Validate new password length
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters' },
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

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    const updatedUserData = {
      ...user,
      password: hashedNewPassword
    };

    updateUser(decoded.userId, updatedUserData);

    return NextResponse.json({
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Password update error:', error);
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    );
  }
}
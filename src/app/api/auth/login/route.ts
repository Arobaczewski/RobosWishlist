import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '@/app/data/users';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log('=== LOGIN ATTEMPT ===');
    console.log('Email received:', email);
    console.log('Password received (length):', password?.length);

    // Check if fields are provided
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return NextResponse.json(
        { error: 'Please provide email and password' },
        { status: 400 }
      );
    }

    // Find user
    const user = findUserByEmail(email);
    console.log('User found:', user ? 'YES' : 'NO');
    
    if (!user) {
      console.log('❌ User not found in database');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('User email from DB:', user.email);
    console.log('User has password:', !!user.password);
    console.log('Password hash length:', user.password?.length);

    // Check if password matches
    console.log('Comparing passwords...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Password comparison failed');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('✅ Login successful, creating token');

    // Create token (the special ticket)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' } // Token expires in 7 days
    );

    // Don't send password back!
    const { password: _, ...userWithoutPassword } = user;

    // Ensure address field exists for backward compatibility
    const userToReturn = {
      ...userWithoutPassword,
      address: userWithoutPassword.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      }
    };

    console.log('✅ Returning success response');
    console.log('===================');

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: userToReturn
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
}
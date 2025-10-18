import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { addUser, findUserByEmail } from '@/app/data/users';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Check if all fields are provided
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Please provide email, password, and name' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Encrypt the password (scramble it so it's secret)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: Date.now().toString(), // Simple ID for now
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString(),
      favorites: []
    };

    // Save user
    addUser(newUser);

    // Don't send password back!
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
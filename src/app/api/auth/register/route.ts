import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { addUser, findUserByEmail } from '@/app/data/users';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    console.log('=== REGISTRATION ATTEMPT ===');
    console.log('Email:', email);
    console.log('Password length:', password?.length);
    console.log('Name:', name);

    // Check if all fields are provided
    if (!email || !password || !name) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { error: 'Please provide email, password, and name' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      console.log('❌ User already exists');
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    console.log('Hashing password...');
    // Encrypt the password (scramble it so it's secret)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');
    console.log('Hash length:', hashedPassword.length);

    // Create new user with address field
    const newUser = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString(),
      favorites: [],
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      }
    };

    console.log('New user object created (without password):', {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      hasPassword: !!newUser.password,
      passwordLength: newUser.password.length
    });

    // Save user
    addUser(newUser);
    console.log('✅ User added to database');

    // Don't send password back!
    const { password: _, ...userWithoutPassword } = newUser;

    console.log('✅ Registration successful');
    console.log('===================');

    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
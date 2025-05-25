// src/app/api/login/route.js

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Store in .env for security

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Hardcoded admin credentials
    const adminEmail = "tashi@123.com";
    const adminPassword = "1234";

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
      });
    }

    // Check for admin credentials
    if (email === adminEmail && password === adminPassword) {
      return new Response(
        JSON.stringify({
          message: 'Admin login successful',
          admin: true,
          user: { email: adminEmail, role: 'admin' }, // ✅ Include dummy user object
        }),
        { status: 200 }
      );
    }

    // Lookup normal user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return new Response(
      JSON.stringify({
        message: 'Login successful',
        token,
        user, // ✅ Include user for frontend context login
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login API error:", error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}

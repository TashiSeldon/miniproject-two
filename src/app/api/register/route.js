//src/app/api/register/route.js 

import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';


export async function POST(req) {
  console.log("Register API called");
  const { name, email, password } = await req.json();
  console.log({ name, email, password });

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  console.log("Existing user found:", existingUser);

  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Password hashed");

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.log("User created:", user);

    return new Response(
      JSON.stringify({ message: 'User registered successfully', user }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Prisma error:", error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { name, email, year, department } = body;

  try {
    const newMember = await prisma.member.create({
      data: { name, email, year, department },
    });
    return NextResponse.json({ success: true, member: newMember });
  } catch (error) {
    // Check for Prisma unique constraint violation
    if (
      error.code === 'P2002' &&
      error.meta &&
      error.meta.target.includes('email')
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'You are already registered with this email.',
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all members
export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

// PATCH member status
export async function PATCH(request) {
  try {
    const { id, action } = await request.json();
    
    const member = await prisma.member.update({
      where: { id },
      data: {
        status: action === 'approve' ? 'approved' : 'rejected'
      }
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json(
      { error: 'Failed to update member' },
      { status: 500 }
    );
  }
} 
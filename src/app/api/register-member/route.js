import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, year, department } = body;

    if (!name || !email || !year || !department) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('memberships');

    // Check if email already exists
    const existingMember = await collection.findOne({ email });
    if (existingMember) {
      return NextResponse.json(
        {
          success: false,
          error: 'You are already registered with this email.',
        },
        { status: 400 }
      );
    }

    const newMember = {
      name,
      email,
      year,
      department,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newMember);
    
    return NextResponse.json({ 
      success: true, 
      member: {
        ...newMember,
        _id: result.insertedId
      }
    });
  } catch (error) {
    console.error('Error registering member:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    );
  }
}

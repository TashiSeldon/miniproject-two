import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Get student page content
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const content = await db.collection('studentContent').findOne({}) || {
      featuredEvents: []
    };

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching student content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student content' },
      { status: 500 }
    );
  }
}

// Update student page content
export async function POST(req) {
  try {
    const content = await req.json();
    
    const client = await clientPromise;
    const db = client.db();
    
    // Update or insert the content
    await db.collection('studentContent').updateOne(
      {}, // empty filter to match any document
      { $set: content },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating student content:', error);
    return NextResponse.json(
      { error: 'Failed to update student content' },
      { status: 500 }
    );
  }
} 
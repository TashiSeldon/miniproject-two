import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Get all announcements
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const announcements = await db.collection('announcements')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    );
  }
}

// Add new announcement
export async function POST(req) {
  try {
    const announcement = await req.json();
    
    const client = await clientPromise;
    const db = client.db();
    
    const newAnnouncement = {
      ...announcement,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('announcements').insertOne(newAnnouncement);
    
    return NextResponse.json({
      success: true,
      announcement: {
        ...newAnnouncement,
        _id: result.insertedId
      }
    });
  } catch (error) {
    console.error('Error adding announcement:', error);
    return NextResponse.json(
      { error: 'Failed to add announcement' },
      { status: 500 }
    );
  }
}

// Delete announcement
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Announcement ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    
    const result = await db.collection('announcements').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return NextResponse.json(
      { error: 'Failed to delete announcement' },
      { status: 500 }
    );
  }
} 
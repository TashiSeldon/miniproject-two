import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Get all gallery events
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category'); // hackathon, seminar, programmingclass, workshop

    const client = await clientPromise;
    const db = client.db();
    
    const query = category ? { category } : {};
    const events = await db.collection('galleryEvents')
      .find(query)
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching gallery events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery events' },
      { status: 500 }
    );
  }
}

// Add new gallery event
export async function POST(req) {
  try {
    const event = await req.json();
    
    const client = await clientPromise;
    const db = client.db();
    
    const newEvent = {
      ...event,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('galleryEvents').insertOne(newEvent);
    
    return NextResponse.json({
      success: true,
      event: {
        ...newEvent,
        _id: result.insertedId
      }
    });
  } catch (error) {
    console.error('Error adding gallery event:', error);
    return NextResponse.json(
      { error: 'Failed to add gallery event' },
      { status: 500 }
    );
  }
}

// Delete gallery event
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    
    const result = await db.collection('galleryEvents').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery event:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery event' },
      { status: 500 }
    );
  }
} 
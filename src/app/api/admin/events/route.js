import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Get all events
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const events = await db.collection('events')
      .find({})
      .sort({ date: 1 })
      .toArray();

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// Add new event
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

    const result = await db.collection('events').insertOne(newEvent);
    
    return NextResponse.json({
      success: true,
      event: {
        ...newEvent,
        _id: result.insertedId
      }
    });
  } catch (error) {
    console.error('Error adding event:', error);
    return NextResponse.json(
      { error: 'Failed to add event' },
      { status: 500 }
    );
  }
}

// Delete event
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
    
    const result = await db.collection('events').deleteOne({
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
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const collection = db.collection('news');
    
    console.log('Fetching news articles...');
    const news = await collection.find({}).sort({ createdAt: -1 }).toArray();
    console.log(`Found ${news.length} news articles`);
    
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { 
      title, 
      content, 
      category, 
      imageUrl, 
      imageAlt, 
      author, 
      publicationDate, 
      source 
    } = await request.json();
    
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const collection = db.collection('news');
    
    const news = {
      title,
      content,
      category,
      imageUrl,
      imageAlt,
      author,
      publicationDate,
      source,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('Creating news article:', news);
    const result = await collection.insertOne(news);
    console.log('News article created:', result);
    
    return NextResponse.json({
      ...news,
      _id: result.insertedId
    });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Failed to create news', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'News ID is required' },
        { status: 400 }
      );
    }

    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const collection = db.collection('news');
    
    console.log('Deleting news article:', id);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log('Delete result:', result);
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { error: 'Failed to delete news', details: error.message },
      { status: 500 }
    );
  }
} 
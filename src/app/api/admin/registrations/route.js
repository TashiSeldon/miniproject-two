import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Get all registrations
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const [individualRegistrations, teamRegistrations, serviceRegistrations, membershipRegistrations] = await Promise.all([
      db.collection('eventIndividualRegistrations').find({}).sort({ createdAt: -1 }).toArray(),
      db.collection('eventTeamRegistrations').find({}).sort({ createdAt: -1 }).toArray(),
      db.collection('serviceRegistrations').find({}).sort({ createdAt: -1 }).toArray(),
      db.collection('memberships').find({}).sort({ createdAt: -1 }).toArray()
    ]);

    return NextResponse.json({
      individualRegistrations,
      teamRegistrations,
      serviceRegistrations,
      membershipRegistrations
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}

// Delete a registration
export async function DELETE(req) {
  try {
    const { type, id } = await req.json();

    const client = await clientPromise;
    const db = client.db();
    
    let collection;
    switch (type) {
      case 'individual':
        collection = db.collection('eventIndividualRegistrations');
        break;
      case 'team':
        collection = db.collection('eventTeamRegistrations');
        break;
      case 'service':
        collection = db.collection('serviceRegistrations');
        break;
      case 'membership':
        collection = db.collection('memberships');
        break;
      default:
        return NextResponse.json({ error: 'Invalid registration type' }, { status: 400 });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    return NextResponse.json({ error: 'Failed to delete registration' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, type, status } = await request.json();
    
    if (!id || !type || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    
    let collection;
    switch (type) {
      case 'individual':
        collection = db.collection('eventIndividualRegistrations');
        break;
      case 'team':
        collection = db.collection('eventTeamRegistrations');
        break;
      case 'service':
        collection = db.collection('serviceRegistrations');
        break;
      case 'membership':
        collection = db.collection('memberships');
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid registration type' },
          { status: 400 }
        );
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating registration:', error);
    return NextResponse.json(
      { error: 'Failed to update registration' },
      { status: 500 }
    );
  }
} 
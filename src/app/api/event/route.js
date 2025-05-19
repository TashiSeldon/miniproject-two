import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Received registration data:', data);

    const { eventId, registrationType, name, collegeEmail, department, year, teamName, teamMembers } = data;

    if (!eventId || !registrationType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    if (registrationType === 'individual') {
    // Individual registration
      if (!name || !collegeEmail || !department || !year) {
        return NextResponse.json({ error: 'Missing required fields for individual registration' }, { status: 400 });
      }

      const collection = db.collection('eventIndividualRegistrations');
      const registration = {
      eventId,
        name,
        collegeEmail,
        department,
        year,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await collection.insertOne(registration);
      console.log('Individual registration created:', result);

      return NextResponse.json({
        ...registration,
        _id: result.insertedId
      }, { status: 200 });
    } else {
      // Team registration
      if (!teamName || !teamMembers || teamMembers.length === 0) {
        return NextResponse.json({ error: 'Missing required fields for team registration' }, { status: 400 });
      }

      const collection = db.collection('eventTeamRegistrations');
      const registration = {
        eventId,
        teamName,
        teamMembers,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await collection.insertOne(registration);
      console.log('Team registration created:', result);

      return NextResponse.json({
        ...registration,
        _id: result.insertedId
      }, { status: 200 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

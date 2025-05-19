// src/app/api/serviceregister/route.js

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Received data:', data);

    const { name, department, year, service } = data;

    if (!name || !department || !year || !service) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('serviceRegistrations');

    const serviceRegistration = {
      name,
      department,
      year,
      service,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(serviceRegistration);
    console.log('Service registration created:', result);

    return NextResponse.json({
      ...serviceRegistration,
      _id: result.insertedId
    }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

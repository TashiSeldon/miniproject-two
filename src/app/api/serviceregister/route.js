// src/app/api/serviceregister/route.js

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Received data:', data);

    const { name, department, year, service } = data;

    if (!name || !department || !year || !service) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const saved = await prisma.serviceRegistration.create({
      data: { name, department, year, service },
    });

    return NextResponse.json(saved, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

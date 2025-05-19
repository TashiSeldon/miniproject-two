import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();

    // Check if it's a team registration
    if (body.members && Array.isArray(body.members)) {
      const { eventId, teamName, members } = body;

      const team = await prisma.team.create({
        data: {
          teamName,
          event: { connect: { id: eventId } },
          members: {
            create: members.map((member) => ({
              name: member.name,
              email: member.email,
              studentNumber: member.studentNumber,
              department: member.department,
              year: member.year,
              comment: member.comment || '',
            })),
          },
        },
      });

      return NextResponse.json({ success: true, team });
    }

    // Individual registration
    const {
      name,
      email,
      studentNumber,
      department,
      year,
      comment,
      eventId,
    } = body;

    const registration = await prisma.individualRegistration.create({
      data: {
        name,
        email,
        studentNumber,
        department,
        year,
        comment,
        event: { connect: { id: eventId } },
      },
    });

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to register' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

// Mock booked dates - in real app, check Google Calendar API
const fullyBookedDates = [
  '2024-12-25', '2024-12-26', '2024-01-01' // Example blocked dates
];

export async function GET(req: NextRequest) {
  try {
    const today = new Date();
    const availableDates = [];
    
    // Get next 30 days
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateStr = date.toISOString().split('T')[0];
      const dayOfWeek = date.getDay();
      
      // Skip weekends and fully booked dates
      if (dayOfWeek !== 0 && dayOfWeek !== 6 && !fullyBookedDates.includes(dateStr)) {
        availableDates.push(dateStr);
      }
    }

    return NextResponse.json({ availableDates });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get available dates' }, { status: 500 });
  }
}
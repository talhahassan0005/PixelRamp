import { NextRequest, NextResponse } from 'next/server';

// Business hours: 9 AM to 6 PM, Monday to Friday
const businessHours = [
  '09:00', '10:00', '11:00', '12:00', 
  '14:00', '15:00', '16:00', '17:00'
];

// Mock booked slots - in real app, check Google Calendar API
const bookedSlots: { [key: string]: string[] } = {
  // Format: 'YYYY-MM-DD': ['HH:MM', 'HH:MM']
};

export async function GET(req: NextRequest) {
  try {
    const date = req.nextUrl.searchParams.get('date');
    if (!date) {
      return NextResponse.json({ error: 'Date required' }, { status: 400 });
    }

    // Check if date is weekend
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return NextResponse.json({ availableSlots: [] }); // No slots on weekends
    }

    // Get booked slots for this date
    const booked = bookedSlots[date] || [];
    
    // Filter available slots
    const availableSlots = businessHours.filter(time => !booked.includes(time));

    return NextResponse.json({ availableSlots });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
  }
}
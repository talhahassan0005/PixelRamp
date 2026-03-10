import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, service, date, time } = await req.json();
    
    // Generate random meeting ID
    const meetingId = Math.random().toString(36).substring(2, 12);
    const meetLink = `https://meet.google.com/${meetingId}`;
    
    // Create calendar event URL
    const startDate = new Date(`${date} ${time}`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=PixelRamp Consultation - ${name}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=Service: ${service}%0AGoogle Meet: ${meetLink}&location=${meetLink}`;
    
    return NextResponse.json({ 
      success: true, 
      meetLink,
      calendarUrl,
      message: 'Meeting scheduled successfully!' 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create meeting' }, { status: 500 });
  }
}
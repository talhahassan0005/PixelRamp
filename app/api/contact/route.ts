import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const packageBudgets = {
  'web-starter': { min: 300, max: 500 },
  'web-business': { min: 1199, max: 2000 },
  'web-enterprise': { min: 2200, max: 10000 },
  'design-essential': { min: 149, max: 200 },
  'design-corporate': { min: 299, max: 400 },
  'design-elite': { min: 600, max: 1000 },
  'saas-mvp': { min: 1500, max: 2000 },
  'saas-scaleup': { min: 2300, max: 3000 },
  'saas-enterprise': { min: 3000, max: 5000 },
  'app-basic': { min: 500, max: 700 },
  'app-pro': { min: 999, max: 1500 },
  'app-advanced': { min: 2000, max: 5000 }
};

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, service, budget, meetingDate, meetingTime, needsMeeting } = await req.json();

    // Budget validation
    if (service && budget) {
      const serviceConfig = packageBudgets[service as keyof typeof packageBudgets];
      if (serviceConfig) {
        const budgetNum = parseInt(budget);
        if (budgetNum < serviceConfig.min || budgetNum > serviceConfig.max) {
          return NextResponse.json({
            error: `Budget should be between £${serviceConfig.min} - £${serviceConfig.max} for this package`
          }, { status: 400 });
        }
      }
    }

    let calendarLink = '';
    if (needsMeeting && meetingDate && meetingTime) {
      // Create Google Calendar event link (user will create actual meet link)
      const startDate = new Date(`${meetingDate} ${meetingTime}`);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later
      
      const eventTitle = encodeURIComponent(`PixelRamp Consultation - ${name}`);
      const eventDetails = encodeURIComponent(`Service: ${service}\nClient: ${name}\nEmail: ${email}`);
      
      calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${eventDetails}`;
    }

    // Email configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'info.pixelramp@gmail.com',
        pass: 'eqxv wpev nzkk tcoy'
      }
    });

    // Email content
    const mailOptions = {
      from: 'info.pixelramp@gmail.com',
      to: 'info.pixelramp@gmail.com',
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service || 'Not specified'}</p>
        <p><strong>Budget:</strong> £${budget || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        ${needsMeeting ? `
        <hr>
        <h3>Meeting Request</h3>
        <p><strong>Date:</strong> ${meetingDate}</p>
        <p><strong>Time:</strong> ${meetingTime}</p>
        <p><strong>Add to Calendar:</strong> <a href="${calendarLink}">Click here to add to Google Calendar</a></p>
        <p><em>Action Required: Please create this meeting in your Google Calendar with Google Meet and send the actual meet link to the client.</em></p>
        ` : ''}
        <hr>
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `
    };

    console.log('Attempting to send email to:', 'info.pixelramp@gmail.com');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to company');

    // Send confirmation email to user
    const userMailOptions = {
      from: 'info.pixelramp@gmail.com',
      to: email,
      subject: 'Thank you for contacting PixelRamp - We\'ll be in touch soon!',
      html: `
        <h2>Thank you for contacting PixelRamp!</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry and will get back to you within 24 hours.</p>
        
        <h3>Your Submission Details:</h3>
        <p><strong>Service:</strong> ${service || 'General Inquiry'}</p>
        <p><strong>Budget:</strong> £${budget || 'Not specified'}</p>
        <p><strong>Message:</strong> ${message}</p>
        
        ${needsMeeting ? `
        <hr>
        <h3>Meeting Request</h3>
        <p><strong>Requested Date:</strong> ${meetingDate}</p>
        <p><strong>Requested Time:</strong> ${meetingTime}</p>
        <p>We'll create a Google Meet link and send it to you via email before the meeting.</p>
        ` : ''}
        
        <hr>
        <p>Best regards,<br>
        <strong>PixelRamp Team</strong><br>
        Email: info.pixelramp@gmail.com<br>
        Phone: +44 (0) 123 456 7890</p>
        
        <p><em>This is an automated confirmation email.</em></p>
      `
    };

    await transporter.sendMail(userMailOptions);
    console.log('Confirmation email sent to user:', email);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      calendarLink: needsMeeting ? calendarLink : null
    });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
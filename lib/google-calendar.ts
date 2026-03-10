import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Service account credentials (you'll need to create these in Google Cloud Console)
const credentials = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL
};

export async function createCalendarEvent(eventDetails: {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  attendeeEmail: string;
}) {
  try {
    // Authenticate with service account
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Create calendar event with Google Meet
    const event = {
      summary: eventDetails.summary,
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startDateTime,
        timeZone: 'Europe/London',
      },
      end: {
        dateTime: eventDetails.endDateTime,
        timeZone: 'Europe/London',
      },
      attendees: [
        { email: eventDetails.attendeeEmail },
        { email: process.env.COMPANY_EMAIL || 'info.pixelramp@gmail.com' }
      ],
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(7),
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all'
    });

    const meetLink = response.data.conferenceData?.entryPoints?.find(
      entry => entry.entryPointType === 'video'
    )?.uri;

    return {
      eventId: response.data.id,
      meetLink: meetLink || '',
      eventLink: response.data.htmlLink
    };

  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw new Error('Failed to create calendar event');
  }
}
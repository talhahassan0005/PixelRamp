# Google Calendar API Setup Instructions

## 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Note your PROJECT_ID

## 2. Enable Google Calendar API
1. Go to APIs & Services > Library
2. Search for "Google Calendar API"
3. Click Enable

## 3. Create Service Account
1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > "Service Account"
3. Fill in service account details
4. Click "Create and Continue"
5. Skip role assignment (click Continue)
6. Click "Done"

## 4. Generate Service Account Key
1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Select JSON format
5. Download the JSON file

## 5. Extract Credentials from JSON
From the downloaded JSON file, copy these values to .env.local:

```env
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY_ID=private-key-id-from-json
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR-PRIVATE-KEY-HERE\n-----END PRIVATE KEY-----"
GOOGLE_CLIENT_EMAIL=service-account-email@project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=client-id-from-json
GOOGLE_CLIENT_CERT_URL=client-cert-url-from-json
```

## 6. Share Calendar with Service Account
1. Open Google Calendar
2. Go to Settings > Add Calendar > Create New Calendar
3. Or use your primary calendar
4. In calendar settings, go to "Share with specific people"
5. Add your service account email with "Make changes to events" permission

## 7. Test the Integration
1. Submit a contact form with meeting request
2. Check if calendar event is created
3. Verify Google Meet link is generated
4. Test the meeting link

## Troubleshooting
- Make sure service account has calendar access
- Check if Google Calendar API is enabled
- Verify all environment variables are set correctly
- Ensure private key format is correct (with \n for line breaks)
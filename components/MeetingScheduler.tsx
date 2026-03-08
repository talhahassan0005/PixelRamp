'use client';

import { useState } from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function MeetingScheduler() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    date: '',
    time: ''
  });
  const [meetingData, setMeetingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/schedule-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setMeetingData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (meetingData) {
    return (
      <div className="max-w-md mx-auto p-6 bg-slate-800 rounded-lg border border-slate-700">
        <div className="text-center mb-6">
          <Video className="mx-auto mb-4 text-green-500" size={48} />
          <h3 className="text-xl font-bold text-green-500">Meeting Scheduled!</h3>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 rounded-lg">
            <p className="text-sm text-slate-400 mb-2">Google Meet Link:</p>
            <a 
              href={meetingData.meetLink} 
              target="_blank" 
              className="text-blue-400 hover:underline break-all"
            >
              {meetingData.meetLink}
            </a>
          </div>
          
          <Button 
            onClick={() => window.open(meetingData.calendarUrl, '_blank')}
            className="w-full"
          >
            <Calendar size={20} className="mr-2" />
            Add to Google Calendar
          </Button>
          
          <Button 
            onClick={() => setMeetingData(null)}
            variant="secondary"
            className="w-full"
          >
            Schedule Another Meeting
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-800 rounded-lg border border-slate-700">
      <h3 className="text-xl font-bold mb-6 text-center">Schedule a Meeting</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
          required
        />
        
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
          required
        />
        
        <select
          value={formData.service}
          onChange={(e) => setFormData({...formData, service: e.target.value})}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
          required
        >
          <option value="">Select Service</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile App">Mobile App</option>
          <option value="Design">Graphics & Design</option>
          <option value="Consultation">General Consultation</option>
        </select>
        
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
          required
        />
        
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({...formData, time: e.target.value})}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
          required
        />
        
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Scheduling...' : 'Schedule Meeting'}
          <Video size={20} className="ml-2" />
        </Button>
      </form>
    </div>
  );
}
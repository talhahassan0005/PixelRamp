'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData {
  name: string;
  email: string;
  message: string;
  service: string;
  budget: string;
  meetingDate: string;
  meetingTime: string;
  needsMeeting: boolean;
}

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({ 
    name: '', 
    email: '', 
    message: '', 
    service: '', 
    budget: '',
    meetingDate: '',
    meetingTime: '',
    needsMeeting: false
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<any>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [loadingDates, setLoadingDates] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loadAvailableDates = async () => {
    setLoadingDates(true);
    try {
      const res = await fetch('/api/available-dates');
      const data = await res.json();
      setAvailableDates(data.availableDates || []);
    } catch (error) {
      console.error('Error loading dates:', error);
    } finally {
      setLoadingDates(false);
    }
  };

  const checkAvailableSlots = async (date: string) => {
    if (!date) return;
    setLoadingSlots(true);
    try {
      const res = await fetch(`/api/check-availability?date=${date}`);
      const data = await res.json();
      setAvailableSlots(data.availableSlots || []);
    } catch (error) {
      console.error('Error checking slots:', error);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setErrors({ budget: data.error });
        return;
      }
      
      setSuccess(true);
      setData(data); // Store response data
      setFormData({ name: '', email: '', message: '', service: '', budget: '', meetingDate: '', meetingTime: '', needsMeeting: false });
    } catch (error) {
      setErrors({ message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">{t('contact_us')}</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t('ready_to_start')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-16 rounded-lg overflow-hidden"
      >
        <img 
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80" 
          alt="Contact Us" 
          className="w-full h-64 object-cover"
        />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-4">
            <Mail className="text-blue-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">{t('email')}</h3>
              <p className="text-slate-400">contact@pixelramp.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="text-blue-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">{t('phone')}</h3>
              <p className="text-slate-400">+44 (0) 123 456 7890</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="text-blue-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">{t('address')}</h3>
              <p className="text-slate-400">London, United Kingdom</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold mb-4">{t('business_hours')}</h3>
            <div className="space-y-2 text-slate-400">
              <p>{t('monday_friday')}</p>
              <p>{t('saturday')}</p>
              <p>{t('sunday')}</p>
              <p className="text-blue-600 mt-4">{t('support_24_7')} {t('emergency_support')}</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {success && (
            <div className="p-4 bg-green-600/20 border border-green-600/50 rounded-lg text-green-400">
              <p>Message sent successfully! We'll get back to you soon.</p>
              {data?.calendarLink && (
                <p className="mt-2 text-sm">
                  <strong>Meeting requested!</strong> We'll create the Google Meet link and send it to you via email.
                </p>
              )}
            </div>
          )}
          
          <div>
            <input
              type="text"
              placeholder={t('your_name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <input
              type="email"
              placeholder={t('your_email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
            >
              <option value="">Select Service (Optional)</option>
              <optgroup label="Web Development">
                <option value="web-starter">Web Starter (£300-£500)</option>
                <option value="web-business">Web Business (£1,199-£2,000)</option>
                <option value="web-enterprise">Web Enterprise (£2,200+)</option>
              </optgroup>
              <optgroup label="Graphics & Design">
                <option value="design-essential">Design Essential (£149-£200)</option>
                <option value="design-corporate">Design Corporate (£299-£400)</option>
                <option value="design-elite">Design Elite (£600-£1,000)</option>
              </optgroup>
              <optgroup label="SaaS Solutions">
                <option value="saas-mvp">SaaS MVP Launch (£1,500-£2,000)</option>
                <option value="saas-scaleup">SaaS Scale-Up (£2,300-£3,000)</option>
                <option value="saas-enterprise">SaaS Enterprise (£3,000+)</option>
              </optgroup>
              <optgroup label="Mobile Apps">
                <option value="app-basic">App Basic (£500-£700)</option>
                <option value="app-pro">App Pro (£999-£1,500)</option>
                <option value="app-advanced">App Advanced (£2,000+)</option>
              </optgroup>
            </select>
          </div>
          
          <div>
            <input
              type="number"
              placeholder="Budget (£)"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
            />
            {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
          </div>
          
          <div>
            <textarea
              placeholder={t('your_message')}
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none resize-none"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>
          
          <div className="border-t border-slate-700 pt-4">
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={formData.needsMeeting}
                onChange={(e) => {
                  setFormData({ ...formData, needsMeeting: e.target.checked });
                  if (e.target.checked) loadAvailableDates();
                }}
                className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 rounded focus:ring-blue-500"
              />
              <span className="text-slate-300">Schedule a meeting</span>
            </label>
            
            {formData.needsMeeting && (
              <div className="space-y-4 pl-6 border-l-2 border-blue-600/30">
                <div>
                  <input
                    type="date"
                    value={formData.meetingDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      setFormData({ ...formData, meetingDate: e.target.value, meetingTime: '' });
                      checkAvailableSlots(e.target.value);
                    }}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>
                
                {formData.meetingDate && (
                  <div>
                    {loadingSlots ? (
                      <p className="text-slate-400 text-sm">Checking availability...</p>
                    ) : availableSlots.length > 0 ? (
                      <select
                        value={formData.meetingTime}
                        onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
                      >
                        <option value="">Select Time Slot</option>
                        {availableSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-red-500 text-sm">No available slots for this date</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending...' : t('send_message')}
          </Button>
        </motion.form>
      </div>
    </Section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <Section className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">Ready to start your project? Get in touch with our team and let's discuss how we can help transform your ideas into reality. We typically respond within 24 hours.</p>
      </motion.div>

      {/* Contact Hero Image */}
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
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-slate-400">contact@devagency.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="text-blue-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-slate-400">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="text-blue-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-slate-400">123 Tech Street, Silicon Valley, CA</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold mb-4">Business Hours</h3>
            <div className="space-y-2 text-slate-400">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
              <p className="text-blue-600 mt-4">24/7 Emergency Support Available</p>
            </div>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-600/30">
            <h3 className="text-xl font-bold mb-3">Quick Response Guarantee</h3>
            <p className="text-slate-300">We value your time. Our team commits to responding to all inquiries within 24 hours on business days.</p>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-blue-600 focus:outline-none resize-none"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </motion.form>
      </div>
    </Section>
  );
}

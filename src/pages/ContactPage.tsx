import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '../shared/components/ui/Breadcrumb';
import { Input } from '../shared/components/ui/Input';
import { Button } from '../shared/components/ui/Button';
import { brandConfig } from '../config/brand';
import { useToast } from '../shared/providers/ToastProvider';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { success } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    success('Message Sent', 'Thank you for contacting MONTS. We will respond shortly.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — MONTS</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 flex flex-col gap-12">
        <Breadcrumb items={[{ label: '📞 Contact' }]} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-accent">Get in Touch</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">📞 Contact MONTS</h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Have a question about our Ready-to-Wear collections, sizing, or custom orders? Reach out to our concierge team 24/7.
            </p>

            <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Phone className="w-5 h-5 text-accent" />
                <span>{brandConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Mail className="w-5 h-5 text-accent" />
                <span>{brandConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <MapPin className="w-5 h-5 text-accent" />
                <span>{brandConfig.contact.address}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-earth-50 p-8 rounded-2xl border border-earth-100 flex flex-col gap-4">
            <h3 className="font-serif text-xl font-bold text-primary mb-2">Send us a message</h3>
            <Input label="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">Message</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-primary"
                placeholder="How can we help you?"
              />
            </div>
            <Button type="submit" size="lg" className="w-full mt-2">
              <Send className="w-4 h-4 mr-2" /> Send Message
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

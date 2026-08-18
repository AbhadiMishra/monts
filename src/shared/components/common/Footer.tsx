import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { footerConfig } from '../../../config/footer';
import { brandConfig } from '../../../config/brand';
import { useToast } from '../../providers/ToastProvider';
import { Mail, CheckCircle2, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { success, error } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      error('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    success('Subscribed!', 'Thank you for subscribing to MONTS exclusive offers.');
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Newsletter Section */}
        <div className="border-b border-slate-800 pb-12 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-2">Exclusive offers straight to your inbox</h3>
            <p className="text-slate-400 text-sm">
              Join to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium py-3">
                <CheckCircle2 className="w-5 h-5" />
                This customer is already subscribed!
              </div>
            ) : (
              <>
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-md text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent text-white text-sm font-semibold rounded-md hover:bg-accent-dark transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-2xl font-bold tracking-wider text-white">{brandConfig.name}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{brandConfig.tagline}</p>
            <div className="flex flex-col gap-2 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent" /> {brandConfig.contact.phone}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent" /> {brandConfig.contact.address}
              </span>
            </div>
          </div>

          {/* Col 2: Main Menu */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-slate-200 mb-4">
              Main Menu
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerConfig.mainMenu.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Footer Menu */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-slate-200 mb-4">
              Footer Menu
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerConfig.footerMenu.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Text Column */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-slate-200 mb-4">
              Stay in touch.
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Share store details, promotions, or brand content with your customers.
            </p>
            <div className="flex gap-4">
              {brandConfig.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-400 hover:text-accent transition-colors font-medium"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MONTS. All rights reserved. Powered by Shopify.</p>
          <div className="flex gap-4">
            {footerConfig.legal.map((item) => (
              <Link key={item.label} to={item.href} className="hover:text-slate-400 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

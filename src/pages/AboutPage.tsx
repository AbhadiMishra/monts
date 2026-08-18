import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '../shared/components/ui/Breadcrumb';
import { brandConfig } from '../config/brand';

export const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us — MONTS</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 flex flex-col gap-8">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent block mb-2">Our Identity</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">About {brandConfig.name}</h1>
        </div>

        <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-card border border-slate-100">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
            alt="MONTS Brand Story"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose max-w-none text-slate-600 text-sm md:text-base leading-relaxed flex flex-col gap-4">
          <p>
            MONTS is a luxury ready-to-wear storefront designed around minimalist silhouettes, timeless tailoring, and exceptional materials. Founded with a vision to streamline high-end apparel shopping, every piece in our collection reflects meticulous attention to detail.
          </p>
          <p>
            From Italian virgin wool tailored trousers to Mulberry silk blouses, we curate items that seamlessly transition across occasions. Built on the Pipeline theme architecture, our digital experience is clean, fast, and focused on essential craftsmanship.
          </p>
        </div>
      </div>
    </>
  );
};

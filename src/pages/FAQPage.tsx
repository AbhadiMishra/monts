import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '../shared/components/ui/Breadcrumb';
import { Accordion } from '../shared/components/ui/Accordion';

export const FAQPage: React.FC = () => {
  const faqItems = [
    {
      id: 'faq_1',
      title: 'What materials are used in MONTS garments?',
      content: 'We use 100% Mulberry silk, Italian virgin wool, and sustainable cashmere blends sourced from certified suppliers.',
    },
    {
      id: 'faq_2',
      title: 'How long does worldwide shipping take?',
      content: 'Standard international shipping takes 3-5 business days. Expedited options are available at checkout.',
    },
    {
      id: 'faq_3',
      title: 'What is your return policy?',
      content: 'We offer hassle-free returns within 30 days of delivery. Items must be unworn with original tags attached.',
    },
    {
      id: 'faq_4',
      title: 'How do I care for silk and cashmere items?',
      content: 'Dry cleaning is recommended for all cashmere overcoats and structured virgin wool trousers. Silk items can be hand washed in cold water with delicate detergent.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions — MONTS</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 flex flex-col gap-8">
        <Breadcrumb items={[{ label: 'FAQ' }]} />

        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent block mb-2">Help Center</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">Frequently Asked Questions</h1>
        </div>

        <Accordion items={faqItems} allowMultiple />
      </div>
    </>
  );
};

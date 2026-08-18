import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '../shared/components/ui/Breadcrumb';
import { Input } from '../shared/components/ui/Input';
import { Button } from '../shared/components/ui/Button';
import { useToast } from '../shared/providers/ToastProvider';
import { Building2, Package, Check } from 'lucide-react';

export const WholesalePage: React.FC = () => {
  const { success } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    success('Inquiry Received', 'Our B2B wholesale team will review your application within 24 hours.');
  };

  return (
    <>
      <Helmet>
        <title>Wholesale & B2B — MONTS</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 flex flex-col gap-8">
        <Breadcrumb items={[{ label: 'Wholesale' }]} />

        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent block mb-2">B2B Partnerships</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary">Wholesale & Stockists</h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto mt-3">
            Partner with MONTS to carry our luxury Ready-to-Wear garments in your boutique or retail catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-earth-50 p-8 rounded-2xl border border-earth-100 flex flex-col gap-4">
          <h3 className="font-serif text-xl font-bold text-primary mb-2 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-accent" /> Wholesale Application Form
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Company / Boutique Name" required />
            <Input label="Tax ID / Registration Number" required />
            <Input label="Contact Person" required />
            <Input label="Business Email" type="email" required />
          </div>
          <Button type="submit" size="lg" className="w-full mt-2">
            Submit Wholesale Inquiry
          </Button>
        </form>
      </div>
    </>
  );
};

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../shared/components/ui/Button';
import { Wrench } from 'lucide-react';

export const ServiceUnavailablePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>503 — Maintenance | MONTS</title>
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <Wrench className="w-16 h-16 text-accent mb-4" />
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">503 — Under Scheduled Maintenance</h1>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          MONTS storefront is currently undergoing scheduled updates. We will be back online shortly.
        </p>
        <Button size="lg" onClick={() => window.location.reload()}>
          Check Again
        </Button>
      </div>
    </>
  );
};

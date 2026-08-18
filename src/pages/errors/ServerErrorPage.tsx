import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../shared/components/ui/Button';
import { ServerCrash, RotateCcw } from 'lucide-react';

export const ServerErrorPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>500 — Server Error | MONTS</title>
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <ServerCrash className="w-16 h-16 text-rose-600 mb-4" />
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">500 — Internal Server Error</h1>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          Our servers encountered an temporary error. Please refresh the page.
        </p>
        <Button size="lg" onClick={() => window.location.reload()}>
          <RotateCcw className="w-4 h-4 mr-2" /> Reload Page
        </Button>
      </div>
    </>
  );
};

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { WifiOff, RotateCcw } from 'lucide-react';
import { Button } from '../../shared/components/ui/Button';

export const OfflinePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Offline — MONTS</title>
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <WifiOff className="w-16 h-16 text-slate-400 mb-4" />
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">No Internet Connection</h1>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          Please check your network settings and try reconnecting.
        </p>
        <Button size="lg" onClick={() => window.location.reload()}>
          <RotateCcw className="w-4 h-4 mr-2" /> Retry Connection
        </Button>
      </div>
    </>
  );
};

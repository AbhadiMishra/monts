import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '../../shared/components/ui/Button';
import { Lock } from 'lucide-react';

export const ForbiddenPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>403 — Forbidden | MONTS</title>
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <Lock className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">403 — Access Denied</h1>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          You do not have administrative privileges to view this area.
        </p>
        <Button size="lg">
          <Link to="/">Return to Storefront</Link>
        </Button>
      </div>
    </>
  );
};

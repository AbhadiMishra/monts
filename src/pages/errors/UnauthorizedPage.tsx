import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '../../shared/components/ui/Button';
import { ShieldAlert, LogIn } from 'lucide-react';

export const UnauthorizedPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>401 — Unauthorized | MONTS</title>
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-amber-500 mb-4" />
        <h1 className="font-serif text-3xl font-bold text-primary mb-2">401 — Authentication Required</h1>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          Please log in to access your MONTS account page or orders.
        </p>
        <Button size="lg">
          <Link to="/login" className="flex items-center gap-2">
            <LogIn className="w-4 h-4" /> Sign In Now
          </Link>
        </Button>
      </div>
    </>
  );
};

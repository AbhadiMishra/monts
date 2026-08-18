import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '../../shared/components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | MONTS</title>
      </Helmet>

      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-white">
        <span className="font-serif text-8xl font-extrabold text-earth-200">404</span>
        <h1 className="font-serif text-3xl font-bold text-primary mt-2 mb-3">Page Not Found</h1>
        <p className="text-sm text-slate-500 max-w-md mb-8">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="flex gap-4">
          <Button size="lg">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" /> Return to Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </Button>
        </div>
      </div>
    </>
  );
};

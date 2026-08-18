import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { Breadcrumb } from '../../../shared/components/ui/Breadcrumb';
import { useToast } from '../../../shared/providers/ToastProvider';
import { KeyRound, Mail, AlertCircle, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/account';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password, rememberMe);
      success('Welcome Back!', 'You have successfully signed in.');
      navigate(from, { replace: true });
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (type: 'admin' | 'customer') => {
    if (type === 'admin') {
      setEmail('admin@example.com');
      setPassword('admin123');
    } else {
      setEmail('customer@example.com');
      setPassword('customer123');
    }
  };

  return (
    <>
      <Helmet>
        <title>Account Login — MONTS</title>
      </Helmet>

      <div className="max-w-md mx-auto px-6 py-12 flex flex-col gap-6">
        <Breadcrumb items={[{ label: 'Login' }]} />

        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-primary">Sign In</h1>
          <p className="text-xs text-slate-500 mt-1">Access your saved orders, addresses, and wishlist.</p>
        </div>

        {/* Demo Credentials Quick Fill Bar */}
        <div className="bg-earth-50 p-4 rounded-xl border border-earth-100 flex flex-col gap-2 text-xs">
          <span className="font-bold text-earth-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-accent" /> Quick Fill Seed Accounts:
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fillCredentials('admin')}
              className="flex-1 py-1.5 px-3 bg-white border border-earth-200 rounded font-semibold text-earth-800 hover:bg-earth-100 transition-colors"
            >
              Admin Demo
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('customer')}
              className="flex-1 py-1.5 px-3 bg-white border border-earth-200 rounded font-semibold text-earth-800 hover:bg-earth-100 transition-colors"
            >
              Customer Demo
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. customer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-primary focus:ring-primary"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-accent hover:underline font-medium">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" isLoading={loading} size="lg" className="w-full mt-2">
            Sign In
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
          New to MONTS?{' '}
          <Link to="/register" className="font-bold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </>
  );
};

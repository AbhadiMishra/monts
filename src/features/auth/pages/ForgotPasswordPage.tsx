import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { Breadcrumb } from '../../../shared/components/ui/Breadcrumb';
import { useToast } from '../../../shared/providers/ToastProvider';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { forgotPassword } = useAuth();
  const { success } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      setSubmitted(true);
      success('Email Sent', 'Password reset instructions have been sent to your email.');
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password — MONTS</title>
      </Helmet>

      <div className="max-w-md mx-auto px-6 py-12 flex flex-col gap-6">
        <Breadcrumb items={[{ label: 'Forgot Password' }]} />

        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-primary">Reset your password</h1>
          <p className="text-xs text-slate-500 mt-1">We will send you an email to reset your password.</p>
        </div>

        {submitted ? (
          <div className="p-6 bg-earth-50 border border-earth-100 rounded-xl text-center flex flex-col items-center gap-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            <h3 className="font-serif text-lg font-bold text-primary">Check your email</h3>
            <p className="text-xs text-slate-600">
              We have sent a password reset link to <strong>{email}</strong>.
            </p>
            <Link to="/login" className="text-xs font-bold text-primary hover:underline mt-2">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" isLoading={loading} size="lg" className="w-full">
              Submit
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { Breadcrumb } from '../../../shared/components/ui/Breadcrumb';
import { useToast } from '../../../shared/providers/ToastProvider';

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { success } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    success('Password Reset', 'Your password has been updated. Please sign in.');
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>New Password — MONTS</title>
      </Helmet>

      <div className="max-w-md mx-auto px-6 py-12 flex flex-col gap-6">
        <Breadcrumb items={[{ label: 'Reset Password' }]} />

        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-primary">Set New Password</h1>
          <p className="text-xs text-slate-500 mt-1">Please enter your new password below.</p>
        </div>

        {errorMsg && <p className="text-xs text-rose-600 text-center">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" size="lg" className="w-full">
            Save Password
          </Button>
        </form>
      </div>
    </>
  );
};

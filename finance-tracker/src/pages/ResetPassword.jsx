import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password }),
      });
      if (res.ok) {
        setStatus('success');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setStatus('error');
        setError('Invalid or expired link');
      }
    } catch {
      setStatus('error');
      setError('Failed to reset password');
    }
  };

  if (!token || !email) {
    return (
      <div className="max-w-sm mx-auto mt-16 bg-card-light dark:bg-card-dark p-8 rounded-xl shadow-card text-center">
        <div className="text-red-500 font-bold">Invalid reset link.</div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto mt-16 bg-card-light dark:bg-card-dark p-8 rounded-xl shadow-card text-center">
      <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
      {status === 'idle' || status === 'loading' ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-primary text-white font-semibold shadow hover:scale-105 transition"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Resetting...' : 'Reset Password'}
          </button>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        </form>
      ) : status === 'success' ? (
        <div className="text-green-600 font-bold">Password reset! Redirecting to login...</div>
      ) : (
        <div className="text-red-500 font-bold">{error || 'Failed to reset password.'}</div>
      )}
    </div>
  );
};

export default ResetPassword; 
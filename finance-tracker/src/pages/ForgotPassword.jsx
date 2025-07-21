import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setStatus('sent');
      else setStatus('error');
    } catch {
      setStatus('error');
      setError('Failed to send reset email');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-card-light dark:bg-card-dark p-8 rounded-xl shadow-card text-center">
      <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
      {status === 'idle' || status === 'loading' ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-primary text-white font-semibold shadow hover:scale-105 transition"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
          </button>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        </form>
      ) : status === 'sent' ? (
        <div className="text-green-600 font-bold">If that email is registered, a reset link has been sent.</div>
      ) : (
        <div className="text-red-500 font-bold">Failed to send reset email. Try again.</div>
      )}
    </div>
  );
};

export default ForgotPassword; 
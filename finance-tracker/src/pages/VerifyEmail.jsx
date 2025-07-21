import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    if (!token || !email) {
      setStatus('error');
      return;
    }
    fetch(`http://localhost:5000/api/verify-email?token=${token}&email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setStatus('success');
        else setStatus('error');
      })
      .catch(() => setStatus('error'));
  }, [searchParams]);

  return (
    <div className="max-w-sm mx-auto mt-16 bg-card-light dark:bg-card-dark p-8 rounded-xl shadow-card text-center">
      {status === 'verifying' && <div>Verifying your email...</div>}
      {status === 'success' && (
        <>
          <div className="text-green-600 font-bold mb-2">Email verified!</div>
          <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
        </>
      )}
      {status === 'error' && (
        <>
          <div className="text-red-500 font-bold mb-2">Invalid or expired verification link.</div>
          <Link to="/register" className="text-primary font-semibold hover:underline">Register</Link>
        </>
      )}
    </div>
  );
};

export default VerifyEmail; 
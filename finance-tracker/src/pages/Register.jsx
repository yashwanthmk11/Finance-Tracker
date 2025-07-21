import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(form.email, form.password);
    if (success) navigate('/');
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-card-light dark:bg-card-dark p-8 rounded-xl shadow-card">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-primary text-white font-semibold shadow hover:scale-105 transition"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
      </div>
    </div>
  );
};

export default Register; 
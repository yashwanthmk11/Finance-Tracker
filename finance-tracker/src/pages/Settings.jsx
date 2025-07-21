import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import DeleteConfirmation from '../components/DeleteConfirmation';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { transactions, setFilters } = useTransactions();
  const { logout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const clearAll = () => {
    localStorage.removeItem('transactions');
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto bg-card-light dark:bg-card-dark rounded-xl shadow-card p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Dark Mode</span>
        <button
          className={`px-4 py-2 rounded ${darkMode ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={toggleTheme}
        >
          {darkMode ? 'On' : 'Off'}
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold">Clear All Transactions</span>
        <button
          className="px-4 py-2 rounded bg-red-500 text-white font-semibold shadow hover:scale-105 transition"
          onClick={() => setShowConfirm(true)}
        >
          Clear
        </button>
      </div>
      <DeleteConfirmation
        open={showConfirm}
        onConfirm={clearAll}
        onCancel={() => setShowConfirm(false)}
      />
      <div className="flex items-center justify-between mt-6">
        <span className="font-semibold">Logout</span>
        <button
          className="px-4 py-2 rounded bg-red-500 text-white font-semibold shadow hover:scale-105 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings; 
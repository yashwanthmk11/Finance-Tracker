import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegChartBar, FaListUl, FaCog, FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Dashboard', icon: <FaRegChartBar /> },
  { to: '/transactions', label: 'Transactions', icon: <FaListUl /> },
  { to: '/settings', label: 'Settings', icon: <FaCog /> },
];

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80 }}
      className="flex items-center justify-between px-4 py-2 bg-card-light dark:bg-card-dark shadow-card rounded-xl mb-4"
    >
      <div className="flex gap-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-1 rounded-lg font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-primary text-white dark:bg-primary-dark dark:text-white shadow'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-primary-light hover:text-primary-dark dark:hover:bg-primary-dark dark:hover:text-primary-light'
              }`
            }
            end={link.to === '/'}
          >
            {link.icon}
            <span className="hidden sm:inline">{link.label}</span>
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <span className="text-xs text-gray-500 dark:text-gray-300 hidden sm:inline">{user.email}</span>
            <button
              aria-label="Logout"
              className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 shadow hover:scale-110 transition"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
            </button>
          </>
        )}
        <button
          aria-label="Toggle Dark Mode"
          className="p-2 rounded-full bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light shadow hover:scale-110 transition"
          onClick={toggleTheme}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar; 
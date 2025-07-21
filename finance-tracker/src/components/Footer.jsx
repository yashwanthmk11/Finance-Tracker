import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full text-center py-4 mt-8 bg-card-light dark:bg-card-dark shadow-card rounded-t-xl text-gray-500 dark:text-gray-400 text-sm"
  >
    &copy; {new Date().getFullYear()} Finance Tracker. Built by{' '}
    <a
      href="https://github.com/yashwanthmk11/Finance-Tracker"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary font-semibold hover:underline"
    >
      Yashwanth
    </a>
    <motion.span
      className="inline-flex items-center mx-1"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
    >
      <FaHeart className="text-primary mx-1" />
    </motion.span>
    .
  </motion.footer>
);

export default Footer; 
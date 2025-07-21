import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, value, icon, color = 'primary' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-card bg-card-light dark:bg-card-dark min-w-[140px] min-h-[100px]`}
  >
    <div className={`text-2xl mb-2 text-${color}`}>{icon}</div>
    <div className="text-lg font-semibold">{title}</div>
    <div className="text-xl font-bold mt-1">{value}</div>
  </motion.div>
);

export default Card; 
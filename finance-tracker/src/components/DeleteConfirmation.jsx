import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteConfirmation = ({ open, onConfirm, onCancel }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-card w-full max-w-xs text-center"
        >
          <h2 className="text-lg font-bold mb-4">Delete Transaction?</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">Are you sure you want to delete this transaction? This action cannot be undone.</p>
          <div className="flex justify-center gap-2">
            <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-500 text-white font-semibold shadow hover:scale-105 transition">Delete</button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default DeleteConfirmation; 
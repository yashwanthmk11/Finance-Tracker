import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultCategories = [
  'Salary', 'Food', 'Shopping', 'Bills', 'Entertainment', 'Travel', 'Other',
];

const EditTransactionModal = ({ transaction, onSave, onClose, categories = defaultCategories }) => {
  const [form, setForm] = useState(transaction || {});

  useEffect(() => {
    setForm(transaction || {});
  }, [transaction]);

  if (!transaction) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, amount: parseFloat(form.amount) });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-card w-full max-w-md"
        >
          <h2 className="text-lg font-bold mb-4">Edit Transaction</h2>
          <div className="flex flex-wrap gap-2 items-end">
            <div>
              <label className="block text-xs mb-1">Title</label>
              <input name="title" value={form.title || ''} onChange={handleChange} required className="px-2 py-1 rounded bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-xs mb-1">Amount</label>
              <input name="amount" type="number" value={form.amount || ''} onChange={handleChange} required className="px-2 py-1 rounded bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700" />
            </div>
            <div>
              <label className="block text-xs mb-1">Category</label>
              <select name="category" value={form.category || categories[0]} onChange={handleChange} className="px-2 py-1 rounded bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1">Type</label>
              <select name="type" value={form.type || 'Expense'} onChange={handleChange} className="px-2 py-1 rounded bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700">
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1">Date</label>
              <input name="date" type="date" value={form.date || ''} onChange={handleChange} className="px-2 py-1 rounded bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-primary text-white font-semibold shadow hover:scale-105 transition">Save</button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditTransactionModal; 
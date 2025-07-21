import React, { useState } from 'react';
import { motion } from 'framer-motion';

const defaultCategories = [
  'Salary', 'Food', 'Shopping', 'Bills', 'Entertainment', 'Travel', 'Other',
];

const AddTransactionForm = ({ onAdd, categories = defaultCategories }) => {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: categories[0],
    type: 'Expense',
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;
    onAdd({
      ...form,
      id: Date.now().toString(),
      amount: parseFloat(form.amount),
    });
    setForm({ ...form, title: '', amount: '' });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-2 items-end bg-card-light dark:bg-card-dark p-4 rounded-xl shadow-card mb-4"
    >
      <div>
        <label className="block text-xs mb-1">Title</label>
        <input name="title" value={form.title} onChange={handleChange} required className="px-2 py-1 rounded bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700" />
      </div>
      <div>
        <label className="block text-xs mb-1">Amount</label>
        <input name="amount" type="number" value={form.amount} onChange={handleChange} required className="px-2 py-1 rounded bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700" />
      </div>
      <div>
        <label className="block text-xs mb-1">Category</label>
        <select name="category" value={form.category} onChange={handleChange} className="px-2 py-1 rounded bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700">
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs mb-1">Type</label>
        <select name="type" value={form.type} onChange={handleChange} className="px-2 py-1 rounded bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700">
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <div>
        <label className="block text-xs mb-1">Date</label>
        <input name="date" type="date" value={form.date} onChange={handleChange} className="px-2 py-1 rounded bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700" />
      </div>
      <button type="submit" className="ml-2 px-4 py-2 rounded bg-primary text-white font-semibold shadow hover:scale-105 transition">Add</button>
    </motion.form>
  );
};

export default AddTransactionForm; 
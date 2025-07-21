import React from 'react';

const Filters = ({ filters, categories, onChange }) => (
  <div className="flex flex-wrap gap-2 items-center mb-2">
    <select
      className="px-2 py-1 rounded bg-card-light dark:bg-card-dark text-gray-700 dark:text-gray-100"
      value={filters.category}
      onChange={e => onChange({ category: e.target.value })}
    >
      <option value="All">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
    <select
      className="px-2 py-1 rounded bg-card-light dark:bg-card-dark text-gray-700 dark:text-gray-100"
      value={filters.type}
      onChange={e => onChange({ type: e.target.value })}
    >
      <option value="All">All Types</option>
      <option value="Income">Income</option>
      <option value="Expense">Expense</option>
    </select>
    <input
      type="date"
      className="px-2 py-1 rounded bg-card-light dark:bg-card-dark text-gray-700 dark:text-gray-100"
      value={filters.date}
      onChange={e => onChange({ date: e.target.value })}
    />
  </div>
);

export default Filters; 
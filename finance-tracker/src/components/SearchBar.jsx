import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange }) => (
  <div className="flex items-center gap-2 bg-card-light dark:bg-card-dark rounded-lg px-3 py-2 shadow-card">
    <FaSearch className="text-gray-400" />
    <input
      type="text"
      placeholder="Search transactions..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="bg-transparent outline-none flex-1 text-gray-700 dark:text-gray-100 placeholder-gray-400"
    />
  </div>
);

export default SearchBar; 
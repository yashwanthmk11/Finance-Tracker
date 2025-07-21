import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TransactionList = ({ transactions, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-primary-light dark:bg-primary-dark text-gray-700 dark:text-gray-100">
          <th className="px-2 py-1">Title</th>
          <th className="px-2 py-1">Amount</th>
          <th className="px-2 py-1">Category</th>
          <th className="px-2 py-1">Type</th>
          <th className="px-2 py-1">Date</th>
          <th className="px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        <AnimatePresence>
          {transactions.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-400">No transactions found.</td>
            </tr>
          )}
          {transactions.map((tx) => (
            <motion.tr
              key={tx._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="px-2 py-1">{tx.title}</td>
              <td className={`px-2 py-1 font-semibold ${tx.type === 'Income' ? 'text-green-600' : 'text-red-500'}`}>{tx.amount}</td>
              <td className="px-2 py-1">{tx.category}</td>
              <td className="px-2 py-1">{tx.type}</td>
              <td className="px-2 py-1">{tx.date}</td>
              <td className="px-2 py-1 flex gap-2">
                <button onClick={() => onEdit(tx)} className="p-1 text-blue-500 hover:text-blue-700"><FaEdit /></button>
                <button onClick={() => onDelete(tx._id)} className="p-1 text-red-500 hover:text-red-700"><FaTrash /></button>
              </td>
            </motion.tr>
          ))}
        </AnimatePresence>
      </tbody>
    </table>
  </div>
);

export default TransactionList; 
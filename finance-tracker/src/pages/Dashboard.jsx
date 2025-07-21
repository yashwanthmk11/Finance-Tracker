import React from 'react';
import Card from '../components/Card';
import PieChart from '../components/PieChart';
import { useTransactions } from '../context/TransactionContext';
import { FaWallet, FaArrowDown, FaArrowUp } from 'react-icons/fa';

const Dashboard = () => {
  const { transactions } = useTransactions();
  const income = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  // Pie chart data for expenses by category
  const expenseCategories = Array.from(
    transactions.filter(t => t.type === 'Expense').reduce((map, t) => {
      map.set(t.category, (map.get(t.category) || 0) + t.amount);
      return map;
    }, new Map())
  ).map(([category, value]) => ({ category, value }));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Balance" value={`₹${balance.toLocaleString()}`} icon={<FaWallet />} color="primary" />
        <Card title="Income" value={`₹${income.toLocaleString()}`} icon={<FaArrowDown />} color="green-500" />
        <Card title="Expenses" value={`₹${expenses.toLocaleString()}`} icon={<FaArrowUp />} color="red-500" />
      </div>
      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-card p-4">
        <h2 className="text-lg font-bold mb-2">Expenses by Category</h2>
        <PieChart data={expenseCategories} />
      </div>
    </div>
  );
};

export default Dashboard; 
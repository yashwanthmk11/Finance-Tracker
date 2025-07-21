import React, { useState } from 'react';
import AddTransactionForm from '../components/AddTransactionForm';
import TransactionList from '../components/TransactionList';
import EditTransactionModal from '../components/EditTransactionModal';
import DeleteConfirmation from '../components/DeleteConfirmation';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { useTransactions } from '../context/TransactionContext';

const defaultCategories = [
  'Salary', 'Food', 'Shopping', 'Bills', 'Entertainment', 'Travel', 'Other',
];

const Transactions = () => {
  const {
    filteredTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    filters,
    setFilters,
    transactions,
  } = useTransactions();
  const [editTx, setEditTx] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Get all unique categories from transactions
  const categories = Array.from(new Set(transactions.map(t => t.category).concat(defaultCategories)));

  return (
    <div className="flex flex-col gap-4">
      <AddTransactionForm onAdd={addTransaction} categories={categories} />
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
        <SearchBar value={filters.search} onChange={v => setFilters({ search: v })} />
        <Filters filters={filters} categories={categories} onChange={setFilters} />
      </div>
      <TransactionList
        transactions={filteredTransactions}
        onEdit={setEditTx}
        onDelete={setDeleteId}
      />
      <EditTransactionModal
        transaction={editTx}
        onSave={tx => { editTransaction(tx); setEditTx(null); }}
        onClose={() => setEditTx(null)}
        categories={categories}
      />
      <DeleteConfirmation
        open={!!deleteId}
        onConfirm={() => { deleteTransaction(deleteId); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default Transactions; 
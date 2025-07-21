import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const API_URL = 'http://localhost:5000/api/transactions';
const TransactionContext = createContext();

const initialState = {
  transactions: [],
  filters: {
    search: '',
    category: 'All',
    type: 'All',
    date: '',
  },
};

function transactionReducer(state, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t._id !== action.payload),
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch transactions from backend
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(API_URL, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) throw new Error('Not authenticated');
        return res.json();
      })
      .then((data) => {
        dispatch({ type: 'SET_TRANSACTIONS', payload: data });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load transactions');
        setLoading(false);
      });
  }, [user]);

  // Actions
  const addTransaction = async (tx) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(tx),
      });
      if (res.status === 401 || res.status === 403) throw new Error('Not authenticated');
      const data = await res.json();
      dispatch({ type: 'ADD_TRANSACTION', payload: data });
    } catch (err) {
      setError(err.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };
  const editTransaction = async (tx) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${tx._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(tx),
      });
      if (res.status === 401 || res.status === 403) throw new Error('Not authenticated');
      const data = await res.json();
      dispatch({ type: 'EDIT_TRANSACTION', payload: data });
    } catch (err) {
      setError(err.message || 'Failed to edit transaction');
    } finally {
      setLoading(false);
    }
  };
  const deleteTransaction = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.status === 401 || res.status === 403) throw new Error('Not authenticated');
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (err) {
      setError(err.message || 'Failed to delete transaction');
    } finally {
      setLoading(false);
    }
  };
  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  // Filtered transactions
  const filteredTransactions = state.transactions.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(state.filters.search.toLowerCase());
    const matchesCategory = state.filters.category === 'All' || t.category === state.filters.category;
    const matchesType = state.filters.type === 'All' || t.type === state.filters.type;
    const matchesDate = !state.filters.date || t.date === state.filters.date;
    return matchesSearch && matchesCategory && matchesType && matchesDate;
  });

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        filteredTransactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        filters: state.filters,
        setFilters,
        loading,
        error,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext); 
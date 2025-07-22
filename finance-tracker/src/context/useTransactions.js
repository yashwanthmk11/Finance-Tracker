import { useContext } from 'react';
import { TransactionContext } from './TransactionContext';

export const useTransactions = () => useContext(TransactionContext);

import { useEffect, useState, useCallback } from 'react';
import { createContext } from 'use-context-selector';
import { api } from '@/api';

interface Transaction {
 id: number;
 description: string;
 type: 'income' | 'outcome';
 value: number;
 category: string;
 createdAt: string;
}

interface CrateNewTransactionData extends Omit<Transaction, 'createdAt' | 'id'> {}

interface TransactionContextType {
 transactions: Transaction[];
 fetchTransactions: (query?: string) => Promise<void>;
 createNewTransaction: (data: CrateNewTransactionData) => Promise<void>;
 deleteTransaction: (id: number) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionContextType>(
 {} as TransactionContextType
);

export function TransactionsContextProvider({ children }: { children: React.ReactNode }) {
 const [transactions, setTransactions] = useState<Transaction[]>([]);

 const fetchTransactions = useCallback(async (query?: string): Promise<void> => {
  try {
   const { data } = await api.get('/transactions', {
    params: {
     _sort: '-createdAt',
     description: query
    }
   });
   setTransactions([...data]);
  } catch (err) {
   // You can use error message component
   console.error(err);
  }
 }, []);

 const createNewTransaction = useCallback(async (data: CrateNewTransactionData) => {
  const response = await api.post('/transactions', {
   ...data,
   createdAt: new Date().toISOString()
  });

  const { data: newTransaction } = response;

  setTransactions((oldTransactions) => [...oldTransactions, newTransaction]);
 }, []);

 const deleteTransaction = useCallback(
  async (id: number) => {
   await api.delete(`/transactions/${id}`);

   const transactionsWithoutDeletedOne = transactions.filter(
    (transaction) => String(transaction.id) !== String(id)
   );

   setTransactions([...transactionsWithoutDeletedOne]);
  },
  [transactions]
 );

 useEffect(() => {
  fetchTransactions();
 }, [fetchTransactions]);

 return (
  <TransactionsContext.Provider
   value={{
    transactions,
    fetchTransactions,
    createNewTransaction,
    deleteTransaction
   }}>
   {children}
  </TransactionsContext.Provider>
 );
}

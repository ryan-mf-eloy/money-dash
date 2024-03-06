import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '@/contexts/TransactionsContext';

import Header from '@/components/Header';
import Summary from '@/components/Summary';
import SearchForm from '@/components/SearchForm';

import { PriceHightLight, TransactionsContainer, TransactionsTable } from './styles';

import { formatDate, formatCurrency } from '@/utils';
import { TrashSimple } from 'phosphor-react';

export default function Transactions() {
 const { transactions, deleteTransaction } = useContextSelector(
  TransactionsContext,
  ({ transactions, deleteTransaction }) => ({
   transactions,
   deleteTransaction
  })
 );

 return (
  <div>
   <Header />
   <Summary />

   <TransactionsContainer>
    <SearchForm />

    <TransactionsTable>
     <tbody>
      {transactions.map((transaction) => {
       const formattedDate = formatDate(transaction.createdAt);
       const formattedValue = formatCurrency(transaction.value);

       return (
        <tr key={transaction.id}>
         <td width="50%">{transaction.description}</td>
         <td>
          <PriceHightLight variant={transaction.type}>{formattedValue}</PriceHightLight>
         </td>
         <td>{transaction.category}</td>
         <td>{formattedDate}</td>
         <td title="Apagar transação">
          <TrashSimple size={24} onClick={() => deleteTransaction(transaction.id)} />
         </td>
        </tr>
       );
      })}
     </tbody>
    </TransactionsTable>
   </TransactionsContainer>
  </div>
 );
}

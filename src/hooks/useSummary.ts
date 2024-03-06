import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '@/contexts/TransactionsContext';

export function useSummary() {
 const transactions = useContextSelector(TransactionsContext, ({ transactions }) => transactions);

 const reduceOutput = { income: 0, outcome: 0, total: 0 };
 const summary = transactions.reduce((acc, { type, value }) => {
  if (type === 'outcome') {
   const signedValue = value * -1;
   acc.outcome += signedValue;
   acc.total -= value;
  }

  if (type === 'income') {
   const unsignedValue = Math.abs(value);
   acc.income += unsignedValue;
   acc.total += unsignedValue;
  }

  return acc;
 }, reduceOutput);

 return summary;
}

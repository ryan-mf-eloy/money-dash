import * as zod from 'zod';
import { useContextSelector } from 'use-context-selector';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '@/contexts/TransactionsContext';

import { MagnifyingGlass } from 'phosphor-react';

import { SearchFormContainer } from './styles';

const searchSchema = zod.object({
 search: zod.string()
});

type SearchSchemaType = zod.infer<typeof searchSchema>;

export default function SearchForm() {
 const fetchTransactions = useContextSelector(
  TransactionsContext,
  ({ fetchTransactions }) => fetchTransactions
 );

 const defaultValues = { search: '' };
 const resolver = zodResolver(searchSchema);

 const {
  register,
  handleSubmit,
  formState: { isSubmitting }
 } = useForm({ resolver, defaultValues });

 const handleSearchTransactions = async ({ search }: SearchSchemaType) => {
  await fetchTransactions(search);
 };

 return (
  <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
   <input type="text" placeholder="Busque por transações" {...register('search')} />

   <button type="submit" disabled={isSubmitting}>
    <MagnifyingGlass size={20} />
    Buscar
   </button>
  </SearchFormContainer>
 );
}

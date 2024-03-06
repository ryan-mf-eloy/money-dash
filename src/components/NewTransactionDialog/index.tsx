import * as zod from 'zod';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '@/contexts/TransactionsContext';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as Dialog from '@radix-ui/react-dialog';
import { Content, Overlay, CloseButton, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';

const newTransactionFormSchema = zod.object({
 description: zod.string(),
 value: zod.number(),
 category: zod.string(),
 type: zod.enum(['income', 'outcome'])
});

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

interface CreateNewTransactionParams extends NewTransactionFormInputs {
 type: any; // React Hook Form return a string
}

export default function NewTransactionDialog() {
 const defaultValues = { type: 'income', description: '', value: 0, category: '' };
 const resolver = zodResolver(newTransactionFormSchema);
 const {
  register,
  control,
  handleSubmit,
  reset,
  formState: { isSubmitting }
 } = useForm({ resolver, defaultValues });

 const createNewTransaction = useContextSelector(
  TransactionsContext,
  ({ createNewTransaction }) => createNewTransaction
 );

 const handleCreateNewTransaction = async (data: CreateNewTransactionParams) => {
  await new Promise((resolve) => {
   setTimeout(() => {
    resolve(() => {});
   }, 2000);
  });

  await createNewTransaction(data);

  reset();
 };

 return (
  <Dialog.Portal>
   <Overlay />

   <Content>
    <CloseButton>
     <X size={24} />
    </CloseButton>

    <Dialog.Title>Nova transação</Dialog.Title>

    <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
     <input
      type="number"
      required
      placeholder="Valor"
      {...register('value', { valueAsNumber: true })}
     />
     <input type="text" required placeholder="Descrição" {...register('description')} />
     <input type="text" required placeholder="Categoria" {...register('category')} />

     <Controller
      control={control}
      name="type"
      render={({ field: { onChange, value } }) => (
       <TransactionType onValueChange={onChange} value={value}>
        <TransactionTypeButton {...register('type')} value="income" variant={'income'}>
         Á Receber
         <ArrowCircleUp size={24} />
        </TransactionTypeButton>
        <TransactionTypeButton {...register('type')} value="outcome" variant={'outcome'}>
         Á Pagar
         <ArrowCircleDown size={24} />
        </TransactionTypeButton>
       </TransactionType>
      )}
     />

     <button type="submit" disabled={isSubmitting}>
      Cadastrar
     </button>
    </form>
   </Content>
  </Dialog.Portal>
 );
}

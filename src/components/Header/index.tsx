import NewTransactionDialog from '../NewTransactionDialog';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

import * as Dialog from '@radix-ui/react-dialog';

export default function Header() {
 return (
  <HeaderContainer>
   <HeaderContent>
    <h2>Money Dash</h2>

    <Dialog.Root>
     <Dialog.Trigger asChild>
      <NewTransactionButton>Nova transação</NewTransactionButton>
     </Dialog.Trigger>

     <NewTransactionDialog />
    </Dialog.Root>
   </HeaderContent>
  </HeaderContainer>
 );
}

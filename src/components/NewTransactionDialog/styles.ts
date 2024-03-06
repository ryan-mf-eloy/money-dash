import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';

export const Overlay = styled(Dialog.Overlay)`
 position: fixed;
 width: 100vw;
 height: 100vh;
 z-index: 100;
 inset: 0;
 background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
 min-width: 32rem;
 border-radius: 6px;
 padding: 2.5rem 3rem;
 background: ${(props) => props.theme['gray-800']};
 z-index: 200;

 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);

 form {
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
   border-radius: 6px;
   border: 0;
   background: ${(props) => props.theme['gray-900']};
   color: ${(props) => props.theme['gray-300']};
   padding: 1rem;

   &::placeholder {
    color: ${(props) => props.theme['gray-500']};
   }
  }

  button[type='submit'] {
   height: 58px;
   border: 0;
   background: ${(props) => props.theme['green-500']};
   color: ${(props) => props.theme.white};
   font-weight: bold;
   padding: 0 1.25rem;
   border-radius: 6px;
   margin-top: 1.5rem;
   cursor: pointer;
   transition: background-color 0.2s;

   &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
   }

   &:hover {
    background: ${(props) => props.theme['green-700']};
   }
  }
 }
`;

export const CloseButton = styled(Dialog.Close)`
 position: absolute;
 background: transparent;
 border: 0;
 top: 1.5rem;
 right: 1.5rem;
 line-height: 0;
 cursor: pointer;
 color: ${(props) => props.theme['gray-500']};
 transition: filter 0.2s;

 &:hover {
  filter: brightness(0.8);
 }
`;

export const TransactionType = styled(RadioGroup.Root)`
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: 0.5rem;
 margin-top: 1rem 0;
`;

export const TransactionTypeButton = styled(RadioGroup.Item)<{ variant: 'income' | 'outcome' }>`
 background: ${(props) => props.theme['gray-700']};
 padding: 1rem;
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 0.5rem;
 border-radius: 6px;
 border: 0;
 cursor: pointer;
 color: ${(props) => props.theme['gray-300']};
 transition: background-color 0.2s;

 svg {
  color: ${(props) =>
   props.variant === 'income' ? props.theme['green-300'] : props.theme['red-300']};
 }

 &[data-state='unchecked']:hover {
  background: ${(props) => props.theme['gray-600']};
 }

 &[data-state='checked'] {
  color: ${(props) => props.theme.white};
  background: ${(props) =>
   props.variant === 'income' ? props.theme['green-500'] : props.theme['red-500']};

  svg {
   color: ${(props) => props.theme.white};
  }
 }
`;

export const DeleteButton = styled.button`
 &:hover {
  background: ${(props) => props.theme['gray-600']};
 }
`;

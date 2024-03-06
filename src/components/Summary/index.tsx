import { useSummary } from '@/hooks/useSummary';

import { formatCurrency } from '@/utils';

import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';

import { SummaryCard, SummaryContainer } from './styles';

export default function Summary() {
 const { income, outcome, total } = useSummary();

 return (
  <SummaryContainer>
   <SummaryCard>
    <header>
     <span>Á Receber</span>

     <ArrowCircleUp size={32} color="#00b37e" />
    </header>

    <strong>{formatCurrency(income, 'always')}</strong>
   </SummaryCard>

   <SummaryCard>
    <header>
     <span>Á Pagar</span>

     <ArrowCircleDown size={32} color="#f75a68" />
    </header>

    <strong>{formatCurrency(outcome, 'always')}</strong>
   </SummaryCard>

   <SummaryCard className="highlight-background">
    <header>
     <span>Saldo</span>

     <CurrencyDollar size={32} color="#fff" />
    </header>

    <strong>{formatCurrency(total, 'always')}</strong>
   </SummaryCard>
  </SummaryContainer>
 );
}

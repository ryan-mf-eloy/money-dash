export function formatDate(date: string) {
 return Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

export function formatCurrency(value: number, sign?: 'auto' | 'always') {
 return new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  signDisplay: sign,
  currency: 'BRL'
 }).format(value);
}

export function formatCurrency(amount: number): string {
  if (amount === 0) return 'R$ --,--'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(amount));
}
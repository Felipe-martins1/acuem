export function formatCurrency(valor: number = 0) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

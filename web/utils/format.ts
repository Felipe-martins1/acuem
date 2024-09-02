import { Address } from '@/types/api';

export function formatCurrency(valor: number = 0) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const mapsUrl = (address: Address) => {
  const { city, state, complement, neighborhood, number, street } = address;

  const addressComponents = `${street}+${number}+${neighborhood}+${city}+${state}+${complement}`;
  const mapsPlace = encodeURIComponent(addressComponents);

  return `https://www.google.com/maps/search/?api=1&query=${mapsPlace}`;
};

export const goToMaps = (address: Address) => {
  window.open(mapsUrl(address), '_blank');
};

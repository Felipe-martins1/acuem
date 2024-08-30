'use client';

import { useRouter } from 'next/navigation';
import { CheckoutScreen } from '../components/Checkout/CheckoutScreen';

const Carrinho = () => {
  const router = useRouter();

  return <CheckoutScreen onClose={() => router.push('/')} />;
};

export default Carrinho;

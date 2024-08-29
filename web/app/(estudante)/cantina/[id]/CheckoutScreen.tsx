'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/types/api';
import { formatCurrency } from '@/utils/format';
import { useCheckout } from './hooks/useCheckout';
import { Button } from '@nextui-org/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect } from 'react';

type Props = {
  products: Product[];
};

export const CheckoutScreen = ({ products }: Props) => {
  const { itens, operations } = useCart();
  const [_, setCheckout] = useCheckout();

  const checkoutProducts = products.filter(
    product => operations.get(product.id) > 0,
  );

  useEffect(() => {
    if (checkoutProducts.length === 0) setCheckout(false);
  }, [checkoutProducts]);

  return (
    <div className="min-h-full relative flex flex-col justify-between">
      <div className="flex-1">
        {checkoutProducts.map(cProduct => (
          <div
            className="p-2 bg-background rounded-lg flex gap-1 items-stretch justify-between min-h-[100px] max-h-[100px]"
            key={cProduct.id}
          >
            <div className="min-h-20 min-w-20 rounded-md bg-gray-600"></div>
            <div className="flex-1 text-end flex flex-col justify-between items-end pr-2 overflow-hidden">
              <div className="flex flex-1 flex-col items-end text-xs">
                <p className="font-semibold">{cProduct.name}</p>
                <span>{formatCurrency(cProduct.price)}</span>
                <span>
                  Total:{' '}
                  {formatCurrency(cProduct.price * operations.get(cProduct.id))}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  className="w-6 h-6"
                  onClick={() => operations.remove(cProduct.id)}
                >
                  <MinusIcon size={14} />
                </Button>
                {operations.get(cProduct.id)}
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  className="w-6 h-6"
                  onClick={() => operations.add(cProduct, 1)}
                >
                  <PlusIcon size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}

        <p
          onClick={() => setCheckout(false)}
          className="text-primary text-center mt-6"
        >
          Adicionar mais itens
        </p>
      </div>

      <div className="sticky bottom-0">
        <span>
          Total: {formatCurrency(operations.calcTotalValue(products))}
        </span>
        <Button className="w-full" color="primary">
          FINALIZAR
        </Button>
      </div>
    </div>
  );
};

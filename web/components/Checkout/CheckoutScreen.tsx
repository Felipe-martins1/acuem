'use client';

import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/format';
import { Button } from '@nextui-org/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CheckoutDrawer } from './CheckoutDrawer';
import { useRouter } from 'next/navigation';
import { ActivePurchase } from './ActivePurchase';
import { Spinner } from '@nextui-org/react';
import { EmptyMessage } from './EmptyMessage';
import { useActivePurchase } from '@/hooks/useActivePurchase';

export const CheckoutScreen = () => {
  const router = useRouter();

  const [isFinish, setIsFinish] = useState(false);
  const { operations, checkoutProducts, storeId, isLoading } = useCart();

  const { data: activePurchase, isLoading: isLoadingActivePurchase } =
    useActivePurchase();

  const returnToStore = () => {
    router.push(`/cantina/${storeId}`);
  };

  useEffect(() => {
    if (activePurchase) operations.clear();
  }, [activePurchase]);

  if (isLoading || isLoadingActivePurchase) {
    return (
      <div className="w-full h-full grid place-content-center">
        <Spinner />
      </div>
    );
  }

  if (activePurchase) return <ActivePurchase purchase={activePurchase} />;
  if (!checkoutProducts.length) return <EmptyMessage />;

  const totalValue = operations.calcTotalValue();

  return (
    <div className="min-h-full relative flex flex-col justify-between">
      <div className="flex-1 space-y-4">
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
                  onClick={() => {
                    const restOne = operations.get(cProduct.id) === 1;
                    operations.remove(cProduct.id);
                    if (restOne) returnToStore();
                  }}
                >
                  <MinusIcon size={14} />
                </Button>
                {operations.get(cProduct.id)}
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  className="w-6 h-6"
                  isDisabled={operations.get(cProduct.id) === cProduct.quantity}
                  onClick={() => operations.add(cProduct, 1)}
                >
                  <PlusIcon size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}

        <p
          onClick={() => returnToStore()}
          className="text-primary text-center mt-6"
        >
          Adicionar mais itens
        </p>
      </div>

      <div className="sticky bottom-0 bg-slate-100">
        <span>Total: {formatCurrency(totalValue)}</span>
        <Button
          className="w-full"
          color="primary"
          onClick={() => setIsFinish(true)}
        >
          FINALIZAR
        </Button>
      </div>

      <CheckoutDrawer
        total={totalValue}
        open={isFinish}
        onOpenChange={setIsFinish}
      />
    </div>
  );
};

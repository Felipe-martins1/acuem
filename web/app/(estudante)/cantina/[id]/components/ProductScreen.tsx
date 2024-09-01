'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/types/api';
import { formatCurrency } from '@/utils/format';
import { Button } from '@nextui-org/button';
import { ArrowLeft, MinusIcon, PlusIcon, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

type Props = {
  product: Product;
  onClose: (type: 'added' | 'closed') => void;
};

export const ProductScreen = ({ product, onClose }: Props) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => setQuantity(prev => prev + 1);
  const handleRemove = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

  const { operations } = useCart();

  return (
    <div className="min-h-full relative flex flex-col justify-between">
      <Button
        className="fixed left-6 z-10 top-20"
        isIconOnly
        onClick={() => onClose('closed')}
      >
        <ArrowLeft />
      </Button>
      <div>
        <div className="p-1 bg-background rounded-lg flex gap-1 items-stretch justify-between min-h-[150px] max-h-[150px] relative"></div>
        <div className="text-xl mt-2 flex justify-between font-semibold gap-6">
          <h1 className="break-all">{product.name}</h1>
          <span>{formatCurrency(product.price)}</span>
        </div>
        <p className="mt-4 text-default-500 text-medium">
          {product.description}
        </p>
      </div>
      <div className="sticky w-full bg-white bottom-0 p-2 rounded-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            className="bg-transparent"
            size="sm"
            isDisabled={!quantity}
            onClick={() => handleRemove()}
          >
            <MinusIcon className="text-primary" />
          </Button>
          {quantity}
          <Button
            isIconOnly
            className="bg-transparent"
            size="sm"
            onClick={() => handleAdd()}
          >
            <PlusIcon className="text-primary" />
          </Button>
        </div>

        <Button
          color="primary"
          onClick={() => {
            const added = operations.add(product, quantity);
            if (added) onClose('added');
          }}
        >
          Adicionar <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

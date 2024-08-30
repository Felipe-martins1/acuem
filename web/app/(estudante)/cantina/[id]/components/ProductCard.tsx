'use client';

import { Product } from '@/types/api';
import { formatCurrency } from '@/utils/format';

type Props = {
  product: Product;
  onClick: () => void;
};

export const ProductCard = ({ product, onClick }: Props) => {
  return (
    <div
      className="p-1 bg-background rounded-lg flex gap-1 items-stretch justify-between min-h-[100px] max-h-[100px]"
      onClick={onClick}
    >
      <div className="min-h-20 min-w-24 rounded-md bg-gray-600"></div>
      <div className="flex-1 text-end flex flex-col justify-between items-end pr-2 overflow-hidden">
        <div className="flex flex-1 flex-col items-end">
          <p className="text-md font-semibold">{product.name}</p>

          <div className="-mt-1">
            <p className="text-xs text-default-500 max-h-[30px] overflow-hidden">
              {product.description}
            </p>
          </div>
        </div>
        <span>{formatCurrency(product.price)}</span>
      </div>
    </div>
  );
};

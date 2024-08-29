'use client';

import CategoryService from '@/service/category.service';
import ProductService from '@/service/product.service';
import { Input } from '@nextui-org/input';
import { useQueries } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { ProductScreen } from './ProductScreen';
import { parseAsBoolean, parseAsInteger, useQueryState } from 'nuqs';
import { CheckoutScreen } from './CheckoutScreen';
import { useCheckout } from './hooks/useCheckout';
import { useProductDetails } from './hooks/useProductDetails';

export default function Cantina() {
  const params = useParams<{
    id: string;
  }>();
  const id = parseInt(params.id);
  const [productId, setProductId] = useProductDetails();
  const [checkout, setCheckout] = useCheckout();

  const queries = useQueries({
    queries: [
      {
        queryKey: ['products', id],
        queryFn: () => ProductService.findAllByStoreId(id),
      },
      {
        queryKey: ['categories', id],
        queryFn: () => CategoryService.findAllByStoreId(id),
      },
    ],
  });

  const isLoading = queries.some(q => q.isLoading);
  const [{ data: products }, { data: categories }] = queries;

  const filterByCategory = (catId: number) => {
    return products?.filter(prod => prod.categoryId === catId);
  };

  const handleProductScreenClose = (isAdded: boolean) => {
    if (isAdded) {
      setCheckout(true);
    }

    setProductId(null);
  };

  const selectedProduct = products?.find(prod => prod.id === productId);

  if (checkout) {
    return <CheckoutScreen products={products || []} />;
  }

  if (selectedProduct) {
    return (
      <ProductScreen
        product={selectedProduct}
        onClose={type => handleProductScreenClose(type === 'added')}
      />
    );
  }

  return (
    <div>
      {categories?.map(cat => {
        return (
          <div className="space-y-2 mt-6">
            <span className="text-md font-semibold">{cat.name}</span>
            <div className="space-y-2">
              {filterByCategory(cat.id)?.map(prod => (
                <ProductCard
                  product={prod}
                  onClick={() => setProductId(prod.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

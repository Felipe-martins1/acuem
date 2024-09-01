'use client';

import CategoryService from '@/service/category.service';
import ProductService from '@/service/product.service';
import { useQueries } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ProductCard } from './components/ProductCard';
import { ProductScreen } from './components/ProductScreen';
import { useProductDetails } from './hooks/useProductDetails';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@nextui-org/react';

export default function Cantina() {
  const params = useParams<{
    id: string;
  }>();
  const router = useRouter();
  const id = parseInt(params.id);
  const [productId, setProductId] = useProductDetails();

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
      return router.push('/carrinho');
    }

    setProductId(null);
  };

  const product = products?.find(prod => prod.id === productId);

  if (product) {
    return (
      <ProductScreen
        product={product}
        onClose={type => handleProductScreenClose(type === 'added')}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-2 mt-6">
        <Skeleton className="h-5 w-1/2" />
        <div className="space-y-2">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {categories?.map(cat => {
        return (
          <div className="space-y-2 mt-6" key={cat.id}>
            <span className="text-md font-semibold">{cat.name}</span>
            <div className="space-y-2">
              {filterByCategory(cat.id)?.map(prod => (
                <ProductCard
                  key={prod.id}
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

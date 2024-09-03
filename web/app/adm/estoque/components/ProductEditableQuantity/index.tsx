import ProductService from '@/service/product.service';
import { Product } from '@/types/api';
import { Button } from '@nextui-org/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const ProductEditableQuantity = ({ product }: { product: Product }) => {
  const [freshQuantity, setFreshQuantity] = useState(product.quantity);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (isPending)
        return Promise.resolve({ ...product, quantity: freshQuantity });

      return ProductService.update(product.id, {
        ...product,
        quantity: freshQuantity < 0 ? 0 : freshQuantity,
      });
    },
    onSuccess: data => {
      setFreshQuantity(data.quantity);
      queryClient.refetchQueries({
        queryKey: ['products'],
      });
    },
  });

  useEffect(() => {
    setFreshQuantity(product.quantity);
  }, [product.quantity]);

  return (
    <div className="flex items-center gap-2" onBlur={() => mutate()}>
      <Button
        size="sm"
        isIconOnly
        variant="bordered"
        onClick={() => setFreshQuantity(prev => prev - 1)}
        isDisabled={!freshQuantity || isPending}
      >
        <MinusIcon />
      </Button>
      {freshQuantity}
      <Button
        size="sm"
        isIconOnly
        variant="bordered"
        onClick={() => setFreshQuantity(prev => prev + 1)}
        isDisabled={isPending}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};

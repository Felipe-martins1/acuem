import ProductService from '@/service/product.service';
import { Product } from '@/types/api';
import { Switch } from '@nextui-org/switch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const ProductActive = ({ product }: { product: Product }) => {
  const [active, setActive] = useState(product.active);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (isPending) return Promise.resolve({ ...product, active: active });

      return ProductService.update(product.id, {
        ...product,
        active: active,
      });
    },
    onSuccess: data => {
      setActive(data.active);
      queryClient.refetchQueries({
        queryKey: ['products'],
      });
    },
  });

  useEffect(() => {
    setActive(product.active);
  }, [product]);

  return (
    <Switch
      isSelected={active}
      isDisabled={isPending}
      onValueChange={value => {
        setActive(value);
      }}
      onBlur={() => mutate()}
    />
  );
};

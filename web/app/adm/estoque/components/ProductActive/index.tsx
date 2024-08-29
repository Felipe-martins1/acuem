import ProductService from '@/service/product.service';
import { Product } from '@/types/api';
import { Switch } from '@nextui-org/switch';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const ProductActive = ({ product }: { product: Product }) => {
  const [active, setActive] = useState(product.active);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (isPending) return Promise.resolve({ ...product, active: active });

      return ProductService.update(product.id, {
        ...product,
        active: active,
      });
    },
    onSuccess: data => setActive(data.active),
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

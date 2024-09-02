'use client';

import { Button } from '@nextui-org/button';
import Link from 'next/link';

export const EmptyMessage = () => {
  return (
    <div className="w-full h-full grid place-content-center">
      <h1 className="text-center mt-8">
        Você não possui nenhum produto no carrinho, que tal adicionar um agora?
      </h1>
      <Button className="w-full mt-4" color="primary" href="/" as={Link}>
        Conheca nossas cantinas
      </Button>
    </div>
  );
};

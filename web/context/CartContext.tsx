'use client';

import { useActivePurchase } from '@/hooks/useActivePurchase';
import { usePersistInStorage } from '@/hooks/usePersistInStorage';
import ProductService from '@/service/product.service';

import { Product, PurchaseStatus } from '@/types/api';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';

type CartContextData = {
  operations: {
    add: (product: Product, quantity: number) => boolean;
    remove: (id: number) => void;
    clear: (id?: number) => void;
    get: (id: number) => number;
    calcTotalValue: () => number;
  };
  checkoutProducts: Product[];
  size: number;
  storeId?: number;
  isLoading: boolean;
};

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [clearCartAlert, setClearCartAlert] = useState(false);
  const [storeId, setStoreId] = useState<number | undefined>();
  const [itens, setItens] = useState<Record<number, number>>({});

  const router = useRouter();
  const pathname = usePathname();

  usePersistInStorage(storeId, {
    key: 'storeId',
    setState: (store: string) => setStoreId(Number(store)),
  });

  usePersistInStorage(itens, {
    key: 'cartItens',
    setState: (itens: Record<number, number>) => setItens(itens),
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', storeId],
    queryFn: () => ProductService.findAllByStoreId(storeId!),
    enabled: !!storeId,
    retry: false,
    refetchInterval: Infinity,
  });

  const { data: activePurchase } = useActivePurchase();

  const get = useCallback(
    (id: number) => {
      return itens[id] || 0;
    },
    [itens],
  );

  const add = useCallback((product: Product, quantity: number) => {
    if (storeId && storeId !== product.storeId) {
      setClearCartAlert(true);
      return false;
    }
    if (!storeId) setStoreId(product.storeId);

    setItens(prevMap => {
      const prevQuantity = prevMap[product.id] || 0;

      return {
        ...prevMap,
        [product.id]: prevQuantity + quantity,
      };
    });

    return true;
  }, []);

  const remove = useCallback((id: number) => {
    setItens(prevMap => {
      return {
        ...prevMap,
        [id]: (prevMap[id] || 0) - 1,
      };
    });
  }, []);

  const clear = useCallback((id?: number) => {
    setStoreId(undefined);
    setClearCartAlert(false);

    setItens(prevMap => {
      if (!id) return {};
      delete prevMap[id];
      return prevMap;
    });
  }, []);

  const calcTotalValue = () => {
    return products.reduce((prevValue, product) => {
      const totalProduct = product.price * get(product.id);
      return (prevValue += totalProduct);
    }, 0);
  };

  const checkoutProducts = products.filter(product => get(product.id) > 0);
  const size = Object.keys(itens).reduce((prevValue, key) => {
    return (prevValue += itens[Number(key)]);
  }, 0);

  useEffect(() => {
    const isRejected = activePurchase?.status === PurchaseStatus.REJECTED;

    if (activePurchase && !isRejected && pathname !== '/carrinho') {
      clear();
      router.push('/carrinho');
    }
  }, [activePurchase]);

  return (
    <CartContext.Provider
      value={{
        operations: {
          add,
          remove,
          clear,
          get,
          calcTotalValue,
        },
        checkoutProducts,
        size: size,
        storeId,
        isLoading: isLoading,
      }}
    >
      <>
        <Modal isOpen={clearCartAlert} placement="center">
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="text-center">
                  Você possui produtos de outra loja no carrinho
                </ModalHeader>
                <ModalBody className="text-center">
                  Deseja limpar seu carrinho para continuar?
                </ModalBody>
                <ModalFooter className="flex">
                  <Button className="flex-1" onClick={onClose}>
                    Voltar
                  </Button>
                  <Button
                    color="primary"
                    className="flex-1"
                    onClick={() => clear()}
                  >
                    Limpar <ShoppingCart />
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {children}
      </>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

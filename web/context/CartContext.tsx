import { Product } from '@/types/api';
import React, { createContext, useState, useContext, useCallback } from 'react';

type CartProduct = {
  id: number;
  quantity: number;
  price: number;
  draft: boolean;
};

type Cart = {
  storeId: number;
  products: CartProduct[];
};

type CartContextData = {
  itens: Map<number, number>;
  operations: {
    add: (product: Product, quantity: number) => void;
    remove: (id: number) => void;
    clear: (id?: number) => void;
    get: (id: number) => number;
    calcTotalValue: (allProducts: Product[]) => number;
  };
};

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [itens, setItens] = useState(new Map());

  const get = useCallback(
    (id: number) => {
      return itens.get(id) || 0;
    },
    [itens],
  );

  const add = useCallback((product: Product, quantity: number) => {
    setItens(prevMap => {
      const newMap = new Map(prevMap);
      newMap.set(product.id, (newMap.get(product.id) || 0) + quantity);
      return newMap;
    });
  }, []);

  const remove = useCallback((id: number) => {
    setItens(prevMap => {
      const newMap = new Map(prevMap);
      newMap.set(id, (newMap.get(id) || 0) - 1);
      return newMap;
    });
  }, []);

  const clear = useCallback((id?: number) => {
    setItens(prevMap => {
      if (!id) return new Map();
      const newMap = new Map(prevMap);
      newMap.set(id, newMap.get(id) - 1);
      return newMap;
    });
  }, []);

  const calcTotalValue = (products: Product[]) => {
    return products.reduce((prevValue, product) => {
      const totalProduct = product.price * get(product.id);
      return (prevValue += totalProduct);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        itens,
        operations: {
          add,
          remove,
          clear,
          get,
          calcTotalValue,
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

import { useEffect, useRef } from 'react';

const isServer = typeof window === 'undefined';

type Options = {
  key: string;
  setState: (value: any) => void;
};

export const usePersistInStorage = (state: any, { key, setState }: Options) => {
  const isLoading = useRef(true);

  useEffect(() => {
    if (!isLoading.current) {
      if (isServer) return;
      if (!state) return localStorage.removeItem(key);
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    if (isServer) return;
    const item = localStorage.getItem(key);
    if (item) {
      setState(JSON.parse(item));
      setInterval(() => (isLoading.current = false), 500);
    }
  }, []);

  return isLoading;
};

import { TOKEN_KEY } from '@/config/storage';
import { api } from '@/lib/axios';
import AuthService from '@/service/auth.service';
import { User } from '@/types/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect } from 'react';

type ContextData = {
  authenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  user: User | undefined;
  isLoading: boolean;
};

const AuthContext = createContext({
  authenticated: false,
  login: () => Promise.resolve() as Promise<void>,
  user: {} as User | undefined,
  isLoading: true,
} as ContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => AuthService.me(),
    refetchInterval: Infinity,
    retry: false,
  });

  const { mutateAsync: doLogin, isPending } = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const data = await AuthService.login(username, password);
      localStorage.setItem(TOKEN_KEY, data.token);
    },
    onSuccess: () => refetch(),
  });

  const login = async (username: string, password: string) => {
    await doLogin({
      username,
      password,
    });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    if (data) {
      queryClient.resetQueries({
        queryKey: ['users'],
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!data,
        login,
        user: data,
        isLoading: isFetching || isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

'use client';

import AuthService, { UpdateData } from '@/service/auth.service';
import { validateUpdateUserData } from '@/utils/validateUser';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const inputClassNames = {
  inputWrapper: 'bg-white',
};

export const Profile = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => AuthService.me(),
    refetchInterval: Infinity,
    retry: false,
  });

  const [userData, setUserData] = useState<UpdateData>({
    email: data?.email || '',
    name: data?.name || '',
    phone: data?.phone || '',
  });

  const { errors, isError } = validateUpdateUserData(userData);

  const { mutate, isPending } = useMutation({
    mutationFn: () => AuthService.update(userData),
    onSuccess: () => refetch(),
  });

  const onChangeUserData = <T extends keyof UpdateData>(
    field: T,
    value: UpdateData[T],
  ) => {
    setUserData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    setUserData({
      email: data?.email || '',
      name: data?.name || '',
      phone: data?.phone || '',
    });
  }, [data]);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (isError) return;
          mutate();
        }}
        className="space-y-4"
      >
        <Input
          label="Nome"
          isInvalid={!!errors.name}
          errorMessage={errors.name}
          value={userData.name}
          onValueChange={value => onChangeUserData('name', value || '')}
          classNames={inputClassNames}
        />
        <Input
          label="Email"
          isInvalid={!!errors.email}
          errorMessage={errors.email}
          value={userData.email}
          onValueChange={value => onChangeUserData('email', value || '')}
          classNames={inputClassNames}
        />

        <Input
          label="Telefone"
          type="number"
          isInvalid={!!errors.phone}
          errorMessage={errors.phone}
          value={userData.phone}
          onValueChange={value => onChangeUserData('phone', value || '')}
          classNames={inputClassNames}
          maxLength={15}
        />

        <Button
          className="w-full"
          color="primary"
          isLoading={isPending || isFetching}
          isDisabled={isError}
          type="submit"
        >
          Salvar
        </Button>
      </form>
    </div>
  );
};

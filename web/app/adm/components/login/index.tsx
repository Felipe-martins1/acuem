'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Image from 'next/image';
import { useLoginValidation } from '@/hooks/useLoginValidation';
import { useState } from 'react';

export default function Login() {
  const [notFoundError, setNotFoundError] = useState(false);

  const { login } = useAuth();
  const {
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    validate,
  } = useLoginValidation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFoundError(false);

    if (validate()) {
      login(email, password).catch(() => setNotFoundError(true));
    }
  };

  return (
    <div className="h-screen w-screen bg-background flex">
      <div className="flex-1 relative">
        <Image
          src="/cantina-login.png"
          fill
          alt="Login"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <form
          className="max-w-md w-full flex items-center flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <Image
            src="/uem.svg"
            width={140}
            height={140}
            alt="Logo uem"
            quality={100}
          />
          <h1 className="text-4xl text-primary font-bold text-center">
            Realizar Login
          </h1>
          <Input
            label="Email"
            value={email}
            onValueChange={setEmail}
            isInvalid={!!emailError}
            errorMessage={emailError}
          />
          <Input
            type="password"
            label="Senha"
            value={password}
            onValueChange={setPassword}
            isInvalid={!!passwordError}
            errorMessage={passwordError}
          />
          {notFoundError && (
            <p className="mt-2 text-sm text-danger">
              Usuário e senha inválidos, tente novamente.
            </p>
          )}
          <Button
            className="w-full mt-4"
            color="primary"
            size="lg"
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}

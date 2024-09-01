import { useAuth } from '@/context/AuthContext';
import { useLoginValidation } from '@/hooks/useLoginValidation';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { FormEvent, useState } from 'react';

export const Login = () => {
  const [notFoundError, setNotFoundError] = useState(false);

  const { login, isLoading } = useAuth();
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    validate,
  } = useLoginValidation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate()) {
      login(email, password).catch(error => {
        setNotFoundError(true);
      });
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen p-4 flex flex-col">
      <div>
        <h1 className="text-4xl font-bold">Acesse sua conta.</h1>
        <p className="text-md text-gray-400">
          Utilize suas credenciais para acessar o site.
        </p>
      </div>

      <form
        className="flex-1 flex flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-10">
            <Input
              label="Email"
              labelPlacement="outside"
              placeholder="Email"
              size="lg"
              classNames={{
                inputWrapper: 'bg-white',
              }}
              isRequired
              isInvalid={!!emailError}
              errorMessage={emailError}
              value={email}
              onValueChange={setEmail}
              isDisabled={isLoading}
            />
            <Input
              label="Senha"
              type="password"
              labelPlacement="outside"
              placeholder="Senha"
              size="lg"
              classNames={{
                inputWrapper: 'bg-white',
              }}
              isRequired
              isInvalid={!!passwordError}
              errorMessage={passwordError}
              value={password}
              onValueChange={setPassword}
              isDisabled={isLoading}
            />
          </div>
          {notFoundError && (
            <p className="mt-2 text-sm text-danger">
              Usuário e senha inválidos, tente novamente.
            </p>
          )}
        </div>
        <Button
          size="lg"
          color="primary"
          type="submit"
          className="sticky bottom-0"
          isLoading={isLoading}
        >
          Acessar
        </Button>
      </form>
    </div>
  );
};

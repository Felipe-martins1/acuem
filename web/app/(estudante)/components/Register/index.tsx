'use client';
import UniversityCourseService from '@/service/course.service';
import UniversityService from '@/service/university.service';
import { Button } from '@nextui-org/button';
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { createContext, useContext, useState } from 'react';
import AuthService, { RegisterData } from '@/service/auth.service';
import { validateUserData } from '@/utils/validateUser';

type StepProps = {
  onNext: () => void;
  onPrev: () => void;
  universityId?: number;
  setUniversityId: (id?: number) => void;

  courseId?: number;
  setCourseId: (id?: number) => void;

  userData: RegisterData;
  onChangeUserData: (field: keyof RegisterData, value: unknown) => void;
  isPending: boolean;
};

const RegistarContext = createContext({} as StepProps);

const Step1 = () => {
  const { onNext } = useContext(RegistarContext);

  const [_, setRegister] = useQueryState('register', parseAsBoolean);

  return (
    <div className="min-h-screen relative">
      <Image
        src="/register.png"
        fill
        alt="Bg"
        className="object-cover"
        quality={100}
      />
      <div className="z-20 fixed bottom-0 p-4">
        <p
          className="mt-2 text-sm underline cursor-pointer text-white"
          onClick={() => setRegister(false)}
        >
          Já possui uma conta? Acesse
        </p>
        <h1 className="text-4xl font-bold text-white mb-4">
          Delivery na sua Universidade
        </h1>
        <Button color="primary" className="w-full" size="lg" onClick={onNext}>
          Acessar
        </Button>
      </div>
    </div>
  );
};

const Step2 = () => {
  const { onNext, universityId, setUniversityId, onPrev } =
    useContext(RegistarContext);

  const { data: universities = [], isLoading } = useQuery({
    queryKey: ['universities'],
    queryFn: () => UniversityService.findAll(),
  });

  return (
    <div className="min-h-screen relative p-4 flex flex-col justify-between">
      <div className="flex-1">
        <>
          <h1 className="text-4xl font-bold mb-4">Qual sua universidade?</h1>
          <Autocomplete
            defaultItems={universities}
            label="Universidade"
            placeholder="Procure a sua universidade"
            className="w-full"
            selectedKey={universityId?.toString()}
            onSelectionChange={key =>
              setUniversityId(key ? Number(key) : undefined)
            }
            isLoading={isLoading}
          >
            {university => (
              <AutocompleteItem key={university.id}>
                {university.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </>
      </div>
      <div className="z-20 sticky bottom-0 w-full flex gap-2">
        <Button size="lg" className="flex-1" onClick={onPrev}>
          Voltar
        </Button>

        <Button
          color="primary"
          className="flex-1"
          size="lg"
          onClick={onNext}
          isDisabled={!universityId}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

const Step3 = () => {
  const { onNext, onPrev, courseId, setCourseId } = useContext(RegistarContext);

  const { data: courses = [], isLoading: isLoadingCourses } = useQuery({
    queryKey: ['university-courses'],
    queryFn: () => UniversityCourseService.findAll(),
  });

  return (
    <div className="min-h-screen relative p-4 flex flex-col justify-between">
      <div className="flex-1">
        <>
          <h1 className="text-4xl font-bold mb-4">Qual seu curso?</h1>
          <Autocomplete
            defaultItems={courses}
            label="Universidade"
            placeholder="Procure seu curso"
            className="w-full"
            selectedKey={courseId?.toString()}
            onSelectionChange={key =>
              setCourseId(key ? Number(key) : undefined)
            }
            isLoading={isLoadingCourses}
          >
            {course => (
              <AutocompleteItem key={course.id}>{course.name}</AutocompleteItem>
            )}
          </Autocomplete>
        </>
      </div>
      <div className="z-20 sticky bottom-0 w-full flex gap-2">
        <Button size="lg" className="flex-1" onClick={onPrev}>
          Voltar
        </Button>

        <Button
          color="primary"
          className="flex-1"
          size="lg"
          onClick={onNext}
          isDisabled={!courseId}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

const Step4 = () => {
  const { onNext, onPrev, userData, onChangeUserData, isPending } =
    useContext(RegistarContext);

  const { errors, isError } = validateUserData(userData);

  return (
    <div className="min-h-screen relative p-4 flex flex-col justify-between">
      <div className="flex-1">
        <>
          <h1 className="text-4xl font-bold mb-4">
            Vamos finalizar seu cadastro.
          </h1>

          <div className="space-y-4">
            <Input
              label="Nome"
              isInvalid={!!errors.name}
              errorMessage={errors.name}
              value={userData.name}
              onValueChange={value => onChangeUserData('name', value || '')}
            />
            <Input
              label="Email"
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              value={userData.email}
              onValueChange={value => onChangeUserData('email', value || '')}
            />
            <Input
              label="Senha"
              type="password"
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              value={userData.password}
              onValueChange={value => onChangeUserData('password', value || '')}
            />
            <Input
              label="Telefone"
              type="number"
              isInvalid={!!errors.phone}
              errorMessage={errors.phone}
              value={userData.phone}
              onValueChange={value => onChangeUserData('phone', value || '')}
              maxLength={15}
            />
          </div>
        </>
      </div>
      <div className="z-20 sticky bottom-0 w-full flex gap-2">
        <Button size="lg" className="flex-1" onClick={onPrev}>
          Voltar
        </Button>

        <Button
          color="primary"
          className="flex-1"
          size="lg"
          onClick={onNext}
          isDisabled={isError}
          isLoading={isPending}
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export const Register = () => {
  const [_, setRegister] = useQueryState('register', parseAsBoolean);

  const [step, setStep] = useState(0);
  const [universityId, setUniversityId] = useState<number>();
  const [courseId, setCourseId] = useState<number>();
  const [userData, setUserData] = useState<RegisterData>({
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => AuthService.createUser(userData, courseId!),
    onSuccess: () => setRegister(false),
  });

  const steps = [Step1, Step2, Step3, Step4];

  const Active = steps[step];

  const onChangeUserData = (field: keyof RegisterData, value: unknown) => {
    setUserData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (step === steps.length - 1) {
      if (!validateUserData(userData).isError) {
        mutate();
      }
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  return (
    <RegistarContext.Provider
      value={{
        onNext: handleNext,
        onPrev: handlePrev,
        universityId,
        setUniversityId,
        courseId,
        setCourseId,
        userData,
        onChangeUserData,
        isPending,
      }}
    >
      <Active />
    </RegistarContext.Provider>
  );
};

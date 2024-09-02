import { RegisterData, UpdateData } from '@/service/auth.service';

interface ValidationErrors {
  email?: string;
  name?: string;
  password?: string;
  phone?: string;
}

const validateCommom = (userData: UpdateData) => {
  const errors: ValidationErrors = {};

  if (!userData.email) {
    errors.email = 'Email é obrigatório';
  } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = 'Formato de email inválido';
  }

  if (!userData.name) {
    errors.name = 'Nome é obrigatório';
  }

  if (!userData.phone) {
    errors.phone = 'Telefone é obrigatório';
  } else if (!/^\d{10,11}$/.test(userData.phone)) {
    errors.phone = 'Formato de telefone inválido';
  } else if (!/^\d+$/.test(userData.phone)) {
    errors.phone = 'Telefone deve conter apenas números';
  }

  return errors;
};

export const validateUserData = (userData: RegisterData) => {
  const errors: ValidationErrors = validateCommom(userData);

  if (!userData.password) {
    errors.password = 'Senha é obrigatória';
  } else if (userData.password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres';
  }

  const isError = Object.keys(errors).length > 0;

  return { errors, isError };
};

export const validateUpdateUserData = (userData: UpdateData) => {
  const errors: ValidationErrors = validateCommom(userData);

  const isError = Object.keys(errors).length > 0;

  return { errors, isError };
};

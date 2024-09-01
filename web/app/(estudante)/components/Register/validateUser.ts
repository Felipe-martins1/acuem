interface UserData {
  email: string;
  name: string;
  password: string;
  phone: string;
}

interface ValidationErrors {
  email?: string;
  name?: string;
  password?: string;
  phone?: string;
}

export const validateUserData = (userData: UserData) => {
  const errors: ValidationErrors = {};

  if (!userData.email) {
    errors.email = 'Email é obrigatório';
  } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = 'Formato de email inválido';
  }

  if (!userData.name) {
    errors.name = 'Nome é obrigatório';
  }

  if (!userData.password) {
    errors.password = 'Senha é obrigatória';
  } else if (userData.password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres';
  }

  if (!userData.phone) {
    errors.phone = 'Telefone é obrigatório';
  } else if (!/^\d{10,11}$/.test(userData.phone)) {
    errors.phone = 'Formato de telefone inválido';
  } else if (!/^\d+$/.test(userData.phone)) {
    errors.phone = 'Telefone deve conter apenas números';
  }

  const isError = Object.keys(errors).length > 0;

  return { errors, isError };
};

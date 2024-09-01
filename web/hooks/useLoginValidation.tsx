import { useState } from 'react';

export const useLoginValidation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um email válido.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('A senha não pode ser vazia.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  return {
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    validate,
  };
};

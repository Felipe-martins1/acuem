import crypto from 'crypto';

export const hashPassword = (password: string) => {
  return crypto.createHmac('sha256', password).digest('hex');
};

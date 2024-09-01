import * as argon2 from 'argon2';

const hash = async (data: string | Buffer): Promise<string> => {
  return argon2.hash(data, {
    hashLength: 10,
  });
};

const verify = (hash: string, data: string | Buffer): Promise<boolean> => {
  return argon2.verify(hash, data);
};

const generatePassword = (length: number = 12): string => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return Array(length)
    .fill(null)
    .map(() => {
      return chars[Math.floor(Math.random() * chars.length)];
    })
    .join('');
};

export default {
  hash,
  verify,
  generatePassword,
};

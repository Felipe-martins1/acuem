import { TOKEN_KEY } from '@/config/storage';
import { User } from '@/types/api';
import axios, { AxiosHeaders } from 'axios';

import { jwtDecode } from 'jwt-decode';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem(TOKEN_KEY);
    return {
      ...config,
      headers: {
        ...config.headers,
        ...(token !== null && { Authorization: `Bearer ${token}` }),
      } as AxiosHeaders,
    };
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        const decoded = jwtDecode(token) as User;
        localStorage.removeItem(TOKEN_KEY);

        if (decoded.type === 'student') {
          window.location.replace(window.location.origin);
        } else {
          window.location.replace(window.location.origin + '/adm');
        }
      }
    }
    return Promise.reject(error);
  },
);

import { User } from '@/types/api';
import { api } from '@/lib/axios';

const resource = 'users';

const AuthService = {
  me: () => api.get<User>(`${resource}/me`).then(res => res.data),
  login: (username: string, password: string) =>
    api
      .post<{
        token: string;
        user: User;
      }>(`${resource}/login`, {
        username,
        password,
      })
      .then(data => data.data),
};

export default AuthService;

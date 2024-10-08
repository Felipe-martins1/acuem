import { User } from '@/types/api';
import { api } from '@/lib/axios';

const resource = 'users';

export type RegisterData = Pick<User, 'name' | 'email' | 'password' | 'phone'>;
export type UpdateData = Pick<User, 'name' | 'email' | 'phone'>;

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
  createUser: (regData: RegisterData, universityCourseId: number) =>
    api
      .post<boolean>(`${resource}/student`, {
        ...regData,
        universityCourseId,
      })
      .then(data => data.data),
  update: (regData: UpdateData) =>
    api
      .put<boolean>(`${resource}/profile`, {
        ...regData,
        username: regData.email,
      })
      .then(data => data.data),
};

export default AuthService;

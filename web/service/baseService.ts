import { api } from '@/lib/axios';
import { AxiosRequestConfig } from 'axios';

const BaseService = <
  T extends {
    id: unknown;
  },
>(
  resource: string,
) => ({
  findAll: (config?: AxiosRequestConfig) => {
    return api.get<T[]>(resource, config).then(data => data.data || []);
  },
  create: (data: Omit<T, 'id'>) => {
    return api.post<T>(resource, data).then(data => data.data);
  },
  update: async (id: T['id'], data: Partial<T>) => {
    return api.put<T>(`${resource}/${id}`, data).then(data => data.data);
  },
  delete: (id: T['id']) => {
    return api.delete(`${resource}/${id}`).then(() => true);
  },
});

export default BaseService;

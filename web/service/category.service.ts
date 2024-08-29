import { Category } from '@/types/api';
import BaseService from './baseService';
import { api } from '@/lib/axios';

const resource = 'categories';

const base = BaseService<Category>(resource);

const CategoryService = {
  ...base,
  findAllByStoreId: (storeId: number) =>
    api.get<Category[]>(`${resource}/store/${storeId}`).then(res => res.data),
};

export default CategoryService;

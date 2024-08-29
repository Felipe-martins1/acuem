import { Product } from '@/types/api';
import BaseService from './baseService';
import { api } from '@/lib/axios';

const resource = 'products';

const base = BaseService<Product>(resource);

const ProductService = {
  ...base,
  findAll: (catId?: number) =>
    base.findAll({
      params: {
        categoryId: catId,
      },
    }),
  findAllByStoreId: (storeId: number) =>
    api.get<Product[]>(`${resource}/store/${storeId}`).then(res => res.data),
};

export default ProductService;

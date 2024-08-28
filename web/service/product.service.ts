import { Product } from '@/types/api';
import BaseService from './baseService';

const base = BaseService<Product>('products');

const ProductService = {
  ...base,
  findAll: (catId?: number) =>
    base.findAll({
      params: {
        categoryId: catId,
      },
    }),
};

export default ProductService;

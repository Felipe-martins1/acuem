import { Category } from '@/types/api';
import BaseService from './baseService';

const CategoryService = BaseService<Category>('categories');

export default CategoryService;

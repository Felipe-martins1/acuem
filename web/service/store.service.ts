import { api } from '@/lib/axios';
import BaseService from './baseService';
import { Cantina } from '@/types/api';

const resource = 'stores';

const findDashboard = (storeId: number) => {
  return api
    .get<{
      purchasesDay: any[];
      purchasesMonth: any[];
    }>(`${resource}/${storeId}/dashboard`)
    .then(value => value.data);
};

const base = BaseService<Cantina>(resource);

const StoreService = {
  ...base,
  findDashboard,
};

export default StoreService;

import { api } from '@/lib/axios';

const resource = 'stores';

const findDashboard = (storeId: number) => {
  return api
    .get<{
      purchasesDay: any[];
      purchasesMonth: any[];
    }>(`${resource}/${storeId}/dashboard`)
    .then(value => value.data);
};

const StoreService = {
  findDashboard,
};

export default StoreService;

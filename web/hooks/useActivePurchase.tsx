import PurchaseService from '@/service/purchase.service';
import { useQuery } from '@tanstack/react-query';

export const useActivePurchase = () => {
  return useQuery({
    queryKey: ['purchases'],
    queryFn: async () => {
      return PurchaseService.findActiveByStudent();
    },
    refetchInterval: query => (query.state.data?.id ? 5000 : Infinity),
  });
};

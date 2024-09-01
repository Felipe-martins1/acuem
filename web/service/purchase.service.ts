import { api } from '@/lib/axios';
import { Purchase, PurchaseProduct } from '@/types/api';

const resource = 'purchases';

type CreatePurchaseDTO = Omit<
  Purchase,
  'id' | 'products' | 'storeName' | 'status' | 'total' | 'studentName' | 'date'
> & {
  products: Omit<PurchaseProduct, 'id' | 'purchaseId' | 'productPrice'>[];
};

const create = (purchase: CreatePurchaseDTO) => {
  return api
    .post<Purchase>(`${resource}`, {
      ...purchase,
    })
    .then(data => data.data);
};

const findActiveByStudent = () => {
  return api
    .get<Purchase>(`${resource}/student/active`)
    .then(data => data.data);
};

const studentConfirmReceive = () => {
  return api
    .post<boolean>(`${resource}/student/receive`)
    .then(data => data.data);
};

const findAllByStore = () => {
  return api.get<Purchase[]>(`${resource}/store`).then(data => data.data);
};

const storeCancel = (purchaseId: number, reason: string) => {
  return api
    .post<boolean>(`${resource}/${purchaseId}/cancel`, {
      reason,
    })
    .then(data => data.data);
};

const nextStatus = (purchaseId: number, skipConfirm: boolean) => {
  return api
    .post<boolean>(`${resource}/${purchaseId}/status/next`, {
      skipConfirm,
    })
    .then(data => data.data);
};

const PurchaseService = {
  create,
  findActiveByStudent,
  studentConfirmReceive,
  findAllByStore,
  storeCancel,
  nextStatus,
};

export default PurchaseService;

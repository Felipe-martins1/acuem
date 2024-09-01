export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  active: boolean;
  storeId: number;
};

export type Cantina = {
  id: number;
  name: string;
  cnpj: string;
  universityId: number;
};

export type PurchaseProduct = {
  id: number;
  productId: number;
  purchaseId: number;
  productName: string;
  productPrice: number;
  quantity: number;
};

export enum PurchaseStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  STARTED = 'started',
  FINISHED = 'finished',
  RECEIVED = 'received',
}

export type Purchase = {
  id: number;
  date: Date;
  studentId: string;
  studentName: string;
  storeId: number;
  storeName: string;
  products: PurchaseProduct[];
  status: PurchaseStatus;
  cancelCause?: string;
  total: number;
};

export type User = {
  id: string;
  username: string;
  email: string;
  phone: string;
  name: string;
  password: string;
  type: 'student' | 'employee';
  createdAt: string;
};

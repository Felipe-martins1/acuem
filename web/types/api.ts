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

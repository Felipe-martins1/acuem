'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

export const useProductDetails = () => {
  return useQueryState('product', parseAsInteger);
};

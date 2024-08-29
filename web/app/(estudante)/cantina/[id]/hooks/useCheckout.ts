import { parseAsBoolean, parseAsInteger, useQueryState } from 'nuqs';

export const useCheckout = () => {
  return useQueryState(
    'checkout',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );
};

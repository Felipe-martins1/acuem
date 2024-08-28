import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data, _ctx: ExecutionContext) => {
    return {
      storeId: 1,
      studentId: 1,
    };
  },
);

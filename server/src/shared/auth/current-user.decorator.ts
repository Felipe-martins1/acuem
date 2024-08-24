import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { SECRET } from '../../config';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!!req.user) {
      return !!data ? req.user[data] : req.user;
    }

    const token = req.headers?.authorization
      ? (req.headers.authorization as string).split(' ')
      : null;

    if (token?.[1]) {
      const decoded: any = jwt.verify(token[1], SECRET);
      return !!data ? decoded[data] : decoded.user;
    }
  },
);

import { EntityDTO } from '@mikro-orm/core';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Employee } from 'src/modules/employee/employee.entity';
import { User } from 'src/modules/user/user.entity';

export type CurrentUser = EntityDTO<User>;
export type CurrentEmployee = EntityDTO<Employee>;

const getUserFromCtx = (
  ctx: ExecutionContext,
): CurrentUser | null | undefined => {
  const req = ctx.switchToHttp().getRequest();
  return req.user || null;
};

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const user = getUserFromCtx(ctx);
    if (!user) return null;

    return !!data ? user[data] : user;
  },
);

export const CurrentStudent = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const user = getUserFromCtx(ctx);

    if (!user) return null;

    if (user.type != 'student') {
      throw new UnauthorizedException('Usuário deve ser um estudante');
    }

    return !!data ? user[data] : user;
  },
);

export const CurrentEmployee = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const user = getUserFromCtx(ctx);

    if (!user) return null;

    if (user.type != 'employee') {
      throw new UnauthorizedException('Usuário deve ser um funcionario');
    }

    return !!data ? user[data] : user;
  },
);

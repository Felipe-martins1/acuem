import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/modules/user/user.service';
import { JWTUser } from '../types/JWTUser';
import { ConfigService } from '@nestjs/config';
import { Config } from '../types/Config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly config: ConfigService<Config>,
  ) {}

  async use(
    req: Request & { user?: { id?: string } },
    _: Response,
    next: NextFunction,
  ) {
    const authHeaders = req.headers.authorization;

    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];

      const decoded = jwt.verify(
        token,
        this.config.get('JWT_SECRET'),
      ) as JWTUser;

      const user = await this.userService.findById(decoded.id);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      req.user = user;
      req.user.id = decoded.id;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}

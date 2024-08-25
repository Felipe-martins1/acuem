import { BadRequestException, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { LoginUserDto } from './dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CrudService } from 'src/shared/service/crud.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { SECRET } from 'src/config';

@Injectable()
export class UserService extends CrudService<string, User, UserRepository> {
  constructor(repository: UserRepository, em: EntityManager) {
    super(repository, em);
  }

  async beforeCreate(entity: User): Promise<void> {
    const exists = await this.repository.count({
      $or: [{ username: entity.email }, { email: entity.email }],
    });

    if (exists > 0) {
      throw new BadRequestException({
        message: 'Input data validation failed',
        errors: { username: 'Username and email must be unique.' },
      });
    }
  }

  beforeUpdate(entity: User): Promise<void> | void {
    console.log('beforeUpdate', entity);
  }

  async findByLogin(loginUserDto: LoginUserDto): Promise<User | null> {
    const findOneOptions = {
      username: loginUserDto.email,
      password: crypto
        .createHmac('sha256', loginUserDto.password)
        .digest('hex'),
    };

    return this.repository.findOne(findOneOptions);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOneOrFail({ email });
  }

  generateJWT(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        email: user.email,
        exp: exp.getTime() / 1000,
        id: user.id,
        username: user.username,
      },
      SECRET,
    );
  }
}

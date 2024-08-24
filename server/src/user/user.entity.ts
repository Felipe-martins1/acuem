import { IsEmail } from 'class-validator';
import crypto from 'crypto';
import {
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';

import { UserRepository } from './user.repository';

@Entity({
  repository: () => UserRepository,
  discriminatorColumn: 'type',
  discriminatorMap: { student: 'Student', employee: 'Employee' },
})
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  username: string;

  @Property({ hidden: true })
  @IsEmail()
  email: string;

  @Property({ length: 15 })
  phone: string;

  @Property()
  name: string;

  @Property({ hidden: true })
  password: string;

  @Enum()
  type!: 'student' | 'employee';

  @Property()
  createdAt = new Date();

  constructor(email: string, password: string) {
    this.username = email;
    this.email = email;
    this.password = crypto.createHmac('sha256', password).digest('hex');
  }
}

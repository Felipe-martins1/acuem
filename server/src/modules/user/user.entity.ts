import { IsEmail } from 'class-validator';
import {
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';

import { UserRepository } from './user.repository';
import { hashPassword } from '../../shared/utils/password';

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
    this.password = hashPassword(password);
  }
}

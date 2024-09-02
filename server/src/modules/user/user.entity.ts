import { IsEmail } from 'class-validator';
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

  @Property()
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

  @Property({ onCreate: () => new Date(), type: Date, columnType: 'timestamp' })
  createdAt = new Date();
}

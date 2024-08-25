import { Entity, ManyToOne } from '@mikro-orm/core';
import { Store } from '../store/store.entity';
import { User } from '../user/user.entity';

@Entity({ discriminatorValue: 'employee' })
export class Employee extends User {
  @ManyToOne()
  store!: Store;
}

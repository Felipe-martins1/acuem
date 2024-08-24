import { Entity, ManyToOne } from '@mikro-orm/core';
import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';

@Entity({ discriminatorValue: 'employee' })
export class Employee extends User {
  @ManyToOne()
  store!: Store;
}

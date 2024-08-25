import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  OneToMany,
  Opt,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { PurchaseProduct } from './purchase-product.entity';
import { Student } from '../student/student.entity';
import { Store } from '../store/store.entity';
import { PurchaseRepository } from './purchase.repository';

export enum PurchaseStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  STARTED = 'started',
  FINISHED = 'finished',
  RECEIVED = 'received',
}

@Entity({
  repository: () => PurchaseRepository,
})
export class Purchase {
  [EntityRepositoryType]: PurchaseRepository;
  [OptionalProps]: 'cancelCause';

  @PrimaryKey()
  id!: number;

  @Property()
  date: Date & Opt = new Date();

  @Enum({ items: () => PurchaseStatus, default: PurchaseStatus.PENDING })
  status: PurchaseStatus;

  @Property({ nullable: true })
  finishedAt?: Date;

  @Property({ nullable: true })
  cancelCause?: string;

  @ManyToOne()
  student!: Student;

  @ManyToOne()
  store!: Store;

  @OneToMany(() => PurchaseProduct, (pp) => pp.purchase)
  products = new Collection<PurchaseProduct>(this);
}

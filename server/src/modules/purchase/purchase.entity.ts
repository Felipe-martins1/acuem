import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  OneToMany,
  OptionalProps,
  PrimaryKey,
  Property,
  Rel,
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

  @Property({
    onCreate: () => new Date(),
    type: Date,
    columnType: 'timestamp',
  })
  date: Date = new Date();

  @Enum({ items: () => PurchaseStatus, default: PurchaseStatus.PENDING })
  status: PurchaseStatus;

  @Property({
    nullable: true,
    type: Date,
    columnType: 'timestamp',
  })
  finishedAt?: Date;

  @Property({
    nullable: true,
    type: Date,
    columnType: 'timestamp',
  })
  cancelAt?: Date;

  @Property({ nullable: true })
  cancelCause?: string;

  @ManyToOne(() => Student, { ref: true })
  student!: Rel<Student>;

  @ManyToOne(() => Store, { ref: true, eager: true })
  store!: Rel<Store>;

  @OneToMany(() => PurchaseProduct, (pp) => pp.purchase)
  products = new Collection<PurchaseProduct>(this);

  @Property({ persist: false })
  get total() {
    return this.products
      .getItems()
      .reduce((prev, prod) => (prev += prod.total), 0);
  }
}

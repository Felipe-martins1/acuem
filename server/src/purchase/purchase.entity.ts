import { Entity, ManyToOne, OneToMany, PrimaryKey } from '@mikro-orm/core';
import { Student } from 'src/student/student.entity';
import { PurchaseProduct } from './purchase-product.entity';

@Entity()
export class Purchase {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  student: Student;

  @OneToMany(() => PurchaseProduct, (pp) => pp.purchase)
  products = new Set<PurchaseProduct>();
}

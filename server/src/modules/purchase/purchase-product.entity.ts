import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Purchase } from './purchase.entity';
import { Product } from '../product/product.entity';

@Entity()
export class PurchaseProduct {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Purchase)
  purchase!: Purchase;

  @ManyToOne()
  product!: Product;

  @Property()
  quantity!: number;

  @Property({ persist: false })
  get total() {
    return this.product.price * this.quantity;
  }
}

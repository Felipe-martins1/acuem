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

  @Property({
    type: 'decimal',
    onCreate: (entity: PurchaseProduct) => entity.product.price,
    hidden: true,
  })
  currentPrice!: number;

  @Property({ persist: false })
  get total() {
    return this.currentPrice * this.quantity;
  }
}

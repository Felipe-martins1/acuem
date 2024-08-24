import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Purchase } from './purchase.entity';
import { Product } from 'src/product/product.entity';

@Entity()
export class PurchaseProduct {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ fieldName: 'purchase_id' })
  purchase!: Purchase;

  @ManyToOne({ fieldName: 'product_id' })
  product!: Product;

  @Property()
  quantity!: number;

  @Property({ persist: false })
  get total() {
    return this.product.price * this.quantity;
  }
}

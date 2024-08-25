import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
  Rel,
} from '@mikro-orm/core';
import { ProductRepository } from './product.repository';
import { ProductCategory } from '../product-category/product-category.entity';
import { Store } from '../store/store.entity';

@Entity({
  repository: () => ProductRepository,
})
export class Product {
  [EntityRepositoryType]: ProductRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;

  @Property({ default: 0 })
  quantity!: number;

  @ManyToOne(() => ProductCategory, { ref: true })
  category!: Rel<ProductCategory>;

  @ManyToOne(() => Store, { ref: true })
  store!: Rel<Store>;
}

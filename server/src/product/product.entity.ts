import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ProductCategory } from 'src/product-category/product-category.entity';
import { Store } from 'src/store/store.entity';
import { ProductRepository } from './product.repository';

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

  @ManyToOne()
  category!: ProductCategory;

  @ManyToOne()
  store!: Store;
}

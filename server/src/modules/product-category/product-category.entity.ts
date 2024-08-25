import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
  Rel,
} from '@mikro-orm/core';
import { Store } from '../store/store.entity';
import { ProductCategoryRepository } from './product-category.repository';

@Entity({
  repository: () => ProductCategoryRepository,
})
export class ProductCategory {
  [EntityRepositoryType]: ProductCategoryRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @ManyToOne(() => Store, { ref: true })
  store!: Rel<Store>;

  static of(id: number): ProductCategory {
    const cat = new ProductCategory();
    cat.id = id;
    return cat;
  }
}

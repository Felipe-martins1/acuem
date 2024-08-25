import { EntityRepository } from '@mikro-orm/postgresql';
import { ProductCategory } from './product-category.entity';

export class ProductCategoryRepository extends EntityRepository<ProductCategory> {}

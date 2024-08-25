import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/service/crud.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryRepository } from './product-category.repository';

@Injectable()
export class ProductCategoryService extends CrudService<
  number,
  ProductCategory,
  ProductCategoryRepository
> {
  constructor(
    protected readonly repository: ProductCategoryRepository,
    protected readonly em: EntityManager,
  ) {
    super(repository, em);
  }

  beforeCreate(_entity: ProductCategory): Promise<void> | void {}
  beforeUpdate(_entity: ProductCategory): Promise<void> | void {}
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/service/crud.service';
import { EntityManager, rel } from '@mikro-orm/postgresql';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryRepository } from './product-category.repository';
import { Store } from '../store/store.entity';

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

  findAllByStoreId(storeId: number) {
    return this.repository.findAll({
      where: {
        store: {
          id: storeId,
        },
      },
    });
  }

  beforeCreate(entity: ProductCategory, auth: any): Promise<void> | void {
    entity.store = rel(Store, auth.storeId);
  }
  beforeUpdate(entity: ProductCategory, auth: any): Promise<void> | void {
    if (entity.store.id !== auth.storeId) throw new ForbiddenException();
  }
}

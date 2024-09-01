import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/service/crud.service';
import { Product } from './product.entity';
import { EntityManager, rel } from '@mikro-orm/postgresql';
import { ProductRepository } from './product.repository';
import { Store } from '../store/store.entity';
import { FindAllWhere } from 'src/shared/types/FindAllFilter';
import { CurrentEmployee } from 'src/shared/auth';

@Injectable()
export class ProductService extends CrudService<
  number,
  Product,
  ProductRepository
> {
  constructor(repository: ProductRepository, em: EntityManager) {
    super(repository, em);
  }

  findAllByStoreIdAndIdIn(storeId: number, ids: number[]) {
    return this.repository.findAll({
      where: {
        ...ProductService.FilterByStoreId(storeId),
        ...ProductService.FilterByIdsIn(ids),
      },
    });
  }

  beforeCreate(entity: Product, auth: CurrentEmployee): Promise<void> | void {
    entity.store = rel(Store, auth.store.id);
  }
  beforeUpdate(_entity: Product, _auth: CurrentEmployee): Promise<void> | void {
    return;
  }
  beforeDelete(_entity: Product, _auth: CurrentEmployee): Promise<void> | void {
    throw new Error('Method not implemented');
  }

  static FilterByStoreId(storeId: number): FindAllWhere<Product> {
    return {
      store: {
        id: storeId,
      },
    };
  }

  static FilterByCategory(categoryId: number): FindAllWhere<Product> {
    if (!categoryId) return {};

    return {
      category: {
        id: categoryId,
      },
    };
  }

  static FilterByIdsIn(ids: number[]): FindAllWhere<Product> {
    return {
      id: {
        $in: ids,
      },
    };
  }
}

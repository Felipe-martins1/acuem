import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/service/crud.service';
import { Product } from './product.entity';
import { EntityManager, rel } from '@mikro-orm/postgresql';
import { ProductRepository } from './product.repository';
import { Store } from '../store/store.entity';
import { FindAllWhere } from 'src/shared/types/FindAllFilter';

@Injectable()
export class ProductService extends CrudService<
  number,
  Product,
  ProductRepository
> {
  constructor(repository: ProductRepository, em: EntityManager) {
    super(repository, em);
  }

  beforeCreate(entity: Product, auth: any): Promise<void> | void {
    entity.store = rel(Store, auth.storeId);
  }
  beforeUpdate(_entity: Product, _auth: any): Promise<void> | void {
    return;
  }

  findAllByStoreIdAndIdIn(storeId: number, ids: number[]) {
    return this.repository.findAll({
      where: {
        ...ProductService.FilterByStoreId(storeId),
        ...ProductService.FilterByIdsIn(ids),
      },
    });
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
      category: {
        id: {
          $in: ids,
        },
      },
    };
  }
}

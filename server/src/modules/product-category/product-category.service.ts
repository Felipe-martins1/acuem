import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CrudService } from 'src/shared/service/crud.service';
import { EntityManager, rel } from '@mikro-orm/postgresql';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryRepository } from './product-category.repository';
import { Store } from '../store/store.entity';
import { CurrentEmployee } from 'src/shared/auth';
import { Product } from '../product/product.entity';

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

  beforeCreate(
    entity: ProductCategory,
    auth: CurrentEmployee,
  ): Promise<void> | void {
    entity.store = rel(Store, auth.store.id);
  }
  beforeUpdate(
    entity: ProductCategory,
    auth: CurrentEmployee,
  ): Promise<void> | void {
    if (entity.store.id !== auth.store.id) throw new ForbiddenException();
  }

  async beforeDelete(entity: ProductCategory): Promise<void> {
    const products = await this.em.count(Product, {
      category: {
        id: entity.id,
      },
    });

    if (products > 0) {
      throw new BadRequestException(
        'Antes de deletar a categoria, mova os produtos dela para outra categoria.',
      );
    }
  }
}

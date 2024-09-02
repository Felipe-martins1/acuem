import { BadRequestException, Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/service/crud.service';
import { Product } from './product.entity';
import { EntityManager, rel } from '@mikro-orm/postgresql';
import { ProductRepository } from './product.repository';
import { Store } from '../store/store.entity';
import { FindAllWhere } from 'src/shared/types/FindAllFilter';
import { CurrentEmployee } from 'src/shared/auth';
import { Purchase } from '../purchase/purchase.entity';

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

  async updateQuantity(
    purchase: Purchase,
    transactionalEm: EntityManager = this.em,
  ) {
    const products = await this.findAllByStoreIdAndIdIn(
      purchase.store.id,
      purchase.products.getItems().map((pp) => pp.product.id),
    );

    for (const product of products) {
      const purchaseQuantity = purchase.products.find(
        (prod) => prod.product.id === product.id,
      ).quantity;

      product.quantity -= purchaseQuantity;

      if (product.quantity < 0) {
        throw new BadRequestException(
          `Quantidade inválida para o item ${product.name}`,
        );
      }

      transactionalEm.persist(product);
    }

    await transactionalEm.flush();
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

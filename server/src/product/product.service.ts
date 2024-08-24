import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/service/crud.service';
import { Product } from './product.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService extends CrudService<
  number,
  Product,
  ProductRepository
> {
  constructor(repository: ProductRepository, em: EntityManager) {
    super(repository, em);
  }

  beforeCreate(_entity: Product): Promise<void> | void {
    return;
  }
  beforeUpdate(_entity: Product): Promise<void> | void {
    return;
  }
}

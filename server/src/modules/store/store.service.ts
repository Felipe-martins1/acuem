import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/service/crud.service';
import { Store } from './store.entity';
import { StoreRepository } from './store.repository';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class StoreService extends CrudService<number, Store> {
  constructor(
    protected readonly repository: StoreRepository,
    protected readonly em: EntityManager,
  ) {
    super(repository, em);
  }

  beforeCreate(_entity: Store): Promise<void> | void {}
  beforeUpdate(_entity: Store): Promise<void> | void {}
}

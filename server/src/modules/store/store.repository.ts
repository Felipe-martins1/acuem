import { EntityRepository } from '@mikro-orm/postgresql';
import { Store } from './store.entity';

export class StoreRepository extends EntityRepository<Store> {}

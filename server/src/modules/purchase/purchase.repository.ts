import { EntityRepository } from '@mikro-orm/postgresql';
import { Purchase } from './purchase.entity';

export class PurchaseRepository extends EntityRepository<Purchase> {}

import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
  Rel,
} from '@mikro-orm/core';
import { StoreRepository } from './store.repository';
import { University } from '../university/university.entity';

@Entity({
  repository: () => StoreRepository,
})
export class Store {
  [EntityRepositoryType]: StoreRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ length: 14 })
  cnpj!: string;

  @ManyToOne(() => University, { ref: true })
  university!: Rel<University>;

  static of(id: number): Store {
    const store = new Store();
    store.id = id;
    return store;
  }
}

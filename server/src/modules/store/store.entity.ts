import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
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

  @ManyToOne()
  university!: University;

  static of(id: number): Store {
    const store = new Store();
    store.id = id;
    return store;
  }
}

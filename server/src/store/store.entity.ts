import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Store {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ length: 14 })
  cnpj!: string;

  static of(id: number): Store {
    const store = new Store();
    store.id = id;
    return store;
  }
}

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class ProductCategory {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  static of(id: number): ProductCategory {
    const cat = new ProductCategory();
    cat.id = id;
    return cat;
  }
}

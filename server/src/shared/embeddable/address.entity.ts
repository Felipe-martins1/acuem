import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class Address {
  @Property()
  street!: string;

  @Property()
  neighborhood!: string;

  @Property()
  complement!: string;

  @Property()
  number!: string;
}

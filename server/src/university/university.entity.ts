import { Embedded, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Address } from 'src/shared/embeddable/address.entity';

@Entity()
export class University {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Embedded(() => Address)
  address!: Address;
}

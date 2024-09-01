import {
  Embedded,
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Address } from '../shared/embeddable/address';
import { UniversityRepository } from './university.repository';

@Entity({
  repository: () => UniversityRepository,
})
export class University {
  [EntityRepositoryType]: UniversityRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Embedded(() => Address)
  address: Address;
}

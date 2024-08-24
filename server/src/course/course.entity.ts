import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Course {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}

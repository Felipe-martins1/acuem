import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { IsEmail } from 'class-validator';

@Entity()
export class Atletica {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ length: 15 })
  phone: string;

  @Property()
  @IsEmail()
  email: string;
}

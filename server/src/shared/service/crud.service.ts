import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { CrudEntity } from '../interface/crud-entity.interface';
import { validate } from 'class-validator';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export abstract class CrudService<
  ID,
  T extends CrudEntity<ID>,
  CustomRepository extends EntityRepository<T> = EntityRepository<T>,
> {
  constructor(
    protected readonly repository: CustomRepository,
    protected readonly em: EntityManager,
  ) {}

  async create(entity: T): Promise<T> {
    await this.beforeCreate(entity);
    const errors = await validate(entity);

    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Input data validation failed',
        errors: errors,
      });
    } else {
      await this.em.persistAndFlush(entity);
      return entity;
    }
  }

  async update(entity: T): Promise<T> {
    await this.beforeUpdate(entity);
    await this.em.flush();
    return entity;
  }

  async delete(id: ID): Promise<void> {
    await this.repository.nativeDelete({ id } as any);
  }

  async findById(id: ID): Promise<T | undefined> {
    const entity = await this.repository.findOne(id);
    return entity || undefined;
  }

  async findByIdOrThrow(id: ID): Promise<T> {
    const entity = await this.repository.findOne(id);

    if (!entity) {
      const errors = { [this.constructor.name]: ' not found' };
      throw new NotFoundException({ errors });
    }

    return entity;
  }

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  abstract beforeCreate(entity: T): Promise<void> | void;
  abstract beforeUpdate(entity: T): Promise<void> | void;
}

import {
  EntityManager,
  EntityRepository,
  FindAllOptions,
} from '@mikro-orm/postgresql';
import { CrudEntity } from '../interface/crud-entity.interface';
import { NotFoundException } from '@nestjs/common';

export abstract class CrudService<
  ID,
  T extends CrudEntity<ID>,
  CustomRepository extends EntityRepository<T> = EntityRepository<T>,
> {
  constructor(
    protected readonly repository: CustomRepository,
    protected readonly em: EntityManager,
  ) {}

  async create(entity: T, auth: any): Promise<T> {
    await this.beforeCreate(entity, auth);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async update(entity: T, auth: any): Promise<T> {
    await this.beforeUpdate(entity, auth);
    await this.em.flush();
    return entity;
  }

  async delete(id: ID, auth: any): Promise<void> {
    const entity = await this.findByIdOrThrow(id);

    this.beforeDelete(entity, auth);

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

  async findAll(filters?: FindAllOptions<T>): Promise<T[]> {
    return this.repository.findAll(filters);
  }

  abstract beforeCreate(entity: T, auth: any): Promise<void> | void;
  abstract beforeUpdate(entity: T, auth: any): Promise<void> | void;

  beforeDelete(_entity: T, _auth: any): Promise<void> | void {
    return;
  }
}

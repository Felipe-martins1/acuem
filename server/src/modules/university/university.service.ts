import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/service/crud.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { University } from './university.entity';
import { UniversityRepository } from './university.repository';

@Injectable()
export class UniversityService extends CrudService<
  number,
  University,
  UniversityRepository
> {
  constructor(repository: UniversityRepository, em: EntityManager) {
    super(repository, em);
  }

  async beforeCreate(_entity: University): Promise<void> {}

  beforeUpdate(_entity: University): Promise<void> | void {}
}

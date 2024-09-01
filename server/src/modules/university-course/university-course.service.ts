import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/service/crud.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { UniversityCourse } from './university-course.entity';
import { UniversityCourseRepository } from './university-course.repository';

@Injectable()
export class UniversityCourseService extends CrudService<
  number,
  UniversityCourse,
  UniversityCourseRepository
> {
  constructor(repository: UniversityCourseRepository, em: EntityManager) {
    super(repository, em);
  }

  async beforeCreate(_entity: UniversityCourse): Promise<void> {}

  beforeUpdate(_entity: UniversityCourse): Promise<void> | void {}
}

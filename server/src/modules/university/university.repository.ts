import { EntityRepository } from '@mikro-orm/postgresql';
import { University } from './university.entity';

export class UniversityRepository extends EntityRepository<University> {}

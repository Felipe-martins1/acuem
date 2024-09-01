import { EntityRepository } from '@mikro-orm/postgresql';
import { UniversityCourse } from './university-course.entity';

export class UniversityCourseRepository extends EntityRepository<UniversityCourse> {}

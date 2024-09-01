import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
} from '@mikro-orm/core';
import { University } from '../university/university.entity';
import { Course } from '../course/course.entity';
import { Atletica } from '../atletica/atletica.entity';
import { UniversityCourseRepository } from './university-course.repository';

@Entity({
  repository: () => UniversityCourseRepository,
})
export class UniversityCourse {
  [EntityRepositoryType]: UniversityCourseRepository;

  @PrimaryKey()
  id!: number;

  @ManyToOne()
  university: University;

  @ManyToOne({ eager: true })
  course: Course;

  @ManyToOne({ eager: true })
  atletica: Atletica;
}

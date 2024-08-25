import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { University } from '../university/university.entity';
import { Course } from '../course/course.entity';
import { Atletica } from '../atletica/atletica.entity';

@Entity()
export class UniversityCourse {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  university: University;

  @ManyToOne()
  course: Course;

  @ManyToOne()
  atletica: Atletica;
}

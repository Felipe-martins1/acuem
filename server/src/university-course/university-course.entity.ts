import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Atletica } from 'src/atletica/atletica.entity';
import { Course } from 'src/course/course.entity';
import { University } from 'src/university/university.entity';

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

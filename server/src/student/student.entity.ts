import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { UniversityCourse } from 'src/university-course/university-course.entity';
import { User } from 'src/user/user.entity';

@Entity({ discriminatorValue: 'student' })
export class Student extends User {
  @ManyToOne()
  universityCourse!: UniversityCourse;

  @Property()
  points!: number;
}

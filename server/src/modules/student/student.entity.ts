import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from '../user/user.entity';
import { UniversityCourse } from '../university-course/university-course.entity';
@Entity({ discriminatorValue: 'student' })
export class Student extends User {
  @ManyToOne()
  universityCourse!: UniversityCourse;

  @Property({ default: 0 })
  points!: number;
}

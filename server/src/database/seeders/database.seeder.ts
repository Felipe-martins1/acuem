import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Atletica } from '../../modules/atletica/atletica.entity';
import { Course } from '../../modules/course/course.entity';
import { UniversityCourse } from '../../modules/university-course/university-course.entity';
import { University } from '../../modules/university/university.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const uem = em.create(University, {
      name: 'Universidade Estadual de Maringá(UEM)',
      address: {
        street: 'Rua XYZ',
        complement: 'Complemento',
        neighborhood: 'RRR',
        number: '123',
      },
    });

    const course = em.create(Course, {
      name: 'Informática',
    });

    const atletica = em.create(Atletica, {
      email: 'atletica@gmail.com',
      name: 'Atletica INFO UEM',
      phone: '44988888888',
    });

    em.create(UniversityCourse, {
      atletica: atletica,
      course: course,
      university: uem,
    });
  }
}

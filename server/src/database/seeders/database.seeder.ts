import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Atletica } from '../../modules/atletica/atletica.entity';
import { Course } from '../../modules/course/course.entity';
import { UniversityCourse } from '../../modules/university-course/university-course.entity';
import { University } from '../../modules/university/university.entity';
import { Store } from '../../modules/store/store.entity';
import password from '../../shared/utils/password';
import { Employee } from '../../modules/employee/employee.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const uem = em.create(University, {
      name: 'Universidade Estadual de Maringá(UEM)',
      address: {
        street: 'Rua XYZ',
        complement: 'Complemento',
        neighborhood: 'RRR',
        number: '123',
        city: 'Maringá',
        state: 'Paraná',
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

    const hashedPassword = await password.hash('12345');

    const store = em.create(Store, {
      cnpj: '37249940000129',
      name: 'Cantina UEM',
      university: uem,
      address: {
        street: 'Rua XYZ',
        complement: 'Complemento',
        neighborhood: 'RRR',
        number: '123',
        city: 'Maringá',
        state: 'Paraná',
      },
    });

    em.create(Employee, {
      email: 'employee@gmail.com',
      name: 'Employee',
      password: hashedPassword,
      phone: '44988888888',
      store: store,
      username: 'employee@gmail.com',
      type: 'employee',
    });
  }
}

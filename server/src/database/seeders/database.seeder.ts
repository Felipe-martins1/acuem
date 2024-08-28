import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Atletica } from '../../modules/atletica/atletica.entity';
import { Course } from '../../modules/course/course.entity';
import { UniversityCourse } from '../../modules/university-course/university-course.entity';
import { University } from '../../modules/university/university.entity';
import { Student } from '../../modules/student/student.entity';
import { hashPassword } from '../../shared/utils/password';
import { Store } from '../../modules/store/store.entity';
import { Product } from '../../modules/product/product.entity';
import { Purchase } from '../../modules/purchase/purchase.entity';

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

    const universityCourse = em.create(UniversityCourse, {
      atletica: atletica,
      course: course,
      university: uem,
    });

    const student = em.create(Student, {
      email: 'ra12345@uem.br',
      name: 'Felipe Martins',
      password: hashPassword('12345'),
      phone: '44988888888',
      universityCourse: universityCourse,
      username: 'ra12345@uem.br',
      type: 'student',
    });

    const store = em.create(Store, {
      cnpj: '37249940000129',
      name: 'Cantina UEM',
      university: uem,
    });

    const product = em.create(Product, {
      category: {
        name: 'Categoria 1',
        store: store,
      },
      description: 'Coxinha',
      name: 'Coxinha',
      price: 10,
      quantity: 10,
      store: store,
    });

    em.create(Purchase, {
      products: [
        {
          product: product,
          quantity: 5,
        },
      ],
      date: new Date(),
      store: store,
      student: student,
    });

    em.create(Purchase, {
      products: [
        {
          product: product,
          quantity: 5,
        },
      ],
      store: store,
      student: student,
    });

    em.create(Purchase, {
      products: [
        {
          product: product,
          quantity: 5,
        },
      ],
      store: store,
      student: student,
    });
  }
}

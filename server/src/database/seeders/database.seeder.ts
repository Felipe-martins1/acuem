import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Atletica } from '../../modules/atletica/atletica.entity';
import { Course } from '../../modules/course/course.entity';
import { UniversityCourse } from '../../modules/university-course/university-course.entity';
import { University } from '../../modules/university/university.entity';
import { Store } from '../../modules/store/store.entity';
import password from '../../shared/utils/password';
import { Employee } from '../../modules/employee/employee.entity';
import { Address } from '../../modules/shared/embeddable/address';

import inquirer from 'inquirer';

function gerarGmail(nomeCantina: string) {
  const nomeSemAcentos = nomeCantina
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const nomeMinusculo = nomeSemAcentos.toLowerCase();
  const nomeComPontos = nomeMinusculo.replace(/\s+/g, '.');
  const nomeFinal = nomeComPontos.replace(/[^a-z0-9.]/g, '');
  return `${nomeFinal}@gmail.com`;
}

const cursos = ['Informática', 'Ciência da Computação'];
const stores = [
  {
    name: 'Cantina RU',
    cnpj: '37249940000129',
    address: {
      street: 'Av Colombo',
      complement: 'Restaurante Universitário - UEM',
      number: '5790',
      neighborhood: 'Universidade Estadual de Maringá',
    },
  },
  {
    name: 'Cantina D67',
    cnpj: '37249940000130',
    address: {
      street: 'Av Colombo',
      complement: 'UEM Bloco D67',
      number: '5790',
      neighborhood: 'Vila esperança',
    },
  },
  {
    name: 'Cantina C67',
    cnpj: '37249940000131',
    address: {
      street: 'Av Colombo',
      complement: 'UEM Bloco C67',
      number: '5790',
      neighborhood: 'Vila esperança',
    },
  },
] as {
  name: string;
  cnpj: string;
  address: Pick<Address, 'street' | 'complement' | 'number' | 'neighborhood'>;
}[];

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const uem = em.create(University, {
      name: 'Universidade Estadual de Maringá(UEM)',
      address: {
        street: 'Av Colombo',
        complement: 'Universidade Estadual de Maringá',
        neighborhood: 'Zona 7',
        number: '5790',
        city: 'Maringá',
        state: 'Paraná',
      },
    });

    cursos.forEach((curso) => {
      const course = em.create(Course, {
        name: curso,
      });

      const atletica = em.create(Atletica, {
        email: 'atletica@gmail.com',
        name: `Atletica ${course.name}`,
        phone: '44988888888',
      });

      em.create(UniversityCourse, {
        atletica: atletica,
        course: course,
        university: uem,
      });
    });

    const cantinas = stores.map((store) => {
      return em.create(Store, {
        cnpj: store.cnpj,
        name: store.name,
        university: uem,
        address: {
          street: store.address.street,
          complement: store.address.complement,
          neighborhood: store.address.neighborhood,
          number: store.address.number,
          city: 'Maringá',
          state: 'Paraná',
        },
      });
    });

    const unhashedPassword = await inquirer
      .prompt([
        {
          message: `Vamos criar algumas cantinas, e para cada cantina um usuário administrador será criado, informe a senha escolhida para utilizar nesses usuários`,
          type: 'input',
          required: true,
          name: 'password',
        },
      ])
      .then((answers) => {
        return answers.password as string;
      });

    const hashedPassword = await password.hash(unhashedPassword);

    const funcionarios = cantinas.map((cantina) => {
      const email = gerarGmail(cantina.name);
      return em.create(Employee, {
        email: email,
        name: `Funcionário ${cantina.name}`,
        password: hashedPassword,
        phone: '44988888888',
        store: cantina,
        username: email,
        type: 'employee',
      });
    });

    console.log(
      'Funcionários Criados, utilize a senha + email para acessar. \n',
    );
    console.table(
      funcionarios.map((f) => ({
        email: f.email,
        cantina: f.store.name,
      })),
    );
    console.log('\n');
  }
}

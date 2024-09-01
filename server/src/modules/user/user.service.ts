import { BadRequestException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from './dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CrudService } from 'src/shared/service/crud.service';
import { EntityManager, rel } from '@mikro-orm/postgresql';
import password from '../../shared/utils/password';
import { JWTUser } from 'src/shared/types/JWTUser';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/shared/types/Config';
import { Student } from '../student/student.entity';
import { UniversityCourse } from '../university-course/university-course.entity';
import { Employee } from '../employee/employee.entity';
import { Store } from '../store/store.entity';

@Injectable()
export class UserService extends CrudService<string, User, UserRepository> {
  constructor(
    repository: UserRepository,
    em: EntityManager,
    private configService: ConfigService<Config>,
  ) {
    super(repository, em);
  }

  async beforeCreate(entity: User): Promise<void> {
    const exists = await this.repository.count({
      $or: [{ username: entity.email }, { email: entity.email }],
    });

    if (exists > 0) {
      throw new BadRequestException({
        message: 'Este email já está sendo utilizado',
        errors: { username: 'Username and email must be unique.' },
      });
    }
  }

  beforeUpdate(_entity: User): Promise<void> | void {}

  async findByLogin(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.repository.findOne({
      username: loginUserDto.username,
    });

    if (!user) return null;

    const isValid = await password.verify(user.password, loginUserDto.password);

    return isValid ? user : null;
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOneOrFail({ email });
  }

  async createStudent(
    user: Pick<User, 'name' | 'email' | 'password' | 'phone'>,
    universityCourseId: number,
  ) {
    const hashedPassword = await password.hash(user.password);

    this.em.create(Student, {
      email: user.email,
      username: user.email,
      name: user.name,
      password: hashedPassword,
      phone: user.phone,
      type: 'student',
      universityCourse: rel(UniversityCourse, universityCourseId),
    });

    await this.em.flush();
  }

  async createEmployee(
    user: Pick<User, 'name' | 'email' | 'password' | 'phone'>,
    storeId: number,
  ) {
    const hashedPassword = await password.hash(user.password);

    this.em.create(Employee, {
      email: user.email,
      username: user.email,
      name: user.name,
      password: hashedPassword,
      phone: user.phone,
      type: 'employee',
      store: rel(Store, storeId),
    });

    await this.em.flush();
  }

  generateJWT(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        email: user.email,
        exp: exp.getTime() / 1000,
        id: user.id,
        username: user.username,
        type: user.type,
      } as JWTUser,
      this.configService.get('JWT_SECRET'),
    );
  }
}

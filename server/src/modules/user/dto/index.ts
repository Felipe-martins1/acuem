import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BaseDTO } from 'src/shared/interface/base.dto';
import { User } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO implements BaseDTO<User, UserDTO> {
  id: string;
  email: string;
  username: string;
  phone: string;
  name: string;
  type: 'student' | 'employee';

  from(entity: User): UserDTO {
    const dto = new UserDTO();

    dto.id = entity.id;
    dto.email = entity.email;
    dto.username = entity.username;
    dto.phone = entity.phone;
    dto.name = entity.name;
    dto.type = entity.type;

    return this;
  }

  to(dto: UserDTO, existing?: User): User {
    if (!existing) throw new Error('User must be created before call this');
    const user = existing;
    user.email = dto.email;
    user.username = dto.username;
    user.phone = dto.phone;
    user.name = dto.name;
    return user;
  }
}

export class CreateStudentDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @IsNotEmpty()
  readonly password!: string;

  @IsNotEmpty()
  @MinLength(3)
  readonly name: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  readonly phone: string;

  @IsNotEmpty()
  @IsNumber()
  readonly universityCourseId: number;
}

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email!: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password!: string;

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  @ApiProperty()
  readonly phone: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly storeId: number;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  username!: string;

  @IsNotEmpty()
  @ApiProperty()
  password!: string;
}

export class UpdateUserDto {
  readonly email!: string;
  readonly username!: string;
}

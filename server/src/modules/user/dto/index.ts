import { IsEmail, IsNotEmpty } from 'class-validator';
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
    const user = new User() || existing;
    user.id = dto.id;
    return user;
  }
}

export class CreateUserDto {
  @IsNotEmpty()
  readonly email!: string;

  @IsNotEmpty()
  readonly password!: string;
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

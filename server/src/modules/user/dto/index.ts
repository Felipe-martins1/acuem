import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from 'src/shared/interface/base.dto';
import { User } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO implements BaseDTO<User, UserDTO> {
  id: string;
  email: string;
  username: string;

  from(entity: User): UserDTO {
    this.id = entity.id;
    this.email = entity.email;
    this.username = entity.username;

    return this;
  }

  to(dto: UserDTO, _existing?: User): User {
    const user = new User(dto.email, dto.username);
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
  @ApiProperty()
  email!: string;

  @IsNotEmpty()
  @ApiProperty()
  password!: string;
}

export class UpdateUserDto {
  readonly email!: string;
  readonly username!: string;
}

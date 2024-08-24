import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { LoginUserDto, UserDTO } from './dto';
import { UserService } from './user.service';
import { ILoginData } from './user.interface';
import { User } from './user.entity';
import { CrudController } from 'src/shared/controller/crud.controller';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController extends CrudController<string, User, UserDTO>({
  swaggerTypes: {
    dtoType: {},
    idType: String,
  },
}) {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<ILoginData> {
    const foundUser = await this.userService.findByLogin(loginUserDto);

    const errors = { message: 'User not found' };
    if (!foundUser) {
      throw new HttpException({ errors }, 401);
    }
    const token = this.userService.generateJWT(foundUser);
    return {
      token: token,
      user: foundUser,
    };
  }
}

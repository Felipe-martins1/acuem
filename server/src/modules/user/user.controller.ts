import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { LoginUserDto } from './dto';
import { UserService } from './user.service';
import { ILoginData } from './user.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/auth';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(@CurrentUser() user: CurrentUser): Promise<CurrentUser> {
    return user;
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async login(@Body() loginUserDto: LoginUserDto): Promise<ILoginData> {
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

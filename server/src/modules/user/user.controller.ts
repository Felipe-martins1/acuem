import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { CreateEmployeeDto, CreateStudentDto, LoginUserDto } from './dto';
import { UserService } from './user.service';
import { ILoginData } from './user.interface';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/auth';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
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

    if (!foundUser) {
      throw new HttpException('Usuário não encontrado, tente novamente.', 401);
    }
    const token = this.userService.generateJWT(foundUser);
    return {
      token: token,
      user: foundUser,
    };
  }

  @Post('student')
  @ApiBody({ type: CreateStudentDto })
  async createStudent(
    @Body() createStudentDTO: CreateStudentDto,
  ): Promise<boolean> {
    return this.userService
      .createStudent(createStudentDTO, createStudentDTO.universityCourseId)
      .then(() => true);
  }

  @Post('employee')
  @ApiBody({ type: CreateEmployeeDto })
  async createEmployee(
    @Body() createEmployeeDTO: CreateEmployeeDto,
  ): Promise<boolean> {
    return this.userService
      .createEmployee(createEmployeeDTO, createEmployeeDTO.storeId)
      .then(() => true);
  }
}

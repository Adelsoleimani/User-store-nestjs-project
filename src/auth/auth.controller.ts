import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('rigester')
  async rigester(@Body() rigesterDto: RegisterDto) {
    const user = await this.authService.register(
      rigesterDto.mobile,
      rigesterDto.name,
      rigesterDto.password,
    );

    return {
      statusCode: HttpStatus.CREATED,
      data: user,
      message: 'باموفقیت ایجاد شد کاربر',
    };
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const data = this.authService.login(loginDto);

    return {
      statusCode: HttpStatus.OK,
      data: await data,
      message: 'باموفقیت لاگین شدید ',
    };
  }
}

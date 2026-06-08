import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(mobile: string, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      mobile,
      name,
      password: hashedPassword,
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByMobile(loginDto.mobile);
    if (user) {
      if (!(await bcrypt.compare(loginDto.password, user.password)))
        throw new UnauthorizedException('پسورد وارد شده اشتباه است');

      const payload = {
        sub: user.id,
        mobile: user.mobile,
        name: user.name,
        role: user.role,
      };
      const token = this.jwtService.sign(payload);

      return {
        accessToken: token,
      };
    } else throw new BadRequestException('یوزری با این شماره یافت نشد');
  }
}

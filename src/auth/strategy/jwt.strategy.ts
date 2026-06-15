import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: true  توکن منقضی هم قبول میشه.
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')!,
    });
  }
  async validate(payload: {
    sub: number;
    mobile: string;
    name: string;
    role: string;
  }) {
    //  روش حرفه ای
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException(
        'کاربر وجود ندارد با این ایدی که از پیلود اومده',
      );
    }

    // پشت صحنه
    // const validatedUser = await validate(payload);
    // req.user = validatedUser;
    // این ریتورن مستقیماً تبدیل می‌شود به: ریکوست .یوزرز در کل پروژه
    return {
      id: user.id,
      name: user.name,
      mobile: user.mobile,
      role: user.role,
    };
  }
}

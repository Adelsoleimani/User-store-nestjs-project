import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')!,
    });
  }
  validate(payload: any) {
    // اینجا می‌تونی اطلاعات payload رو چک کنی
    // و یا حتی اطلاعات کاربر رو از دیتابیس بگیری و برگردونی
    // مثلا:
    // const user = await this.usersService.findOne(payload.sub);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;

    // برای شروع، همین که payload رو برگردونی کافیه
    console.log(`Validating payload: ${JSON.stringify(payload)}`); // برای دیباگ
    return { userId: payload.sub, mobile: payload.mobile, name: payload.name };
  }
}

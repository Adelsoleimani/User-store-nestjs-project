import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EnumRole } from '../enums/EnumRole';

export class CreateUserDto {
  @IsString({ message: 'موبایل باید رشته باشد' })
  @Length(11, 11, { message: 'باید شماره 11 رقم باشد' })
  @IsNotEmpty({ message: 'موبایل نباید خالی باشد' })
  @Transform(({ value }: { value: string }) => value.trim())
  mobile: string;

  @IsString({ message: 'نام باید رشته باشد' })
  @IsNotEmpty({ message: 'نام نباید خالی باشد' })
  name: string;

  @MaxLength(16, { message: 'رمز عبود حداکثر 16 باید باشد' })
  @MinLength(8, { message: 'کارکتر ها حداقل باید 8 تا باشند' })
  @IsString({ message: 'پسورد باید رشته باشد' })
  password: string;

  @IsEnum(EnumRole, { message: 'نقش کاربر باید ادمین یا یوزر باشد' })
  @IsOptional()
  role?: EnumRole;
}

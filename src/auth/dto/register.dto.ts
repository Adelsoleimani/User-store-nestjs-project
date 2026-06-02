import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'موبایل باید رشته باشد' })
  @Length(11, 11, { message: 'باید شماره 11 رقم باشد' })
  @IsNotEmpty({ message: 'موبایل نباید خالی باشد' })
  @Transform(({ value }: { value: string }) => value.trim())
  mobile: string;

  @IsString({ message: 'نام باید رشته باشد' })
  @IsNotEmpty({ message: 'نام نباید خالی باشد' })
  name: string;

  @IsString({ message: 'پسورد باید رشته باشد' })
  @MinLength(8, { message: 'کارکتر ها حداقل باید 8 تا باشند' })
  password: string;
}

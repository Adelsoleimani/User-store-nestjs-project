import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '09020891955', description: 'شماره موبایل' })
  @IsString({ message: 'موبایل باید رشته باشد' })
  @Length(11, 11, { message: 'باید شماره 11 رقم باشد' })
  @IsNotEmpty({ message: 'موبایل نباید خالی باشد' })
  @Transform(({ value }: { value: string }) => value.trim())
  mobile: string;

  @ApiProperty({ description: 'پسورد شما ' })
  @IsString({ message: 'پسورد باید رشته باشد' })
  @MinLength(8, { message: 'کارکتر ها حداقل باید 8 تا باشند' })
  password: string;
}

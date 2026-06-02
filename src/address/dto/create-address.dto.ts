import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'فیلد privince نباید خالی باشد' })
  @IsString({ message: 'فیلد استان باید string باشد' })
  province: string;

  @IsNotEmpty({ message: 'فیلد city نباید خالی باشد' })
  @IsString({ message: 'فیلد شهر باید string باشد' })
  city: string;

  @IsNotEmpty({ message: 'فیلد address نباید خالی باشد' })
  @IsString({ message: 'فیلد ادرس باید string باشد' })
  address: string;

  @IsNotEmpty({ message: 'فیلد postal_code نباید خالی باشد' })
  @IsString({ message: 'فیلد کد پستی باید string باشد' })
  postal_code: string;

  @IsNotEmpty({ message: 'فیلد reciver_user نباید خالی باشد' })
  @IsString({ message: 'فیلد شماره گیرنده باید string باشد' })
  @Length(11, 11, { message: 'شماره باید 11 رقم باشد' })
  reciver_mobile: string;

  @IsOptional()
  @IsString({ message: 'فیلد توضیحات باید string باشد' })
  description?: string;

  @IsNotEmpty({ message: 'فیلد userid نباید خالی باشد' })
  @IsNumber()
  userId: number;
}

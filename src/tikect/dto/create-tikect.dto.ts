import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTikectDto {
  @IsNotEmpty({ message: 'فیلد title نباید خالی باشد' })
  @IsString({ message: 'فیلد استان باید string باشد' })
  title: string;

  @IsNotEmpty({ message: 'فیلد subject نباید خالی باشد' })
  @IsString({ message: 'فیلد شهر باید string باشد' })
  subject: string;

  @IsNotEmpty({ message: 'فیلد description نباید خالی باشد' })
  @IsString({ message: 'فیلد توضیحات باید string باشد' })
  description?: string;

  @IsNotEmpty({ message: 'فیلد userid نباید خالی باشد' })
  @IsNumber()
  userId: number;

  @IsNumber()
  @IsOptional()
  replyToId?: number;
}

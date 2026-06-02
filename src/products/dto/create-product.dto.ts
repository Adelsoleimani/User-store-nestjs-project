import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'فیلد title نباید خالی باشد' })
  title: string;

  @IsInt()
  @IsNotEmpty({ message: 'فیلد price نباید خالی باشد' })
  price: number;
  @IsString()
  @IsNotEmpty({ message: 'فیلد title نباید خالی باشد' })
  description: string;

  @IsInt()
  @IsNotEmpty({ message: 'فیلد stock نباید خالی باشد' })
  stock: number;

  @IsOptional()
  @IsArray()
  categoryIds?: number[];
}

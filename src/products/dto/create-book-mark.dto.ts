import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookMark {
  @IsInt()
  @IsNotEmpty({ message: 'فیلد productId نباید خالی باشد' })
  productId: number;

  @IsInt()
  @IsNotEmpty({ message: 'فیلد userId نباید خالی باشد' })
  userId: number;
}

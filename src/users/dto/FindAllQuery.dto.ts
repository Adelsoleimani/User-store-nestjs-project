import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { EnumRole } from '../enums/EnumRole';
import { Type } from 'class-transformer';

export class FindAllQueryDto {
  @IsOptional()
  @IsEnum(EnumRole)
  role?: EnumRole.NormalUser;

  @IsOptional()
  @Type(() => Number) // برای تبدیل رشته به عدد
  @IsInt()
  limit?: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;
}

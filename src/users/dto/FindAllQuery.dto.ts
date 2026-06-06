import { IsEnum, IsInt } from 'class-validator';
import { EnumRole } from '../enums/EnumRole';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllQueryDto {
  @ApiPropertyOptional({ default: EnumRole.NormalUser })
  @IsEnum(EnumRole)
  role?: EnumRole.NormalUser;

  @ApiPropertyOptional({ default: 10 })
  @Type(() => Number) // برای تبدیل رشته به عدد
  @IsInt()
  limit?: number = 10;

  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number)
  @IsInt()
  page?: number = 1;
}

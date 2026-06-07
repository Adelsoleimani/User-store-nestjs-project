import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return {
      statusCode: HttpStatus.CREATED,
      data: await this.categoriesService.create(createCategoryDto),
      message: 'باموفقیت ایجاد شد کتگوری',
    };
  }

  @Get()
  async findAll() {
    return {
      statusCode: HttpStatus.FOUND,
      data: await this.categoriesService.findAll(),
      message: 'باموفقیت پیدا شد کتگوری',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.FOUND,
      data: await this.categoriesService.findOne(+id),
      message: 'کتگوری با موفقیت یافت شد',
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.categoriesService.update(+id, updateCategoryDto),
      message: 'کتگوری با موفقیت اپدیت شد',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoriesService.removeOnlyCategory(+id);
    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'کتگوری با موفقیت حذف شد',
    };
  }
}

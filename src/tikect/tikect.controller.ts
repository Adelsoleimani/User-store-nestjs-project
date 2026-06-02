import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { TikectService } from './tikect.service';
import { CreateTikectDto } from './dto/create-tikect.dto';

@Controller('tikect')
export class TikectController {
  constructor(private readonly tikectService: TikectService) {}

  @Post()
  async create(@Body() createTikectDto: CreateTikectDto) {
    return {
      statusCode: HttpStatus.CREATED,
      data: await this.tikectService.create(createTikectDto),
      message: 'با موفقیت تیکت ساخته شد ',
    };
  }

  @Get()
  async findAll() {
    return {
      statusCode: HttpStatus.FOUND,
      data: await this.tikectService.findAll(),
      message: 'با موفقیت تیکت ها یافت شدن ',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.FOUND,
      data: await this.tikectService.findOne(+id),
      message: 'با موفقیت تیکت  یافت شد ',
    };
  }
}

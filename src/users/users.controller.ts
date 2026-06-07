import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllQueryDto } from './dto/FindAllQuery.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('مدیریت کاربران')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'ایجاد کاربر جدید' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newProject = await this.usersService.create(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      data: newProject,
      message: 'باموفقیت ایجاد شد کاربر',
    };
  }

  @Get()
  async findAll(
    @Query() query: FindAllQueryDto,
    // @Query('role') role?: EnumRole,
    // @Query('limit') limit: number = 10,
    // @Query('page') page: number = 1,
  ) {
    const users = await this.usersService.findAll(
      query.role,
      query.limit,
      query.page,
    );
    return {
      statusCode: HttpStatus.OK,
      data: users,
      message: 'با موفقیت لیست کاربران گرفته شد',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      data: user,
      message: 'با موفقیت  کاربر گرفته شد',
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return {
      statusCode: HttpStatus.CREATED,
      data: await this.usersService.update(+id, updateUserDto),
      message: 'باموفقیت اپدیت شد کاربر',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'با موفقیت  کاربر دیلیت شد',
    };
  }
}

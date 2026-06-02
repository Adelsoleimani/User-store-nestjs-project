import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    const newAddress = await this.addressService.create(createAddressDto);
    return {
      statusCode: HttpStatus.CREATED,
      data: newAddress,
      message: 'باموفقیت ایجاد شد ادرس',
    };
  }

  @Get()
  async findAll() {
    return {
      statusCode: HttpStatus.FOUND,
      data: await this.addressService.findAll(),
      message: 'ادرس ها با موفقیت یافت شد',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.FOUND,
      data: await this.addressService.findOne(+id),
      message: 'ادرس با موفقیت یافت شد',
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.addressService.update(+id, updateAddressDto),
      message: 'ادرس با موفقیت اپدیت شد',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.addressService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      data: null,
      message: 'ادرس با موفقیت اپدیت شد',
    };
  }
}

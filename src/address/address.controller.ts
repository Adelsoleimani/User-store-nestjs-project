import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { ResponseInterceptor } from 'src/interceptors/responseFormat.interceptor';
@ApiBearerAuth()
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(ResponseInterceptor)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    const newAddress = await this.addressService.create(createAddressDto);
    return newAddress;
  }

  @Get()
  async findAll() {
    return await this.addressService.findAll();
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
    return await this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.addressService.remove(+id);
    return null;
  }
}

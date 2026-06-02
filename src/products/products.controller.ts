import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateBookMark } from './dto/create-book-mark.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return {
      statusCode: HttpStatus.CREATED,
      data: await this.productsService.create(createProductDto),
      message: 'باموفقیت ایجاد شد پروداکت',
    };
  }

  @Get()
  async findAll() {
    return {
      statusCode: HttpStatus.FOUND,
      data: await this.productsService.findAll(),
      message: 'باموفقیت یافت شدن پروداکت ها ',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.FOUND,
      data: await this.productsService.findOne(+id),
      message: 'باموفقیت یافت شد پروداکت',
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Post('toggle')
  async toggleBookmark(@Body() createBookMark: CreateBookMark) {
    const bookMarkData = await this.productsService.toggleBookmark(
      createBookMark.productId,
      createBookMark.userId,
    );
    return {
      statusCode: HttpStatus.FOUND,
      data: bookMarkData,
      message: 'باموفقیت مارک شد پروداکت',
    };
  }

  @Get('/userAllMarkPro/:userId')
  async findAllBookMark(@Param('userId') userId: string) {
    return {
      statusCode: HttpStatus.FOUND,
      data: await this.productsService.findAllBookMark(+userId),
      message: 'باموفقیت پیدا شد پروداکت',
    };
  }

  @Post('add-basket')
  async addItemToBasket(@Body() createBookMark: CreateBookMark) {
    const ItemToBasket = await this.productsService.addItemToBasket(
      createBookMark.productId,
      createBookMark.userId,
    );
    return {
      statusCode: HttpStatus.CREATED,
      data: ItemToBasket,
      message: 'باموفقیت افزوده شد به سبد خرید ',
    };
  }

  @Get('/userAllBasket/:userId')
  async findAllBasketUser(@Param('userId') userId: string) {
    return {
      statusCode: HttpStatus.FOUND,
      data: await this.productsService.findAllBasketUser(+userId),
      message: 'باموفقیت دریافت شد سبد خرید',
    };
  }
}

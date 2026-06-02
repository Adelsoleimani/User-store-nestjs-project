import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { title, price, description, stock, categoryIds } = createProductDto;
    const product = this.productRepository.create({
      title,
      price,
      description,
      stock,
    });

    if (categoryIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(categoryIds),
      });
      product.categories = categories;
    }

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: { categories: true },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { categories: true },
    });

    if (!product) throw new BadRequestException('محصولی با این ایدی یافت نش');

    return product;
  }
  //
  //  IMPORTANT
  //     ||
  //     ||
  //     vv
  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    const { categoryIds, ...dataUpdateDto } = updateProductDto;
    await this.productRepository.update(id, { ...dataUpdateDto });
    Object.assign(product, { ...dataUpdateDto });

    if (categoryIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(categoryIds),
      });
      product.categories = categories;
    }

    return await this.productRepository.save(product);
  }
  // =================================

  async toggleBookmark(productId: number, userId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: {
        users: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isBookmarked = product.users?.some((u) => u.id === userId);

    if (isBookmarked) {
      product.users = product.users.filter((u) => u.id !== userId);
      return await this.productRepository.save(product);
    }

    product.users = [...product.users, user];
    return await this.productRepository.save(product);
  }

  async findAllBookMark(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        products_mark: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.products_mark;
  }

  async addItemToBasket(productId: number, userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { basket_item: true },
    });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product || !user) {
      throw new BadRequestException('کاری یا محصولی با ایدی مورد نظر یافت نشد');
    }

    user?.basket_item.push(product);

    return await this.userRepository.save(user);
  }

  async findAllBasketUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        basket_item: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.basket_item;
  }
}

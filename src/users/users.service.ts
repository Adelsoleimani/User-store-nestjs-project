import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { EnumRole } from './enums/EnumRole';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneByMobile(createUserDto.mobile, true);

    if (existingUser) {
      throw new BadRequestException('این شماره موبایل قبلاً ثبت شده است');
    }
    try {
      const newProject = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newProject);
    } catch {
      throw new BadRequestException('ثبت کاربر با خطا مواجه شد');
    }
  }

  async findAll(role?: EnumRole, limit: number = 10, page: number = 1) {
    try {
      const query = this.userRepository.createQueryBuilder('user');
      if (role) {
        query.where('user.role = :role', { role });
      }
      query.skip((page - 1) * limit).take(limit);
      return await query.getMany();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch user.');
    }
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException(`user ${id} not found`);
    return user;
  }

  async findOneByMobile(mobile: string, checkExistUser: boolean = false) {
    const user = await this.userRepository.findOneBy({ mobile });
    if (!checkExistUser)
      if (!user) throw new NotFoundException(`user ${mobile} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userId = await this.findOne(id);
      if (!userId) {
        throw new Error();
      }
      await this.userRepository.update(id, updateUserDto);
      return await this.findOne(id);
    } catch {
      throw new BadRequestException('در اپدیت یوزر مشکلی ایجاد شد');
    }
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException('deleting faild');
  }
}

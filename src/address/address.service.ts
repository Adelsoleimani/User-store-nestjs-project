import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { userId, ...dataCreateAddres } = createAddressDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequestException('یوزری با این ایدی یافت نشد');
    const newAddress = this.addressRepository.create({
      ...dataCreateAddres,
      user: user,
    });
    return await this.addressRepository.save(newAddress);
  }
  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find({ relations: { user: true } });
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (address) return address;
    else throw new NotFoundException('ادرسی با این ایدی یافت نشد');
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.findOne(id);

    const { userId, ...dataAddress } = updateAddressDto;

    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) throw new BadRequestException('یوزر یافت نشد');
    await this.addressRepository.update(id, {
      ...dataAddress,
      user: user,
    });
    Object.assign(address, updateAddressDto);

    return this.addressRepository.save(address);
  }

  async remove(id: number) {
    const result = await this.addressRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException(`ادرسی با ایدی ${id}پیدا نشد`);
  }
}

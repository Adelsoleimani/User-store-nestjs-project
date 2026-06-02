import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTikectDto } from './dto/create-tikect.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tikect } from './entities/tikect.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TikectService {
  constructor(
    @InjectRepository(Tikect)
    private readonly tikectRepository: Repository<Tikect>,
    // چون از یوزر سرویس میگیرم پس اینجکتبل لازم نداره
    private readonly userService: UsersService,
  ) {}
  async create(createTikectDto: CreateTikectDto): Promise<Tikect> {
    const { userId, replyToId, ...dataTikect } = createTikectDto;
    const user = await this.userService.findOne(userId);
    let reply: null | Tikect = null;
    if (replyToId) {
      reply = await this.tikectRepository.findOne({
        where: { id: replyToId },
        relations: { replyTo: true },
      });
      if (!reply) throw new BadRequestException('ایدی ریپلای شده وجود ندارد');
      if (reply?.replyTo)
        throw new BadRequestException('شما نمیتوانید این تیکت را ریپلای کنید');
    }
    const newTikect: Tikect = this.tikectRepository.create({
      ...dataTikect,
      user,
      replyTo: reply == null ? undefined : reply,
    });
    return await this.tikectRepository.save(newTikect);
  }

  async findAll() {
    return await this.tikectRepository
      .createQueryBuilder('tikects')
      .where('tikects.replyToId IS NULL')
      .getMany();
  }

  async findOne(id: number) {
    return await this.tikectRepository.findOneOrFail({
      where: { id },
      relations: { replies: true, replyTo: true },
    });
  }
}

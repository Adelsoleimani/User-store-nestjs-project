import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IpRecord } from './entities/ip_tracker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IpTrackerService {
  private readonly MAX_REQUEST = 5;
  private readonly WINDOW_MINUTE = 1;
  private readonly BLOCK_MINUTE = 3;
  constructor(
    @InjectRepository(IpRecord)
    private readonly ipRepository: Repository<IpRecord>,
  ) {}
  async track(ip: string | undefined) {
    const nowDate: Date = new Date();

    const record = await this.ipRepository.findOne({ where: { ip } });
    if (!record) {
      const newRecord = this.ipRepository.create({
        ip,
        requestCount: 1,
        windowStart: nowDate,
        isBlocked: false,
        blockUntil: null,
      });

      await this.ipRepository.save(newRecord);
    }

    if (
      record?.isBlocked &&
      record.blockUntil &&
      nowDate.getTime() < record.blockUntil.getTime()
    ) {
      throw new UnauthorizedException('شما برای 4 دیقه بلاکید');
    }

    if (!record?.windowStart) {
      throw new Error('windowStart is not defined');
    }
    const windowEnd = new Date(
      record?.windowStart?.getTime() + this.WINDOW_MINUTE * 60 * 1000,
    );

    if (nowDate.getTime() > windowEnd.getTime()) {
      record.requestCount = 1;
      record.windowStart = nowDate;
      record.isBlocked = false;
      record.blockUntil = null;
    } else {
      if (record.requestCount >= this.MAX_REQUEST) {
        record.isBlocked = true;
        record.blockUntil = new Date(
          record?.windowStart?.getTime() + this.BLOCK_MINUTE * 60 * 1000,
        );
      } else {
        record.requestCount += 1;
      }
    }
    await this.ipRepository.save(record);
  }
}

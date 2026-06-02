import { Module } from '@nestjs/common';
import { IpTrackerService } from './ip_tracker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpRecord } from './entities/ip_tracker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IpRecord])],
  providers: [IpTrackerService],
  exports: [IpTrackerService],
})
export class IpTrackerModule {}

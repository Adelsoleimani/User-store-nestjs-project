import { Module } from '@nestjs/common';
import { TikectService } from './tikect.service';
import { TikectController } from './tikect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tikect } from './entities/tikect.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tikect]), UsersModule],
  controllers: [TikectController],
  providers: [TikectService],
})
export class TikectModule {}

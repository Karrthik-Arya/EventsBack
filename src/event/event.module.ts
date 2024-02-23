import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import { Group } from 'src/group/entities/group.entity';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([User, Event, Group])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}

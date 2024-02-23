import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { User } from 'src/user/entities/user.entity';
import { UserGroup } from 'src/user/entities/user-group.entity';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([User, UserGroup, Event, Group]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}

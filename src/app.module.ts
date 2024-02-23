import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { EventModule } from './event/event.module';
import { GroupModule } from './group/group.module';
import { CommonModule } from './common/common.module';
import { Group } from './group/entities/group.entity';
import { UserGroup } from './user/entities/user-group.entity';
import * as dotenv from 'dotenv';
import { Event } from './event/entities/event.entity';
import { AuthModule } from './auth/auth.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [User, Event, Group, UserGroup],
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      logging: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    UserModule,
    EventModule,
    GroupModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

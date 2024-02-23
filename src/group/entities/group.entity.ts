// Group.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Event } from '../../event/entities/event.entity';
import { UserGroup } from '../../user/entities/user-group.entity';
import { ScheduleItem } from 'src/types/general';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.group)
  participants: UserGroup[];

  @ManyToOne(() => User, (user) => user.hostedGroups)
  host: User;

  @Column()
  hostId: string;

  @ManyToOne(() => Event, (event) => event.groups)
  event: Event;

  @Column()
  eventId: string;

  @Column()
  title: string;

  @Column('json', { array: true })
  schedule: ScheduleItem[];

  @Column({ nullable: true })
  image: string;
}

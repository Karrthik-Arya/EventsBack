// UserGroup.entity.ts
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Group } from '../../group/entities/group.entity';

@Entity()
export class UserGroup {
  @ManyToOne(() => User, (user) => user.groups)
  user: User;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => Group, (group) => group.participants)
  group: Group;

  @PrimaryColumn()
  groupId: string;
}

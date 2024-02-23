// User.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserGroup } from './user-group.entity';
import { Event } from '../../event/entities/event.entity';
import { Group } from '../../group/entities/group.entity';
import { UserAbout } from '../../types/general';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  age: number;

  @Column()
  role: string;

  @Column()
  sessionToken: string;

  @Column()
  refreshToken: string;

  @Column()
  gender: string;

  @Column()
  image: string;

  @Column('json', { nullable: true })
  about: UserAbout;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.user)
  groups: UserGroup[];

  @OneToMany(() => Event, (event) => event.owner)
  ownedEvents: Event[];

  @OneToMany(() => Group, (group) => group.host)
  hostedGroups: Group[];
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto, UpdateGroupDto } from './dto/group.dto';
import { UserGroup } from '../user/entities/user-group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(UserGroup)
    private readonly userGroupRepository: Repository<UserGroup>,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(newGroup);
  }

  async getGroupById(id: string): Promise<Group> {
    const group = await this.groupRepository.findOneBy({ id });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async updateGroup(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    const group = await this.getGroupById(id);
    Object.assign(group, updateGroupDto);
    return this.groupRepository.save(group);
  }

  async deleteGroup(id: string): Promise<void> {
    const group = await this.getGroupById(id);
    await this.groupRepository.delete(group);
  }

  async getAllGroups(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async addMemberToGroup(groupId: string, userId: string): Promise<void> {
    const group = await this.groupRepository.findOneBy({ id: groupId });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const userGroup = new UserGroup();
    userGroup.groupId = groupId;
    userGroup.userId = userId;

    await this.userGroupRepository.save(userGroup);
  }

  async removeMemberFromGroup(groupId: string, userId: string): Promise<void> {
    const userGroup = await this.userGroupRepository.findOneBy({
      groupId,
      userId,
    });
    if (!userGroup) {
      throw new NotFoundException('User is not a member of the group');
    }

    await this.userGroupRepository.delete(userGroup);
  }
}

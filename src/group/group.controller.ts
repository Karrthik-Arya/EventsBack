import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto, UpdateGroupDto } from './dto/group.dto';
import { Group } from 'src/types/general';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    try {
      const group = await this.groupService.createGroup(createGroupDto);
      return group;
    } catch (error) {
      throw new HttpException(
        'Failed to create group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getGroup(@Param('id') id: string): Promise<Group> {
    try {
      const group = await this.groupService.getGroupById(id);
      if (!group) {
        throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
      }
      return group;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateGroup(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    try {
      const updatedGroup = await this.groupService.updateGroup(
        id,
        updateGroupDto,
      );
      return updatedGroup;
    } catch (error) {
      throw new HttpException(
        'Failed to update group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteGroup(@Param('id') id: string): Promise<void> {
    try {
      await this.groupService.deleteGroup(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllGroups(): Promise<Group[]> {
    try {
      const groups = await this.groupService.getAllGroups();
      return groups;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch groups',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':groupId/add-member/:userId')
  async addMemberToGroup(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    try {
      await this.groupService.addMemberToGroup(groupId, userId);
    } catch (error) {
      throw new HttpException(
        'Failed to add member to group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':groupId/remove-member/:userId')
  async removeMemberFromGroup(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    try {
      await this.groupService.removeMemberFromGroup(groupId, userId);
    } catch (error) {
      throw new HttpException(
        'Failed to remove member from group',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

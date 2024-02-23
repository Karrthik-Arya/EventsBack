import { Module } from '@nestjs/common';
import {
  SearchEventsDto,
  SearchGroupsDto,
  SearchUsersDto,
} from './dto/search.dto';

@Module({
  providers: [SearchEventsDto, SearchGroupsDto, SearchUsersDto], // Example providers, add as needed
  exports: [SearchEventsDto, SearchGroupsDto, SearchUsersDto], // Export DTOs to be used in other modules
})
export class CommonModule {}

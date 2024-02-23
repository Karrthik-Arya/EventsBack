import {
  IsNotEmpty,
  IsUUID,
  IsDateString,
  IsOptional,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGroupDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsUUID()
  hostId: string;

  @IsNotEmpty()
  @IsUUID()
  eventId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ScheduleItemDto)
  schedule: ScheduleItemDto[];

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateGroupDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ScheduleItemDto)
  schedule?: ScheduleItemDto[];

  @IsOptional()
  @IsString()
  image?: string;
}

export class ScheduleItemDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  time: string;

  @IsNotEmpty()
  about: string;

  @IsNotEmpty()
  venue: string;
}

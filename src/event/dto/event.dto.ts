import {
  IsNotEmpty,
  IsDateString,
  IsUUID,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsDateString()
  eventTime?: string;

  @IsNotEmpty()
  @IsUUID()
  ownerId: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateEventDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  image?: string;
}

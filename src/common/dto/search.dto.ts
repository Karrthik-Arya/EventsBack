import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class SearchEventsDto {
  @IsNotEmpty()
  @IsString()
  query: string;

  @IsOptional()
  @IsNumber()
  limit?: number;
}

export class SearchGroupsDto {
  @IsNotEmpty()
  @IsString()
  query: string;

  @IsOptional()
  @IsNumber()
  limit?: number;
}

export class SearchUsersDto {
  @IsNotEmpty()
  @IsString()
  query: string;

  @IsOptional()
  @IsNumber()
  limit?: number;
}

import { IsNotEmpty, IsEmail, IsOptional, IsString } from 'class-validator';

export class UserAboutDto {
  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  interests: string[];

  @IsNotEmpty()
  opinions: string[];

  @IsNotEmpty()
  prompts: { [key: string]: string };
}

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  about?: UserAboutDto;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  about?: UserAboutDto;
}

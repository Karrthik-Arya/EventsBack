import { IsUUID, IsNotEmpty } from 'class-validator';

export class AddMemberDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  groupId: string;
}

export class RemoveMemberDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  groupId: string;
}

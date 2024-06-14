import { ApiProperty } from '@nestjs/swagger';

export class AcceptFriendRequestDto {
  @ApiProperty()
  friendRequestId: number;
  @ApiProperty()
  requesterId: string;
  @ApiProperty()
  requestedId: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class AcceptFriendRequestDto {
  @ApiProperty()
  friendRequestId: number;
  @ApiProperty()
  requesterId: number;
  @ApiProperty()
  requestedId: number;
}

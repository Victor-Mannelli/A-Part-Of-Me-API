import { ApiProperty } from '@nestjs/swagger';

export class AnimesStatusDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  animeId: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  score: number;
  @ApiProperty()
  progress: number;
  @ApiProperty()
  rewatches: number;
  @ApiProperty()
  startDate: string;
  @ApiProperty()
  finishDate: string;
  @ApiProperty()
  favorite: boolean;
}

export class UpdateProgressDto {
  @ApiProperty()
  animeId: number;
  @ApiProperty()
  progress: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class UserAnimeStatusDto {
  @ApiProperty()
  anime_id: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  score?: number;
  @ApiProperty()
  progress?: number;
  @ApiProperty()
  rewatches?: number;
  @ApiProperty()
  start_date?: string;
  @ApiProperty()
  finish_date?: string;
  @ApiProperty()
  favorite?: boolean;
}

export class UpdateProgressDto {
  @ApiProperty()
  animeId: number;
  @ApiProperty()
  progress: number;
}

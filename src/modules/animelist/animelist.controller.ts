import {
  Controller,
  Get,
  Post,
  Body,
  Response,
  // Patch, // Param, // Delete,
} from '@nestjs/common';
import { UserAnimeStatusSchema } from './animelist.schema';
import { AnimelistService } from './animelist.service';
// import { UserAnimeStatusDto } from './animes.dto';

@Controller('animelist')
export class AnimelistController {
  constructor(private readonly animelistService: AnimelistService) {}

  @Get()
  async findOne(@Response() res: any) {
    const response = await this.animelistService.findOne(res.locals.user_id);
    res.status(200).send(response);
  }

  @Post()
  // async populateUserAnimelist(@Body() userAnimeStatus: UserAnimeStatusDto) {
  async populateUserAnimelist(@Body() userAnimeStatus: any) {
    UserAnimeStatusSchema.parse(userAnimeStatus);
    return this.animelistService.populateUserAnimelist(userAnimeStatus);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAnimelistDto: any) {
  //   return this.animelistService.update(+id, updateAnimelistDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.animelistService.remove(+id);
  // }
}

import { Controller, Get, Post, Body, Response, Patch, Param, Delete } from '@nestjs/common';
import { UserAnimeStatusSchema } from './animelist.schema';
import { AnimelistService } from './animelist.service';
import { UserAnimeStatusDto } from './animes.dto';
import { z } from 'zod';

@Controller('animelist')
export class AnimelistController {
  constructor(private readonly animelistService: AnimelistService) {}

  @Get()
  async findOne(@Response() res) {
    const response = await this.animelistService.findOne(res.locals.user_id);
    res.status(200).send(response);
  }

  @Post()
  async populateUserAnimelist(@Response() res, @Body() userAnimeStatus: UserAnimeStatusDto) {
    UserAnimeStatusSchema.parse(userAnimeStatus);

    const response = await this.animelistService.populateUserAnimelist({
      user_id: res.locals.user_id,
      ...userAnimeStatus,
    });
    res.status(200).send(response);
  }

  @Patch(':id')
  async update(@Response() res, @Param('id') id: string, @Body() { progress }: { progress: number }) {
    z.number().parse(progress);
    await this.animelistService.updateUserProgress({
      userId: +res.locals.user_id,
      animeId: +id,
      progress,
    });
    res.sendStatus(200);
  }

  @Delete(':id')
  async remove(@Response() res, @Param('id') id: string) {
    await this.animelistService.remove({
      userId: +res.locals.user_id,
      animeId: +id,
    });
    res.sendStatus(200);
  }
}

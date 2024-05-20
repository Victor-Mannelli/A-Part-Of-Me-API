import { Controller, Param, Get, Response } from '@nestjs/common';
import { AnimesService } from './animes.service';
@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Get('/:id')
  async findOne(@Response() res: any, @Param('id') id: string) {
    const response = await this.animesService.findOne({
      anime_id: +id,
      user_id: res.locals.user_id,
    });
    res.status(200).send(response);
  }
}

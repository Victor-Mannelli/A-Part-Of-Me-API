import { Controller, Get, Post, Body, Patch, Response } from '@nestjs/common';
import { AnimesStatusDto, UpdateProgressDto } from './animes.dto';
import { AnimesService } from './animes.service';
import axios from 'axios';

@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  // @Post()
  // create(@Body() createAnimeDto: CreateAnimeDto) {
  //   return this.animesService.create(createAnimeDto);
  // }
  // @Get()
  // findAll() {
  //   return this.animesService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.animesService.findOne(+id);
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto) {
  //   return this.animesService.update(+id, updateAnimeDto);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.animesService.remove(+id);
  // }

  @Post('/populate')
  async populateAnimeTable(@Body() animeId: string) {
    const variables = { id: animeId };
    const query = `
      query ($id: Int) {
        Media (id: $id) {
          id
          title {
            romaji
            english
            native
          }
          type
          format
          status
          description
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          season
          episodes
          duration
          chapters
          volumes
          source
          hashtag
          trailer {
            id
            site
            thumbnail
          }
          updatedAt
          coverImage {
            extraLarge
            large
            medium
          }
          bannerImage
          genres
          synonyms 
          averageScore
          meanScore
          popularity
          trending
          favourites
          tags {
            id
            name
            description
            category
            isAdult
          }
          characters {
            nodes {
              id
              name {
                full
              }
              image {
                large
                medium
              }
              gender
              description
              dateOfBirth {
                year
                month
                day
              }
              age
              bloodType
              isFavourite
              favourites
            }
          }
          isAdult
          nextAiringEpisode {
            id
            timeUntilAiring
            episode
          }
        }
      }
    `;
    let { data } = await axios.post(
      `${process.env.ANIME_URL}`,
      { query, variables },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    data = data.data.Media;
    return await this.animesService.populateAnimeTable(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }

  @Post('/updateStatus')
  async addToUserAnimeList(
    @Body() animeStatusDto: AnimesStatusDto,
    @Response() res: any,
  ) {
    return await this.animesService.postAnimeStatus({
      userId: res.locals.user.user_id,
      animeId: animeStatusDto.animeId,
      status: animeStatusDto.status,
      score: animeStatusDto.score,
      progress: animeStatusDto.progress,
      rewatches: animeStatusDto.rewatches,
      startDate: Math.floor(
        new Date(animeStatusDto.startDate).getTime() / 1000,
      ),
      finishDate: Math.floor(
        new Date(animeStatusDto.finishDate).getTime() / 1000,
      ),
      favorite: animeStatusDto.favorite,
    });
    // return res.status(201).send({ message: 'Anime added successfully' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }

  @Get('/anilist')
  async getUserAnimeList(@Response() res: any) {
    return await this.animesService.getUserAnimeList(res.locals.user.user_id);
  }

  @Patch('/updateProgress')
  async updateAnimeProgress(
    @Body() updateProgressDto: UpdateProgressDto,
    @Response() res: any,
  ) {
    return await this.animesService.updateAnimeProgress(
      res.locals.user.user_id,
      updateProgressDto.animeId,
      updateProgressDto.progress,
    );
  }
}

import { Controller, Get, Post, Body, Patch, Response } from '@nestjs/common';
import { AnimesStatusDto, UpdateProgressDto } from './animes.dto';
import { AnimesService } from './animes.service';
import axios from 'axios';

@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) {}

  @Get('/userlist')
  async getUserAnimeList(@Response() res: any) {
    const response = await this.animesService.getUserAnimeList(
      res.locals.user_id,
    );
    res.status(200).send(response);
  }

  @Post('/populate')
  async populateAnimeTable(@Body() animeId: string) {
    const variables = animeId;
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
    const { data }: any = await axios.post(
      `${process.env.ANIME_URL}`,
      { query, variables },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return await this.animesService.populateAnimeTable(data.data.Media);
  }

  @Post('/updateStatus')
  async addToUserAnimeList(
    @Body() animeStatusDto: AnimesStatusDto,
    @Response() res: any,
  ) {
    const response = await this.animesService.postAnimeStatus({
      userId: res.locals.user_id,
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
    res.status(200).send(response);
  }

  @Patch('/updateProgress')
  async updateAnimeProgress(
    @Body() updateProgressDto: UpdateProgressDto,
    @Response() res: any,
  ) {
    const response = await this.animesService.updateAnimeProgress(
      res.locals.user.user_id,
      updateProgressDto.animeId,
      updateProgressDto.progress,
    );
    res.status(200).send(response);
  }
}

import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AnimesService } from './animes.service';
import axios from 'axios';
import { z } from 'zod';
@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) { }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.animesService.findOne(id);
  }

  @Post('/populate')
  async populateAnimeTable(@Body() id: number) {
    z.object({ id: z.number() }).parse(id);
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
    try {
      const { data } = await axios({
        url: `${process.env.ANIME_URL}`,
        method: "post",
        data: {
          query,
          variables: id
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return await this.animesService.populateAnimeTable(data.data.Media);
    } catch (error) {
      console.log(error)
      return "Error on finding anime"
    }
  }
}
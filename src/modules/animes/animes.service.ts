import { AnimelistService } from '../animelist/animelist.service';
import { AnimesRepository } from './animes.repository';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AnimesService {
  constructor(
    readonly animesRepository: AnimesRepository,
    readonly animelistService: AnimelistService,
  ) {}

  async findOne({ anime_id, user_id }: { anime_id: number; user_id: number }) {
    const animeExist = await this.animesRepository.findOne({ anime_id });
    if (!animeExist) {
      await this.populateAnimeTable(anime_id);
    }
    const userAnimelist = await this.animelistService.findOne(user_id);
    if (userAnimelist.find((e) => e.anime_id === anime_id)) {
      const animeData: any = await this.animesRepository.findOne({
        anime_id,
        user_id,
      });
      animeData.UserAnimeList = animeData.UserAnimeList[0];
      return animeData;
    }
    return await this.animesRepository.findOne({ anime_id });
  }

  async populateAnimeTable(id: number) {
    const response = await this.animesRepository.findOne({
      anime_id: id,
    });
    if (response) return;
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
        method: 'post',
        data: {
          query,
          variables: { id },
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return await this.animesRepository.populateAnimeTable(data.data.Media);
    } catch (error) {
      console.log(error);
      return 'Error on finding anime';
    }
  }
}

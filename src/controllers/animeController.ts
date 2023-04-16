import { Request, Response } from 'express';
import { getUserAnimeListService, populateAnimeTableService, postAnimeStatusService } from '../services';
import axios from 'axios';

export async function populateAnimeTable(req: Request, res: Response) {
  try {
    const variables = { id: req.body.animeId };
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
    let { data } = await axios.post(`${process.env.ANIME_URL}`, { query, variables }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    data = data.data.Media;
    const response = await populateAnimeTableService(data);
    return res.status(201).send(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || 500).send({ message: error.message });
  }
}


export async function addToUserAnimeList(req: Request, res: Response) {
  try {
    await postAnimeStatusService({
      userId: res.locals.user.user_id,
      animeId: req.body.animeId,
      status: req.body.status,
      score: req.body.score,
      progress: req.body.progress,
      rewatches: req.body.rewatches,
      startDate: Math.floor(new Date(req.body.startDate).getTime() / 1000),
      finishDate: Math.floor(new Date(req.body.finishDate).getTime() / 1000),
      favorite: req.body.favorite
    });
    return res.status(201).send({ message: 'Anime added successfully' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || 500).send({ message: error.message });
  }
}

export async function getUserAnimeList(_req: Request, res: Response) {
  try {
    const response = await getUserAnimeListService(res.locals.user.user_id);
    return res.status(200).send(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status || 500).send({ message: error.message });
  }
}
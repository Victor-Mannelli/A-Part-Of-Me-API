import { Router } from 'express';
import { JoiValidation, validateAuth } from '../middlewares';
import { addToUserAnimeList, getUserAnimeList, populateAnimeTable } from '../controllers';
import { animeIdSchema, userAnimeListSchema } from '../utils/schemas';

const animeRouter = Router();

animeRouter
  .use(validateAuth)
  .post('/userlist', JoiValidation(userAnimeListSchema, 'body'), addToUserAnimeList)
  .get('/userlist', getUserAnimeList)
  .post('/populate', JoiValidation(animeIdSchema, 'body'), populateAnimeTable);

export { animeRouter };

import { Router } from 'express';
import { JoiValidation, validateAuth } from '../middlewares';
import { addToUserAnimeList, getUserAnimeList, populateAnimeTable, updateAnimeProgress } from '../controllers';
import { animeIdSchema, updateProgressSchema, userAnimeListSchema } from '../utils/schemas';

const animeRouter = Router();

animeRouter
  .use(validateAuth)
  .post('/userlist', JoiValidation(userAnimeListSchema, 'body'), addToUserAnimeList)
  .get('/userlist', getUserAnimeList)
  .put('/userlist', JoiValidation(updateProgressSchema, 'body'), updateAnimeProgress)
  .post('/populate', JoiValidation(animeIdSchema, 'body'), populateAnimeTable);

export { animeRouter };

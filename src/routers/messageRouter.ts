import { Router } from 'express';
import { JoiValidation, validateAuth } from '../middlewares';
import { getMessagesController, postMessageController } from '../controllers';
import { messageReceiverSchema, messageAuthorSchema, messageSchema } from '../utils/schemas';

const messageRouter = Router();

messageRouter
  .use(validateAuth)
  .get('/:authorId', JoiValidation(messageAuthorSchema, 'params'), getMessagesController)
  .post('/:receiverId', JoiValidation(messageReceiverSchema, 'params'), JoiValidation(messageSchema, 'body'), postMessageController);

export { messageRouter };

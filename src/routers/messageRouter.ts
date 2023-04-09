import { Router } from 'express';
import { JoiValidationBody, JoiValidationParams, validateAuth } from '../middlewares';
import { getMessagesController, postMessageController } from '../controllers';
import { messageReceiverSchema, messageAuthorSchema, messageSchema } from '../utils/schemas';

const messageRouter = Router();

messageRouter
  .all('/*', validateAuth)
  .get('/messages', getMessagesController, JoiValidationParams(messageAuthorSchema))
  .post('/messages/:receiverId', JoiValidationParams(messageReceiverSchema), JoiValidationBody(messageSchema), postMessageController);

export { messageRouter };

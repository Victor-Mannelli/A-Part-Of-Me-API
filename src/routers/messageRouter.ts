import { Router } from 'express';
import { JoiValidation, validateAuth } from '../middlewares';
import { getMessagesController, postMessageController } from '../controllers';
import { messageReceiverSchema, messageAuthorSchema, messageSchema } from '../utils/schemas';

const messageRouter = Router();

messageRouter
  .get('/messages', 
    validateAuth, 
    JoiValidation(messageAuthorSchema, 'params'), 
    getMessagesController
  )
  .post('/messages',
    validateAuth,
    JoiValidation(messageReceiverSchema, 'params'),
    JoiValidation(messageSchema, 'body'),
    postMessageController
  );

export { messageRouter };

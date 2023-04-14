import { Request, Response } from 'express';
import { getMessagesService, postMessageService } from '../services';
import httpStatus from 'http-status';

export async function getMessagesController(req: Request, res: Response) {
  try {
    const messages = await getMessagesService({
      authorId: Number(req.params.authorId),
      receiverId: res.locals.user.user_id
    });
    return res.status(httpStatus.OK).send(messages);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status).send({message: error.message});
  }
}

export async function postMessageController(req: Request, res: Response) {
  try {
    const response = await postMessageService({
      authorId: res.locals.user.user_id,
      receiverId: Number(req.params.receiverId),
      message: req.body.message
    });
    return res.status(httpStatus.CREATED).send(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(error.status).send({ message: error.message });
  }
}

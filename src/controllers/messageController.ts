import { Request, Response } from 'express';
import { getMessagesService, postMessageService } from '../services';
import httpStatus from 'http-status';

export async function getMessagesController(req: Request, res: Response) {
  const messages = await getMessagesService({ 
    authorId: Number(req.params.authorId),
    receiverId: res.locals.user.user_id
  });
  return res.status(httpStatus.OK).send(messages);
}

export async function postMessageController(req: Request, res: Response) {
  await postMessageService({ 
    authorId: res.locals.user.user_id, 
    receiverId: Number(req.params.receiverId), 
    message: req.body.message
  });
  return res.sendStatus(httpStatus.CREATED);
  // console.log(res.locals.user_id);
  // return res.status(httpStatus.CREATED).send({
  //   authorId: res.locals.user.user_id, 
  //   receiverId: Number(req.params.receiverId), 
  //   message: req.body.message
  // });
}

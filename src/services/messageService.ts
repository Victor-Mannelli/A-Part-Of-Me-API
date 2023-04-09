import httpStatus from 'http-status';
import { CustomError } from '../middlewares';
import { findUserById, getMessages, postMessages } from '../repositories';

export async function getMessagesService({
  authorId,
  receiverId } : {
    authorId: number,
    receiverId: number,
  }) {
  const validReceiver = await findUserById(authorId);
  if (!validReceiver) throw new CustomError({
    status: httpStatus.NOT_FOUND,
    message: 'Message author not found'
  });

  return await getMessages({ authorId, receiverId });
}

export async function postMessageService({
  authorId,
  receiverId,
  message } : {
    authorId: number,
    receiverId: number,
    message: string
  }) {
  const validReceiver = await findUserById(receiverId);
  if (!validReceiver) throw new CustomError({
    status: httpStatus.NOT_FOUND,
    message: 'Message receiver not found'
  });

  await postMessages({ authorId, receiverId, message });
}

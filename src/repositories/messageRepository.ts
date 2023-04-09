import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMessages({
  authorId, 
  receiverId } : {
    authorId: number,
    receiverId: number,
  }) {
  return await prisma.message.findMany({
    where: {
      author_id: authorId,
      receiver_id: receiverId
    }
  });
}
export async function postMessages({
  authorId, 
  receiverId, 
  message } : {
    authorId: number,
    receiverId: number,
    message: string
  }) {
  await prisma.message.create({
    data: {
      author_id: authorId,
      receiver_id: receiverId,
      message
    }
  });
}

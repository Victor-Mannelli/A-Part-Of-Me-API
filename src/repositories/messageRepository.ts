import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMessages({
  authorId,
  receiverId
}: {
  authorId: number,
  receiverId: number,
}) {
  return await prisma.message.findMany({
    where: {
      OR: [
        {author_id: authorId},
        {author_id: receiverId},
      ]
    },
    orderBy: {
      created_at: 'asc'
    },
    include: {
      author: {
        select: {
          username: true,
        }
      },
      receiver: {
        select: {
          username: true,
        }
      }
    }
  });
}
export async function postMessages({
  authorId,
  receiverId,
  message
}: {
  authorId: number,
  receiverId: number,
  message: string
}) {
  return await prisma.message.create({
    data: {
      author_id: authorId,
      receiver_id: receiverId,
      message
    },
  });
}

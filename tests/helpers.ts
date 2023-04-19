import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cleanDb() {
  await prisma.user.deleteMany({});
}

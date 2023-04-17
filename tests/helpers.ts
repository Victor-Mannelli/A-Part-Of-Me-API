import { prisma } from 'config/database';

export async function cleanDb() {
  await prisma.user.deleteMany({});
}

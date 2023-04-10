import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: 'user1@example.com',
      username: 'user1',
      password: 'password1',
    },
    {
      email: 'user2@example.com',
      username: 'user2',
      password: 'password2',
    },
    {
      email: 'user3@example.com',
      username: 'user3',
      password: 'password3',
    }, 
    {
      email: 'user4@example.com',
      username: 'user4',
      password: 'password4',
    },
    {
      email: 'user5@example.com',
      username: 'user5',
      password: 'password5',
    }, 
    {
      email: 'user6@example.com',
      username: 'user6',
      password: 'password6',
    },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
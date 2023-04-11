import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // const users = [
  //   {
  //     email: 'user1@example.com',
  //     username: 'user1',
  //     password: 'password1',
  //   },
  //   {
  //     email: 'user2@example.com',
  //     username: 'user2',
  //     password: 'password2',
  //   },
  //   {
  //     email: 'user3@example.com',
  //     username: 'user3',
  //     password: 'password3',
  //   },
  //   {
  //     email: 'user4@example.com',
  //     username: 'user4',
  //     password: 'password4',
  //   },
  //   {
  //     email: 'user5@example.com',
  //     username: 'user5',
  //     password: 'password5',
  //   },
  //   {
  //     email: 'user6@example.com',
  //     username: 'user6',
  //     password: 'password6',
  //   },
  // ];
  const messages = [
    {
      message: 'teste1',
      author_id: 2,
      receiver_id: 1
    },
    {
      message: 'teste2',
      author_id: 2,
      receiver_id: 1
    },
    {
      message: 'teste3',
      author_id: 2,
      receiver_id: 1
    },
    {
      message: 'teste4',
      author_id: 2,
      receiver_id: 1
    },
    {
      message: 'teste5',
      author_id: 2,
      receiver_id: 1
    },
    {
      message: 'teste6',
      author_id: 2,
      receiver_id: 1
    },
  ];
  // for (const user of users) {
  //   await prisma.user.create({ data: user });
  // }
  for (const message of messages) {
    await prisma.message.create({ data: message });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
import { PrismaClient } from '@prisma/client';

async function userRegistration(prisma: PrismaClient): Promise<void> {
  const users = [
    {
      id: '6051a5fe4a3d7e126c9d24b0',
      name: 'luiza magalhães',
      email: 'luiza@gmail.com',
      password: '$2a$08$cIXVbvjDYvNnO27kLq74IOXn6u8eeMqcjhSMkKvk71U7b7kX.k3Wy',
      username: '@Luiza123',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/profiles/1600w-WAhofEY5L1U.jpg',
      termsOfUse: true,
      UserGenres: [
        '65f31ea8c60b72e59511c8d1',
        '65f31ea8c60b72e59511c8d2',
        '65f31ea8c60b72e59511c8d3',
      ],
      UserAuthor: [
        '6051a5fe4a3d7e126c9d24b1',
        '6051a5fe4a3d7e126c9d24b2',
        '6051a5fe4a3d7e126c9d24b3',
      ],
      checkOnBoarding: true,
      UserBook: [
        '6051a5fe4a3d7e126c9d24b1',
        '6051a5fe4a3d7e126c9d24b2',
        '6051a5fe4a3d7e126c9d24b3',
      ],
    },
    {
      id: '6051a5fe4a3d7e126c9d24b4',
      name: 'rafael nonato',
      email: 'rafael@gmail.com',
      password: '$2a$08$pMeMF8hIts43lJXaA31Vc.USlyU.nY6MKo01QAKa10hXWqwKJMXwO',
      username: '@Rafael123',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/profiles/social-media-profile-photos-3.jpg',
      termsOfUse: true,
      UserGenres: [
        '65f31ea8c60b72e59511c8d4',
        '65f31ea8c60b72e59511c8d5',
        '65f31ea8c60b72e59511c8d3',
      ],
      UserAuthor: [
        '6051a5fe4a3d7e126c9d24b4',
        '6051a5fe4a3d7e126c9d24b5',
        '6051a5fe4a3d7e126c9d24b3',
      ],
      UserBook: [
        '6051a5fe4a3d7e126c9d24b3',
        '6051a5fe4a3d7e126c9d24b4',
        '6051a5fe4a3d7e126c9d24b5',
      ],
    },
  ];
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        ...user,
        UserGenres: {
          create: (user.UserGenres as string[]).map(genderId => ({ genderId })),
        },
        UserAuthor: {
          create: (user.UserAuthor as string[]).map(id => ({ authorId: id })),
        },
        UserBook: {
          create: (user.UserBook as string[]).map(id => ({ bookId: id })),
        },
      },
    });
  }
}

export default userRegistration;

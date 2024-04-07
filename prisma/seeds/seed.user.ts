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
      checkOnBoarding: false,
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
    {
      id: '6051a5fe4a3d7e126c9d24b6',
      name: 'Lucas Costa',
      email: 'lucas@gmail.com',
      password: '$2a$08$CvSaefi/JIpUlhsIdbBbtePc1iWSpkVcccQ1UJwUK0b9Y6cBEmFNm',
      username: '@Lucas123',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/profiles/white-man-with-beard.jpeg',
      checkOnBoarding: true,
      termsOfUse: true,
      UserGenres: [
        '65f31ea8c60b72e59511c8d3',
        '65f31ea8c60b72e59511c8d4',
        '65f31ea8c60b72e59511c8d5',
      ],
      UserAuthor: [
        '6051a5fe4a3d7e126c9d24b1',
        '6051a5fe4a3d7e126c9d24b2',
        '6051a5fe4a3d7e126c9d24b3',
      ],
      UserBook: [
        '6051a5fe4a3d7e126c9d24b1',
        '6051a5fe4a3d7e126c9d24b2',
        '6051a5fe4a3d7e126c9d24b3',
      ],
    },
    {
      id: '6051a5fe4a3d7e126c9d24b7',
      name: 'Patricia Souza',
      email: 'patricia@gmail.com',
      password: '$2a$08$TCVsJjdu0V7pTPHxiN5Zteal5FxhO56tfKQXl6ksffGR2Vd8KNcBa',
      username: '@Patricia123',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/profiles/close-portrait-beautiful-young-woman.jpg',
      checkOnBoarding: true,
      termsOfUse: true,
      UserGenres: [
        '65f31ea8c60b72e59511c8d5',
        '65f31ea8c60b72e59511c8d6',
        '65f31ea9c60b72e59511c8d7',
      ],
      UserAuthor: [
        '6051a5fe4a3d7e126c9d24b3',
        '6051a5fe4a3d7e126c9d24b4',
        '6051a5fe4a3d7e126c9d24b5',
      ],
      UserBook: [
        '6051a5fe4a3d7e126c9d24b4',
        '6051a5fe4a3d7e126c9d24b5',
        '6051a5fe4a3d7e126c9d24b6',
      ],
    },
    {
      id: '6051a5fe4a3d7e126c9d24b8',
      name: 'Otavio Ribeiro',
      email: 'otavio@gmail.com',
      password: '$2a$08$GaRgAXGn58Ujv2b/QaNRbei0UzBZ2Z/98W9w0IKxvRIQuIylaMkN6',
      username: '@Otavio123',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/profiles/black-man.jpeg',
      checkOnBoarding: true,
      termsOfUse: true,
      UserGenres: [
        '65f31ea9c60b72e59511c8d8',
        '65f31ea9c60b72e59511c8d9',
        '65f31ea9c60b72e59511c8da',
      ],
      UserAuthor: [
        '6051a5fe4a3d7e126c9d24b5',
        '6051a5fe4a3d7e126c9d24b6',
        '6051a5fe4a3d7e126c9d24b7',
      ],
      UserBook: [
        '6051a5fe4a3d7e126c9d24b7',
        '6051a5fe4a3d7e126c9d24b8',
        '6051a5fe4a3d7e126c9d24b9',
      ],
    },
    {
      id: '6051a5fe4a3d7e126c9d24b9',
      name: 'Leticia Souza',
      email: 'leticia@gmail.com',
      password: '$2a$08$ww3YCe1qAwAU2znOQJtoI.wiYbSSAKxYyAtfq6QbCS6nEJCsMYL3C',
      username: '@Leticia123',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/profiles/portrait-beautiful-young-woman.jpg',
      checkOnBoarding: true,
      termsOfUse: true,
      UserGenres: [
        '65f31ea8c60b72e59511c8d1',
        '65f31ea8c60b72e59511c8d2',
        '65f31ea8c60b72e59511c8d3',
      ],
      UserAuthor: [
        '6051a5fe4a3d7e126c9d24b7',
        '6051a5fe4a3d7e126c9d24b8',
        '6051a5fe4a3d7e126c9d24b9',
      ],
      UserBook: [
        '6051a5fe4a3d7e126c9d24ba',
        '6051a5fe4a3d7e126c9d24bb',
        '6051a5fe4a3d7e126c9d24bc',
      ],
    },
    {
      id: '6051a5fe4a3d7e126c9d24ba',
      name: 'Sabrina Silva',
      email: 'sabrina@gmail.com',
      password: '$2a$08$b5AErTzMPPOSx1kDoI6FV.lE5Wr6IhVsiR14A8uqxPLeyBmncxsze',
      username: '@Sabrina123',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/profiles/white-woman-with-curly-hair.jpg',
      checkOnBoarding: true,
      termsOfUse: true,
      UserGenres: [
        '65f31ea9c60b72e59511c8da',
        '65f31ea9c60b72e59511c8db',
        '65f31ea9c60b72e59511c8dc',
      ],
      UserAuthor: [
        '6061a5fe4a3d7e126c9d24bd',
        '6051a5fe4a3d7e126c9d24be',
        '6051a5fe4a3d7e126c9d24bf',
      ],
      UserBook: [
        '6061a5fe4a3d7e126c9d24bd',
        '6061a5fe4a3d7e126c9d24be',
        '6061a5fe4a3d7e126c9d24bf',
      ],
    },
  ];
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        ...user,
        checkOnBoarding: user.checkOnBoarding ?? false,
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

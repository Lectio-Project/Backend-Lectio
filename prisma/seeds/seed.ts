import { PrismaClient } from '@prisma/client';
import authorRegistration from './seed.author';
import bookRegistration from './seed.book';
import commentsRegistration from './seed.comments';
import genreRegistration from './seed.gender';
import thoughtRegistration from './seed.thougt';
import userRegistration from './seed.user';

const prismaClient = new PrismaClient();

async function executeSeeds(prisma: PrismaClient) {
  try {
    await genreRegistration(prisma).then();
    await authorRegistration(prisma).then();
    await bookRegistration(prisma).then();
    await userRegistration(prisma).then();
    await commentsRegistration(prisma).then();
    await thoughtRegistration(prisma).then();
  } catch (error) {
    //
  }
}

executeSeeds(prismaClient)
  .then()
  .catch(err => err)
  .finally(async () => {
    prismaClient.$disconnect;
  });

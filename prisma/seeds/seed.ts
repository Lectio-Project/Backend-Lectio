import authorRegistration from './seed.author';
import bookRegistration from './seed.book';
import genreRegistration from './seed.gender';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

async function executeSeeds(prisma: PrismaClient) {
  await genreRegistration(prisma).then();
  await authorRegistration(prisma).then();
  await bookRegistration(prisma).then();
}

executeSeeds(prismaClient)
  .then(e => console.log(e))
  .catch(err => err)
  .finally(async () => {
    prismaClient.$disconnect;
  });

import { PrismaClient } from '@prisma/client';

async function genreRegistration(prisma: PrismaClient): Promise<void> {
  const genres = [
    { id: '65f31ea8c60b72e59511c8d1', name: 'suspense' },
    { id: '65f31ea8c60b72e59511c8d2', name: 'fantasia' },
    { id: '65f31ea8c60b72e59511c8d3', name: 'ficção Científica' },
    { id: '65f31ea8c60b72e59511c8d4', name: 'biografia' },
    { id: '65f31ea8c60b72e59511c8d5', name: 'terror' },
    { id: '65f31ea8c60b72e59511c8d6', name: 'crimes Reais' },
    { id: '65f31ea9c60b72e59511c8d7', name: 'drama' },
    { id: '65f31ea9c60b72e59511c8d8', name: 'poema' },
    { id: '65f31ea9c60b72e59511c8d9', name: 'romance' },
    { id: '65f31ea9c60b72e59511c8da', name: 'crônica' },
    { id: '65f31ea9c60b72e59511c8db', name: 'aventura' },
    { id: '65f31ea9c60b72e59511c8dc', name: 'conto' },
  ];

  for (const gender of genres) {
    await prisma.gender.upsert({
      where: { id: gender.id },
      update: {},
      create: { id: gender.id, gender: gender.name },
    });
  }
}

export default genreRegistration;

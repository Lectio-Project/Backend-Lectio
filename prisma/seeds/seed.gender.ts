import { PrismaClient } from '@prisma/client';

async function genreRegistration(prisma: PrismaClient): Promise<void> {
  const genres = [
    { id: '65f31ea8c60b72e59511c8d1', name: 'Suspense' },
    { id: '65f31ea8c60b72e59511c8d2', name: 'Fantasia' },
    { id: '65f31ea8c60b72e59511c8d3', name: 'Ficção Científica' },
    { id: '65f31ea8c60b72e59511c8d4', name: 'Biografia' },
    { id: '65f31ea8c60b72e59511c8d5', name: 'Terror' },
    { id: '65f31ea8c60b72e59511c8d6', name: 'Crimes Reais' },
    { id: '65f31ea9c60b72e59511c8d7', name: 'Drama' },
    { id: '65f31ea9c60b72e59511c8d8', name: 'Poema' },
    { id: '65f31ea9c60b72e59511c8d9', name: 'Romance' },
    { id: '65f31ea9c60b72e59511c8da', name: 'Crônica' },
    { id: '65f31ea9c60b72e59511c8db', name: 'Aventura' },
    { id: '65f31ea9c60b72e59511c8dc', name: 'Conto' },
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

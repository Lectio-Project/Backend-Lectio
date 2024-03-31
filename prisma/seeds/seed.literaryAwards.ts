import { PrismaClient } from '@prisma/client';

async function literaryAwardsRegistration(prisma: PrismaClient): Promise<void> {
  const awards = [
    {
      id: '6051a5fe4a3d7e126c9d24b1',
      name: 'jabuti for literary novel',
      year: '2020',
      bookId: '6051a5fe4a3d7e126c9d24b1',
    },
    {
      id: '6051a5fe4a3d7e126c9d24b2',
      name: 'oceanos prize',
      year: '2020',
      bookId: '6051a5fe4a3d7e126c9d24b1',
    },
    {
      id: '6051a5fe4a3d7e126c9d24b3',
      name: 'Jabuti',
      year: '2015',
      bookId: '6051a5fe4a3d7e126c9d24b2',
    },
    {
      id: '6051a5fe4a3d7e126c9d24b4',
      name: 'nobel da paz, categoria livro infantil',
      year: '2009',
      bookId: '6051a5fe4a3d7e126c9d24b5',
    },
    {
      id: '6051a5fe4a3d7e126c9d24b5',
      name: 'pulitzer especial',
      year: '1960',
      bookId: '6051a5fe4a3d7e126c9d24b6',
    },
    {
      id: '6051a5fe4a3d7e126c9d24b6',
      name: 'jugendbuchpreis alemão',
      year: '1957',
      bookId: '6051a5fe4a3d7e126c9d24b6',
    },
    {
      id: '6051a5fe4a3d7e126c9d24b7',
      name: 'orange prize for fiction',
      year: '2005',
      bookId: '6051a5fe4a3d7e126c9d24b9',
    },
    {
      id: '6051a5fe4a3d7e126c9d24b8',
      name: 'ficção de orange county',
      year: '2009',
      bookId: '6051a5fe4a3d7e126c9d24b9',
    },
    {
      id: '6051a5fe4a3d7e126c9d24b9',
      name: 'carnegie de literatura infantil',
      year: '1938',
      bookId: '6051a5fe4a3d7e126c9d24bc',
    },
    {
      id: '6051a5fe4a3d7e126c9d24ba',
      name: 'medalha new york herald tribune para ficção ',
      year: '1938',
      bookId: '6051a5fe4a3d7e126c9d24bc',
    },
  ];

  for (const award of awards) {
    await prisma.literaryAwards.upsert({
      where: { id: award.id },
      update: {},
      create: {
        ...award,
      },
    });
  }
}

export default literaryAwardsRegistration;

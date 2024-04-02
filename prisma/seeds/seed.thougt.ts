import { PrismaClient } from '@prisma/client';

async function thoughtRegistration(prisma: PrismaClient): Promise<void> {
  const thoughts = [
    {
      id: '65f31ea8c60b72e59511c8d0',
      text: 'De tudo que vi meu pai bem-querer na vida, talvez fosse a escrita e a leitura dos filhos o que perseguiu com mais afinco.',
      bookId: '6051a5fe4a3d7e126c9d24b1',
    },
    {
      id: '65f31ea8c60b72e59511c8d1',
      text: 'Gosto de ver as palavras plenas de sentido ou carregadas de vazio no varal da linha. Palavras caídas, apanhadas, surgidas, inventadas na corda bamba da vida.',
      bookId: '6051a5fe4a3d7e126c9d24b2',
    },
    {
      id: '65f31ea8c60b72e59511c8d2',
      text: 'E aos instantes eu lhes tiro o sumo de fruta. Tenho que me destituir para alcançar cerne e semente de vida. O instante é semente viva.',
      bookId: '6051a5fe4a3d7e126c9d24b3',
    },
    {
      id: '65f31ea8c60b72e59511c8d3',
      text: 'Valha-me Nossa Senhora, Mãe de Deus de Nazaré! A vaca mansa dá leite, a braba dá quando quer. A mansa dá sossegada, a braba levanta o pé. Já fui barco, fui navio, mas hoje sou escaler. Já fui menino, fui homem, só me falta ser mulher.',
      bookId: '6051a5fe4a3d7e126c9d24b4',
    },
    {
      id: '65f31ea8c60b72e59511c8d4',
      text: 'Às vezes, são sonhos, e às vezes, são só mentiras.',
      bookId: '6051a5fe4a3d7e126c9d24b5',
    },
    {
      id: '65f31ea8c60b72e59511c8d5',
      text: 'E apesar de rir e fingir que não me importo, eu me importo sim. Tem dias que gostaria de ser diferente, mas isso é impossível. Estou presa ao caráter com qual nasci, e mesmo assim tenho certeza de que não sou má pessoa. Faço o máximo para agradar a todos, mais do que eles suspeitariam num milhão de anos.',
      bookId: '6051a5fe4a3d7e126c9d24b6',
    },
    {
      id: '65f31ea8c60b72e59511c8d6',
      text: 'Na natureza, não há leis. Só a sobrevivência.',
      bookId: '6051a5fe4a3d7e126c9d24b7',
    },
    {
      id: '65f31ea8c60b72e59511c8d7',
      text: 'A única forma dos homens chegarem a algum lugar é deixando algo para trás.',
      bookId: '6051a5fe4a3d7e126c9d24b8',
    },
    {
      id: '65f31ea8c60b72e59511c8d8',
      text: 'Quando se procura geralmente se encontra alguma coisa, sem dúvida, mas nem sempre o que estávamos procurando',
      bookId: '6051a5fe4a3d7e126c9d24bc',
    },
  ];

  for (const thought of thoughts) {
    await prisma.thought.upsert({
      where: { id: thought.id },
      update: {},
      create: {
        ...thought,
      },
    });
  }
}

export default thoughtRegistration;

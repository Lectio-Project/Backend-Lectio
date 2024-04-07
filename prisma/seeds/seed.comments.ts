import { PrismaClient } from '@prisma/client';

async function commentsRegistration(prisma: PrismaClient): Promise<void> {
  const comments = [
    {
      id: '65fc791d65536490790636d1',
      text: 'Interestelar é uma epopeia espacial que desafia os limites da exploração humana, levando o leitor a uma jornada emocionante através do universo. Christopher Nolan cria uma trama repleta de suspense e reflexão sobre o destino da humanidade.',
      bookGrade: 4.5,
      userId: '6051a5fe4a3d7e126c9d24b0',
      bookId: '6051a5fe4a3d7e126c9d24b8',
    },
    {
      id: '65fc791d65536490790636d2',
      text: 'Este é um thriller psicológico arrebatador que mergulha nas complexidades da mente humana e nas consequências de uma tragédia inimaginável. Lionel Shriver conduz o leitor por uma jornada sombria e perturbadora, questionando o que é possível entender sobre o mal.',
      bookGrade: 3.8,
      userId: '6051a5fe4a3d7e126c9d24b0',
      bookId: '6051a5fe4a3d7e126c9d24b9',
    },
    {
      id: '65fc791d65536490790636d3',
      text: 'Este é um suspense fascinante que combina mistério e aventura em uma trama cheia de reviravoltas. C. J. Tudor cria uma atmosfera arrepiante e envolvente, mantendo o leitor intrigado até o final.',
      bookGrade: 3.9,
      userId: '6051a5fe4a3d7e126c9d24b0',
      bookId: '6051a5fe4a3d7e126c9d24ba',
    },
    {
      id: '65fc791d65536490790636d4',
      text: 'Esta é uma história encantadora que mistura fantasia e aventura em uma trama cheia de magia e emoção. John Bellairs cria um universo cativante onde crianças comuns se veem envolvidas em uma batalha épica contra o mal.',
      bookGrade: 4.2,
      userId: '6051a5fe4a3d7e126c9d24b0',
      bookId: '6051a5fe4a3d7e126c9d24bb',
    },
    {
      id: '65fc791d65536490790636d5',
      text: 'Este é um livro que cativa desde a primeira página, levando o leitor a uma jornada épica pelo mundo fantástico de J.R.R. Tolkien. Com uma narrativa envolvente e personagens inesquecíveis, O Hobbit é uma obra-prima da literatura de fantasia.',
      bookGrade: 4.3,
      userId: '6051a5fe4a3d7e126c9d24b0',
      bookId: '6051a5fe4a3d7e126c9d24bc',
    },
    {
      id: '65fc791d65536490790636d6',
      text: 'Esta é uma obra que transcende o gênero do terror, mergulhando nas profundezas da alma humana e explorando o confronto entre o sagrado e o profano. William Peter Blatty cria uma narrativa angustiante e arrepiante que permanece com o leitor muito tempo depois de terminar a leitura.',
      bookGrade: 4.2,
      userId: '6051a5fe4a3d7e126c9d24b0',
      bookId: '6061a5fe4a3d7e126c9d24bd',
    },
    {
      id: '65fc791d65536490790636d7',
      text: 'Este é um livro que nos confronta com nossos medos mais profundos, explorando os limites entre a vida e a morte e as consequências de nossas escolhas. Stephen King cria uma atmosfera assombrosa e perturbadora que mantém o leitor preso até a última página.',
      bookGrade: 3.6,
      userId: '6051a5fe4a3d7e126c9d24b0',
      bookId: '6061a5fe4a3d7e126c9d24be',
    },
    {
      id: '65fc791d65536490790636d8',
      text: 'Toda Poesia é uma obra que nos convida a mergulhar nas profundezas da alma humana, explorando os mistérios e as maravilhas da existência. Paulo Leminski tece palavras que tocam o coração e a mente, levando o leitor a uma jornada de autodescoberta e reflexão.',
      bookGrade: 3.8,
      userId: '6051a5fe4a3d7e126c9d24b0',
      bookId: '6061a5fe4a3d7e126c9d24bf',
    },
    {
      id: '65fc791d65536490790636d9',
      text: 'Textos Cruéis Demais para Serem Lidos Rapidamente: 1 é uma obra que nos confronta com a complexidade das relações humanas, explorando temas como amor, dor e esperança. Igor Pires e o coletivo TCD nos presenteiam com uma coleção de textos profundos e poéticos que nos fazem refletir sobre a vida e o amor.',
      bookGrade: 4.0,
      userId: '6051a5fe4a3d7e126c9d24b0',
      bookId: '6061a5fe4a3d7e126c9d24c0',
    },
    {
      id: '65fc791d65536490790636da',
      text: 'Crônicas para Jovens: De Escrita e Vida é uma obra que nos convida a refletir sobre o ofício de escrever e a relação entre vida e literatura. Clarice Lispector nos presenteia com crônicas profundas e provocativas que nos fazem repensar nossa própria existência e o papel da arte em nossas vidas.',
      bookGrade: 4.0,
      userId: '6051a5fe4a3d7e126c9d24b4',
      bookId: '6061a5fe4a3d7e126c9d24c1',
    },
    {
      id: '65fc791d65536490790636db',
      text: 'Pressa de Ser Feliz: Crônicas de um Ansioso é uma obra que nos convida a refletir sobre a busca pela felicidade em meio à ansiedade e à incerteza. Matheus Rocha nos presenteia com crônicas sinceras e comoventes que nos fazem sentir menos sozinhos em nossas lutas diárias.',
      bookGrade: 3.5,
      userId: '6051a5fe4a3d7e126c9d24b4',
      bookId: '6061a5fe4a3d7e126c9d24c2',
    },
    {
      id: '65fc791d65536490790636dc',
      text: 'O Diário Perdido de Gravity Falls é uma obra que nos transporta para o mundo mágico e misterioso da série Gravity Falls, revelando segredos e aventuras inéditas. Alex Hirsch nos presenteia com um livro repleto de humor e imaginação que encantará fãs de todas as idades.',
      bookGrade: 3.6,
      userId: '6051a5fe4a3d7e126c9d24b4',
      bookId: '6061a5fe4a3d7e126c9d24c3',
    },
    {
      id: '65fc791d65536490790636dd',
      text: 'A Ilha do Tesouro é uma obra que nos transporta para os mares tempestuosos e cheios de aventura dos piratas, levando o leitor a uma jornada épica em busca de tesouros perdidos. Robert Louis Stevenson cria uma narrativa cheia de suspense e emoção que continua a encantar leitores de todas as idades.',
      bookGrade: 3.9,
      userId: '6051a5fe4a3d7e126c9d24b4',
      bookId: '6061a5fe4a3d7e126c9d24c4',
    },
    {
      id: '65fc791d65536490790636de',
      text: 'A Dama de Espadas é uma obra que nos leva a um jogo de cartas mortal, onde os segredos mais sombrios do coração humano são revelados. Alexandre Pushkin nos presenteia com uma narrativa envolvente e intrigante que mantém o leitor preso até o final.',
      bookGrade: 4.2,
      userId: '6051a5fe4a3d7e126c9d24b4',
      bookId: '6061a5fe4a3d7e126c9d24c5',
    },
    {
      id: '65fc791d65536490790636df',
      text: 'Torto Arado é uma obra fascinante que mergulha nas raízes culturais e sociais do Brasil rural, explorando temas como justiça, família e identidade através da narrativa envolvente de suas protagonistas. Com uma escrita visceral e personagens profundamente humanos, o livro convida os leitores a refletirem sobre as complexidades da vida no sertão brasileiro e as lutas enfrentadas por aqueles que buscam justiça e liberdade',
      bookGrade: 4.0,
      userId: '6051a5fe4a3d7e126c9d24b6',
      bookId: '6051a5fe4a3d7e126c9d24b1',
    },
    {
      id: '65fc791d65536490790636e0',
      text: `Olhos D'água é uma coletânea de contos escrita por Conceição Evaristo, uma das vozes mais marcantes da literatura contemporânea brasileira. Este livro mergulha nas profundezas das experiências de mulheres negras, explorando questões de identidade, injustiça social e resistência. Cada conto é uma janela para narrativas complexas e emocionantes, revelando as lutas e as conquistas dessas personagens em um mundo marcado pela desigualdade.`,
      bookGrade: 4.8,
      userId: '6051a5fe4a3d7e126c9d24b6',
      bookId: '6051a5fe4a3d7e126c9d24b2',
    },
    {
      id: '65fc791d65536490790636e1',
      text: `Água Viva, obra-prima de Clarice Lispector, é uma experiência literária profunda e sensorial que mergulha o leitor em um fluxo de consciência poético e introspectivo, explorando temas como identidade, existência e conexão com o mundo ao nosso redor. Lispector desafia as convenções narrativas tradicionais, convidando o leitor a se perder nas reflexões profundas e nas imagens vívidas que permeiam suas páginas. É uma leitura que transcende as palavras, convidando-nos a contemplar a essência da vida e da arte.`,
      bookGrade: 5.0,
      userId: '6051a5fe4a3d7e126c9d24b7',
      bookId: '6051a5fe4a3d7e126c9d24b3',
    },
    {
      id: '65fc791d65536490790636e2',
      text: `O Auto da Compadecida é uma obra-prima da literatura brasileira escrita por Ariano Suassuna. Esta peça teatral mistura comédia e crítica social de forma brilhante, oferecendo uma visão única da cultura nordestina. Com personagens memoráveis e diálogos afiados, o livro nos leva a refletir sobre questões universais de moralidade e justiça, ao mesmo tempo em que nos diverte com seu humor inteligente e cativante`,
      bookGrade: 4.2,
      userId: '6051a5fe4a3d7e126c9d24b7',
      bookId: '6051a5fe4a3d7e126c9d24b4',
    },
    {
      id: '65fc791d65536490790636e3',
      text: `O Menino que Descobriu o Vento é uma obra cativante que narra a história inspiradora de William Kamkwamba, um jovem do Malawi que, contra todas as probabilidades, construiu um moinho de vento improvisado para trazer energia para sua comunidade. Este livro é uma verdadeira celebração da criatividade, resiliência e determinação humana.`,
      bookGrade: 4.3,
      userId: '6051a5fe4a3d7e126c9d24b8',
      bookId: '6051a5fe4a3d7e126c9d24b5',
    },
    {
      id: '65fc791d65536490790636e4',
      text: `O Diário de Anne Frank é uma obra profundamente comovente que oferece um olhar íntimo e poderoso sobre a vida de uma jovem durante um dos períodos mais sombrios da história. A narrativa sincera e cativante de Anne Frank nos permite entrar em seu mundo e testemunhar suas lutas, esperanças e sonhos enquanto ela enfrenta os desafios do Holocausto. Este livro é uma lembrança dolorosa da importância da compaixão, tolerância e resiliência mesmo diante das circunstâncias mais adversas.`,
      bookGrade: 4.4,
      userId: '6051a5fe4a3d7e126c9d24b8',
      bookId: '6051a5fe4a3d7e126c9d24b6',
    },
    {
      id: '65fc791d65536490790636e5',
      text: `Um lugar bem longe daqui é uma obra emocionante que nos leva a uma jornada de esperança, superação e conexão humana. Com uma narrativa envolvente e personagens cativantes, o livro nos convida a refletir sobre o poder da resiliência e da solidariedade mesmo nos momentos mais sombrios da vida.`,
      bookGrade: 4.1,
      userId: '6051a5fe4a3d7e126c9d24b9',
      bookId: '6051a5fe4a3d7e126c9d24b7',
    },
    {
      id: '65fc791d65536490790636e6',
      text: `Cidades Mortas e Outros Contos é uma coletânea fascinante que mergulha o leitor em paisagens literárias vívidas e surreais. Com narrativas envolventes e personagens intrigantes, cada conto oferece uma experiência única que desafia as fronteiras da realidade e da imaginação. Uma leitura que cativa e instiga, deixando uma marca indelével na mente do leitor.`,
      bookGrade: 4.5,
      userId: '6051a5fe4a3d7e126c9d24b9',
      bookId: '6061a5fe4a3d7e126c9d24c6',
    },
    {
      id: '65fc791d65536490790636e7',
      text: `O Caso Evandro: Sete Acusados, Duas Polícias, o Corpo e uma Trama Diabólica é um livro intrigante que mergulha nas complexidades de um dos casos criminais mais notórios do Brasil. Com uma narrativa envolvente e detalhada, o livro explora os diversos aspectos do caso, desde as investigações policiais até as reviravoltas no tribunal, oferecendo uma análise profunda e fascinante sobre o sistema judicial e a busca pela verdade.`,
      bookGrade: 3.9,
      userId: '6051a5fe4a3d7e126c9d24ba',
      bookId: '6061a5fe4a3d7e126c9d24c7',
    },
    {
      id: '65fc791d65536490790636e8',
      text: `O Pior dos Crimes: A História do Assassinato de Isabella Nardoni é um livro que aborda um dos casos mais chocantes e trágicos da história recente brasileira. A narrativa detalha os eventos que cercam o terrível assassinato de Isabella Nardoni e todo o desenrolar do processo judicial que se seguiu. É uma obra que oferece insights sobre a complexidade do sistema legal e as consequências devastadoras de atos de violência.`,
      bookGrade: 4.1,
      userId: '6051a5fe4a3d7e126c9d24ba',
      bookId: '6061a5fe4a3d7e126c9d24c8',
    },
  ];
  for (const comment of comments) {
    await prisma.comment.upsert({
      where: { id: comment.id },
      update: {},
      create: {
        ...comment,
      },
    });
  }
}

export default commentsRegistration;

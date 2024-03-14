import { PrismaClient } from '@prisma/client';

async function authorRegistration(prisma: PrismaClient): Promise<void> {
  const authors = [
    {
      id: '6051a5fe4a3d7e126c9d24b1',
      name: 'Itamar Vieira Junior',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/itamar-vieira-junior.jpg',
      carrerDescription:
        'Itamar Vieira Junior é um escritor brasileiro cuja obra se destaca por explorar as complexidades sociais e culturais do Brasil, especialmente em relação à região Nordeste. Seus romances e contos frequentemente abordam temas como desigualdade, identidade e memória coletiva, oferecendo uma visão vívida e multifacetada da vida no país.',
      birthplace: 'Salvador, Bahia, Brasil',
      Genders: ['65f31ea9c60b72e59511c8d9'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24b2',
      name: 'Clarice Lispector',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/clarice-lispector.jpg',
      carrerDescription:
        'Clarice Lispector foi uma das mais importantes escritoras brasileiras do século XX, reconhecida por sua prosa inovadora e introspectiva. Sua obra transcende gêneros convencionais, explorando as complexidades da existência humana, identidade feminina e o papel da linguagem na construção da realidade. Seus livros continuam a influenciar gerações de leitores ao redor do mundo.',
      birthplace: 'Tchetchelnik, Ucrânia (atualmente Chechelnyk, Ucrânia)',
      Genders: ['65f31ea9c60b72e59511c8d9', '65f31ea9c60b72e59511c8da'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24b3',
      name: 'Ariano Suassuna',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/ariano-suassuna.jpg',
      carrerDescription:
        'Ariano Suassuna foi um renomado escritor, dramaturgo e poeta brasileiro, considerado um dos maiores representantes da cultura nordestina. Sua obra é marcada por uma profunda ligação com as tradições populares e folclóricas do Nordeste, retratando com humor e sensibilidade a vida e os costumes da região. Além de sua contribuição para a literatura, Suassuna também teve papel fundamental no desenvolvimento do teatro brasileiro.',
      birthplace:
        'Nossa Senhora das Neves (atualmente João Pessoa), Paraíba, Brasil',
      Genders: ['65f31ea9c60b72e59511c8d7'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24b4',
      name: 'Delia Owens',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/delia-owens.jpeg',
      carrerDescription:
        "Delia Owens é uma autora americana conhecida por seu romance de estreia 'Where the Crawdads Sing' (em português, 'Um lugar bem longe daqui'). Antes de se dedicar à escrita, Owens foi uma renomada zoóloga, o que se reflete em sua obra através da rica descrição da vida selvagem e dos ecossistemas naturais. Seu livro conquistou leitores em todo o mundo, combinando elementos de romance, suspense e natureza.",
      birthplace: 'Georgia, Estados Unidos',
      Genders: ['65f31ea9c60b72e59511c8d7'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24b5',
      name: 'William Kamkwamba',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/william-kamkwamba.jpg',
      carrerDescription:
        "William Kamkwamba é um autor e inventor malauiano, famoso por sua história de superação retratada em sua biografia 'O menino que descobriu o vento'. Sua jornada de construir turbinas eólicas improvisadas para fornecer energia em sua aldeia no Malawi inspirou milhares de pessoas ao redor do mundo, destacando o poder da criatividade e da determinação em face da adversidade.",
      birthplace: 'Dowa, Malawi',
      Genders: ['65f31ea8c60b72e59511c8d4'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24b6',
      name: 'Anne Frank',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/anne-frank.jpg',
      carrerDescription:
        "Anne Frank foi uma jovem autora judia alemã, cujo diário, 'O Diário de Anne Frank', se tornou um dos documentos mais significativos sobre o Holocausto. Escrito durante a Segunda Guerra Mundial, o diário de Anne oferece um olhar íntimo e humano sobre a vida de uma família judia escondida dos nazistas em Amsterdã. Sua obra continua a sensibilizar e educar pessoas ao redor do mundo sobre os horrores do regime nazista e a importância da tolerância e compaixão.",
      birthplace: 'Frankfurt, Alemanha',
      Genders: ['65f31ea8c60b72e59511c8d4'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24b7',
      name: 'Christopher Nolan',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/christopher-nolan.png',
      carrerDescription:
        "Christopher Nolan é um diretor, roteirista e produtor britânico, conhecido por seus filmes inovadores e complexos que desafiam as convenções do cinema contemporâneo. Seu trabalho é marcado por narrativas intricadas, temas filosóficos e visuais deslumbrantes. Nolan conquistou aclamação crítica e sucesso comercial com filmes como 'Interestelar', 'A Origem' e a trilogia do Cavaleiro das Trevas.",
      birthplace: 'Westminster, Londres, Reino Unido',
      Genders: ['65f31ea8c60b72e59511c8d3'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24b8',
      name: 'Conceição Evaristo',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/concei%C3%A7%C3%A3o-evaristo.jpg',
      carrerDescription:
        'Conceição Evaristo é uma escritora brasileira cuja obra destaca-se por sua abordagem sensível e poética das questões raciais e sociais no Brasil. Suas narrativas poderosas exploram as experiências e identidades da população afro-brasileira, ressaltando a importância da representatividade e do empoderamento nas letras brasileiras.',
      birthplace: 'Belo Horizonte, Minas Gerais, Brasil',
      Genders: ['65f31ea8c60b72e59511c8d3'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24b9',
      name: 'Lionel Shriver',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/lionel-shriver.jpg',
      carrerDescription:
        "Lionel Shriver é uma autora americana conhecida por sua escrita provocativa e polêmica, que aborda questões sociais e morais complexas. Seus romances, incluindo 'Precisamos falar sobre o Kevin', exploram temas como maternidade, família, identidade e responsabilidade individual, desafiando os leitores a questionarem suas próprias crenças e valores.",
      birthplace: 'Gastonia, Carolina do Norte, Estados Unidos',
      Genders: ['65f31ea8c60b72e59511c8d1'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24ba',
      name: 'C. J. Tudor',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/c-j-tudor.jpeg',
      carrerDescription:
        'C. J. Tudor é uma escritora britânica conhecida por seus romances de suspense e mistério, que combinam elementos sobrenaturais, psicológicos e criminais. Seus livros cativam os leitores com tramas intrigantes, reviravoltas surpreendentes e atmosferas sinistras, estabelecendo-a como uma das vozes mais promissoras no gênero do thriller contemporâneo.',
      birthplace: 'Salisbury, Wiltshire, Inglaterra',
      Genders: ['65f31ea8c60b72e59511c8d1'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24bb',
      name: 'John Bellairs',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/john-bellairs.jpg',
      carrerDescription:
        'Autor americano de literatura infantojuvenil, reconhecido por suas histórias de mistério e fantasia que cativam tanto jovens quanto adultos. Seus livros frequentemente envolvem elementos sobrenaturais e atmosferas góticas, proporcionando uma experiência emocionante e misteriosa para os leitores.',
      birthplace: 'Marshall, Michigan, Estados Unidos',
      Genders: ['65f31ea8c60b72e59511c8d2'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24bc',
      name: 'J.R.R. Tolkien (John Ronald Reuel Tolkien)',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/J-R-R-tolkien.jpg',
      carrerDescription:
        "Renomado escritor, filólogo e professor britânico, conhecido como o autor de algumas das obras mais influentes no gênero da alta fantasia. Tolkien é famoso por criar o complexo universo da Terra Média, com suas línguas fictícias, mitologia elaborada e histórias épicas, como 'O Hobbit' e 'O Senhor dos Anéis', que tiveram um impacto duradouro na literatura e na cultura popular.",
      birthplace:
        'Bloemfontein, Estado Livre de Orange (atualmente na África do Sul)',
      Genders: ['65f31ea8c60b72e59511c8d2'],
    },
    {
      id: '6061a5fe4a3d7e126c9d24bd',
      name: 'William Peter Blatty',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/william-peter-blatty.jpg',
      carrerDescription:
        "Autor americano e roteirista, conhecido por seus trabalhos no gênero do horror. Blatty alcançou fama internacional com o seu romance de terror 'O Exorcista', que foi adaptado para o cinema e se tornou um clássico do gênero. Além de suas contribuições para o horror, Blatty também escreveu outros romances e roteiros para filmes e televisão.",
      birthplace: 'Nova York, Nova York, Estados Unidos',
      Genders: ['65f31ea8c60b72e59511c8d5'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24be',
      name: 'Stephen King',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/stephen-king.jpeg',
      carrerDescription:
        "Um dos escritores mais prolíficos e influentes do século XX e XXI, Stephen King é conhecido por seus romances de horror, suspense e ficção científica, que exploram os medos e anseios da sociedade contemporânea. Com uma carreira que abrange décadas, King produziu uma vasta obra que inclui best-sellers como 'O Iluminado', 'Carrie, a Estranha' e 'A Dança da Morte', estabelecendo-se como uma figura icônica no mundo da literatura de terror.",
      birthplace: 'Portland, Maine, Estados Unidos',
      Genders: ['65f31ea8c60b72e59511c8d5'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24bf',
      name: 'Paulo Leminski',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/paulo-leminski.jpg',
      carrerDescription:
        'Poeta, escritor, crítico literário e compositor brasileiro, Leminski é conhecido por sua poesia concisa, intensa e muitas vezes experimental. Sua obra reflete uma profunda habilidade técnica e sensibilidade lírica, explorando temas como amor, política e filosofia com uma linguagem vibrante e original.',
      birthplace: 'Curitiba, Paraná, Brasil',
      Genders: ['65f31ea9c60b72e59511c8d8'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24c0',
      name: 'Igor Pires',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/igor-pires.jpg',
      carrerDescription:
        'Autor brasileiro contemporâneo, Igor Pires é reconhecido por sua habilidade em expressar emoções e reflexões profundas através de sua poesia. Seus poemas, frequentemente marcados por uma linguagem direta e imagens vívidas, exploram temas como amor, identidade e existencialismo, conectando-se com leitores de diversas faixas etárias.',
      birthplace: 'São Paulo, Brasil',
      Genders: ['65f31ea9c60b72e59511c8d8'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24c1',
      name: 'Matheus Rocha',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/matheus-rocha.png',
      carrerDescription:
        'Escritor e influenciador digital brasileiro, Matheus Rocha é conhecido por suas crônicas e textos sobre relacionamentos, autoconhecimento e superação. Sua escrita sincera e acessível ressoa com um público amplo, especialmente entre os jovens, oferecendo insights e conforto em meio às complexidades da vida moderna.',
      birthplace: 'Salvador, Bahia, Brasil',
      Genders: ['65f31ea9c60b72e59511c8da'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24c2',
      name: 'Alex Hirsch',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/alex-hirsch.jpeg',
      carrerDescription:
        "Criador, escritor e produtor americano, Alex Hirsch é conhecido por seu trabalho na animação, especialmente como criador da aclamada série animada 'Gravity Falls'. Seu estilo único de contar histórias combina elementos de aventura, humor e mistério, cativando tanto crianças quanto adultos.",
      birthplace: 'Piedmont, Califórnia, Estados Unidos',
      Genders: ['65f31ea9c60b72e59511c8db'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24c3',
      name: 'Robert Louis Stevenson',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/robert-louis-stevenson.jpg',
      carrerDescription:
        "Autor escocês do século XIX, Stevenson é conhecido por seus romances de aventura e ficção, que incluem clássicos como 'A Ilha do Tesouro' e 'O Médico e o Monstro'. Suas histórias habilmente tecidas e personagens memoráveis garantiram seu lugar como um dos grandes escritores da literatura universal.",
      birthplace: 'Edimburgo, Escócia',
      Genders: ['65f31ea9c60b72e59511c8db'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24c4',
      name: 'Alexandre Pushkin',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/alexandre-pushkin.jpg',
      carrerDescription:
        'Poeta, romancista e dramaturgo russo do século XIX, Pushkin é considerado um dos maiores escritores da literatura russa. Suas obras, incluindo poemas épicos, peças teatrais e contos, são conhecidas por sua riqueza linguística, profundidade psicológica e influência duradoura na cultura russa e mundial.',
      birthplace: 'Moscou, Rússia',
      Genders: ['65f31ea9c60b72e59511c8dc'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24c5',
      name: 'Monteiro Lobato',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/monteiro-lobato.jpg',
      carrerDescription:
        "Escritor brasileiro, Monteiro Lobato é considerado um dos mais importantes autores da literatura infantil do Brasil. Sua série de livros 'Sítio do Picapau Amarelo', além de outros contos e romances, são marcados por sua imaginação vibrante e sua habilidade em criar personagens cativantes que encantaram gerações de leitores.",
      birthplace: 'Taubaté, São Paulo, Brasil',
      Genders: ['65f31ea9c60b72e59511c8dc'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24c6',
      name: 'Ivan Mizanzuk',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/ivan-mizanzuk.jpg',
      carrerDescription:
        "Escritor e podcaster brasileiro, Ivan Mizanzuk é conhecido por seu trabalho na divulgação de histórias de mistério, crimes reais e investigações jornalísticas. Seu podcast 'Projeto Humanos' alcançou grande sucesso ao explorar narrativas complexas e envolventes sobre a natureza humana e a sociedade.",
      birthplace: 'Curitiba, Paraná, Brasil',
      Genders: ['65f31ea8c60b72e59511c8d6'],
    },
    {
      id: '6051a5fe4a3d7e126c9d24c7',
      name: 'Rogério Pagnan',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/authors/rogerio-pagnan.jpeg',
      carrerDescription:
        'Jornalista brasileiro, Rogério Pagnan é reconhecido por suas reportagens investigativas e sua cobertura de casos de crime real. Seu trabalho detalhado e minucioso como repórter contribuiu para a divulgação de informações sobre crimes de grande impacto social no Brasil.',
      birthplace: 'Pedregulho, São Paulo, Brasil',
      Genders: ['65f31ea8c60b72e59511c8d6'],
    },
  ];

  for (const author of authors) {
    await prisma.author.upsert({
      where: { id: author.id },
      update: {},
      create: {
        ...author,
        Genders: {
          create: (author.Genders as string[]).map(id => ({
            gender: { connect: { id } },
          })),
        },
      },
    });
  }
}

export default authorRegistration;

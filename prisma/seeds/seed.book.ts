import { PrismaClient } from '@prisma/client';

async function bookRegistration(prisma: PrismaClient): Promise<void> {
  const books = [
    {
      name: 'Torto Arado',
      synopsis:
        'Nas profundezas do sertão baiano, as irmãs Bibiana e Belonísia encontram uma velha e misteriosa faca na mala guardada sob a cama da avó. Ocorre então um acidente. E para sempre suas vidas estarão ligadas ― a ponto de uma precisar ser a voz da outra. Numa trama conduzida com maestria e com uma prosa melodiosa, o romance conta uma história de vida e morte, de combate e redenção.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/torto-arado.jpeg',
      publishingCompany: 'Todavia',
      publishYear: '2019',
      genderId: '65f31ea9c60b72e59511c8d9',
      AuthorBook: ['6051a5fe4a3d7e126c9d24b1'],
    },
    {
      name: "Olhos D'água",
      synopsis:
        'Em Olhos d’água, Conceição Evaristo ajusta o foco de seu interesse na população afro-brasileira abordando, sem meias palavras, a pobreza e a violência urbana que acometem.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/olhos-dagua.jpg',
      publishingCompany: 'Pallas',
      publishYear: '2014',
      genderId: '65f31ea8c60b72e59511c8d3',
      AuthorBook: ['6051a5fe4a3d7e126c9d24b8'],
    },
    {
      name: 'Água Viva',
      synopsis:
        "A trama do livro é tênue, o que faz dele um romance sem romance. Um eu, declinado no feminino, escreve a um tu, no masculino, expondo suas ânsias e procuras, num discurso de fluidez ininterrupta entre o delírio, a confissão e a sedução: 'Para te escrever eu antes me perfumo toda. Eu te conheço todo por ti viver toda.' O eu e o tu de Água viva ganham dimensões permutáveis de significação, integrando-se com o não humano: a natureza, as palavras, os animais, a 'coisa' ou o 'it'. A linguagem se expressa numa densa selva de palavras e a obra descortina um voraz processo de correspondências que interconectam vida, paixão e violência.",
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/agua-viva.jpg',
      publishingCompany: 'Rocco',
      publishYear: '2020',
      genderId: '65f31ea9c60b72e59511c8d9',
      AuthorBook: ['6051a5fe4a3d7e126c9d24b2'],
    },
    {
      name: 'O Auto Da Compadecida',
      synopsis:
        "Auto da Compadecida representa o equilíbrio perfeito entre a tradição popular e a elaboração literária ao recriar para o teatro episódios registrados na tradição popular do cordel. É uma peça teatral em forma de Auto em 3 atos, escrita em 1955 pelo autor paraibano Ariano Suassuna. Sendo um drama do Nordeste brasileiro, mescla elementos como a tradição da literatura de cordel, a comédia, traços do barroco católico brasileiro e, ainda, cultura popular e tradições religiosas. Apresenta na escrita traços de linguagem oral [demonstrando, na fala do personagem, sua classe social] e apresenta também regionalismos relativos ao Nordeste. Esta peça projetou Suassuna em todo o país e foi considerada, em 1962, por Sábato Magaldi 'o texto mais popular do moderno teatro brasileiro'.",
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/auto-da-compadecida.jpeg',
      publishingCompany: 'Nova Fronteira',
      publishYear: '2018',
      genderId: '65f31ea9c60b72e59511c8d7',
      AuthorBook: ['6051a5fe4a3d7e126c9d24b3'],
    },
    {
      name: 'O menino que descobriu o vento',
      synopsis:
        'Quando uma terrível seca atingiu o pequeno vilarejo onde William Kamkwamba vivia, no Malaui, sua família perdeu todas as safras da estação, ficando sem ter o que comer ou vender, impossibilitando também a continuidade dos estudos de William. Assim, o garoto começou a explorar os livros de ciências na biblioteca de sua aldeia e foi lá que teve uma ideia que mudaria a vida de sua família para sempre: construir um moinho de vento.Construída com ferro-velho e peças usadas de bicicleta, a incrível criação de William levou eletricidade para casa, o que ajudou a família a bombear a água de que precisavam para cultivar a terra.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/o-menino-que-descobriu-o-vento.jpg',
      publishingCompany: 'Principis',
      publishYear: '2021',
      genderId: '65f31ea8c60b72e59511c8d4',
      AuthorBook: ['6051a5fe4a3d7e126c9d24b5'],
    },
    {
      name: 'O diário de Anne Frank',
      synopsis:
        'O depoimento da pequena Anne, morta pelos nazistas após passar anos escondida no sótão de uma casa em Amsterdã, ainda hoje emociona leitores no mundo inteiro. Suas anotações narram os sentimentos, os medos e as pequenas alegrias de uma menina judia que, como sua família, lutou em vão para sobreviver ao Holocausto.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/o-diario-de-anne-frank.jpg',
      publishingCompany: 'Record',
      publishYear: '1995',
      genderId: '65f31ea8c60b72e59511c8d4',
      AuthorBook: ['6051a5fe4a3d7e126c9d24b6'],
    },
    {
      name: 'Um lugar bem longe daqui',
      synopsis:
        "Por anos, boatos sobre Kya Clark, a 'Menina do Brejo', assombraram Barkley Cove, uma calma cidade costeira da Carolina do Norte. Ela, no entanto, não é o que todos dizem. Sensata e inteligente, Kya sobreviveu por anos sozinha no pântano que chama de lar, tendo as gaivotas como amigas e a areia como professora. Abandonada pela mãe, que não conseguiu suportar o marido abusivo e alcoólatra, e depois pelos irmãos, a menina viveu algum tempo na companhia negligente e por vezes brutal do pai, que acabou também por deixá-la.",
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/um-lugar-bem-longe-daqui.jpg',
      publishingCompany: 'Intrínseca',
      publishYear: '2019',
      genderId: '65f31ea9c60b72e59511c8d7',
      AuthorBook: ['6051a5fe4a3d7e126c9d24b4'],
    },
    {
      name: 'Interestelar',
      synopsis:
        'Interestelar é a crônica de um grupo de exploradores que se aproveita de um recém-descoberto buraco de minhoca para ultrapassar os limites das viagens espaciais tripuladas e assim conquistar as grandes distâncias de uma jornada interestelar. Enquanto viajam, estão em risco o destino do planeta Terra e o futuro da raça humana.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/interestelar.jpg',
      publishingCompany: 'Gryphus Geek',
      publishYear: '2016',
      genderId: '65f31ea8c60b72e59511c8d3',
      AuthorBook: ['6051a5fe4a3d7e126c9d24b7'],
    },
    {
      name: 'Precisamos falar sobre o Kevin',
      synopsis:
        'Lionel Shriver realiza uma espécie de genealogia do assassínio ao criar na ficção uma chacina similar a tantas provocadas por jovens em escolas americanas. Aos 15 anos, o personagem Kevin mata 11 pessoas, entre colegas no colégio e familiares. Enquanto ele cumpre pena, a mãe Eva amarga a monstruosidade do filho. Entre culpa e solidão, ela apenas sobrevive. A vida normal se esvai no escândalo, no pagamento dos advogados, nos olhares sociais tortos.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/precisamos-falar-sobre-o-kevin.jpg',
      publishingCompany: 'Intrínseca',
      publishYear: '2007',
      genderId: '65f31ea8c60b72e59511c8d1',
      AuthorBook: ['6051a5fe4a3d7e126c9d24b9'],
    },
    {
      name: 'O Homem de Giz',
      synopsis:
        'Em 1986, Eddie e os amigos passam a maior parte dos dias andando de bicicleta pela pacata vizinhança em busca de aventuras. Os desenhos a giz são seu código secreto: homenzinhos rabiscados no asfalto; mensagens que só eles entendem. Mas um desenho misterioso leva o grupo de crianças até um corpo desmembrado e espalhado em um bosque. Depois disso, nada mais é como antes.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/o-homem-de-giz.jpg',
      publishingCompany: 'Intrínseca',
      publishYear: '2018',
      genderId: '65f31ea8c60b72e59511c8d1',
      AuthorBook: ['6051a5fe4a3d7e126c9d24ba'],
    },
    {
      name: 'O mistério do relógio na parede',
      synopsis:
        'Recheado de fantasia e aventura, a história do mestre do mistério John Bellairs ganha adaptação para o cinema em uma superprodução estrelada por Cate Blanchett e Jack Black. Lewis Barnavelt, de apenas 10 anos, acaba de perder os pais e vai morar com o tio Jonathan Barnavel, mas ele espera encontrar uma pessoa comum... só que o tio é tudo, menos comum. Jonathan e sua vizinha, a Sra. Zimmermann, são bruxos! Lewis, que sempre desejou viver uma grande aventura, não poderia estar mais entusiasmado. No começo, assistir à magia é suficiente, mas então ele resolve experimentar a própria magia e, sem querer, ressuscita a antiga proprietária da casa: a temida Serenna Izard. Parece que Serenna e seu marido construíram um relógio nas paredes, e não qualquer relógio. Um relógio que pode aniquilar a humanidade. E somente os Barnavelts podem pará-lo!',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/o-misterio-do-relogio-na-parede.jpg',
      publishingCompany: 'Galera',
      publishYear: '2018',
      genderId: '65f31ea8c60b72e59511c8d2',
      AuthorBook: ['6051a5fe4a3d7e126c9d24bb'],
    },
    {
      name: 'O Hobbit',
      synopsis:
        'Bilbo Bolseiro era um dos mais respeitáveis hobbits de todo o Condado até que, um dia, o mago Gandalf bate à sua porta. A partir de então, toda sua vida pacata e campestre soprando anéis de fumaça com seu belo cachimbo começa a mudar. Ele é convocado a participar de uma aventura por ninguém menos do que Thorin Escudo-de-Carvalho, um príncipe do poderoso povo dos Anões.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/o-hobbit.jpg',
      publishingCompany: 'HarperCollins',
      publishYear: '2019',
      genderId: '65f31ea8c60b72e59511c8d2',
      AuthorBook: ['6051a5fe4a3d7e126c9d24bc'],
    },
    {
      name: 'O Exorcista',
      synopsis:
        'Inspirado no caso real do exorcismo de um adolescente, o escritor William Peter Blatty publicou em 1971 a perturbadora história de Chris MacNeil, uma atriz que sofre com inesperadas mudanças no comportamento da filha de 11 anos, Regan. Quando todos os esforços da ciência para descobrir o que há de errado com a menina falham e uma personalidade demoníaca parece vir à tona, Chris busca a ajuda da Igreja para tentar livrar a filha do que parece ser um raro caso de possessão. Cabe a Damien Karras, um padre da Universidade de Georgetown, salvar a alma de Regan.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/o-exorcista.jpg',
      publishingCompany: 'HarperCollins',
      publishYear: '2019',
      genderId: '65f31ea8c60b72e59511c8d5',
      AuthorBook: ['6061a5fe4a3d7e126c9d24bd'],
    },
    {
      name: 'O Cemitério',
      synopsis:
        'Às vezes, a morte é melhor. Esse é o conselho que chega aos ouvidos de Louis Creed, um jovem médico que se muda para uma pequena cidade do Maine. Com sua nova casa, seu trabalho na universidade e sua família feliz, Louis acredita que finalmente encontrou seu lugar, e a finitude da vida é a última coisa a passar pela sua cabeça. Até que, caminhando pelo bosque da vizinhança, ele encontra um terreno onde gerações de crianças enterraram seus animais de estimação. Além desses pequenos túmulos, há outro cemitério. Um que acabará se tornando irresistível, com suas forças sedutoras, capazes de tornar real o que sempre pareceu impossível.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/o-cemit%C3%A9rio.jpg',
      publishingCompany: 'Suma',
      publishYear: '2006',
      genderId: '65f31ea8c60b72e59511c8d5',
      AuthorBook: ['6051a5fe4a3d7e126c9d24be'],
    },
    {
      name: 'Toda Poesia',
      synopsis:
        'Paulo Leminski foi corajoso o bastante para se equilibrar entre duas enormes construções que rivalizavam na década de 1970, quando publicava seus primeiros versos: a poesia concreta, de feição mais erudita e super informada, e a lírica que florescia entre os jovens de vinte e poucos anos da chamada “geração mimeógrafo”. Ao conciliar a rigidez da construção formal e o mais genuíno coloquialismo, o autor praticou ao longo de sua vida um jogo de gato e rato com leitores e críticos. Se por um lado tinha pleno conhecimento do que se produzira de melhor na poesia - do Ocidente e do Oriente -, por outro parecia comprazer-se em mostrar um “à vontade” que não raro beirava o improviso, dando um nó na cabeça dos mais conservadores.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/toda-poesia.jpg',
      publishingCompany: 'Companhia das Letras',
      publishYear: '2013',
      genderId: '65f31ea9c60b72e59511c8d8',
      AuthorBook: ['6051a5fe4a3d7e126c9d24bf'],
    },
    {
      name: 'Textos Cruéis Demais para Serem Lidos Rapidamente: 1',
      synopsis:
        'Indo contra a tendência dos textos curtos e superficiais que são postados nas redes sociais, o coletivo literário Textos Crueis Demais para Serem Lidos Rapidamente (TCD) passou a produzir e compartilhar um conteúdo extenso, profundo e extremamente poético em suas páginas no Facebook e no Instagram. Com seus escritos e ilustrações, eles acabaram atingindo um público muito maior do que o esperado, nos mostrando como, apesar da crescente agilidade que nossa comunicação exige, ainda precisamos de tempo para digerir e entender nossas complexas relações humanas.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/textos-crueis-demais-para-serem-lidos-rapidamente-1.jpg',
      publishingCompany: 'Alt',
      publishYear: '2017',
      genderId: '65f31ea9c60b72e59511c8d8',
      AuthorBook: ['6051a5fe4a3d7e126c9d24c0'],
    },
    {
      name: 'Crônicas para Jovens: De Escrita e Vida',
      synopsis:
        'Segundo título da coleção que reúne crônicas de Clarice Lispector escolhidas por temas e selecionadas especialmente para os jovens que travam os primeiros contatos com a obra da autora, De Escrita e Vida traz as crônicas da escritora sobre o ofício de escrever. Depois de falar De Amor e Amizade no primeiro livro da coleção Crônicas para Jovens, os textos deste De Escrita e Vida revelam as alegrias, dores, angústias e, acima de tudo, a estreita ligação entre o simples ato de respirar e a necessidade de escrever da autora de A Hora da Estrela e A Paixão Segundo G. H., entre outros clássicos da literatura brasileira.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/cronicas-para-jovens-de-escrita-e-vida.jpg',
      publishingCompany: 'Rocco Jovens Leitores',
      publishYear: '2010',
      genderId: '65f31ea9c60b72e59511c8da',
      AuthorBook: ['6051a5fe4a3d7e126c9d24b2'],
    },
    {
      name: 'Pressa de Ser Feliz: Crônicas de um Ansioso',
      synopsis:
        'Textos inéditos do autor do blog Neologismo: o cotidiano de alguém que sabe ser feliz apesar da ansiedade. Matheus Rocha, autor do blog Neologismo, gosta de falar sobre a vida. E a vida tem dessas coisas: paixões, relacionamentos desencontrados e amores que marcam o coração. Ele acha, de verdade, que esse mundo pode ser um lugar bem legal pra se viver, e sonha em abraçar as pessoas por meio de suas palavras. Em Pressa de Ser Feliz, reuniu crônicas do cotidiano de um ansioso. É a experiência de alguém que, como todo mundo, aprende pouco a pouco a lidar com as loucuras da vida e com a urgência da felicidade.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/pressa-de-ser-feliz-Cr%C3%B4nicas-de-um-ansioso.jpg',
      publishingCompany: 'Planeta',
      publishYear: '2018',
      genderId: '65f31ea9c60b72e59511c8da',
      AuthorBook: ['6051a5fe4a3d7e126c9d24c1'],
    },
    {
      name: 'O Diário Perdido de Gravity Falls',
      synopsis:
        'Você possui em suas mãos o cobiçado diário do autor da série Gravity Falls, um tesouro de 288 páginas coloridas e sem dono, com segredos nunca antes revelados, monstros e mistérios da pacata cidade do Tivô Stan. Com ele, você irá aprender a trágica história de Ford, o paradeiro de Blendin, qual é a Dimensão 52 e como atrair um “ornitorrinco xadrez”. Mas cuidado: este é um livro desejado por muitas forças sombrias, por isso fique alerta se qualquer um quiser tirá-lo de você (especialmente se tiverem olhos amarelos e brilhantes). E, o mais importante, divirta-se. Afinal, não existe um lugar como Gravity Falls. Ou será que existe?',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/o-diario-perdido-de-gravity-falls.jpg',
      publishingCompany: 'Universo dos Livros',
      publishYear: '2021',
      genderId: '65f31ea9c60b72e59511c8db',
      AuthorBook: ['6051a5fe4a3d7e126c9d24c2'],
    },
    {
      name: 'A Ilha do Tesouro',
      synopsis:
        "Você ama histórias de piratas? Sim! Então, A Ilha do Tesouro é o seu livro ideal. Escrito por Robert Louis Stevenson, esta obra foi responsável por popularizar o papagaio no ombro, o 'X' do mapa do tesouro, a perna de pau e as batalhas épicas nos navios piratas. Um dos clássicos da literatura infantojuvenil, o livro conquistou o imaginário popular e tornou-se um ícone da literatura mundial, chegando a ser adaptado para o cinema. Prova disso é que não dá para pensar em tesouros sem imaginar um pirata! Mergulhe nessa incrível história de Jim Hawkins e sua aventura pelo mar!",
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/a-ilha-do-tesouro.jpg',
      publishingCompany: 'Camelot Editora',
      publishYear: '2022',
      genderId: '65f31ea9c60b72e59511c8db',
      AuthorBook: ['6051a5fe4a3d7e126c9d24c3'],
    },
    {
      name: 'A Dama de Espadas',
      synopsis:
        'Em uma roda de amigos em volta de uma mesa de baralho, a história da condessa e do misterioso segredo para vencer no jogo de cartas vem à tona e desperta a curiosidade do ambicioso Hermann. Ele então põe em prática seu plano para descobrir o mistério, mas mal pode imaginar com o que vai se deparar.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/a-dama-de-espadas.jpg',
      publishingCompany: 'Principis',
      publishYear: '2019',
      genderId: '65f31ea9c60b72e59511c8dc',
      AuthorBook: ['6051a5fe4a3d7e126c9d24c4'],
    },
    {
      name: 'Cidades Mortas e Outros Contos',
      synopsis:
        'Lobato apresenta a decadência socioeconômica das pequenas cidades do Vale do Paraíba, quando houve a queda da produção de café. Critica os habitantes dessas pequenas cidades que são soberbos, o desprezo pela honestidade e a exploração de trabalhadores. Denuncia a realidade econômica e política apresentando em cada personagem típicos encontrados na sociedade. Também faz duras críticas à literatura marasmática e cita o nome dos escritores Alberto de Oliveira e Bernardo Guimarães.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/cidades-mortas-e-outros-contos.jpg',
      publishingCompany: 'Principis',
      publishYear: '2019',
      genderId: '65f31ea9c60b72e59511c8dc',
      AuthorBook: ['6051a5fe4a3d7e126c9d24c5'],
    },
    {
      name: 'O Caso Evandro: Sete Acusados, Duas Polícias, o Corpo e uma Trama Diabólica',
      synopsis:
        "No início da década de 90, várias crianças desapareceram no Paraná. Em 6 de abril de 1992, na cidade de Guaratuba, litoral do estado, foi a vez do menino Evandro Ramos Caetano, de 6 anos. Poucos dias depois, seu corpo foi encontrado sem mãos, cabelos e vísceras, o que levou à suspeita de que ele fora sacrificado num ritual satânico. Passados três meses, numa reviravolta que deixou até os investigadores atônitos, sete pessoas ― incluindo a esposa e a filha do prefeito da cidade ― foram presas e confessaram o crime. O caso, que ficou conhecido como 'As bruxas de Guaratuba', teve imensa repercussão. Especulações sobre o crime diabólico preencheram páginas e mais páginas de jornais, e ocuparam a programação televisiva. Os desdobramentos judiciais se estenderam por cerca de três décadas. Neste livro reportagem, criado a partir da pesquisa feita para a quarta temporada do podcast Projeto Humanos, Ivan Mizanzuk conta como procedimentos investigativos contestáveis e denúncias de tortura puseram em xeque a validade não apenas do trabalho policial, mas também das confissões dos supostos culpados.",
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/o-caso-evandro-sete-acusados-duas-pol%C3%ADcias-o-corpo-e-uma-trama-diabolica.jpg',
      publishingCompany: 'HarperCollins',
      publishYear: '2021',
      genderId: '65f31ea8c60b72e59511c8d6',
      AuthorBook: ['6051a5fe4a3d7e126c9d24c6'],
    },
    {
      name: 'O Pior dos Crimes: A História do Assassinato de Isabella Nardoni',
      synopsis:
        'Construído em ritmo de thriller, O pior dos crimes esmiúça o caso da trágica morte de Isabella Nardoni, que conseguiu estremecer a opinião pública de um país rotineiramente violento. Em 29 de março de 2008, a menina de 5 anos foi atirada ainda com vida pela janela do apartamento do pai, Alexandre Nardoni, e da madrasta, Anna Carolina Jatobá, localizado no sexto andar de um edifício na zona norte de São Paulo. Isabella chegou ao hospital com vida, mas morreu pouco depois.',
      imageUrl:
        'https://lectio.s3.us-east-005.backblazeb2.com/books/o-pior-dos-crimes-a-historia-do-assassinato-de-isabella-nardoni.jpg',
      publishingCompany: 'Record',
      publishYear: '2018',
      genderId: '65f31ea8c60b72e59511c8d6',
      AuthorBook: ['6051a5fe4a3d7e126c9d24c7'],
    },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { name: book.name },
      update: {},
      create: {
        ...book,
        AuthorBook: {
          create: (book.AuthorBook as string[]).map(id => ({
            author: { connect: { id } },
          })),
        },
      },
    });
  }
}

export default bookRegistration;

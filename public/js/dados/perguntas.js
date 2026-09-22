// Banco de perguntas da Sociedade Real.
//
// Cada partida sorteia 12 perguntas deste banco, respeitando a mistura de
// níveis definida em `js/quiz.js` — é isso que segura a dificuldade no meio:
// quem nunca ouviu falar do assunto acerta as fáceis, quem leu alguma coisa
// briga pelas difíceis.
//
// `correta` é o índice da resposta certa dentro de `alternativas`; as
// alternativas são embaralhadas na hora de jogar, então a ordem aqui não
// aparece para ninguém.
//
// `prancha` aponta para uma chave de `pranchas.js` — é a imagem que aparece
// quando a pessoa responde.

export const PERGUNTAS = [
  // ——— Darwin ———
  {
    id: 'beagle',
    nivel: 'facil',
    pergunta: 'Em que navio Charles Darwin deu a volta ao mundo?',
    alternativas: ['HMS Beagle', 'HMS Endeavour', 'HMS Victory', 'HMS Challenger'],
    correta: 0,
    explicacao:
      'A viagem do HMS Beagle durou quase cinco anos (1831–1836). Darwin embarcou aos 22 anos, mais como companhia culta para o capitão FitzRoy do que como naturalista oficial — o posto veio na prática, a bordo.',
    prancha: 'beagle',
  },
  {
    id: 'galapagos',
    nivel: 'facil',
    pergunta: 'Em qual arquipélago Darwin observou os pássaros que ficariam famosos como "os tentilhões de Darwin"?',
    alternativas: ['Galápagos', 'Ilhas Canárias', 'Açores', 'Ilhas Malvinas'],
    correta: 0,
    explicacao:
      'Galápagos, no Equador, em 1835. Curiosidade: na hora Darwin não deu muita bola para os pássaros e quase não anotou de qual ilha veio cada um. Foi o ornitólogo John Gould, já em Londres, quem percebeu que eram espécies diferentes.',
    prancha: 'tentilhoes',
  },
  {
    id: 'origem',
    nivel: 'facil',
    pergunta: 'Qual livro de Darwin, publicado em 1859, apresentou a seleção natural ao mundo?',
    alternativas: [
      'A Origem das Espécies',
      'A Descendência do Homem',
      'Princípios de Geologia',
      'O Macaco Nu',
    ],
    correta: 0,
    explicacao:
      'A tiragem inteira, de cerca de 1.250 exemplares, foi tomada pelos livreiros logo no primeiro dia. "A Descendência do Homem" também é de Darwin, mas de 1871; "Princípios de Geologia" é de Charles Lyell; e "O Macaco Nu" é de 1967, de Desmond Morris.',
    prancha: 'origem',
  },
  {
    id: 'wallace-carta',
    nivel: 'media',
    pergunta: 'Darwin guardou sua teoria por mais de vinte anos. O que o fez publicar às pressas em 1859?',
    alternativas: [
      'Recebeu uma carta de outro naturalista com a mesma ideia',
      'Um pedido pessoal da rainha Vitória',
      'A descoberta de um fóssil que provava tudo',
      'Uma aposta com o capitão do Beagle',
    ],
    correta: 0,
    explicacao:
      'A carta era de Alfred Russel Wallace, que tinha chegado sozinho à seleção natural do outro lado do mundo. Os dois apresentaram o trabalho juntos em 1858, e no ano seguinte saiu o livro de Darwin.',
    prancha: 'wallace',
  },
  {
    id: 'wallace-onde',
    nivel: 'dificil',
    pergunta: 'Onde Wallace estava quando teve a mesma intuição de Darwin sobre a seleção natural?',
    alternativas: [
      'No sudeste asiático, entre as ilhas da Indonésia',
      'Na Amazônia',
      'Na África do Sul',
      'Na Austrália',
    ],
    correta: 0,
    explicacao:
      'Na ilha de Ternate, em 1858, tremendo de febre. Wallace tinha explorado a Amazônia antes — mas perdeu quase toda a coleção num incêndio no navio de volta. A ideia veio na segunda viagem, no arquipélago malaio.',
    prancha: 'wallace',
  },
  {
    id: 'cracas',
    nivel: 'dificil',
    pergunta: 'Antes de publicar sobre evolução, Darwin passou oito anos dissecando um único grupo de bichos. Quais?',
    alternativas: ['Cracas', 'Borboletas', 'Aranhas', 'Morcegos'],
    correta: 0,
    explicacao:
      'Oito anos e quatro volumes sobre cracas (1846–1854) — aqueles bichinhos grudados em casco de navio e pedra de praia. Era o jeito de provar aos colegas que ele era um naturalista sério antes de soltar a bomba.',
    prancha: 'darwin',
  },
  {
    id: 'huxley',
    nivel: 'dificil',
    pergunta: 'Quem ficou conhecido como "o buldogue de Darwin" por brigar em público pela teoria?',
    alternativas: [
      'Thomas Henry Huxley',
      'Richard Owen',
      'Charles Lyell',
      'Joseph Hooker',
    ],
    correta: 0,
    explicacao:
      'Huxley peitava bispo em debate público enquanto Darwin, tímido e doente, ficava em casa. Richard Owen, aliás, era justamente o rival: foi ele quem inventou a palavra "dinossauro".',
    prancha: 'huxley',
  },
  {
    id: 'darwin-tumulo',
    nivel: 'media',
    pergunta: 'Onde Darwin foi enterrado, em 1882?',
    alternativas: [
      'Na Abadia de Westminster, a poucos metros de Newton',
      'No quintal da própria casa, em Down',
      'No mar, como o capitão do Beagle',
      'Nas Galápagos',
    ],
    correta: 0,
    explicacao:
      'Ele queria ser enterrado no cemitério da vila onde morava. Mas amigos e cientistas pressionaram o Parlamento, e o país acabou dando a ele a honra máxima: a Abadia de Westminster, ao lado de Isaac Newton.',
    prancha: 'darwin',
  },

  // ——— Newton ———
  {
    id: 'newton-gravidade',
    nivel: 'facil',
    pergunta: 'Isaac Newton é lembrado sobretudo por explicar qual força?',
    alternativas: ['A gravidade', 'O magnetismo', 'A eletricidade', 'A força nuclear'],
    correta: 0,
    explicacao:
      'A mesma força que derruba a maçã mantém a Lua em órbita — essa era a sacada. A história da maçã na cabeça é lenda; a da maçã caindo no jardim foi contada pelo próprio Newton.',
    prancha: 'newton',
  },
  {
    id: 'principia',
    nivel: 'media',
    pergunta: 'Qual obra de 1687 apresentou as três leis do movimento e a lei da gravitação universal?',
    alternativas: [
      'Principia (Princípios Matemáticos da Filosofia Natural)',
      'Opticks',
      'Almagesto',
      'A Origem das Espécies',
    ],
    correta: 0,
    explicacao:
      'O Principia só existe porque Edmond Halley bancou a impressão do próprio bolso — a Royal Society tinha acabado de gastar o dinheiro do ano num livro sobre peixes que não vendeu.',
    prancha: 'principia',
  },
  {
    id: 'newton-moeda',
    nivel: 'dificil',
    pergunta: 'Que cargo público Newton ocupou nos últimos trinta anos de vida?',
    alternativas: [
      'Diretor da Casa da Moeda',
      'Médico particular do rei',
      'Bispo de Cambridge',
      'Almirante da frota',
    ],
    correta: 0,
    explicacao:
      'E levou o cargo a sério: caçava falsificadores pessoalmente, disfarçado em taverna, e mandou vários para a forca. O maior físico da história fechou a carreira como investigador de crime financeiro.',
    prancha: 'newton',
  },
  {
    id: 'prisma',
    nivel: 'facil',
    pergunta: 'O que Newton mostrou ao atravessar luz branca por um prisma?',
    alternativas: [
      'Que a luz branca é feita de várias cores misturadas',
      'Que a luz é feita de éter',
      'Que a luz não tem peso',
      'Que a luz é atraída pelo vidro',
    ],
    correta: 0,
    explicacao:
      'O truque foi usar um segundo prisma para juntar as cores de volta em branco. Isso matou a ideia antiga de que o vidro "sujava" a luz: a cor já estava lá.',
    prancha: 'prisma',
  },

  // ——— Faraday e Davy ———
  {
    id: 'faraday-inducao',
    nivel: 'media',
    pergunta: 'A indução eletromagnética, descoberta por Michael Faraday, é a base de qual invenção do dia a dia?',
    alternativas: [
      'O motor e o gerador elétricos',
      'A lâmpada incandescente',
      'O telefone',
      'A pilha',
    ],
    correta: 0,
    explicacao:
      'Todo motor que você tem em casa e toda usina que gera sua energia funcionam com o que Faraday descobriu em 1831. E ele quase não sabia matemática: aprendeu ciência encadernando livros numa gráfica.',
    prancha: 'faraday',
  },
  {
    id: 'faraday-natal',
    nivel: 'dificil',
    pergunta: 'Que tradição criada por Faraday na Royal Institution sobrevive até hoje?',
    alternativas: [
      'As Palestras de Natal para jovens',
      'O Prêmio Nobel',
      'A revista Nature',
      'A feira de ciências escolar',
    ],
    correta: 0,
    explicacao:
      'Desde 1825, todo Natal, uma palestra de ciência feita para quem não é cientista. Só parou durante a Segunda Guerra. Hoje vai ao ar pela BBC.',
    prancha: 'faraday',
  },
  {
    id: 'davy-lampada',
    nivel: 'media',
    pergunta: 'Humphry Davy inventou uma lâmpada que salvou milhares de vidas. Onde ela era usada?',
    alternativas: ['Nas minas de carvão', 'Nos faróis', 'Nos navios de guerra', 'Nos hospitais'],
    correta: 0,
    explicacao:
      'A chama ficava presa numa tela de metal fina, que dispersava o calor e impedia a explosão do gás da mina. Davy se recusou a patentear: disse que a ideia era dos mineiros. Ah, e foi ele quem contratou o jovem Faraday.',
    prancha: 'davy',
  },

  // ——— Lovelace e Babbage ———
  {
    id: 'lovelace-algoritmo',
    nivel: 'facil',
    pergunta: 'Ada Lovelace é lembrada por ter escrito, em 1843, o primeiro...',
    alternativas: [
      'Algoritmo feito para ser executado por uma máquina',
      'Computador eletrônico',
      'Livro de matemática escrito por uma mulher',
      'Manual de eletricidade',
    ],
    correta: 0,
    explicacao:
      'Era um roteiro para calcular números de Bernoulli na Máquina Analítica de Babbage. Nas notas, ela foi mais longe que todo mundo da época: escreveu que uma máquina assim poderia um dia compor música.',
    prancha: 'lovelace',
  },
  {
    id: 'lovelace-pai',
    nivel: 'media',
    pergunta: 'Ada Lovelace era filha de qual figura famosa?',
    alternativas: [
      'Do poeta Lord Byron',
      'De Charles Dickens',
      'Do Duque de Wellington',
      'De Charles Babbage',
    ],
    correta: 0,
    explicacao:
      'A mãe fez Ada estudar matemática pesada de propósito, com medo de que ela puxasse a "loucura poética" do pai. Deu no que deu: a poesia virou álgebra, e a álgebra virou programação.',
    prancha: 'lovelace',
  },
  {
    id: 'babbage',
    nivel: 'media',
    pergunta: 'Qual máquina Charles Babbage projetou no século XIX e nunca conseguiu terminar de construir?',
    alternativas: [
      'A Máquina Analítica',
      'O tear mecânico',
      'A máquina a vapor',
      'O telégrafo',
    ],
    correta: 0,
    explicacao:
      'No papel, ela tinha tudo o que um computador tem: memória, processador, entrada por cartão perfurado. Em 1991, o Museu de Ciências de Londres construiu uma versão anterior, a Máquina Diferencial, seguindo os planos originais — e ela funcionou.',
    prancha: 'babbage',
  },

  // ——— Hooke ———
  {
    id: 'hooke-celula',
    nivel: 'facil',
    pergunta: 'Ao olhar uma fatia de cortiça no microscópio, Robert Hooke batizou o que viu com um nome que usamos até hoje. Qual?',
    alternativas: ['Célula', 'Átomo', 'Micróbio', 'Tecido'],
    correta: 0,
    explicacao:
      'Os compartimentos vazios lembraram a ele as celas de um mosteiro — daí "célula". Ironia: ele estava olhando paredes de células mortas, não as células vivas em si.',
    prancha: 'micrographia',
  },
  {
    id: 'micrographia',
    nivel: 'dificil',
    pergunta: 'Qual livro de 1665 virou best-seller ao mostrar desenhos gigantes de pulgas e olhos de mosca vistos no microscópio?',
    alternativas: ['Micrographia', 'Principia', 'Historia Naturalis', 'Micromégas'],
    correta: 0,
    explicacao:
      'A pulga aparecia numa página dobrável enorme, em detalhe assustador. Samuel Pepys ficou acordado até as duas da manhã lendo e anotou no diário que era "o livro mais engenhoso que já li na vida".',
    prancha: 'micrographia',
  },

  // ——— Halley e Herschel ———
  {
    id: 'halley',
    nivel: 'facil',
    pergunta: 'Edmond Halley ficou famoso por prever o retorno de quê?',
    alternativas: ['De um cometa', 'De um eclipse', 'De uma praga', 'De uma tempestade'],
    correta: 0,
    explicacao:
      'Ele percebeu que três cometas vistos em 1531, 1607 e 1682 eram o mesmo, voltando a cada 76 anos, e cravou o retorno para 1758. Acertou — mas morreu em 1742, sem ver.',
    prancha: 'halley',
  },
  {
    id: 'herschel-urano',
    nivel: 'media',
    pergunta: 'Quem descobriu o planeta Urano, em 1781, com um telescópio caseiro no quintal, em Bath?',
    alternativas: ['William Herschel', 'Edmond Halley', 'Isaac Newton', 'Robert Hooke'],
    correta: 0,
    explicacao:
      'Herschel era músico de profissão e polia os próprios espelhos. Foi o primeiro planeta descoberto desde a Antiguidade. Ele quis batizá-lo de "Estrela de Jorge", em homenagem ao rei — o resto da Europa não aceitou.',
    prancha: 'herschel',
  },

  // ——— Mary Anning ———
  {
    id: 'anning-fosseis',
    nivel: 'media',
    pergunta: 'Mary Anning ficou famosa ainda adolescente por desenterrar o quê nas falésias de Lyme Regis?',
    alternativas: [
      'Esqueletos de répteis marinhos gigantes',
      'Ouro',
      'Ossos de mamute',
      'Um meteorito',
    ],
    correta: 0,
    explicacao:
      'O primeiro ictiossauro completo saiu dali quando ela tinha cerca de doze anos. Ela vendia fósseis para sustentar a família — e o trava-língua "she sells sea shells by the sea shore" provavelmente é sobre ela.',
    prancha: 'anning',
  },
  {
    id: 'anning-sociedade',
    nivel: 'media',
    pergunta: 'Por que Mary Anning nunca entrou para a Sociedade Geológica de Londres, mesmo com todas as descobertas?',
    alternativas: [
      'Porque era mulher, e mulheres não eram aceitas',
      'Porque não sabia ler',
      'Porque era estrangeira',
      'Porque recusou o convite',
    ],
    correta: 0,
    explicacao:
      'Cientistas homens compravam os fósseis dela, publicavam os artigos e esqueciam de citá-la. As primeiras mulheres só foram eleitas membras da Sociedade Geológica em 1919 — setenta e dois anos depois da morte de Anning.',
    prancha: 'anning',
  },

  // ——— Medicina e química ———
  {
    id: 'harvey-sangue',
    nivel: 'media',
    pergunta: 'O que William Harvey provou em 1628, contrariando mil e quinhentos anos de medicina?',
    alternativas: [
      'Que o sangue circula em circuito fechado, bombeado pelo coração',
      'Que o sangue é produzido no fígado e consumido pelo corpo',
      'Que o sangue serve para esfriar os órgãos',
      'Que o sangue carrega a alma',
    ],
    correta: 0,
    explicacao:
      'A conta é simples e devastadora: o coração bombeia mais sangue por hora do que o peso do corpo inteiro. Não tinha como ser produzido e consumido o tempo todo — só podia estar dando voltas.',
    prancha: 'harvey',
  },
  {
    id: 'jenner-vacina',
    nivel: 'facil',
    pergunta: 'Edward Jenner criou a primeira vacina da história. Contra qual doença?',
    alternativas: ['Varíola', 'Raiva', 'Peste negra', 'Tuberculose'],
    correta: 0,
    explicacao:
      'Ele notou que as ordenhadoras que pegavam varíola bovina não pegavam a humana. A palavra "vacina" vem daí: vacca, vaca em latim. A varíola é, até hoje, a única doença humana erradicada do planeta.',
    prancha: 'jenner',
  },
  {
    id: 'dalton-atomos',
    nivel: 'media',
    pergunta: 'O que John Dalton propôs no início do século XIX?',
    alternativas: [
      'Que cada elemento químico é feito de átomos próprios, todos iguais entre si',
      'Que tudo é feito de quatro elementos: terra, água, ar e fogo',
      'Que a matéria é contínua e pode ser dividida para sempre',
      'Que os átomos são feitos de prótons e elétrons',
    ],
    correta: 0,
    explicacao:
      'Dalton também foi o primeiro a descrever cientificamente a própria cegueira para cores — por isso a condição é chamada de daltonismo. Ele deixou os olhos para a ciência; foram analisados de novo em 1995.',
    prancha: 'dalton',
  },
  {
    id: 'nightingale',
    nivel: 'dificil',
    pergunta: 'Além de reformar a enfermagem, em que Florence Nightingale foi pioneira?',
    alternativas: [
      'Em usar gráficos e estatística para convencer o governo',
      'Na anestesia com clorofórmio',
      'No raio X',
      'Na transfusão de sangue',
    ],
    correta: 0,
    explicacao:
      'Ela inventou um diagrama circular colorido para mostrar que, na Guerra da Crimeia, a sujeira do hospital matava muito mais soldado do que os russos. Foi a primeira mulher eleita para a Sociedade Real de Estatística.',
    prancha: 'nightingale',
  },

  // ——— Século XX ———
  {
    id: 'foto51',
    nivel: 'media',
    pergunta: 'A "Foto 51", imagem de raios X que revelou o formato do DNA, saiu do laboratório de quem?',
    alternativas: [
      'Rosalind Franklin',
      'James Watson',
      'Francis Crick',
      'Alexander Fleming',
    ],
    correta: 0,
    explicacao:
      'Franklin e o estudante Raymond Gosling fizeram a imagem no King\'s College, em Londres. Ela foi mostrada a Watson sem que Franklin soubesse. Rosalind morreu em 1958, aos 37 anos, quatro anos antes do Nobel — que não é dado a quem já morreu.',
    prancha: 'foto51',
  },
  {
    id: 'dupla-helice',
    nivel: 'facil',
    pergunta: 'Que formato do DNA foi anunciado em Cambridge, em 1953?',
    alternativas: ['Dupla hélice', 'Anel fechado', 'Espiral simples', 'Rede triangular'],
    correta: 0,
    explicacao:
      'Watson e Crick entraram num pub de Cambridge no dia 28 de fevereiro de 1953 anunciando que tinham "descoberto o segredo da vida". O artigo na Nature tinha pouco mais de uma página.',
    prancha: 'foto51',
  },
  {
    id: 'hodgkin',
    nivel: 'dificil',
    pergunta: 'Dorothy Hodgkin ganhou o Nobel de Química de 1964 por revelar a estrutura de quais substâncias?',
    alternativas: [
      'Penicilina e vitamina B12',
      'Aspirina e morfina',
      'Clorofila e hemoglobina',
      'DNA e RNA',
    ],
    correta: 0,
    explicacao:
      'Ela mapeava moléculas disparando raios X em cristais — e fez isso com artrite reumatoide nas mãos desde os 24 anos. Depois desvendou também a insulina, projeto que perseguiu por 35 anos.',
    prancha: 'hodgkin',
  },
  {
    id: 'turing-bletchley',
    nivel: 'facil',
    pergunta: 'Onde Alan Turing trabalhou quebrando os códigos alemães durante a Segunda Guerra?',
    alternativas: [
      'Em Bletchley Park',
      'Na Torre de Londres',
      'Em Oxford',
      'No Museu Britânico',
    ],
    correta: 0,
    explicacao:
      'Uma mansão no interior com milhares de pessoas trabalhando em segredo absoluto. Estima-se que o trabalho ali tenha encurtado a guerra em cerca de dois anos. O segredo só foi aberto nos anos 1970.',
    prancha: 'enigma',
  },
  {
    id: 'teste-turing',
    nivel: 'media',
    pergunta: 'O que o "teste de Turing" tenta descobrir?',
    alternativas: [
      'Se uma máquina consegue conversar de um jeito indistinguível de uma pessoa',
      'Se um código secreto pode ser quebrado',
      'Quantas contas por segundo um computador faz',
      'Se um número muito grande é primo',
    ],
    correta: 0,
    explicacao:
      'Turing propôs em 1950 trocar a pergunta "máquinas podem pensar?", que ele achava vaga demais, por um jogo de imitação: se você conversa às cegas e não sabe dizer quem é quem, a discussão perdeu a graça.',
    prancha: 'enigma',
  },
  {
    id: 'hawking-catedra',
    nivel: 'dificil',
    pergunta: 'Em Cambridge, Stephen Hawking ocupou a mesma cátedra que já tinha sido de Isaac Newton. Qual?',
    alternativas: [
      'A Cátedra Lucasiana de Matemática',
      'A Cátedra Cavendish de Física',
      'A cadeira de Astrônomo Real',
      'A Cátedra Darwin de Biologia',
    ],
    correta: 0,
    explicacao:
      'Newton ocupou o cargo em 1669; Hawking, de 1979 a 2009. Babbage também esteve lá, entre os dois — e, segundo ele mesmo, nunca deu uma única aula.',
    prancha: 'buraco-negro',
  },
  {
    id: 'hawking-livro',
    nivel: 'facil',
    pergunta: 'Qual livro de Stephen Hawking, de 1988, vendeu mais de dez milhões de exemplares?',
    alternativas: [
      'Uma Breve História do Tempo',
      'Cosmos',
      'O Gene Egoísta',
      'A Origem das Espécies',
    ],
    correta: 0,
    explicacao:
      'O editor avisou que cada equação cortaria as vendas pela metade. Hawking deixou uma só: E = mc². "Cosmos" é de Carl Sagan e "O Gene Egoísta" é de Richard Dawkins — esse, sim, inglês.',
    prancha: 'buraco-negro',
  },
  {
    id: 'goodall',
    nivel: 'media',
    pergunta: 'O que Jane Goodall observou nos chimpanzés e obrigou a ciência a repensar o que separa humano de bicho?',
    alternativas: [
      'Que eles fabricam e usam ferramentas',
      'Que eles andam eretos o tempo todo',
      'Que eles vivem sozinhos',
      'Que eles não têm hierarquia',
    ],
    correta: 0,
    explicacao:
      'Ela viu um chimpanzé desfolhar um graveto para pescar cupins. O orientador dela respondeu por telegrama: agora temos que redefinir "ferramenta", redefinir "humano", ou aceitar os chimpanzés como gente.',
    prancha: 'chimpanze',
  },
  {
    id: 'fleming',
    nivel: 'facil',
    pergunta: 'Alexander Fleming descobriu a penicilina por causa de quê, em 1928?',
    alternativas: [
      'Um mofo que contaminou uma placa esquecida no laboratório',
      'Um experimento planejado por anos',
      'Uma receita antiga encontrada num livro',
      'Uma amostra trazida da África',
    ],
    correta: 0,
    explicacao:
      'Ele voltou das férias e viu que, em volta do mofo, as bactérias tinham morrido. Fleming era escocês, não inglês — mas a descoberta e o Nobel saíram do St. Mary\'s Hospital, em Londres.',
    prancha: 'penicilina',
  },
  {
    id: 'sociedade-real',
    nivel: 'dificil',
    pergunta: 'Fundada em 1660, a Royal Society adotou um lema em latim que resume o espírito da ciência inglesa. O que ele quer dizer?',
    alternativas: [
      '"Não acredite na palavra de ninguém"',
      '"O saber é poder"',
      '"Pela razão e pela fé"',
      '"A natureza não dá saltos"',
    ],
    correta: 0,
    explicacao:
      'O lema é "Nullius in verba". A ideia é justamente essa: não aceite porque alguém importante disse — vá lá e verifique. Newton, Darwin, Faraday, Franklin, Hodgkin e Hawking passaram todos por lá.',
    prancha: 'royal-society',
  },
];

// Quantas perguntas de cada nível entram numa partida.
// Soma = 12, que é o que cabe em 3 a 5 minutos com as explicações.
export const MISTURA = { facil: 5, media: 5, dificil: 2 };

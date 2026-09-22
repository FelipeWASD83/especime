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
// `area` é o assunto, e só existem três: 'bio' (biologia — evolução, fósseis,
// medicina, genética, bicho, planta), 'quimica' e 'fisica'. Pergunta que não
// cabe em nenhuma das três não entra no banco, e um teste cobra isso.
//
// Toda partida leva 10 de biologia e 2 de química ou física — quem manda nisso
// é `EXATAS_POR_PARTIDA`, lá embaixo.
//
// `prancha` aponta para uma chave de `pranchas.js` — é a imagem que aparece
// quando a pessoa responde.

export const PERGUNTAS = [
  // ——— Darwin ———
  {
    id: 'beagle',
    area: 'bio',
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
    area: 'bio',
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
    area: 'bio',
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
    area: 'bio',
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
    area: 'bio',
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
    area: 'bio',
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
    area: 'bio',
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
    area: 'bio',
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
    area: 'fisica',
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
    area: 'fisica',
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
    area: 'fisica',
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
    area: 'fisica',
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
    area: 'fisica',
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
    id: 'davy-lampada',
    area: 'quimica',
    nivel: 'media',
    pergunta: 'Humphry Davy inventou uma lâmpada que salvou milhares de vidas. Onde ela era usada?',
    alternativas: ['Nas minas de carvão', 'Nos faróis', 'Nos navios de guerra', 'Nos hospitais'],
    correta: 0,
    explicacao:
      'A chama ficava presa numa tela de metal fina, que dispersava o calor e impedia a explosão do gás da mina. Davy se recusou a patentear: disse que a ideia era dos mineiros. Ah, e foi ele quem contratou o jovem Faraday.',
    prancha: 'davy',
  },

  // ——— Lovelace e Babbage ———

  // ——— Hooke ———
  {
    id: 'hooke-celula',
    area: 'bio',
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
    area: 'bio',
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
    area: 'fisica',
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
    area: 'fisica',
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
    area: 'bio',
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
    area: 'bio',
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
    area: 'bio',
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
    area: 'bio',
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
    area: 'quimica',
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
    area: 'bio',
    nivel: 'media',
    pergunta: 'O que Florence Nightingale descobriu que estava matando os soldados ingleses na Guerra da Crimeia?',
    alternativas: [
      'A infecção dentro do próprio hospital, não os ferimentos de batalha',
      'A água salgada da travessia de navio',
      'O frio do inverno russo',
      'A falta de médicos no front',
    ],
    correta: 0,
    explicacao:
      'Ela contou as mortes uma a uma e inventou um diagrama circular colorido para provar: esgoto, superlotação e falta de ventilação matavam muito mais que os russos. Limpou o hospital e a mortalidade despencou — vinte anos antes de alguém aceitar a ideia de micróbio.',
    prancha: 'nightingale',
  },

  // ——— Século XX ———
  {
    id: 'foto51',
    area: 'bio',
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
    area: 'bio',
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
    area: 'quimica',
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
    id: 'hawking-catedra',
    area: 'fisica',
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
    area: 'fisica',
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
    area: 'bio',
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
    area: 'bio',
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
  // ——— Biologia: a teoria por dentro ———
  {
    id: 'selecao-natural',
    area: 'bio',
    nivel: 'facil',
    pergunta: 'Segundo a seleção natural, o que decide quais características passam para a geração seguinte?',
    alternativas: [
      'Quem deixa mais descendentes no ambiente em que vive',
      'O esforço que o bicho faz durante a própria vida',
      'A vontade da espécie de melhorar',
      'O tamanho e a força do animal, sempre',
    ],
    correta: 0,
    explicacao:
      'É uma ideia de contabilidade, não de heroísmo: nasce mais bicho do que cabe, os que se dão melhor naquele lugar deixam mais filhos, e o que eles tinham vai junto. Nenhuma espécie "quer" nada.',
    prancha: 'tentilhoes',
  },
  {
    id: 'beagle-anos',
    area: 'bio',
    nivel: 'facil',
    pergunta: 'Quanto tempo Darwin passou fora de casa na viagem do Beagle?',
    alternativas: ['Quase cinco anos', 'Seis meses', 'Doze anos', 'Trinta dias'],
    correta: 0,
    explicacao:
      'A viagem era para durar dois anos e durou quase cinco (1831–1836). Darwin enjoava no mar o tempo todo e passou a maior parte desses anos em terra firme, coletando.',
    prancha: 'beagle',
  },
  {
    id: 'descendencia-homem',
    area: 'bio',
    nivel: 'facil',
    pergunta: 'O que Darwin defendeu em "A Descendência do Homem", de 1871?',
    alternativas: [
      'Que o ser humano também vem de um ancestral comum com outros animais',
      'Que o ser humano é a única espécie que não evoluiu',
      'Que a vida chegou à Terra num meteoro',
      'Que as espécies nunca mudam',
    ],
    correta: 0,
    explicacao:
      'Em 1859 ele tinha desviado do assunto com uma frase só. Doze anos depois encarou de frente — e a imprensa da época respondeu desenhando Darwin com corpo de macaco.',
    prancha: 'chimpanze',
  },
  {
    id: 'goodall-onde',
    area: 'bio',
    nivel: 'facil',
    pergunta: 'Em que país Jane Goodall passou décadas observando chimpanzés selvagens?',
    alternativas: ['Tanzânia', 'Brasil', 'Índia', 'Austrália'],
    correta: 0,
    explicacao:
      'No parque de Gombe, na beira do lago Tanganica. Ela chegou lá em 1960, aos 26 anos, sem diploma universitário — e deu nome aos chimpanzés em vez de número, o que na época foi considerado pouco científico.',
    prancha: 'chimpanze',
  },
  {
    id: 'darwin-teologia',
    area: 'bio',
    nivel: 'media',
    pergunta: 'Qual curso Charles Darwin chegou a concluir antes de embarcar no Beagle?',
    alternativas: ['Teologia, para virar pastor', 'Medicina', 'Direito', 'Biologia'],
    correta: 0,
    explicacao:
      'Ele tinha começado medicina em Edimburgo e largou: não suportava assistir a cirurgia sem anestesia. O pai então o mandou estudar para pastor — carreira tranquila, com tempo de sobra para caçar besouro.',
    prancha: 'darwin',
  },
  {
    id: 'darwin-pombos',
    area: 'bio',
    nivel: 'media',
    pergunta: 'Que animal Darwin passou a criar no próprio quintal para entender como as espécies mudam?',
    alternativas: ['Pombos', 'Cavalos', 'Abelhas', 'Peixes'],
    correta: 0,
    explicacao:
      'Ele virou criador de pombos e frequentava os clubes de columbófilos de Londres. O argumento é esperto: se em poucas décadas o homem cria raças tão diferentes escolhendo quem cruza com quem, imagine o que a natureza faz em milhões de anos.',
    prancha: 'pombos',
  },
  {
    id: 'owen-dinossauro',
    area: 'bio',
    nivel: 'media',
    pergunta: 'Quem inventou a palavra "dinossauro", em 1842?',
    alternativas: [
      'Richard Owen',
      'Charles Darwin',
      'Mary Anning',
      'Thomas Henry Huxley',
    ],
    correta: 0,
    explicacao:
      'Owen juntou duas palavras gregas: "lagarto terrível". Foi ele quem fundou o Museu de História Natural de Londres — e foi também o maior inimigo público de Darwin, o que rende as melhores brigas da ciência vitoriana.',
    prancha: 'owen',
  },
  {
    id: 'snow-colera',
    area: 'bio',
    nivel: 'media',
    pergunta: 'Ao mapear as mortes por cólera em Londres, em 1854, John Snow descobriu que a doença vinha de onde?',
    alternativas: [
      'Da água de uma bomba pública da rua',
      'Do ar podre dos becos',
      'Dos ratos dos porões',
      'Da carne estragada do mercado',
    ],
    correta: 0,
    explicacao:
      'Ele desenhou cada morte no mapa do bairro e viu que as marcas cercavam uma bomba de água da Broad Street. Mandou tirar a manivela, e o surto parou. É o nascimento da epidemiologia — trinta anos antes de alguém enxergar a bactéria.',
    prancha: 'colera',
  },
  {
    id: 'lister-antissepsia',
    area: 'bio',
    nivel: 'media',
    pergunta: 'O que Joseph Lister introduziu nas cirurgias, derrubando a mortalidade nos hospitais?',
    alternativas: [
      'A antissepsia: matar o micróbio antes que ele infecte',
      'A anestesia com clorofórmio',
      'A transfusão de sangue',
      'O raio X',
    ],
    correta: 0,
    explicacao:
      'Ele leu Pasteur, concluiu que a infecção era coisa viva e passou a borrifar ácido carbólico em tudo — mão, instrumento, ferida. Os colegas riram por anos. Hoje o nome dele está no antisséptico bucal Listerine.',
    prancha: 'lister',
  },
  {
    id: 'jenner-origem',
    area: 'bio',
    nivel: 'media',
    pergunta: 'De onde Edward Jenner tirou o material da primeira vacina, em 1796?',
    alternativas: [
      'De uma ferida de varíola bovina na mão de uma ordenhadora',
      'Do sangue de uma vaca doente',
      'De uma planta trazida da Índia',
      'De um doente que já tinha se curado',
    ],
    correta: 0,
    explicacao:
      'A ordenhadora se chamava Sarah Nelmes. Jenner passou o material para o menino James Phipps, de oito anos, e depois o expôs à varíola humana de propósito — coisa que nenhum comitê de ética de hoje deixaria passar.',
    prancha: 'jenner',
  },
  {
    id: 'darwin-plantas',
    area: 'bio',
    nivel: 'media',
    pergunta: 'Darwin dedicou um livro inteiro, em 1875, a plantas que fazem o quê?',
    alternativas: [
      'Comem insetos',
      'Brilham no escuro',
      'Crescem sem nenhuma luz',
      'Mudam de cor conforme a estação',
    ],
    correta: 0,
    explicacao:
      'Ele ficou obcecado pela drósera, de folha pegajosa, e escreveu numa carta que se importava mais com ela do que com a origem de todas as espécies do mundo. Testou até com clara de ovo e urina para ver o que a planta digeria.',
    prancha: 'drosera',
  },
  {
    id: 'darwin-minhocas',
    area: 'bio',
    nivel: 'dificil',
    pergunta: 'O último livro de Darwin, publicado em 1881, é sobre qual bicho?',
    alternativas: ['A minhoca', 'A abelha', 'A formiga', 'O morcego'],
    correta: 0,
    explicacao:
      'Quarenta anos observando minhoca. Ele mostrou que elas reviram a terra inteira da Inglaterra e enterram ruínas romanas devagarinho, e ainda testou se elas ouviam piano. Vendeu mais que "A Origem das Espécies" no primeiro ano.',
    prancha: 'darwin',
  },
  {
    id: 'malthus',
    area: 'bio',
    nivel: 'dificil',
    pergunta: 'Que ideia de um economista inglês deu a Darwin a peça que faltava na teoria?',
    alternativas: [
      'Que nasce muito mais gente e bicho do que o alimento sustenta',
      'Que o comércio livre enriquece todas as nações',
      'Que o valor de tudo vem do trabalho empregado',
      'Que a moeda perde valor quando se imprime demais',
    ],
    correta: 0,
    explicacao:
      'Darwin leu Thomas Malthus em 1838 e caiu a ficha: se quase todos morrem antes de se reproduzir, quem sobra não é escolhido por acaso. A mesma leitura, anos depois, deu a mesma ideia a Wallace.',
    prancha: 'origem',
  },
  {
    id: 'lamarck',
    area: 'bio',
    nivel: 'dificil',
    pergunta: 'O que Lamarck propunha, e que a seleção natural veio contradizer?',
    alternativas: [
      'Que o que o bicho usa ou deixa de usar na vida passa para os filhos',
      'Que as espécies foram criadas todas de uma vez e nunca mudam',
      'Que a vida surgiu no fundo do mar',
      'Que os fósseis são pedras sem relação com bicho nenhum',
    ],
    correta: 0,
    explicacao:
      'Na versão de Lamarck, a girafa estica o pescoço a vida inteira e o filhote já nasce de pescoço comprido. Darwin não achava a ideia absurda — só insuficiente. Quem a enterrou de vez foi a genética, décadas depois.',
    prancha: 'origem',
  },
  {
    id: 'franklin-virus',
    area: 'bio',
    nivel: 'dificil',
    pergunta: 'Depois do DNA, Rosalind Franklin dedicou os últimos anos a estudar o quê?',
    alternativas: [
      'A estrutura de vírus',
      'A estrutura do osso humano',
      'O câncer de pulmão',
      'A fotossíntese',
    ],
    correta: 0,
    explicacao:
      'Ela montou em Londres um grupo que revelou a estrutura do vírus do mosaico do tabaco e chegou a trabalhar no vírus da pólio. Morreu em 1958, aos 37 anos, de câncer de ovário — provavelmente por causa da própria exposição aos raios X.',
    prancha: 'foto51',
  },

  // ——— Biologia: como a vida funciona ———
  {
    id: 'fotossintese',
    area: 'bio',
    nivel: 'facil',
    pergunta: 'O que a planta faz com a luz do sol, a água e o gás carbônico?',
    alternativas: [
      'Fabrica o próprio alimento e solta oxigênio',
      'Só esquenta, para não morrer de frio',
      'Fabrica água para as raízes',
      'Nada: ela come pela raiz, igual a gente',
    ],
    correta: 0,
    explicacao:
      'Fotossíntese. O detalhe que quase ninguém percebe: a maior parte do peso de uma árvore não veio do chão, veio do ar. É carbono que estava flutuando como gás e virou tronco.',
    prancha: 'drosera',
  },
  {
    id: 'coracao-camaras',
    area: 'bio',
    nivel: 'facil',
    pergunta: 'Quantas câmaras tem o coração humano?',
    alternativas: ['Quatro', 'Duas', 'Seis', 'Uma só'],
    correta: 0,
    explicacao:
      'Dois átrios em cima, dois ventrículos embaixo. Na prática são duas bombas coladas: a direita manda o sangue para o pulmão, a esquerda manda para o resto do corpo.',
    prancha: 'coracao',
  },
  {
    id: 'polinizacao',
    area: 'bio',
    nivel: 'facil',
    pergunta: 'O que a abelha faz sem querer enquanto busca néctar numa flor?',
    alternativas: [
      'Carrega pólen de uma flor para outra',
      'Aduba a planta',
      'Come as sementes',
      'Bebe a seiva do caule',
    ],
    correta: 0,
    explicacao:
      'O pólen gruda no corpo peludo dela e desce na próxima flor. Cerca de um terço do que a gente come depende disso. Darwin dizia que o trevo da Inglaterra dependia do mamangava, e o mamangava dependia de quantos gatos havia na região — porque gato come rato, e rato destrói ninho de abelha.',
    prancha: 'abelha',
  },
  {
    id: 'antibiotico-gripe',
    area: 'bio',
    nivel: 'media',
    pergunta: 'Por que antibiótico não resolve nada quando você está gripado?',
    alternativas: [
      'Porque gripe é vírus, e antibiótico só age em bactéria',
      'Porque a dose teria que ser muito maior',
      'Porque o vírus da gripe é forte demais',
      'Porque o antibiótico só funciona com febre alta',
    ],
    correta: 0,
    explicacao:
      'O antibiótico ataca coisas que só bactéria tem — parede celular, ribossomo próprio. Vírus não tem nada disso: ele sequestra a sua célula e usa a maquinaria dela. Tomar antibiótico à toa só ajuda a criar bactéria resistente.',
    prancha: 'penicilina',
  },
  {
    id: 'especie',
    area: 'bio',
    nivel: 'dificil',
    pergunta: 'O que normalmente separa duas populações de animais em espécies diferentes?',
    alternativas: [
      'Elas não geram descendentes férteis entre si',
      'Elas têm cores diferentes',
      'Elas vivem em países diferentes',
      'Elas têm tamanhos diferentes',
    ],
    correta: 0,
    explicacao:
      'Cavalo com jumento dá mula, e mula é estéril: por isso são espécies diferentes. A fronteira é mais borrada do que parece — existe bicho que cruza e dá filhote fértil de vez em quando, e é aí que a evolução fica interessante.',
    prancha: 'tentilhoes',
  },

  // ——— Química ———
  {
    id: 'agua-formula',
    area: 'quimica',
    nivel: 'facil',
    pergunta: 'De que é feita uma molécula de água?',
    alternativas: [
      'Dois átomos de hidrogênio e um de oxigênio',
      'Dois de oxigênio e um de hidrogênio',
      'Um de hidrogênio e um de carbono',
      'Um átomo só, o de água',
    ],
    correta: 0,
    explicacao:
      'H₂O. Os dois hidrogênios não ficam em linha reta: formam um V de 104,5 graus, e é essa tortinha que faz a água grudar em si mesma, subir pelo caule das plantas e congelar boiando em vez de afundar.',
    prancha: 'agua',
  },
  {
    id: 'tabela-periodica',
    area: 'quimica',
    nivel: 'facil',
    pergunta: 'O que a tabela periódica organiza?',
    alternativas: [
      'Os elementos químicos, em ordem de número de prótons',
      'Todas as substâncias que existem no mundo',
      'Os tipos de molécula conhecidos',
      'Os minerais encontrados na Terra',
    ],
    correta: 0,
    explicacao:
      'Mendeleiev montou a dele em 1869 e fez a coisa mais ousada possível: deixou buracos onde a conta não fechava e descreveu o elemento que ia caber ali. Quando o gálio apareceu, anos depois, era quase exatamente o que ele tinha previsto.',
    prancha: 'mendeleev',
  },
  {
    id: 'priestley-oxigenio',
    area: 'quimica',
    nivel: 'media',
    pergunta: 'O que aconteceu quando Joseph Priestley pôs um camundongo num vidro fechado com uma planta, em 1772?',
    alternativas: [
      'O camundongo sobreviveu, porque a planta repôs o ar',
      'Os dois morreram em poucos minutos',
      'A planta morreu e o camundongo viveu',
      'Nada: o vidro estourou',
    ],
    correta: 0,
    explicacao:
      'Sozinho num vidro fechado, o camundongo morria. Com uma planta junto, aguentava. Priestley tinha acabado de flagrar o oxigênio — que ele chamou de "ar desflogisticado", porque a química ainda acreditava numa substância chamada flogisto.',
    prancha: 'priestley',
  },
  {
    id: 'ph-escala',
    area: 'quimica',
    nivel: 'media',
    pergunta: 'O que a escala de pH mede?',
    alternativas: [
      'O quanto uma coisa é ácida ou básica',
      'A temperatura de um líquido',
      'A densidade de uma substância',
      'A quantidade de sal na água',
    ],
    correta: 0,
    explicacao:
      'Vai de 0 a 14, com o 7 no meio, que é a água pura. E cada degrau vale dez vezes: pH 4 não é "um pouco" mais ácido que pH 6, é cem vezes mais. O seu estômago fica perto de 1,5 — ácido o bastante para dissolver metal.',
    prancha: 'ph',
  },
  {
    id: 'carbono-diamante',
    area: 'quimica',
    nivel: 'media',
    pergunta: 'Diamante e grafite (a ponta do lápis) são feitos do mesmo elemento. Qual?',
    alternativas: ['Carbono', 'Silício', 'Cálcio', 'Ferro'],
    correta: 0,
    explicacao:
      'A diferença é só o arranjo: no diamante cada átomo se prende a quatro vizinhos numa pirâmide rígida; no grafite eles formam folhas que deslizam umas sobre as outras — por isso o lápis escreve. Mesmo átomo, mundos diferentes.',
    prancha: 'carbono',
  },
  {
    id: 'elemento-abundante',
    area: 'quimica',
    nivel: 'dificil',
    pergunta: 'Qual é o elemento mais abundante do universo?',
    alternativas: ['Hidrogênio', 'Oxigênio', 'Ferro', 'Carbono'],
    correta: 0,
    explicacao:
      'Hidrogênio, disparado — cerca de três quartos de toda a matéria comum. É o átomo mais simples que existe: um próton e um elétron. Todo o resto da tabela foi fabricado dentro de estrelas, a partir dele.',
    prancha: 'mendeleev',
  },

  // ——— Física ———
  {
    id: 'faraday-bobina',
    area: 'fisica',
    nivel: 'media',
    pergunta: 'O que acontece quando você enfia um ímã dentro de uma bobina de fio?',
    alternativas: [
      'Aparece corrente elétrica no fio, enquanto o ímã se move',
      'O fio esquenta e derrete',
      'O ímã perde a força',
      'Nada: ímã e fio não conversam',
    ],
    correta: 0,
    explicacao:
      'É a indução, de Faraday, em 1831 — e o detalhe é que só funciona com o ímã em movimento. Parou, acabou. Toda usina elétrica do mundo é uma versão grande disso: algo girando um ímã perto de uma bobina.',
    prancha: 'bobina',
  },
  {
    id: 'ceu-azul',
    area: 'fisica',
    nivel: 'media',
    pergunta: 'Por que o céu é azul?',
    alternativas: [
      'O ar espalha a luz azul muito mais do que a vermelha',
      'O céu reflete a cor do mar',
      'O oxigênio do ar é azul',
      'A camada de ozônio é azul',
    ],
    correta: 0,
    explicacao:
      'As moléculas do ar espalham a luz de onda curta (azul) com muito mais força que a de onda longa (vermelha), então o azul chega de todos os lados. No fim da tarde a luz atravessa mais ar, o azul se dispersa pelo caminho, e sobra o vermelho.',
    prancha: 'prisma',
  },
  {
    id: 'queda-livre',
    area: 'fisica',
    nivel: 'media',
    pergunta: 'Se você soltar uma pena e um martelo ao mesmo tempo dentro do vácuo, o que acontece?',
    alternativas: [
      'Os dois caem juntos e batem no chão ao mesmo tempo',
      'O martelo cai bem mais rápido',
      'A pena cai mais rápido, por ser leve',
      'Nenhum dos dois cai, porque no vácuo não há gravidade',
    ],
    correta: 0,
    explicacao:
      'No ar a pena perde porque o ar a segura, não porque é leve. Sem ar, a gravidade acelera tudo igual. Um astronauta da Apollo 15 fez exatamente esse teste na Lua, ao vivo, na frente das câmeras — e funcionou.',
    prancha: 'newton',
  },

];

// Quantas perguntas de cada nível entram numa partida.
// Soma = 12, que é o que cabe em 3 a 5 minutos com as explicações.
export const MISTURA = { facil: 5, media: 5, dificil: 2 };

// Quantas das 12 são de química ou física. Duas em doze = 17%, ou seja,
// 83% de biologia — que é o tema central do quiz.
export const EXATAS_POR_PARTIDA = 2;

// As três áreas que existem. Serve de contrato para o teste.
export const AREAS = ['bio', 'quimica', 'fisica'];

// A lógica da partida, sem tocar em tela nenhuma.
//
// Tudo aqui é função pura ou objeto simples — é por isso que dá para testar
// com `node --test` sem abrir navegador. Quem mexe no DOM é o `app.js`.

import { PERGUNTAS, MISTURA, EXATAS_POR_PARTIDA } from './dados/perguntas.js';

/** Embaralha uma cópia da lista (Fisher–Yates). */
export function embaralhar(lista, aleatorio = Math.random) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(aleatorio() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Embaralha as alternativas de uma pergunta e devolve uma cópia com o índice
 * da resposta certa já corrigido.
 */
export function embaralharAlternativas(pergunta, aleatorio = Math.random) {
  const certa = pergunta.alternativas[pergunta.correta];
  const alternativas = embaralhar(pergunta.alternativas, aleatorio);
  return { ...pergunta, alternativas, correta: alternativas.indexOf(certa) };
}

/**
 * Sorteia as perguntas de uma partida com duas garantias ao mesmo tempo:
 *
 *   1. o assunto — exatamente `EXATAS_POR_PARTIDA` perguntas de física,
 *      química e afins; todo o resto é biologia (10 de 12 = 83%);
 *   2. a dificuldade — a contagem de níveis da `mistura` (5 fáceis, 5 médias,
 *      2 difíceis).
 *
 * A ordem importa: as de exatas são sorteadas primeiro, de qualquer nível, e
 * a biologia preenche o que falta para fechar a cota de cada nível. Fosse ao
 * contrário, as perguntas difíceis de exatas nunca sairiam.
 */
export function sortearPerguntas(
  banco = PERGUNTAS,
  mistura = MISTURA,
  aleatorio = Math.random,
  exatas = EXATAS_POR_PARTIDA,
) {
  const total = Object.values(mistura).reduce((soma, n) => soma + n, 0);
  const escolhidas = embaralhar(
    banco.filter((p) => p.area === 'exatas'),
    aleatorio,
  ).slice(0, Math.min(exatas, total));

  // o que a biologia ainda precisa entregar em cada nível
  const cota = { ...mistura };
  for (const p of escolhidas) cota[p.nivel] = Math.max(0, (cota[p.nivel] ?? 0) - 1);

  for (const [nivel, quantidade] of Object.entries(cota)) {
    if (quantidade <= 0) continue;
    const doNivel = embaralhar(
      banco.filter((p) => p.area === 'bio' && p.nivel === nivel),
      aleatorio,
    );
    escolhidas.push(...doNivel.slice(0, quantidade));
  }

  // Banco pequeno demais para a mistura pedida: completa com o que sobrou,
  // biologia primeiro. Serve para não quebrar a partida, não para o uso normal.
  if (escolhidas.length < total) {
    const jaEscolhidas = new Set(escolhidas.map((p) => p.id));
    const resto = banco.filter((p) => !jaEscolhidas.has(p.id));
    const sobra = [
      ...embaralhar(resto.filter((p) => p.area === 'bio'), aleatorio),
      ...embaralhar(resto.filter((p) => p.area !== 'bio'), aleatorio),
    ];
    escolhidas.push(...sobra.slice(0, total - escolhidas.length));
  }

  return embaralhar(escolhidas, aleatorio).map((p) => embaralharAlternativas(p, aleatorio));
}

/** Cria o estado de uma partida nova. */
export function criarPartida(banco = PERGUNTAS, mistura = MISTURA, aleatorio = Math.random) {
  return {
    perguntas: sortearPerguntas(banco, mistura, aleatorio),
    indice: 0,
    respostas: [],
  };
}

export const perguntaAtual = (partida) => partida.perguntas[partida.indice] ?? null;

export const acabou = (partida) => partida.indice >= partida.perguntas.length;

export const acertos = (partida) => partida.respostas.filter((r) => r.acertou).length;

/**
 * Registra a resposta da pergunta atual. Responder duas vezes a mesma pergunta
 * não conta de novo — a segunda chamada devolve o que já estava registrado.
 */
export function responder(partida, escolha) {
  const pergunta = perguntaAtual(partida);
  if (!pergunta) return null;
  if (partida.respostas.length > partida.indice) {
    return partida.respostas[partida.indice];
  }

  const resposta = {
    id: pergunta.id,
    escolha,
    correta: pergunta.correta,
    acertou: escolha === pergunta.correta,
  };
  partida.respostas.push(resposta);
  return resposta;
}

/** Avança para a próxima pergunta. Devolve `false` quando a partida acabou. */
export function avancar(partida) {
  if (partida.respostas.length <= partida.indice) return false;
  partida.indice += 1;
  return !acabou(partida);
}

// Os postos da Sociedade Real, do mais baixo para o mais alto.
// `minimo` é a fração de acertos necessária.
export const POSTOS = [
  {
    minimo: 0,
    titulo: 'Visitante de domingo',
    texto: 'Você entrou no museu, olhou as vitrines e foi embora antes do café. Sem vergonha nenhuma: todo mundo começa assim — inclusive Darwin, que quase virou pastor.',
  },
  {
    minimo: 0.25,
    titulo: 'Aprendiz de naturalista',
    texto: 'Já sabe segurar a lupa e não confunde fóssil com pedra. Falta a paciência de passar oito anos estudando craca.',
  },
  {
    minimo: 0.5,
    titulo: 'Membro correspondente',
    texto: 'Você é aquele sujeito do interior que manda cartas para Londres com observações boas demais para serem ignoradas. Foi assim que Wallace começou.',
  },
  {
    minimo: 0.75,
    titulo: 'Fellow da Royal Society',
    texto: 'Pode escrever FRS depois do nome e sentar na mesma sala em que Newton brigou com Hooke. Comporte-se.',
  },
  {
    minimo: 0.95,
    titulo: 'Presidente da Royal Society',
    texto: 'Placar de quem já leu isso antes — ou chutou com uma sorte que a estatística reprova. Nullius in verba: nem eu acredito sem conferir.',
  },
];

/** Devolve o posto correspondente ao desempenho. */
export function postoPara(certas, total) {
  const fracao = total > 0 ? certas / total : 0;
  let posto = POSTOS[0];
  for (const candidato of POSTOS) {
    if (fracao >= candidato.minimo) posto = candidato;
  }
  return posto;
}

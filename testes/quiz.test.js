import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import {
  embaralhar, embaralharAlternativas, sortearPerguntas, criarPartida,
  perguntaAtual, responder, avancar, acabou, acertos, postoPara, POSTOS,
} from '../public/js/quiz.js';
import { PERGUNTAS, MISTURA } from '../public/js/dados/perguntas.js';
import { PRANCHAS } from '../public/js/dados/pranchas.js';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const TOTAL = Object.values(MISTURA).reduce((soma, n) => soma + n, 0);

// Sorteio previsível, para os testes não dependerem de sorte.
const dadoViciado = (valores) => {
  let i = 0;
  return () => valores[i++ % valores.length];
};

/* ───────────────────────── Banco de perguntas ───────────────────────── */

test('o banco tem perguntas suficientes para a mistura pedida', () => {
  for (const [nivel, quantidade] of Object.entries(MISTURA)) {
    const disponiveis = PERGUNTAS.filter((p) => p.nivel === nivel).length;
    assert.ok(
      disponiveis >= quantidade,
      `só existem ${disponiveis} perguntas de nível ${nivel}, e a partida pede ${quantidade}`,
    );
  }
});

test('toda pergunta está bem formada', () => {
  const vistos = new Set();
  for (const pergunta of PERGUNTAS) {
    assert.ok(!vistos.has(pergunta.id), `id repetido: ${pergunta.id}`);
    vistos.add(pergunta.id);

    assert.ok(['facil', 'media', 'dificil'].includes(pergunta.nivel), `nível inválido em ${pergunta.id}`);
    assert.equal(pergunta.alternativas.length, 4, `${pergunta.id} não tem 4 alternativas`);
    assert.ok(
      pergunta.correta >= 0 && pergunta.correta < pergunta.alternativas.length,
      `índice da resposta certa fora da faixa em ${pergunta.id}`,
    );
    assert.equal(
      new Set(pergunta.alternativas).size, 4,
      `${pergunta.id} tem alternativa repetida`,
    );
    assert.ok(pergunta.pergunta.trim().length > 10, `pergunta curta demais em ${pergunta.id}`);
    assert.ok(pergunta.explicacao.trim().length > 30, `explicação curta demais em ${pergunta.id}`);
  }
});

test('toda pergunta aponta para uma prancha que existe', () => {
  for (const pergunta of PERGUNTAS) {
    assert.ok(
      Object.hasOwn(PRANCHAS, pergunta.prancha),
      `${pergunta.id} aponta para a prancha inexistente "${pergunta.prancha}"`,
    );
  }
});

test('toda prancha de foto tem arquivo no disco', () => {
  for (const [chave, prancha] of Object.entries(PRANCHAS)) {
    if (prancha.tipo !== 'foto') {
      assert.ok(prancha.svg?.startsWith('<svg'), `prancha desenhada "${chave}" sem SVG`);
      continue;
    }
    const caminho = join(RAIZ, 'public', 'img', 'pranchas', prancha.arquivo);
    assert.ok(existsSync(caminho), `falta o arquivo da prancha "${chave}": ${prancha.arquivo}`);
  }
});

test('toda prancha tem nome, legenda e nota', () => {
  for (const [chave, prancha] of Object.entries(PRANCHAS)) {
    for (const campo of ['nome', 'legenda', 'nota']) {
      assert.ok(prancha[campo]?.trim(), `prancha "${chave}" sem ${campo}`);
    }
  }
});

/* ───────────────────────────── Embaralhar ───────────────────────────── */

test('embaralhar não perde nem inventa item', () => {
  const original = [1, 2, 3, 4, 5, 6];
  const mexido = embaralhar(original, dadoViciado([0.9, 0.1, 0.5, 0.3, 0.7]));
  assert.deepEqual([...mexido].sort(), [...original].sort());
  assert.deepEqual(original, [1, 2, 3, 4, 5, 6], 'a lista original não pode ser alterada');
});

test('embaralhar as alternativas mantém a resposta certa apontando para o mesmo texto', () => {
  for (const pergunta of PERGUNTAS) {
    const textoCerto = pergunta.alternativas[pergunta.correta];
    for (let tentativa = 0; tentativa < 30; tentativa += 1) {
      const mexida = embaralharAlternativas(pergunta);
      assert.equal(mexida.alternativas[mexida.correta], textoCerto, `quebrou em ${pergunta.id}`);
      assert.equal(mexida.alternativas.length, 4);
    }
  }
});

/* ────────────────────────────── Sorteio ─────────────────────────────── */

test('a partida sorteia a quantidade certa, sem repetir pergunta', () => {
  for (let rodada = 0; rodada < 50; rodada += 1) {
    const sorteadas = sortearPerguntas();
    assert.equal(sorteadas.length, TOTAL);
    assert.equal(new Set(sorteadas.map((p) => p.id)).size, TOTAL, 'pergunta repetida na partida');
  }
});

test('a partida respeita a mistura de níveis', () => {
  for (let rodada = 0; rodada < 30; rodada += 1) {
    const sorteadas = sortearPerguntas();
    for (const [nivel, quantidade] of Object.entries(MISTURA)) {
      const contagem = sorteadas.filter((p) => p.nivel === nivel).length;
      assert.equal(contagem, quantidade, `esperava ${quantidade} de nível ${nivel}, veio ${contagem}`);
    }
  }
});

test('mistura maior que o banco não quebra a partida', () => {
  const banco = PERGUNTAS.slice(0, 6);
  const sorteadas = sortearPerguntas(banco, { facil: 50, media: 50, dificil: 50 });
  assert.equal(sorteadas.length, 6, 'deveria entregar tudo o que existe, sem repetir');
  assert.equal(new Set(sorteadas.map((p) => p.id)).size, 6);
});

/* ─────────────────────────── Jogar a partida ────────────────────────── */

test('responder certo conta ponto e responder de novo não conta duas vezes', () => {
  const partida = criarPartida();
  const pergunta = perguntaAtual(partida);

  const primeira = responder(partida, pergunta.correta);
  assert.equal(primeira.acertou, true);
  assert.equal(acertos(partida), 1);

  const segunda = responder(partida, (pergunta.correta + 1) % 4);
  assert.deepEqual(segunda, primeira, 'a segunda resposta não pode substituir a primeira');
  assert.equal(partida.respostas.length, 1);
  assert.equal(acertos(partida), 1);
});

test('responder errado não conta ponto', () => {
  const partida = criarPartida();
  const pergunta = perguntaAtual(partida);
  const resposta = responder(partida, (pergunta.correta + 2) % 4);
  assert.equal(resposta.acertou, false);
  assert.equal(acertos(partida), 0);
});

test('não dá para avançar sem responder', () => {
  const partida = criarPartida();
  assert.equal(avancar(partida), false);
  assert.equal(partida.indice, 0);
});

test('a partida termina depois da última pergunta', () => {
  const partida = criarPartida();
  for (let i = 0; i < TOTAL; i += 1) {
    assert.equal(acabou(partida), false);
    responder(partida, perguntaAtual(partida).correta);
    avancar(partida);
  }
  assert.equal(acabou(partida), true);
  assert.equal(perguntaAtual(partida), null);
  assert.equal(acertos(partida), TOTAL);
  assert.equal(responder(partida, 0), null, 'responder depois do fim não pode registrar nada');
});

/* ───────────────────────────── Os postos ────────────────────────────── */

test('o posto sobe junto com o acerto e nunca fica sem resposta', () => {
  let anterior = -1;
  for (let certas = 0; certas <= 12; certas += 1) {
    const posto = postoPara(certas, 12);
    assert.ok(posto?.titulo, `sem posto para ${certas}/12`);
    const nivel = POSTOS.indexOf(posto);
    assert.ok(nivel >= anterior, 'o posto não pode cair quando o acerto sobe');
    anterior = nivel;
  }
  assert.equal(postoPara(0, 12), POSTOS[0]);
  assert.equal(postoPara(12, 12), POSTOS.at(-1));
});

test('zero perguntas não quebra o posto', () => {
  assert.equal(postoPara(0, 0), POSTOS[0]);
});

// Testes do site publicado: as páginas fixas, os créditos e o que o
// navegador de quem visita vai buscar. Complementam os testes da partida.

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

import { PERGUNTAS } from '../public/js/dados/perguntas.js';
import { PRANCHAS } from '../public/js/dados/pranchas.js';

const PUBLICO = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const ler = (caminho) => readFileSync(join(PUBLICO, caminho), 'utf-8');

const PAGINAS = [
  'index.html', '404.html',
  'privacidade/index.html', 'termos/index.html', 'creditos/index.html',
];

function arquivos(pasta) {
  return readdirSync(pasta).flatMap((nome) => {
    const caminho = join(pasta, nome);
    return statSync(caminho).isDirectory() ? arquivos(caminho) : [caminho];
  });
}

test('as páginas fixas existem', () => {
  for (const pagina of PAGINAS) {
    assert.ok(existsSync(join(PUBLICO, pagina)), `falta ${pagina}`);
  }
});

test('todas as páginas têm o rodapé com contatos e links legais', () => {
  for (const pagina of PAGINAS) {
    const html = ler(pagina);
    for (const trecho of [
      'href="/privacidade/"', 'href="/termos/"', 'href="/creditos/"',
      'mailto:felipe.sites0@gmail.com', 'instagram.com/felipesites/',
      'instagram.com/felipe.wasd/', 'wa.me/5531984465713',
    ]) {
      assert.ok(html.includes(trecho), `${pagina} está sem ${trecho}`);
    }
  }
});

test('o nome antigo não aparece em lugar nenhum do site', () => {
  for (const caminho of arquivos(PUBLICO)) {
    if (!/\.(html|js|css|txt|xml)$/.test(caminho)) continue;
    const texto = readFileSync(caminho, 'utf-8');
    assert.ok(!texto.includes('Sociedade Real'), `${relative(PUBLICO, caminho)} ainda diz "Sociedade Real"`);
  }
});

test('nenhuma página busca nada em outro servidor', () => {
  // Fonte, script e folha de estilo vêm todos daqui: é o que deixa a política
  // de privacidade verdadeira ("nada sai do seu navegador") e o 4G mais rápido.
  for (const caminho of arquivos(PUBLICO)) {
    if (!/\.(html|css|js)$/.test(caminho)) continue;
    const texto = readFileSync(caminho, 'utf-8');
    // <link rel="canonical"> só declara o endereço oficial do site: não baixa nada
    const semCanonico = texto.replace(/<link rel="canonical"[^>]*>/g, '');
    const externos = [
      ...semCanonico.matchAll(/<(?:script|link|img)[^>]+(?:src|href)="(https?:\/\/[^"]+)"/g),
      ...texto.matchAll(/url\(['"]?(https?:\/\/[^'")]+)/g),
    ].map((m) => m[1]);
    assert.deepEqual(externos, [], `${relative(PUBLICO, caminho)} carrega de fora: ${externos.join(', ')}`);
  }
});

test('toda prancha de foto tem crédito publicado e miniatura', () => {
  // As imagens CC BY exigem crédito visível para quem vê o site.
  const creditos = ler('creditos/index.html');
  for (const [chave, prancha] of Object.entries(PRANCHAS)) {
    if (prancha.tipo !== 'foto') continue;
    assert.ok(
      creditos.includes(`/img/miniaturas/${prancha.arquivo}`),
      `a prancha "${chave}" não aparece na página de créditos`,
    );
    assert.ok(
      existsSync(join(PUBLICO, 'img', 'miniaturas', prancha.arquivo)),
      `falta a miniatura da prancha "${chave}"`,
    );
  }
});

test('toda prancha é usada por alguma pergunta', () => {
  const usadas = new Set(PERGUNTAS.map((p) => p.prancha));
  const sobrando = Object.keys(PRANCHAS).filter((chave) => !usadas.has(chave));
  assert.deepEqual(sobrando, [], `pranchas que nenhuma pergunta usa: ${sobrando.join(', ')}`);
});

test('nenhuma imagem de prancha ficou sem registro', () => {
  const registradas = new Set(
    Object.values(PRANCHAS).filter((p) => p.tipo === 'foto').map((p) => p.arquivo),
  );
  for (const pasta of ['pranchas', 'miniaturas']) {
    for (const nome of readdirSync(join(PUBLICO, 'img', pasta))) {
      assert.ok(registradas.has(nome), `img/${pasta}/${nome} está no site mas não em pranchas.js`);
    }
  }
});

test('as fontes estão no site, com a licença junto', () => {
  const css = ler('css/estilo.css');
  for (const fonte of [...css.matchAll(/url\('(\/fontes\/[^']+)'\)/g)].map((m) => m[1])) {
    assert.ok(existsSync(join(PUBLICO, fonte)), `o CSS aponta para ${fonte}, que não existe`);
  }
  assert.ok(existsSync(join(PUBLICO, 'fontes', 'LICENCA-OFL.txt')), 'falta a licença das fontes');
});

test('a página inicial não tem mais o aviso de cadastro', () => {
  assert.ok(!ler('index.html').includes('Sem cadastro, sem conta'), 'o aviso voltou para a capa');
});

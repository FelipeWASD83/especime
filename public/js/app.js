// Liga a lógica da partida (`quiz.js`) na tela.
//
// Tudo que é regra do jogo mora em `quiz.js`; aqui só se pinta, se anima e se
// escuta clique.

import {
  criarPartida, perguntaAtual, responder, avancar, acabou, acertos, postoPara,
} from './quiz.js';
import { PERGUNTAS } from './dados/perguntas.js';
import { PRANCHAS } from './dados/pranchas.js';

const $ = (selecao) => document.querySelector(selecao);
const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F'];
const semMovimento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const telas = {
  capa: $('#tela-capa'),
  quiz: $('#tela-quiz'),
  resultado: $('#tela-resultado'),
};
const rodape = $('#rodape');

let partida = null;

/* ── Troca de tela ─────────────────────────────────────────────── */

// A troca é comandada por relógio, não pelo evento de fim de animação:
// aba em segundo plano não dispara `animationend`, e a tela ficaria travada.
function mostrarTela(nome) {
  const atual = Object.values(telas).find((t) => t.classList.contains('tela--ativa'));
  const proxima = telas[nome];
  if (atual === proxima) return;

  const SAIDA = 200; // igual à animação `tela-sai` do CSS
  const ENTRADA = 420; // igual à animação `tela-entra`

  const entrar = () => {
    if (atual) {
      atual.classList.remove('tela--ativa', 'tela--saindo');
      atual.hidden = true;
    }
    proxima.hidden = false;
    proxima.classList.add('tela--ativa', 'tela--entrando');
    setTimeout(() => proxima.classList.remove('tela--entrando'), ENTRADA + 60);
    rodape.hidden = nome === 'quiz';
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (atual && !semMovimento()) {
    atual.classList.add('tela--saindo');
    setTimeout(entrar, SAIDA);
  } else {
    entrar();
  }
}

/* ── Capa: a fita do acervo ────────────────────────────────────── */

function montarFita() {
  const fita = $('#galeria-fita');
  const fotos = Object.entries(PRANCHAS).filter(([, p]) => p.tipo === 'foto');
  const trilho = document.createElement('div');
  trilho.className = 'galeria__trilho';

  // duas voltas do mesmo conjunto: é o que faz o desfile parecer sem fim
  for (let volta = 0; volta < 2; volta += 1) {
    for (const [chave, prancha] of fotos) {
      const peca = document.createElement('div');
      peca.className = 'galeria__peca';
      const img = document.createElement('img');
      img.src = `img/pranchas/${prancha.arquivo}`;
      img.alt = volta === 0 ? prancha.nome : '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.dataset.chave = chave;
      peca.append(img);
      trilho.append(peca);
    }
  }
  fita.append(trilho);
}

// Os números de capa saem dos dados, não da cabeça de quem escreveu o HTML:
// acrescentar pergunta ou prancha atualiza a capa sozinho.
function preencherNumeros() {
  const pranchas = Object.keys(PRANCHAS).length;
  $('.hero__pe').textContent = `${PERGUNTAS.length} perguntas · ${pranchas} pranchas`;
  $('#conta-pranchas').textContent = String(pranchas);
}

/* ── Partida ───────────────────────────────────────────────────── */

function comecar() {
  partida = criarPartida();
  mostrarTela('quiz');
  pintarPergunta();
}

function pintarPergunta() {
  const pergunta = perguntaAtual(partida);
  if (!pergunta) return;

  const total = partida.perguntas.length;
  const numero = partida.indice + 1;
  $('#contador').textContent = `Pergunta ${String(numero).padStart(2, '0')} / ${total}`;

  const barra = $('.progresso');
  barra.setAttribute('aria-valuemax', String(total));
  barra.setAttribute('aria-valuenow', String(partida.indice));
  $('#progresso-tinta').style.width = `${(partida.indice / total) * 100}%`;

  $('#pergunta').textContent = pergunta.pergunta;

  const lista = $('#alternativas');
  lista.replaceChildren();
  pergunta.alternativas.forEach((texto, i) => {
    const item = document.createElement('li');
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'alternativa';
    botao.dataset.indice = String(i);
    botao.innerHTML =
      `<span class="alternativa__mancha" aria-hidden="true"></span>` +
      `<span class="alternativa__letra">${LETRAS[i]}</span>` +
      `<span class="alternativa__texto"></span>` +
      `<span class="alternativa__lacre" aria-hidden="true">✓</span>`;
    botao.querySelector('.alternativa__texto').textContent = texto;
    botao.addEventListener('click', (evento) => escolher(i, botao, evento));
    item.append(botao);
    lista.append(item);
  });

  const veredito = $('#veredito');
  veredito.hidden = true;
  veredito.classList.remove('veredito--acertou', 'veredito--errou');

  const carta = $('#carta');
  carta.classList.remove('carta--vira');
  void carta.offsetWidth; // reinicia a animação
  carta.classList.add('carta--vira');
}

function escolher(indice, botao, evento) {
  const pergunta = perguntaAtual(partida);
  if (!pergunta) return;
  const resposta = responder(partida, indice);
  if (!resposta) return;

  // a mancha de tinta abre a partir do ponto exato do clique
  const caixa = botao.getBoundingClientRect();
  if (evento && evento.clientX) {
    botao.style.setProperty('--x', `${((evento.clientX - caixa.left) / caixa.width) * 100}%`);
    botao.style.setProperty('--y', `${((evento.clientY - caixa.top) / caixa.height) * 100}%`);
  }
  botao.classList.add('alternativa--pingando');

  for (const alternativa of document.querySelectorAll('.alternativa')) {
    alternativa.disabled = true;
    const i = Number(alternativa.dataset.indice);
    if (i === pergunta.correta) alternativa.classList.add('alternativa--certa');
    else if (i === indice) alternativa.classList.add('alternativa--errada');
  }

  const total = partida.perguntas.length;
  $('#progresso-tinta').style.width = `${((partida.indice + 1) / total) * 100}%`;
  $('.progresso').setAttribute('aria-valuenow', String(partida.indice + 1));

  mostrarVeredito(pergunta, resposta);
}

function mostrarVeredito(pergunta, resposta) {
  const veredito = $('#veredito');
  veredito.classList.add(resposta.acertou ? 'veredito--acertou' : 'veredito--errou');
  $('#veredito-titulo').textContent = resposta.acertou
    ? sortear(['Isso mesmo.', 'Exato.', 'Na mosca.', 'Correto.'])
    : sortear(['Não foi dessa vez.', 'Quase.', 'Errou essa.', 'Não era essa.']);
  $('#explicacao').textContent = pergunta.explicacao;

  const ultima = partida.indice === partida.perguntas.length - 1;
  $('#rotulo-proxima').textContent = ultima ? 'Ver meu resultado' : 'Próxima';

  const prancha = PRANCHAS[pergunta.prancha];
  const moldura = $('#prancha-moldura');
  moldura.replaceChildren();
  if (prancha) {
    if (prancha.tipo === 'foto') {
      const img = document.createElement('img');
      img.src = `img/pranchas/${prancha.arquivo}`;
      img.alt = prancha.nome;
      img.decoding = 'async';
      moldura.append(img);
    } else {
      moldura.insertAdjacentHTML('beforeend', prancha.svg);
    }
    $('#prancha-etiqueta').textContent =
      `Prancha ${String(partida.indice + 1).padStart(2, '0')} · ${prancha.legenda}`;
    $('#prancha-nome').textContent = prancha.nome;
    $('#prancha-nota').textContent = prancha.nota;
  }

  veredito.hidden = false;
  const figura = $('#prancha');
  figura.classList.remove('prancha--revela');
  void figura.offsetWidth;
  figura.classList.add('prancha--revela');

  if (!semMovimento()) {
    veredito.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function proxima() {
  if (avancar(partida)) {
    pintarPergunta();
  } else if (acabou(partida)) {
    mostrarResultado();
  }
}

/* ── Resultado ─────────────────────────────────────────────────── */

function mostrarResultado() {
  const certas = acertos(partida);
  const total = partida.perguntas.length;
  const posto = postoPara(certas, total);

  $('#placar-total').textContent = String(total);
  $('#posto-titulo').textContent = posto.titulo;
  $('#posto-texto').textContent = posto.texto;
  $('#rotulo-copiar').textContent = 'Copiar meu resultado';

  const lista = $('#revisao-lista');
  lista.replaceChildren();
  partida.perguntas.forEach((pergunta, i) => {
    const resposta = partida.respostas[i];
    const item = document.createElement('li');
    item.className = `revisao__item revisao__item--${resposta.acertou ? 'certa' : 'errada'}`;

    const marca = document.createElement('span');
    marca.className = 'revisao__marca';
    marca.textContent = resposta.acertou ? '✓' : '✗';

    const corpo = document.createElement('div');
    const titulo = document.createElement('p');
    titulo.className = 'revisao__pergunta';
    titulo.textContent = pergunta.pergunta;

    const detalhe = document.createElement('p');
    detalhe.className = 'revisao__resposta';
    if (resposta.acertou) {
      detalhe.innerHTML = 'Resposta: <b></b>';
      detalhe.querySelector('b').textContent = pergunta.alternativas[pergunta.correta];
    } else {
      detalhe.innerHTML =
        'Você marcou <span class="revisao__sua"></span> — a resposta era <b></b>';
      detalhe.querySelector('.revisao__sua').textContent = pergunta.alternativas[resposta.escolha];
      detalhe.querySelector('b').textContent = pergunta.alternativas[pergunta.correta];
    }

    corpo.append(titulo, detalhe);
    item.append(marca, corpo);
    lista.append(item);
  });

  mostrarTela('resultado');
  animarPlacar(certas);
}

function animarPlacar(certas) {
  const alvo = $('#placar-certas');
  // o número certo entra primeiro: se a contagem não rodar (aba em segundo
  // plano), o placar continua verdadeiro
  alvo.textContent = String(certas);
  if (semMovimento() || certas === 0) return;

  const duracao = 900;
  const inicio = performance.now();
  const passo = (agora) => {
    const andamento = Math.min((agora - inicio) / duracao, 1);
    const suave = 1 - (1 - andamento) ** 3;
    alvo.textContent = String(Math.round(suave * certas));
    if (andamento < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

async function copiarResultado() {
  const certas = acertos(partida);
  const total = partida.perguntas.length;
  const posto = postoPara(certas, total);
  const texto =
    `Sociedade Real — quiz sobre os cientistas da Inglaterra\n` +
    `${certas}/${total} · ${posto.titulo}\n` +
    `${window.location.origin}${window.location.pathname}`;

  const rotulo = $('#rotulo-copiar');
  try {
    await navigator.clipboard.writeText(texto);
    rotulo.textContent = 'Copiado!';
  } catch {
    rotulo.textContent = `${certas}/${total} — ${posto.titulo}`;
  }
  setTimeout(() => { rotulo.textContent = 'Copiar meu resultado'; }, 2600);
}

/* ── Miudezas ──────────────────────────────────────────────────── */

const sortear = (lista) => lista[Math.floor(Math.random() * lista.length)];

function observarRevelacoes() {
  const alvos = document.querySelectorAll('.revelar');
  if (!('IntersectionObserver' in window) || semMovimento()) {
    for (const alvo of alvos) alvo.classList.add('revelar--visivel');
    return;
  }
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada, i) => {
      if (!entrada.isIntersecting) return;
      setTimeout(() => entrada.target.classList.add('revelar--visivel'), i * 90);
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  for (const alvo of alvos) observador.observe(alvo);
}

document.addEventListener('click', (evento) => {
  const gatilho = evento.target.closest('[data-acao]');
  if (!gatilho) return;
  switch (gatilho.dataset.acao) {
    case 'comecar':
    case 'denovo': comecar(); break;
    case 'proxima': proxima(); break;
    case 'desistir': mostrarTela('capa'); break;
    case 'copiar': copiarResultado(); break;
    default: break;
  }
});

// teclado: 1 a 4 respondem, Enter avança
document.addEventListener('keydown', (evento) => {
  if (telas.quiz.hidden) return;
  const numero = Number(evento.key);
  if (numero >= 1 && numero <= 6) {
    const botao = document.querySelector(`.alternativa[data-indice="${numero - 1}"]`);
    if (botao && !botao.disabled) botao.click();
  } else if (evento.key === 'Enter' && !$('#veredito').hidden) {
    proxima();
  }
});

montarFita();
preencherNumeros();
observarRevelacoes();

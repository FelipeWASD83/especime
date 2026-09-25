// As pranchas — a imagem que aparece quando a pessoa responde.
//
// Duas espécies:
//   tipo 'foto'    → arquivo em img/pranchas/, vindo do Wikimedia Commons
//                    (domínio público ou licença livre; ver CREDITOS.md)
//   tipo 'desenho' → diagrama em SVG desenhado aqui mesmo, para os casos em
//                    que não existe retrato livre (gente do século XX) ou em
//                    que o objeto conta a história melhor que um rosto.
//
// `legenda` vira a etiqueta da prancha; `nota` é a linha em letra de máquina
// embaixo dela.

const desenho = (conteudo) =>
  `<svg viewBox="0 0 320 320" aria-hidden="true" fill="none"
        stroke="currentColor" stroke-width="1.4"
        stroke-linecap="round" stroke-linejoin="round">${conteudo}</svg>`;

// Prisma de Newton: um feixe entra branco e sai aberto em leque.
const PRISMA = desenho(`
  <path d="M160 74 L246 226 L74 226 Z" stroke-width="1.8"/>
  <path d="M16 150 L132 150" stroke-width="2.2"/>
  <path d="M132 150 L186 178"/>
  ${[0, 1, 2, 3, 4, 5]
    .map((i) => `<path d="M186 178 L300 ${196 + i * 13}" opacity="${1 - i * 0.11}"/>`)
    .join('')}
  <circle cx="132" cy="150" r="2.6" fill="currentColor" stroke="none"/>
`);

// Foto 51: o X de manchas que o DNA desenha ao espalhar raios X.
const FOTO51 = (() => {
  const pontos = [];
  for (let i = -4; i <= 4; i += 1) {
    if (i === 0) continue;
    const distancia = Math.abs(i);
    const raio = 11 - distancia * 1.6;
    const passo = 27;
    for (const sinal of [1, -1]) {
      pontos.push(
        `<ellipse cx="${160 + sinal * i * passo * 0.78}" cy="${160 - i * passo}" ` +
          `rx="${raio}" ry="${raio * 0.72}" fill="currentColor" stroke="none" ` +
          `opacity="${0.86 - distancia * 0.14}"/>`,
      );
    }
  }
  return desenho(`
    <circle cx="160" cy="160" r="132" stroke-width="1.6"/>
    <circle cx="160" cy="160" r="122" stroke-dasharray="2 7" opacity="0.5"/>
    ${pontos.join('')}
    <circle cx="160" cy="160" r="15" fill="currentColor" stroke="none" opacity="0.18"/>
  `);
})();

// Buraco negro: o disco, o anel de luz e a malha do espaço entortando.
const BURACO_NEGRO = (() => {
  const malha = [];
  for (let i = 1; i <= 6; i += 1) {
    const y = 40 + i * 40;
    const curva = 46 - Math.abs(3.5 - i) * 11;
    malha.push(
      `<path d="M14 ${y} Q160 ${y + curva} 306 ${y}" opacity="${0.45 - i * 0.03}"/>`,
    );
  }
  return desenho(`
    ${malha.join('')}
    <circle cx="160" cy="160" r="86" stroke-width="1.6" opacity="0.7"/>
    <ellipse cx="160" cy="160" rx="118" ry="30" opacity="0.5"/>
    <circle cx="160" cy="160" r="54" fill="currentColor" stroke="none"/>
    <circle cx="160" cy="160" r="64" stroke-width="2.4"/>
  `);
})();

// Placa de Petri: o mofo num canto e o halo onde a bactéria não cresceu.
const PENICILINA = (() => {
  const colonias = [];
  const semente = [
    [95, 232], [126, 258], [72, 196], [214, 230], [246, 190], [228, 262],
    [58, 148], [258, 132], [104, 276], [196, 276], [268, 226], [46, 216],
  ];
  for (const [x, y] of semente) {
    colonias.push(`<circle cx="${x}" cy="${y}" r="5.5" fill="currentColor" stroke="none" opacity="0.5"/>`);
    colonias.push(`<circle cx="${x + 13}" cy="${y - 9}" r="3.4" fill="currentColor" stroke="none" opacity="0.38"/>`);
  }
  return desenho(`
    <circle cx="160" cy="160" r="140" stroke-width="1.8"/>
    <circle cx="160" cy="160" r="130" opacity="0.4"/>
    ${colonias.join('')}
    <circle cx="150" cy="104" r="86" stroke-dasharray="4 6" opacity="0.6"/>
    <path d="M110 74 q22 -26 48 -14 q28 -13 44 12 q24 14 10 40 q6 30 -26 34
             q-20 20 -44 6 q-28 6 -36 -20 q-18 -24 4 -58 Z" stroke-width="1.6"/>
    <path d="M128 92 q18 10 36 4 M132 112 q24 -8 44 6 M150 70 q6 18 -2 34" opacity="0.65"/>
  `);
})();

// Penicilina em fórmula: os dois anéis colados que Hodgkin revelou.
const MOLECULA = desenho(`
  <path d="M112 128 L112 192 L172 192 L172 128 Z" stroke-width="1.8"/>
  <path d="M172 128 L232 104 L268 152 L236 202 L172 192" stroke-width="1.8"/>
  <path d="M112 128 L56 104 M112 192 L56 216" />
  <path d="M116 132 L116 188" opacity="0.55"/>
  <circle cx="112" cy="128" r="12" fill="var(--papel)"/>
  <circle cx="232" cy="104" r="12" fill="var(--papel)"/>
  <circle cx="56" cy="104" r="12" fill="var(--papel)"/>
  <text x="112" y="133" font-size="15" text-anchor="middle" fill="currentColor"
        stroke="none" font-family="serif">N</text>
  <text x="232" y="109" font-size="15" text-anchor="middle" fill="currentColor"
        stroke="none" font-family="serif">S</text>
  <text x="56" y="109" font-size="15" text-anchor="middle" fill="currentColor"
        stroke="none" font-family="serif">O</text>
`);

// A molécula de água: um oxigênio grande e dois hidrogênios, num V de 104,5°.
const AGUA = desenho(`
  <path d="M118 122 L160 186 L202 122" stroke-width="2.4"/>
  <circle cx="160" cy="196" r="52" stroke-width="2" fill="var(--papel-alto)"/>
  <circle cx="104" cy="112" r="30" stroke-width="2" fill="var(--papel-alto)"/>
  <circle cx="216" cy="112" r="30" stroke-width="2" fill="var(--papel-alto)"/>
  <text x="160" y="209" font-size="36" text-anchor="middle" fill="currentColor"
        stroke="none" font-family="serif">O</text>
  <text x="104" y="123" font-size="24" text-anchor="middle" fill="currentColor"
        stroke="none" font-family="serif">H</text>
  <text x="216" y="123" font-size="24" text-anchor="middle" fill="currentColor"
        stroke="none" font-family="serif">H</text>
  <path d="M128 158 q32 22 64 0" stroke-dasharray="3 5" opacity="0.55"/>
  <text x="160" y="272" font-size="17" text-anchor="middle" fill="currentColor"
        stroke="none" font-family="serif" opacity="0.7">104,5°</text>
`);

// A escala de pH: uma régua de 0 a 14 com o neutro no meio.
const PH = (() => {
  const ticks = [];
  for (let i = 0; i <= 14; i += 1) {
    const x = 34 + i * 18;
    const alto = i % 7 === 0;
    ticks.push(`<path d="M${x} 152 L${x} ${alto ? 130 : 142}" stroke-width="${alto ? 2 : 1.1}"/>`);
    if (alto) {
      ticks.push(
        `<text x="${x}" y="120" font-size="17" text-anchor="middle" fill="currentColor" ` +
          `stroke="none" font-family="serif">${i}</text>`,
      );
    }
  }
  return desenho(`
    <path d="M34 152 L286 152" stroke-width="2.2"/>
    ${ticks.join('')}
    <circle cx="160" cy="152" r="7" fill="currentColor" stroke="none"/>
    <text x="34" y="186" font-size="14" text-anchor="start" fill="currentColor"
          stroke="none" font-family="serif" letter-spacing="1.5">ÁCIDO</text>
    <text x="160" y="186" font-size="14" text-anchor="middle" fill="currentColor"
          stroke="none" font-family="serif" letter-spacing="1.5">NEUTRO</text>
    <text x="286" y="186" font-size="14" text-anchor="end" fill="currentColor"
          stroke="none" font-family="serif" letter-spacing="1.5">BÁSICO</text>
    <text x="72" y="228" font-size="15" text-anchor="middle" fill="currentColor"
          stroke="none" font-family="serif" opacity="0.7">limão</text>
    <text x="160" y="228" font-size="15" text-anchor="middle" fill="currentColor"
          stroke="none" font-family="serif" opacity="0.7">água</text>
    <text x="250" y="228" font-size="15" text-anchor="middle" fill="currentColor"
          stroke="none" font-family="serif" opacity="0.7">sabão</text>
    <path d="M72 200 L72 214 M160 200 L160 214 M250 200 L250 214" opacity="0.45"/>
  `);
})();

// Carbono: o mesmo átomo em dois arranjos — diamante e grafite.
const CARBONO = (() => {
  const no = (x, y, r = 6) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="currentColor" stroke="none"/>`;

  // diamante: um tetraedro
  const diamante = `
    <path d="M78 86 L34 178 L122 178 Z" stroke-width="1.6"/>
    <path d="M78 86 L78 140 M78 140 L34 178 M78 140 L122 178 M78 140 L78 210"/>
    <path d="M34 178 L78 210 L122 178" stroke-dasharray="3 4" opacity="0.5"/>
    ${no(78, 86)}${no(34, 178)}${no(122, 178)}${no(78, 140)}${no(78, 210)}
  `;

  // grafite: duas folhas de hexágonos, uma sobre a outra
  const hexagono = (cx, cy, r) => {
    const pontos = [];
    for (let i = 0; i < 6; i += 1) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      pontos.push(`${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`);
    }
    const nos = pontos.map((p) => no(...p.split(' ').map(Number), 4.5)).join('');
    return `<path d="M${pontos.join(' L')} Z" stroke-width="1.6"/>${nos}`;
  };
  const folha = (y, opacidade) =>
    `<g opacity="${opacidade}">${hexagono(202, y, 26)}${hexagono(247, y, 26)}
       ${hexagono(224, y - 39, 26)}</g>`;

  return desenho(`
    ${diamante}
    ${folha(190, 1)}${folha(132, 0.45)}
    <path d="M160 70 L160 250" stroke-dasharray="4 7" opacity="0.35"/>
    <text x="78" y="248" font-size="16" text-anchor="middle" fill="currentColor"
          stroke="none" font-family="serif">diamante</text>
    <text x="224" y="248" font-size="16" text-anchor="middle" fill="currentColor"
          stroke="none" font-family="serif">grafite</text>
  `);
})();

// A indução de Faraday: o ímã entra na bobina e a agulha do medidor se mexe.
const BOBINA = (() => {
  const voltas = [];
  for (let i = 0; i < 7; i += 1) {
    voltas.push(`<ellipse cx="${118 + i * 24}" cy="140" rx="11" ry="40" stroke-width="1.8"/>`);
  }
  return desenho(`
    ${voltas.join('')}
    <rect x="26" y="120" width="64" height="40" rx="3" stroke-width="2"
          fill="var(--papel-alto)"/>
    <path d="M58 120 L58 160" opacity="0.5"/>
    <text x="42" y="147" font-size="19" text-anchor="middle" fill="currentColor"
          stroke="none" font-family="serif">N</text>
    <text x="74" y="147" font-size="19" text-anchor="middle" fill="currentColor"
          stroke="none" font-family="serif">S</text>
    <path d="M34 92 L96 92 M86 84 L96 92 L86 100" stroke-width="1.8"/>

    <path d="M118 180 L118 250 L200 250" stroke-width="1.6"/>
    <path d="M262 180 L262 250 L254 250" stroke-width="1.6"/>
    <circle cx="227" cy="250" r="27" stroke-width="1.8" fill="var(--papel-alto)"/>
    <path d="M227 250 L241 230" stroke-width="2.6"/>
    <circle cx="227" cy="250" r="3.4" fill="currentColor" stroke="none"/>
    <path d="M210 238 q17 -11 34 0" stroke-dasharray="2 4" opacity="0.55"/>
  `);
})();


export const PRANCHAS = {
  darwin: { tipo: 'foto', arquivo: 'darwin.webp', nome: 'Charles Darwin', legenda: '1809 – 1882', nota: 'Fotografia de Julia Margaret Cameron, por volta de 1868.' },
  beagle: { tipo: 'foto', arquivo: 'beagle.webp', nome: 'HMS Beagle', legenda: '1831 – 1836', nota: 'O Beagle no estreito de Magalhães, com o monte Sarmiento ao fundo.' },
  tentilhoes: { tipo: 'foto', arquivo: 'tentilhoes.webp', nome: 'Os bicos de Galápagos', legenda: '1845', nota: 'Gravura de John Gould para o diário de viagem de Darwin.' },
  origem: { tipo: 'foto', arquivo: 'origem.webp', nome: 'A Origem das Espécies', legenda: '1859', nota: 'Folha de rosto da primeira edição, John Murray, Londres.' },
  wallace: { tipo: 'foto', arquivo: 'wallace.webp', nome: 'Alfred Russel Wallace', legenda: '1823 – 1913', nota: 'Colecionador de insetos, chegou à seleção natural sozinho.' },
  huxley: { tipo: 'foto', arquivo: 'huxley.webp', nome: 'Thomas Henry Huxley', legenda: '1825 – 1895', nota: 'O homem que brigava em público pelas ideias de Darwin.' },
  newton: { tipo: 'foto', arquivo: 'newton.webp', nome: 'Isaac Newton', legenda: '1643 – 1727', nota: 'Retrato pintado por Godfrey Kneller.' },
  principia: { tipo: 'foto', arquivo: 'principia.webp', nome: 'Principia', legenda: '1687', nota: 'Folha de rosto da primeira edição, impressa em Londres.' },
  prisma: { tipo: 'desenho', svg: PRISMA, nome: 'O experimento do prisma', legenda: '1666', nota: 'A luz branca entra inteira e sai repartida em cores.' },
  faraday: { tipo: 'foto', arquivo: 'faraday.webp', nome: 'Michael Faraday', legenda: '1791 – 1867', nota: 'Filho de ferreiro, aprendiz de encadernador, gênio do laboratório.' },
  davy: { tipo: 'foto', arquivo: 'davy.webp', nome: 'Humphry Davy', legenda: '1778 – 1829', nota: 'Químico, poeta e chefe de Faraday na Royal Institution.' },
  micrographia: { tipo: 'foto', arquivo: 'micrographia.webp', nome: 'A pulga da Micrographia', legenda: '1665', nota: 'Robert Hooke desenhou o que via na lente — e assustou Londres.' },
  halley: { tipo: 'foto', arquivo: 'halley.webp', nome: 'Edmond Halley', legenda: '1656 – 1742', nota: 'Pagou do próprio bolso a impressão do Principia.' },
  herschel: { tipo: 'foto', arquivo: 'herschel.webp', nome: 'William Herschel', legenda: '1738 – 1822', nota: 'Músico de profissão, polia os próprios espelhos de telescópio.' },
  anning: { tipo: 'foto', arquivo: 'anning.webp', nome: 'Mary Anning', legenda: '1799 – 1847', nota: 'Retratada com o cão Tray e o martelo, nas falésias de Lyme Regis.' },
  harvey: { tipo: 'foto', arquivo: 'harvey.webp', nome: 'William Harvey', legenda: '1578 – 1657', nota: 'Provou a circulação do sangue com uma conta de aritmética.' },
  jenner: { tipo: 'foto', arquivo: 'jenner.webp', nome: 'Edward Jenner', legenda: '1749 – 1823', nota: 'Médico de interior, inventor da vacina.' },
  dalton: { tipo: 'foto', arquivo: 'dalton.webp', nome: 'John Dalton', legenda: '1766 – 1844', nota: 'Deu nome ao daltonismo ao descrever a própria visão.' },
  nightingale: { tipo: 'foto', arquivo: 'nightingale.webp', nome: 'Florence Nightingale', legenda: '1820 – 1910', nota: 'A dama da lâmpada — e uma das primeiras a governar por gráfico.' },
  foto51: { tipo: 'desenho', svg: FOTO51, nome: 'Foto 51', legenda: '1952', nota: 'O X que o DNA desenha quando atravessado por raios X.' },
  hodgkin: { tipo: 'desenho', svg: MOLECULA, nome: 'A penicilina, por dentro', legenda: '1945', nota: 'Os dois anéis colados que Dorothy Hodgkin mapeou com raios X.' },
  penicilina: { tipo: 'desenho', svg: PENICILINA, nome: 'A placa esquecida', legenda: '1928', nota: 'Em volta do mofo, um círculo limpo: ali nenhuma bactéria cresceu.' },
  'buraco-negro': { tipo: 'desenho', svg: BURACO_NEGRO, nome: 'O horizonte de eventos', legenda: '1974', nota: 'Onde o espaço entorta tanto que nem a luz volta.' },
  pombos: { tipo: 'foto', arquivo: 'pombos.webp', nome: 'Os crânios dos pombos', legenda: '1868', nota: 'Prancha de "A Variação": quatro raças criadas pelo homem, cada uma com outra cabeça.' },
  owen: { tipo: 'foto', arquivo: 'owen.webp', nome: 'Richard Owen', legenda: '1804 – 1892', nota: 'Inventou a palavra dinossauro, fundou o Museu de História Natural e odiava Darwin.' },
  colera: { tipo: 'foto', arquivo: 'colera.webp', nome: 'O mapa da cólera', legenda: '1854', nota: 'Cada tracinho é uma morte. O aglomerado cerca a bomba de água da Broad Street.' },
  lister: { tipo: 'foto', arquivo: 'lister.webp', nome: 'Joseph Lister', legenda: '1827 – 1912', nota: 'Convenceu a cirurgia de que o inimigo era invisível — e lavável.' },
  drosera: { tipo: 'foto', arquivo: 'drosera.webp', nome: 'A drósera', legenda: '1875', nota: 'A planta de folha pegajosa que Darwin dizia amar mais que todas as espécies do mundo.' },
  mendeleev: { tipo: 'foto', arquivo: 'mendeleev.webp', nome: 'Dmitri Mendeleiev', legenda: '1834 – 1907', nota: 'Deixou buracos na tabela e disse o que ia caber neles. Coube.' },
  priestley: { tipo: 'foto', arquivo: 'priestley.webp', nome: 'Joseph Priestley', legenda: '1733 – 1804', nota: 'Pastor, químico e encrenqueiro: teve a casa incendiada por uma multidão e fugiu para os Estados Unidos.' },
  coracao: { tipo: 'foto', arquivo: 'coracao.webp', nome: 'O coração por dentro', legenda: 'Anatomia de Gray', nota: 'Prancha da Anatomia de Gray, o livro de anatomia mais famoso da Inglaterra, com desenho de Henry Vandyke Carter.' },
  abelha: { tipo: 'foto', arquivo: 'abelha.webp', nome: 'A mamangava', legenda: 'Bombus', nota: 'Darwin passou anos atrás de abelha e de trevo para entender quem poliniza o quê.' },
  agua: { tipo: 'desenho', svg: AGUA, nome: 'A molécula de água', legenda: 'H₂O', nota: 'Dois hidrogênios presos a um oxigênio, num V aberto em 104,5 graus.' },
  ph: { tipo: 'desenho', svg: PH, nome: 'A régua do pH', legenda: '0 a 14', nota: 'Cada degrau é dez vezes: pH 4 é cem vezes mais ácido que pH 6.' },
  carbono: { tipo: 'desenho', svg: CARBONO, nome: 'O mesmo átomo, dois arranjos', legenda: 'C', nota: 'Carbono em pirâmide dá diamante; em folhas empilhadas, dá grafite.' },
  bobina: { tipo: 'desenho', svg: BOBINA, nome: 'A indução, em desenho', legenda: '1831', nota: 'O ímã entra, a agulha se mexe. O ímã para, a agulha volta ao lugar.' },
  chimpanze: { tipo: 'foto', arquivo: 'chimpanze.webp', nome: 'O chimpanzé de Darwin', legenda: '1872', nota: 'Prancha de "A Expressão das Emoções no Homem e nos Animais".' },
};
